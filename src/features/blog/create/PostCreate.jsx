import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

import { Page } from '../../../shared/page/Page';
import { Details } from '../post-editor/Details';
import { BACKEND_URL } from '../../../config';
import { Content } from '../post-editor/Content';
import { useSelector } from 'react-redux';

const createPost = (post, token, setRedirect) => {
  if (!token) return;
  axios
    .post(`${BACKEND_URL}/posts`, post, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      toast('Done!', {
        type: 'success',
        onClose: setRedirect(`/blog/${res.data.slug}`),
      });
    })
    .catch((err) => {
      console.error(err.response);
      toast(`Could not create post.\n${err.response.data.message}`, {
        type: 'error',
      });
    });
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

const PostCreate = () => {
  const { data: tagSuggestions } = useQuery('tags', fetchTags, {
    staleTime: 10000,
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');

  const [redirect, setRedirect] = useState(false);
  const { goBack } = useHistory();

  const { user, tokens } = useSelector((state) => state.auth);

  if (!user && tokens.refresh) {
    return (
      <Page>
        <h1>Loading...</h1>
      </Page>
    );
  }

  if (!user && !tokens.refresh) {
    return <Redirect to="/blog" />;
  }

  const submit = () => {
    createPost({ title, description, tags, content }, tokens.access, setRedirect);
  };

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Page>
        <Details
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          tags={tags}
          setTags={setTags}
          tagSuggestions={tagSuggestions}
          onGoBack={goBack}
          onSubmit={submit}
        />
        <Content content={content} setContent={setContent} />
      </Page>
    </>
  );
};

export default PostCreate;