import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../view/_layouts/DashboardLayout';
import { Dashboard } from '../view/pages/dashboard';

import { Secretary } from '@pages/secretary/Home';

import { ForgotPassword } from '../view/pages/auth/forgot-password';

import { Login } from '../view/pages/auth/login';
import { Register } from '../view/pages/auth/register';
import { Members } from '../view/pages/secretary/Members';
import { EditMember } from '../view/pages/secretary/Members/pages/editMember';
import { NewMember } from '../view/pages/secretary/Members/pages/newMember';
import { AuthGuard } from './authGuard';
import { RoleGuard } from './roleGuard';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<AuthGuard isPrivate={true} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route element={<RoleGuard isPrivate={true} />}>
              <Route path="/secretary" element={<Secretary />} />
              <Route path="/members" element={<Members />} />
              <Route path="/new-member" element={<NewMember />} />
              <Route path="/edit-member/:id" element={<EditMember />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
