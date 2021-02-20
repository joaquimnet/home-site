import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { IsAuthenticated } from '../../shared/auth/IsAuthenticated';
import { Fab } from '../../shared/button/Fab';
import { fetchPosts } from '../../api/blog';
import { BlogPostListingItem } from './BlogPostListingItem';

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
  margin-top: 1rem;
`;

export default function PostListing() {
  const { data: posts, status } = useQuery('posts', fetchPosts, { staleTime: 30000 });

  return (
    <Flex justify="flex-start" align="flex-start">
      {status === 'loading' && <h3>Loading blog posts...</h3>}
      {status === 'error' && <h1 style={{ margin: 0 }}>😀</h1>}
      {status === 'success' &&
        posts.length &&
        posts.map((p) => <BlogPostListingItem key={p._id} {...p} />)}

      {status === 'success' && !posts.length && <h1>Nothing here yet...</h1>}
      <IsAuthenticated>
        <Fab animated as={Link} to="/blog/create">
          <FaPlus style={{ margin: '1rem' }} />
        </Fab>
      </IsAuthenticated>
    </Flex>
  );
}
