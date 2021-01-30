import React from 'react';
import styled from 'styled-components';

import { Markdown } from '../../../shared/markdown/Markdown';
import { Label } from '../../../shared/input/Label';
import { TextArea } from '../../../shared/input/TextArea';

const EditorContainer = styled.div`
  width: 100%;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;

export const Content = ({ content, setContent }) => {
  return (
    <>
      <hr />
      <Label htmlFor="post-editor">Content</Label>
      <EditorContainer>
        <TextArea
          id="post-editor"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
          style={{ color: 'white' }}
        />
      </EditorContainer>
      <hr />
      <h1>Preview</h1>
      <Markdown>{content}</Markdown>
    </>
  );
};
