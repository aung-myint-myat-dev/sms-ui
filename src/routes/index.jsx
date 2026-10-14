import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { Home } from '../pages/home';
import { Payments } from '../pages/settings/payments';
import { StudentBanks } from '../pages/student-bank';
import { BankDetail } from '../pages/student-bank/show';
// import { Policies } from '../pages/settings/policies';
import { PolicyActionForm } from '../pages/settings/policies/action';
import { SchoolProfile } from '../pages/settings/school-profile';
import Exams from '../pages/exam-clean-architecture/Exams';
import Policies from '../pages/settings/policies-clean-architecture/Policies';
// import { Exams } from '../pages/settings/exams';
// import { ExamsProduction } from '../pages/settings/exams/exam.production';

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
          },
          {
            path: 'school-profile',
            children: [
              {
                index: true,
                Component: SchoolProfile
              },
            ]
          },
          {
            path: 'academic-years',
            Component: AcademicYears,
            path: 'exams',
            Component: Exams
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