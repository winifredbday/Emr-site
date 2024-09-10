import { lazy } from 'react';


const SignUp = lazy(() => import('./pages/auth/SignUp'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));

const Profile = lazy(() => import('./pages/profile/Profile'));
const Patients = lazy(() => import('./pages/patients/Patients'));
const PatientDetail = lazy(() => import('./pages/patients/PatientDetailPage'));
const StaffList = lazy(() => import('./pages/staff/Staff'));
const Appointments = lazy(() => import('./pages/appointments/Appointments'));
const Treatments = lazy(() => import('./pages/treatments/Treatments'));
const Prescriptions = lazy(() => import('./pages/prescriptions/Prescriptions'));
const Revenue = lazy(() => import('./pages/revenue/Revenue'));


const routes = [
  { path: '/', component: Dashboard },
  { path: '/signin', component: SignIn},
  { path: '/signup', component: SignUp},
  
  { path: '/profile', component: Profile},
  { path: '/patients', component: Patients},
  { path: '/patients/:id', component: PatientDetail},
  { path: '/treatments', component: Treatments},
  { path: '/revenue', component: Revenue},
  { path: '/staff', component: StaffList},
  { path: '/appointments', component: Appointments},
  { path: '/prescriptions', component: Prescriptions}
];

export default routes;
