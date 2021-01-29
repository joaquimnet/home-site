import React from 'react';
import { Page } from '../../../shared/page/Page';

import classes from './Bit.module.css';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';
import { Button } from '../../../shared/button/Button';

const fetchBits = async ({ queryKey }) => {
  const [, , token] = queryKey;
  let res;
  try {
    res = await axios.get(`${BACKEND_URL}/knowledge/bit`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

// TODO: Move this to a knowledge service
export const Bit = () => {
  const { user, tokens } = useSelector((state) => state.auth);
  const { data } = useQuery(['userBits', user?._id, tokens?.access], fetchBits);

  return (
    <Page>
      <h1>
        Here are some <u>Bits</u> of knowledge
      </h1>
      {user && data ? (
        <>
          <Button>New ➕</Button>
          <ul className={classes.BitList}>
            {data?.length ? (
              data.map((bit) => (
                <li className={classes.Bit} key={bit._id}>
                  <span className={classes.BitName}>{bit.name}</span>
                  <span className={classes.BitContent}>{bit.content}</span>
                  <span className={classes.BitTags}>{bit.tags.join(', ')}</span>
                </li>
              ))
            ) : (
              <h3>You don't have any bits yet 😔</h3>
            )}
          </ul>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </Page>
  );
};
