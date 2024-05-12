// import { RouteObject } from "react-router-dom";
import Top from '../Top.jsx';
import SearchPage from '../Search.jsx';
import Layout from '../components/layout.jsx';

// export const AppRoutes: RouteObject[] = [
export const AppRoutes = [
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
