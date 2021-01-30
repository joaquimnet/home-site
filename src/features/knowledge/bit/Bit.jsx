import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa';

import { BitCreationModal } from './BitCreationModal';

import { Page } from '../../../shared/page/Page';
import { BACKEND_URL } from '../../../config';
import { Button } from '../../../shared/button/Button';
import { Fab } from '../../../shared/button/Fab';
import { BitList } from './BitList';
import { toast } from 'react-toastify';

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
const createBit = async (bit, token) => {
  try {
    await axios.post(`${BACKEND_URL}/knowledge/bit`, bit, {
      headers: { authorization: `Bearer ${token}` },
    });
    toast('Bit created!', { autoClose: true, type: 'success' });
  } catch (err) {
    console.error(err);
    toast('Something went wrong...', { autoClose: true, type: 'error' });
  }
};

export const Bit = () => {
  const { user, tokens } = useSelector((state) => state.auth);

  const { data, refetch: refetchBits } = useQuery(
    ['userBits', user?._id, tokens?.access],
    fetchBits,
  );

  const [open, setOpen] = useState(false);
  const isLoading = !(user && data);

  const handleBitCreation = async (name, content, tags) => {
    setImmediate(setOpen(false));
    await createBit({ name, content, tags }, tokens?.access);
    await refetchBits();
  };

  return (
    <Page>
      <h1>
        Here are some <u>Bits</u> of knowledge
      </h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Button onClick={() => setOpen(true)}>New ➕</Button>
          <BitList bits={data} refetchBits={refetchBits} />
          <Fab animated onClick={() => setOpen(true)}>
            <FaPlus style={{ margin: '1rem' }} />
          </Fab>
          <BitCreationModal
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleBitCreation}
          />
        </>
      )}
    </Page>
  );
};
