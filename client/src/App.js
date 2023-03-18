import React from 'react'
import { createBrowserRouter, Router, RouterProvider} from 'react-router-dom';
/**Import all components */


import Username from './components/Username';
import PageNotFound from './components/PageNotFound';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';

/** Root routes */
const router = createBrowserRouter([
  {
    path : '/',
    element : <Username></Username>
  },
  {
    path : '/register',
    element : <Register></Register>
  },
  {
    path : '/password',
    element : <ProtectRoute><Password/></ProtectRoute>
  },
  {
    path : '/profile',
    element : <AuthorizeUser><Profile/></AuthorizeUser>
  },
  {
    path : '/recovery',
    element : <Recovery></Recovery>
  },
  {
    path : '/reset',
    element : <Reset></Reset>
  },
  {
    path : '*',
    element : <PageNotFound></PageNotFound>
  },
])

const App = () => {
  return (
  <main>
    <RouterProvider router={router}></RouterProvider>
  </main>
  )
}
export default App;