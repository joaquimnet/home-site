import React from 'react';
import { useSelector } from 'react-redux';

import { Page } from '../../shared/page/Page';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button } from '../../shared/button/Button';

// TODO: Move this to a user service
const fetchUserByID = async ({ queryKey }) => {
  const [, id] = queryKey;
  if (!id) return null;
  let res;
  try {
    res = await axios.get(`${BACKEND_URL}/users/${id}`);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

export const Profile = ({ other = false }) => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { data: fetchedProfile } = useQuery(['fetchProfile', id], fetchUserByID);

  let userToDisplay;

  if (user) {
    userToDisplay = user;
  }

  // this should only happen if accessing with an id in the url
  if (fetchedProfile) {
    userToDisplay = fetchedProfile;
  }

  let selfProfileNoUser = !id && !user;
  let otherProfileNotFetched = id && !fetchedProfile;
  if (selfProfileNoUser || otherProfileNotFetched) {
    return (
      <Page>
        <h1>Loading...</h1>
      </Page>
    );
  }

  const isSelf = user?._id === userToDisplay?._id;

  return (
    <Page>
      <h1>{userToDisplay.username}</h1>
      <pre>{JSON.stringify(userToDisplay, null, 2)}</pre>
      <hr />
      {isSelf && (
        <>
          <h2 style={{ marginBottom: '1rem' }}>Knowledge</h2>
          <Button as={Link} to="/knowledge/bit">
            Bits
          </Button>
        </>
      )}
    </Page>
  );
};
