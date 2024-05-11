import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';

export function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
