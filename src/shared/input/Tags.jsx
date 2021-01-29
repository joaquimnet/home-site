import React, { useState } from 'react';
import styled from 'styled-components';
import { compareTwoStrings as similarity } from 'string-similarity';

const sanitizeTag = (value) =>
  value
    .split(',')[0]
    .trim()
    .replace(/\s+/g, 'SPACE')
    .replace(/\W/g, '')
    .replace(/SPACE/g, '-');

const TagListComponent = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  & li {
    margin: 0 0.125rem;
    padding: 0 0.125rem;
    border: 1px solid black;
    border-radius: 0.125rem;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const TagListSuggestions = styled.ul`
  height: 1.2rem;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin-top: -0.25rem;
  margin-bottom: 0.25;
  color: gray;

  & li {
    margin: 0 0.125rem;
  }
`;

const TagList = ({ tags, setTags }) => {
  return (
    <TagListComponent>
      {tags.map((tag, i) => (
        <li
          key={`${tag}-${i}`}
          onClick={() => {
            setTags((ts) => ts.filter((t) => t !== tag));
          }}
        >
          {tag}
        </li>
      ))}
    </TagListComponent>
  );
};

const TagInput = ({ setTags, setTagInputValue }) => {
  const onKeyUp = (e) => {
    if ([13, 188].includes(e.keyCode)) {
      const newTag = sanitizeTag(e.target.value);
      if (newTag && newTag.length) {
        setTags((tags) => [...new Set([...tags, newTag])]);
        e.target.value = '';
      }
    }
  };

  return (
    <input
      type="text"
      placeholder="Add tags"
      className="tags"
      id="post-edit-tags"
      onKeyUp={onKeyUp}
      onChange={
        setTagInputValue ? (e) => setTagInputValue(e.target.value) : undefined
      }
    />
  );
};

export const Tags = ({ tags, setTags, suggestions }) => {
  const [tagInputValue, setTagInputValue] = useState('');
  return (
    <>
      <TagList tags={tags} setTags={setTags} />
      <TagInput setTags={setTags} setTagInputValue={setTagInputValue} />
      <TagListSuggestions>
        {suggestions &&
          tagInputValue.length > 0 &&
          suggestions.map((currentTag, i) => {
            return (
              similarity(currentTag, tagInputValue) > 0.3 && (
                <li key={`${currentTag}-${i}`}>{currentTag}</li>
              )
            );
          })}
      </TagListSuggestions>
    </>
  );
};
