import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthRouter } from "../routes/authRoutes.tsx";
import { CandidateRouter } from "../routes/userRoutes/candidateRoute.tsx";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AuthRouter />} />
      <Route path="/user/*" element={<CandidateRouter />} />
    </Routes>
  );
}

export default App;
