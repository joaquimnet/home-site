import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers/root.reducer';

export const store = createStore(rootReducer, composeWithDevTools());

export const State = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
