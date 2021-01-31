import React from 'react';
import { FaCalendarAlt, FaHeart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledPostListItem = styled(Link)`
  width: 95%;
  height: auto;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.125rem;
  box-shadow: 0px 3px 8px 4px rgba(0, 0, 0, 0.1);
  background: #1d1d1d;
  color: white;
  display: flex;
  flex-flow: column wrap;
  transition: all 0.05s;

  &:hover {
    transform: scale(1.025);
    box-shadow: 3px 3px 3px rgba(74, 213, 231, 0.3), -2px -2px 2px rgba(231, 74, 74, 0.3);
  }

  & > div {
    display: flex;
    flex-flow: column wrap;
  }

  & .PostItem-title {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  & .PostItem-description {
    font-size: 1.2rem;
  }

  & .PostItem-tags {
    padding-top: 0.5rem;
  }

  & .PostItem-tag {
    width: fit-content;
    display: inline;
    padding: 0 0.125rem;
    margin: 0 0.125rem 0 0.125rem;
    border: 1px solid rgb(66, 66, 66);
    border-radius: 0.125rem;
    text-shadow: 3px 3px 3px rgba(74, 213, 231, 0.3), -2px -2px 2px rgba(231, 74, 74, 0.3);
  }

  & .PostItem-tag::before {
    content: '#';
  }

  & .PostItem-date {
    align-self: flex-end;
    font-style: italic;
  }
`;

export function PostListItem(post) {
  const { title, description, slug, tags, meta, createdAt } = post;
  return (
    <StyledPostListItem to={`/blog/${slug}`}>
      <div>
        <span className="PostItem-title">{title}</span>
        <p className="PostItem-description">{description}</p>
        {tags && (
          <div className="PostItem-tags">
            {tags.map((tag) => (
              <span key={`tag-${tag}`} className="PostItem-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="PostItem-date">
          <FaEye className="icon" /> {meta.views}
          {'    '}
          <FaHeart className="icon" /> {meta.likes}
          {'    '}
          <FaCalendarAlt className="icon" /> {dateToString(new Date(createdAt))}
        </span>
      </div>
    </StyledPostListItem>
  );
}

function dateToString(date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
