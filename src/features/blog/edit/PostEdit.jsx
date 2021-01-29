import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useQueryCache } from 'react-query';

import { BACKEND_URL } from '../../../config';
import { Page } from '../../../shared/page/Page';
import { Details } from '../post-editor/Details';
import { Content } from '../post-editor/Content';
import { useSelector } from 'react-redux';

const fetchPosts = async (key, slug) => {
  let res;
  try {
    res = await axios.get(`${BACKEND_URL}/posts/${slug}`);
  } catch (err) {
    const error = new Error('Post fetching failed');
    if (err.response) {
      error.response = err.response;
    }
    throw error;
  }
  return res.data;
};

const fetchTags = async () => {
  let res;
  try {
    res = await axios.get(`${BACKEND_URL}/posts/tags`);
  } catch (err) {
    console.error('Tag fetching failed', err.response || err);
    return [];
  }
  return res.data;
};

const editPost = (slug, post, token, cache) => {
  if (!token) return;
  axios
    .put(`${BACKEND_URL}/posts/${slug}`, post, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      cache.invalidateQueries('post');
      toast('Done!', { type: 'success' });
    })
    .catch((err) => {
      console.error(err.response);
      toast(`Could not update post.\n${err.response.data.message}`, {
        type: 'error',
      });
    });
};

export const PostEdit = () => {
  const { slug } = useParams();
  const { data: post, status } = useQuery(['post', slug], fetchPosts, {
    staleTime: Infinity,
  });
  const { data: tagSuggestions } = useQuery('tags', fetchTags, {
    staleTime: 10000,
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [postContent, setPostContent] = useState('');

  const [postLoaded, setPostLoaded] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!post || postLoaded) return;
    setTitle(post.title);
    setDescription(post.description);
    setTags(post.tags);
    setPostContent(post.content);
    setPostLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const queryCache = useQueryCache();

  const { user, tokens } = useSelector((state) => state.auth);

  if (status === 'loading' || (!user && tokens.refresh)) {
    return (
      <Page>
        <h1>Loading...</h1>
      </Page>
    );
  }

  if (status === 'error') {
    return (
      <Page>
        <h1>Oh no! Something went wrong {':('}</h1>
      </Page>
    );
  }

  if (post && !tokens.refresh) {
    return <Redirect to={`/blog/${slug}`} />;
  }

  if (post && post.author._id !== user._id) {
    return <Redirect to={`/blog/${slug}`} />;
  }

  const submit = () => {
    editPost(
      slug,
      { title, description, tags, content: postContent },
      tokens.access,
      queryCache,
    );
  };

  return (
    <Page>
      {redirect && <Redirect to={redirect} />}
      <Details
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        tags={tags}
        setTags={setTags}
        tagSuggestions={tagSuggestions}
        onGoBack={() => setRedirect(`/blog/${slug}`)}
        onSubmit={submit}
      />
      <Content content={postContent} setContent={setPostContent} />
    </Page>
  );
};
