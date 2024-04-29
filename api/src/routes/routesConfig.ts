import { RouteProps } from 'react-router-dom';
import HomePageAdmin from '../pages/home/HomePageAdmin';
import HomePageUser from '../pages/home/homePageUser';


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
    path: '/user',
    component: HomePageUser,
    exact: true,
  },
  
];

export default routes;
