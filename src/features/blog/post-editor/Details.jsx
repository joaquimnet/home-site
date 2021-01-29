import React from 'react';
import styled from 'styled-components';

import { Tags } from '../../../shared/input/Tags';
import { Button } from '../../../shared/input/Button';
import { Label } from '../../../shared/input/Label';

const StyledDetails = styled.div`
  width: 100%;
  /* min-height: 5rem; */
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;

  & label {
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 4px solid rgba(74, 231, 87, 0.3);
    text-shadow: 3px 3px 3px rgba(74, 213, 231, 0.3),
      -2px -2px 2px rgba(231, 74, 74, 0.3);
  }

  & input {
    width: 100%;
    padding: 0.25rem 0;
    border: none;
    background: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
    margin-bottom: 0.5rem;
    &:focus {
      outline: none;
    }
  }

  & .title {
    font-size: 2rem;
  }

  & .description {
    font-size: 1.1rem;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const Details = ({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  setTags,
  tagSuggestions,
  onSubmit,
  onGoBack,
}) => {
  return (
    <StyledDetails>
      <Label htmlFor="post-edit-title">Title</Label>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title"
        id="post-edit-title"
      />

      <Label htmlFor="post-edit-description">Description</Label>
      <input
        type="text"
        placeholder="Post Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="description"
        id="post-edit-description"
      />

      <Label htmlFor="post-edit-tags">Tags</Label>
      <Tags tags={tags} setTags={setTags} suggestions={tagSuggestions} />
      <Flex>
        <Button onClick={onSubmit}>Save</Button>
        <Button onClick={onGoBack}>Go Back</Button>
      </Flex>
    </StyledDetails>
  );
};
