import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { App } from './App';

import 'normalize.css';
import './index.css';
import { State } from './state/State';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <State>
        <HashRouter>
          <App />
        </HashRouter>
      </State>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
