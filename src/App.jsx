import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/index.jsx';

const router = createBrowserRouter(AppRoutes);

export function App() {
  return <RouterProvider router={router} />; // 3
}

export default App;
