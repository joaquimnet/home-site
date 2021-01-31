import axios from 'axios';
import { BACKEND_URL } from '../config';
import { toast } from 'react-toastify';

// react query

export const fetchTags = async () => {
  let res;
  try {
    res = await axios.get(`${BACKEND_URL}/posts/tags`);
  } catch (err) {
    console.error('Tag fetching failed', err.response || err);
    return [];
  }
  return res.data;
};

export const fetchPosts = async () => {
  const res = await fetch(`${BACKEND_URL}/posts?limit=100`);
  return res.json();
};

export const fetchPost = async ({ queryKey }) => {
  const [, slug] = queryKey;
  let res;
  try {
    res = await axios.get(`${BACKEND_URL}/posts/${slug}`);
  } catch (err) {
    const error = new Error('Post fetching failed');
    if (err.response) {
      error.response = err.response;
    }
    throw error;
  }
  return res.data;
};

// not query

export const createPost = (post, token, navigate) => {
  if (!token) return;
  axios
    .post(`${BACKEND_URL}/posts`, post, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => {
      toast('Done!', {
        type: 'success',
        onClose: () => navigate(`/blog/${res.data.slug}`),
      });
    })
    .catch((err) => {
      console.error(err.response);
      toast(`Could not create post.\n${err.response.data.message}`, {
        type: 'error',
      });
    });
};
export const editPost = (slug, post, token) => {
  if (!token) return;
  axios
    .put(`${BACKEND_URL}/posts/${slug}`, post, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      toast('Done!', { type: 'success' });
    })
    .catch((err) => {
      console.error(err.response);
      toast(`Could not update post.\n${err.response.data.message}`, {
        type: 'error',
      });
    });
};
