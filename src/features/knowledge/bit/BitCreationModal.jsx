import React, { useState } from 'react';

import classes from './BitModal.module.css';

import { Button } from '../../../shared/button/Button';
import { Modal } from '../../../shared/modal/Modal';

const H1 = ({ children }) => <h1 style={{ margin: 0 }}>{children}</h1>;

export const BitCreationModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) return;
    if (content.length === 0) return;
    if (tags.length === 0) return;

    setImmediate(onClose);

    onSubmit(
      name.trim(),
      content.trim(),
      tags.split(',').map((t) => t.trim().toLowerCase()),
    );

    setName('');
    setContent('');
    setTags('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <H1>Bit Name</H1>
          <input
            className={classes.BitInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="bit-name"
          />
        </div>
        <div className="form-control">
          <H1>Bit Content</H1>
          <input
            className={classes.BitInput}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            name="bit-content"
          />
        </div>
        <div className="form-control">
          <H1>Tags</H1>
          <input
            className={classes.BitInput}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            name="bit-tags"
          />
        </div>
        <div className="form-control">
          <Button block onClick={handleSubmit}>
            Create Bit
          </Button>
          <input type="submit" style={{ display: 'none' }} />
        </div>
      </form>
    </Modal>
  );
};
