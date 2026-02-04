import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../routes/authRoutes.tsx";
import { CandidateRoutes } from "../routes/userRoutes/candidateRoute.tsx";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
      <Route path="/user/*" element={<CandidateRoutes />} />
    </Routes>
  );
}

export default App;
