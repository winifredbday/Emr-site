import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Dashboard from './pages/Dashboard';
import Messages from './pages/messages/Messages'


const routes = [
  { path: '/', component: Dashboard },
  { path: '/signin', component: SignIn},
  { path: '/signup', component: SignUp},
  { path: '/messages', component: Messages}
];

export default routes;
