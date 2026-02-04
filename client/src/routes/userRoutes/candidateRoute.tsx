import { Route, Routes } from "react-router-dom";
import CandidateProfile from "../../presentation/pages/user/candidate/CandidateProfile";
import ProtectedRoutes from "../PrivateRoutes";
import ChangePasswordModal from '../../presentation/modals/ChangePasswordModal'

export const CandidateRoutes = () => {
  return (
    <Routes>
      <Route path="test" element={<ChangePasswordModal/>} />
      <Route path="profile" element={<CandidateProfile />} />
      <Route element={<ProtectedRoutes />}></Route>
    </Routes>
  );
};
