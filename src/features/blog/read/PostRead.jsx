import React from 'react';
import styled from 'styled-components';
import loadable from '@loadable/component';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaCalendarAlt } from 'react-icons/fa';

import { PostReadMenu } from './PostReadMenu';
import { Page } from '../../../shared/page/Page';
import { fetchPost } from '../../../api/blog';

const Markdown = loadable(() => import('../../../shared/markdown/Markdown'));

const errorMessage = (error) => {
  if (error.response && error.response.status === 404) {
    return (
      <>
        <h1 className="text-center">Post not found</h1>
        <p className="text-center">
          Do you want to
          <Link to="/blog"> go back</Link>?
        </p>
      </>
    );
  }
  return <h1>Oh no... Something bad happened. Try again maybe?</h1>;
};

const SEO = (data) => {
  return (
    <Helmet>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      {/* <meta property="og:image" content="LINK TO THE IMAGE FILE" /> */}
      <meta property="og:url" content={`https://joaquimneto.dev/#/blog/${data.slug}`} />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
    </Helmet>
  );
};

const StyledPostRead = styled(Page)`
  & span {
    margin-bottom: 0.5rem;
  }

  & .PostRead-title {
    font-size: 3rem;
  }

  & .PostRead-description {
    color: rgb(165, 229, 220);
  }

  & .PostRead-author a {
    font-weight: normal;
  }

  & .PostRead-date {
    margin-top: 0.125rem;
    transform: scale(0.8);
  }

  & .PostRead-tags {
    font-weight: bold;
    transform: scale(0.9);
  }

  & .PostRead-tag {
    width: fit-content;
    display: inline;
    padding: 0 0.125rem;
    margin: 0 0.125rem 0 0.125rem;
    border: 1px solid rgb(66, 66, 66);
    border-radius: 0.125rem;
    text-shadow: 3px 3px 3px rgba(74, 213, 231, 0.3), -2px -2px 2px rgba(231, 74, 74, 0.3);
  }

  & .PostRead-tag::before {
    content: '#';
  }

  & .PostRead-content {
    color: white;
    align-self: flex-start;
    padding: 0 15rem;
  }

  @media only screen and (max-width: 768px) {
    & .PostRead-content {
      padding: 0 3rem;
    }
  }

  @media only screen and (max-width: 400px) {
    & .PostRead-content {
      padding: 0 1rem;
    }
  }
`;

const PostRead = () => {
  const { slug } = useParams();
  const { data, status, error } = useQuery(['post', slug], fetchPost, {
    staleTime: 30000,
  });

  return (
    <>
      <SEO />
      <StyledPostRead>
        {status === 'loading' && <h1>Loading...</h1>}
        {status === 'error' && errorMessage(error)}
        {status === 'success' && (
          <>
            <h1 className="PostRead-title">{data.title}</h1>
            <span className="PostRead-description">{data.description}</span>

            <span className="PostRead-author">
              <Link to={`/profile/${data.author._id}`}>
                <strong>By</strong> {data.author.username}
              </Link>
            </span>
            <span className="PostRead-date">
              <FaCalendarAlt className="icon" /> {dateToString(new Date(data.createdAt))}
            </span>
            {data.tags && (
              <div className="PostRead-tags">
                {data.tags.map((tag) => (
                  <span key={`tag-${tag}`} className="PostRead-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <hr />
            <PostReadMenu post={data} />
            <Markdown>{data.content}</Markdown>
          </>
        )}
      </StyledPostRead>
    </>
  );
};

function dateToString(date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

export default PostRead;
