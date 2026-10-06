import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { Home } from '../pages/home';
import { Payments } from '../pages/settings/payments';
import { StudentBanks } from '../pages/student-bank';
import { BankDetail } from '../pages/student-bank/show';

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
      },
      {
        path: '/student-banks',
        children: [
          {
            index: true,
            Component: StudentBanks
          },
          {
            path: ':id',
            Component: BankDetail
          }
        ]
      }
    ]
  }
]);