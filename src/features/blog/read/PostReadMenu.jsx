import React from 'react';
import { FaHeart, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IsAuthenticated } from '../../../shared/auth/IsAuthenticated';

const StyledPostReadMenu = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  padding: 0 3rem;

  & a,
  button {
    width: 2rem;
    height: 2rem;
    margin: 0 0.5rem;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    border: none;
    background: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    & .icon {
      &:hover {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(1.02);
      }
    }
  }

  & .like {
    & .icon:hover {
      color: rgb(211, 66, 66);
    }

    & .icon:active {
      color: rgb(175, 50, 50);
    }
  }

  & .edit {
    & .icon:hover {
      color: rgb(211, 66, 66) !important;
    }

    & .icon:active {
      color: rgb(175, 50, 50) !important;
    }
  }
`;

export const PostReadMenu = ({ post } = {}) => {
  return (
    <StyledPostReadMenu>
      <button className="like" onClick={() => console.log('Like!')}>
        <FaHeart
          style={{
            width: '2rem',
            height: '2rem',
          }}
          className="icon"
        />
      </button>
      <IsAuthenticated>
        <Link className="edit" to={`/blog/${post.slug}/edit`}>
          <FaEdit
            style={{
              width: '2rem',
              height: '2rem',
              color: 'white'
            }}
            className="icon"
          />
        </Link>
      </IsAuthenticated>
    </StyledPostReadMenu>
  );
};
