import './App.css';

import HomeFeedPage from './pages/HomeFeedPage';
import NotificationFeedPage from './pages/NotificationFeedPage';
import UserFeedPage from './pages/UserFeedPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import RecoverPage from './pages/RecoverPage';
import MessageGroupsPage from './pages/MessageGroupsPage';
import MessageGroupPage from './pages/MessageGroupPage';
import ConfirmationPage from './pages/ConfirmationPage';
import React from 'react';
import process from 'process';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import { Amplify } from 'aws-amplify';
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.REACT_APP_CLIENT_ID,
      userPoolId: process.env.REACT_APP_AWS_USER_POOLS_ID,
    }
  }
});
// class MyCustomStorage {
//   storageObject = {};
//   async setItem(key, value) {
//     this.storageObject[key] = value;
//   }
//   async getItem(key) {
//     return this.storageObject[key];
//   }
//   async removeItem(key) {
//     delete this.storageObject[key];
//   }
//   async clear() {
//     this.storageObject = {};
//   }
// }
// cognitoUserPoolsTokenProvider.setKeyValueStorage(new MyCustomStorage());

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeFeedPage />
  },
  {
    path: "/notifications",
    element: <NotificationFeedPage />
  },
  {
    path: "/@:handle",
    element: <UserFeedPage />
  },
  {
    path: "/messages",
    element: <MessageGroupsPage />
  },
  {
    path: "/messages/@:handle",
    element: <MessageGroupPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/signin",
    element: <SigninPage />
  },
  {
    path: "/confirm",
    element: <ConfirmationPage />
  },
  {
    path: "/forgot",
    element: <RecoverPage />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;