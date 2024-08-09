import { lazy } from 'react';


const SignUp = lazy(() => import('./pages/auth/SignUp'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Messages = lazy(() => import('./pages/messages/Messages'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const Patients = lazy(() => import('./pages/patients/Patients'));
const PatientDetail = lazy(() => import('./pages/patients/PatientDetailPage'));
const StaffList = lazy(() => import('./pages/staff/Staff'));
const Treatments = lazy(() => import('./pages/treatments/Treatments'));
const Revenue = lazy(() => import('./pages/revenue/Revenue'));


const routes = [
  { path: '/', component: Dashboard },
  { path: '/signin', component: SignIn},
  { path: '/signup', component: SignUp},
  { path: '/messages', component: Messages},
  { path: '/profile', component: Profile},
  { path: '/patients', component: Patients},
  { path: '/patients/patient/detail', component: PatientDetail},
  { path: '/treatments', component: Treatments},
  { path: '/revenue', component: Revenue},
  { path: '/staff', component: StaffList}
];

export default routes;
