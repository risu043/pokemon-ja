// import { RouteObject } from "react-router-dom";
import Top from '../Top.jsx';
import SerchPage from '../Serch.jsx';
import Layout from '../components/layout.jsx';

// export const AppRoutes: RouteObject[] = [
export const AppRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Top /> },
      { path: '/serch', element: <SerchPage /> },
    ],
  },
];

export default AppRoutes;
