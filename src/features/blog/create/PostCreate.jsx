import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import { Page } from '../../../shared/page/Page';
import { Details } from '../post-editor/Details';
// import { Content } from '../post-editor/Content';
import { createPost, fetchTags } from '../../../api/blog';
import { useNavigation } from '../../../hooks/useNavigation';

const Editor = loadable(() => import('../../../shared/editor/Editor'));

const PostCreate = () => {
  const { data: tagSuggestions } = useQuery('tags', fetchTags, {
    staleTime: 10000,
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState({});
  const { navigate } = useNavigation();

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
    navigate('/blog');
    return <Redirect to="/blog" />;
  }

  const submit = () => {
    createPost(
      { title, description, tags, content: content.blocks ?? [] },
      tokens.access,
      navigate,
    );
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
        onGoBack={goBack}
        onSubmit={submit}
      />
      <Editor
        data={content}
        onChange={(instance, content) => setContent(content)}
        onBlur={() => console.log('blur!!!')}
      />
    </Page>
  );
};

export default PostCreate;
