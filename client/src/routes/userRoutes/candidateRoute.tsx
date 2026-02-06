import { Route, Routes } from 'react-router-dom';
import CandidateProfile from '../../presentation/pages/user/candidate/CandidateProfile';
import ProtectedRoutes from '../PrivateRoutes';

export const CandidateRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        {' '}
        <Route path="profile" element={<CandidateProfile />} />
      </Route>
    </Routes>
  );
};
