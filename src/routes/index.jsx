import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { Home } from '../pages/home';
import { Payments } from '../pages/settings/payments';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/settings/payments',
        Component: Payments
      }
    ]
  }
]);