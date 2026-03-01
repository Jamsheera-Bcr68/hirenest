import { Route, Routes } from 'react-router-dom';
import CandidateProfile from '../../presentation/pages/user/candidate/CandidateProfile';

export const CandidateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CandidateProfile />} />
    </Routes>
  );
};
