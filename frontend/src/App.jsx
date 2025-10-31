// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlunosPage from "./pages/AlunosPage";
import './index.css';

export default function App() {
  return (
    <Router>
        <main>
          <Routes>
            <Route path="/" element={<AlunosPage />} />
          </Routes>
        </main>
    </Router>
  );
}
