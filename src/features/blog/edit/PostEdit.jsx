import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { Page } from '../../../shared/page/Page';
import { Details } from '../post-editor/Details';
import { Content } from '../post-editor/Content';
import { editPost, fetchPost, fetchTags } from '../../../api/blog';
import { useNavigation } from '../../../hooks/useNavigation';

const PostEdit = () => {
  const { slug } = useParams();
  const { navigate, makeNavigation } = useNavigation();
  const { data: post, status } = useQuery(['post', slug], fetchPost, {
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

  useEffect(() => {
    if (!post || postLoaded) return;
    setTitle(post.title);
    setDescription(post.description);
    setTags(post.tags);
    setPostContent(post.content);
    setPostLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

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
    return navigate(`/blog/${slug}`);
  }

  const submit = () => {
    editPost(slug, { title, description, tags, content: postContent }, tokens.access);
  };

  return (
    <Page>
      <Details
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        tags={tags}
        setTags={setTags}
        tagSuggestions={tagSuggestions}
        onGoBack={makeNavigation(`/blog/${slug}`)}
        onSubmit={submit}
      />
      <Content content={postContent} setContent={setPostContent} />
    </Page>
  );
};

export default PostEdit;
