import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// 👆 Dependencies

// 👇 Project Components
import { Home } from './features/home/Home';
import { ApplyLogout } from './shared/auth/ApplyLogout';
import { Page } from './shared/page/Page';
import { Footer } from './shared/footer/Footer';
import { Navbar } from './shared/navbar/Navbar';
import { UserFetcher } from './shared/auth/UserFetcher';
import { Bit } from './features/knowledge/bit/Bit';
import { Login } from './features/login/Login';
import { AuthRoute } from './shared/auth/AuthRoute';
import { Profile } from './features/profile/Profile';
import { PostListing } from './features/blog/list/PostListing';
import { PostCreate } from './features/blog/create/PostCreate';
import { PostRead } from './features/blog/read/PostRead';
import { PostEdit } from './features/blog/edit/PostEdit';
import { ToastContainer } from 'react-toastify';
// import { About } from './features/about/About';

export const App = () => {
  return (
    <>
      {/* This will call the api to try and login the user */}
      <UserFetcher />
      {/* The navbar stays out of the switch because it appears in all pages */}
      <Navbar />
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
      <Footer />
    </>
  );
};
