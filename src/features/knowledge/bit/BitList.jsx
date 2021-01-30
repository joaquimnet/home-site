import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import classes from './Bit.module.css';
import { BACKEND_URL } from '../../../config';
import { useSelector } from 'react-redux';

// TODO: Move this to a knowledge service
const deleteBit = async (id, token, refetchBits) => {
  try {
    await axios.delete(`${BACKEND_URL}/knowledge/bit/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    toast('Bit Deleted', { autoClose: true, type: 'success' });
    refetchBits();
  } catch (err) {
    toast('Something went wrong...', { autoClose: true, type: 'error' });
  }
};

export const BitList = ({ bits, refetchBits }) => {
  const { tokens } = useSelector((state) => state.auth);
  return (
    <ul className={classes.BitList}>
      {bits?.length ? (
        bits.map((bit) => (
          <li className={classes.Bit} key={bit._id}>
            <span className={classes.BitName}>{bit.name}</span>
            <span className={classes.BitContent}>{bit.content}</span>
            <span className={classes.BitTags}>{bit.tags.join(', ')}</span>
            <div
              className={classes.BitDelete}
              onClick={() => deleteBit(bit._id, tokens.access, refetchBits)}
            >
              <FaTrash size={16} />
            </div>
          </li>
        ))
      ) : (
        <h3>You don't have any bits yet 😔</h3>
      )}
    </ul>
  );
};
