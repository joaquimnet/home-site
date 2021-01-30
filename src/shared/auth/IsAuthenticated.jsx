import { useSelector } from 'react-redux';

export const IsAuthenticated = ({ children, hide = false }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || (user && hide)) {
    return null;
  }

  return children;
};
