import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { Home } from '../pages/home';
import { Payments } from '../pages/settings/payments';
import { StudentBanks } from '../pages/student-bank';
import { BankDetail } from '../pages/student-bank/show';
import { Policies } from '../pages/settings/policies';
import { PolicyActionForm } from '../pages/settings/policies/action';

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
        path: '/settings',
        children: [
          {
            path: 'payments',
            Component: Payments
          },
          {
            path: 'policies',
            children: [
              {
                index: true,
                Component: Policies
              },
              {
                path: ':type/create',
                Component: PolicyActionForm,
              },
              {
                path: ':type/update',
                Component: PolicyActionForm,
              },
              {
                path: ':type/:id/edit',
                Component: PolicyActionForm,
              }
            ]
          }
        ],
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