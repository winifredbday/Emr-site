import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Dashboard from './pages/Dashboard';


const routes = [
  { path: '/', component: Dashboard },
  { path: '/signin', component: SignIn},
  { path: '/signup', component: SignUp}
];

export default routes;
