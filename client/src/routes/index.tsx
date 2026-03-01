import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from './authRoutes';
import ProtectedRoutes from './PrivateRoutes';
import { CandidateRoutes } from './userRoutes/candidateRoute';
import CompanyRegistration from '../presentation/pages/user/company/CompanyRegisterPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/profile/*" element={<CandidateRoutes />} />
        <Route path="/company-register" element={<CompanyRegistration />} />
      </Route>
    </Routes>
  );
};
