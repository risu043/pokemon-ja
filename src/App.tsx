import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/index.tsx';

const router = createBrowserRouter(AppRoutes);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
