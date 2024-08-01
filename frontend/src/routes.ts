import { lazy } from 'react';


const SignUp = lazy(() => import('./pages/auth/SignUp'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Messages = lazy(() => import('./pages/messages/Messages'));


const routes = [
  { path: '/', component: Dashboard },
  { path: '/signin', component: SignIn},
  { path: '/signup', component: SignUp},
  { path: '/messages', component: Messages}
];

export default routes;
