import { RouteObject } from 'react-router-dom';
import Top from '../Top.tsx';
import SearchPage from '../Search.tsx';
import Layout from '../components/layout.tsx';

export const AppRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Top /> },
      { path: '/search', element: <SearchPage /> },
    ],
  },
];

export default AppRoutes;
