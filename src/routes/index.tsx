import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout/AppLayout';
import HomePage from '../pages/HomePage/HomePage';
import MensClothing from 'pages/Category/MensClothing/MensClothing';
import WomenClothing from 'pages/Category/WomenClothing/WomenClothing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'men-clothing',
        element: <MensClothing />,
      },
      {
        path: 'women-clothing',
        element: <WomenClothing />,
      },
    ],
  },
]);

export default router;
