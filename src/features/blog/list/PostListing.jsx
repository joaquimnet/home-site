import React from 'react';
import { useQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { IsAuthenticated } from '../../../shared/auth/IsAuthenticated';
import { Page } from '../../../shared/page/Page';
import { Fab } from '../../../shared/button/Fab';
import { PostListItem } from './PostListItem';
import { fetchPosts } from '../../../api/blog';

export default function PostListing() {
  const { data: posts, status } = useQuery('posts', fetchPosts, { staleTime: 5000 });

  return (
    <Page>
      {status === 'loading' && <h1>Loading...</h1>}
      {status === 'error' && <h1>Oh no... Something bad happened. Try again maybe?</h1>}
      {status === 'success' &&
        posts.length &&
        posts.map((p) => <PostListItem key={p._id} {...p} />)}

      {status === 'success' && !posts.length && <h1>Nothing here yet...</h1>}
      <IsAuthenticated>
        <Fab animated as={Link} to="/blog/create">
          <FaPlus style={{ margin: '1rem' }} />
        </Fab>
      </IsAuthenticated>
    </Page>
  );
}
