import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
// 👆 Dependencies

// 👇 Project Components
import { ApplyLogout } from './shared/auth/ApplyLogout';
import { Page } from './shared/page/Page';
import { UserFetcher } from './shared/auth/UserFetcher';
import { Bit } from './features/knowledge/bit/Bit';
import { Login } from './features/login/Login';
import { AuthRoute } from './shared/auth/AuthRoute';
import { Profile } from './features/profile/Profile';
import { ToastContainer } from 'react-toastify';

const Navbar = lazy(() => import('./shared/navbar/Navbar'));
const Footer = lazy(() => import('./shared/footer/Footer'));

const Home = loadable(() => import('./features/home/Home'));
const PostListing = loadable(() => import('./features/blog/list/PostListing'));
const PostCreate = loadable(() => import('./features/blog/create/PostCreate'));
const PostRead = loadable(() => import('./features/blog/read/PostRead'));
const PostEdit = loadable(() => import('./features/blog/edit/PostEdit'));

export const App = () => {
  return (
    <>
      {/* This will call the api to try and login the user */}
      <UserFetcher />
      <Suspense fallback={<div>Joaquim Neto Dev</div>}>
        {/* The navbar stays out of the switch because it appears in all pages */}
        <Navbar />
      </Suspense>
      {/*Required to show toast messages*/}
      <ToastContainer />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        {/*Blog Pages*/}
        <Route path="/blog" exact>
          <PostListing />
        </Route>
        <Route path="/blog/create" exact>
          <PostCreate />
        </Route>
        <Route path="/blog/:slug" exact>
          <PostRead />
        </Route>
        <Route path="/blog/:slug/edit" exact>
          <PostEdit />
        </Route>

        {/*Knowledge Pages*/}
        <Route path="/knowledge" exact>
          <Redirect to="/knowledge/bit" />
        </Route>
        <AuthRoute path="/knowledge/bit" exact>
          <Bit />
        </AuthRoute>

        {/*Profile Pages*/}
        <AuthRoute path="/profile" exact>
          <Profile />
        </AuthRoute>
        <AuthRoute path="/profile/:id" exact>
          <Profile other />
        </AuthRoute>

        {/*Authentication Pages*/}
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/logout" exact>
          <ApplyLogout />
        </Route>

        {/*404 Page*/}
        <Route path="/">
          <Page alignCenter>
            <h1>Uh oh. There is nothing here...</h1>
          </Page>
        </Route>
      </Switch>
      <Suspense fallback={<div>Joaquim Neto {new Date().getFullYear()}</div>}>
        <Footer />
      </Suspense>
    </>
  );
};
