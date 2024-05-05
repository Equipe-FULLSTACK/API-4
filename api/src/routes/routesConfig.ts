import { RouteProps } from 'react-router-dom';
import HomePageAdmin from '../pages/home/HomePageAdmin';
import HomePageUser from '../pages/home/HomePageAdmin';
import PageTest from '../components/componentTest';
import HomePageAdminUser from '../pages/users/HomeEditUser';
import HomePageAdminRooms from '../pages/rooms/HomeEditRooms';

export interface AppRoute extends RouteProps {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

const routes: AppRoute[] = [
  {
    path: '/admin',
    component: HomePageAdmin,
    exact: true,
  },

  {
    path: '/admin/user',
    component: HomePageAdminUser,
    exact: true,
  },

  {
    path: '/user',
    component: HomePageUser,
    exact: true,
  },

  {
    path: '/admin/rooms',
    component: HomePageAdminRooms,
    exact: true,
  },

  {
    path: '/t',
    component: PageTest,
    exact: true,
  },

  
];

export default routes;
