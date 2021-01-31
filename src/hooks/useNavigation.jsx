import { useHistory } from 'react-router-dom';

export const useNavigation = () => {
  const history = useHistory();

  return {
    navigate: (where) => setImmediate(() => history.push(where)),
    makeNavigation: (where) => () => setImmediate(() => history.push(where)),
  };
};
