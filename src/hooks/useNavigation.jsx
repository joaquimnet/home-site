import { useHistory } from 'react-router-dom';

export const useNavigation = () => {
  const history = useHistory();

  return {
    navigate: (where) => history.push(where),
    makeNavigation: (where) => () => history.push(where),
  };
};
