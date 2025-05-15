import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RiskResults from './components/RiskResults/RiskResults';
import RiskPredictor from './components/RiskPredictor/RiskPredictor';
import CancerResults from './components/CancerResults/CancerResults';
import CancerDetection from './components/CancerDetection/CancerDetection';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router basename="/colon-cancer-detection">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/risk-predictor" />} />
        <Route path="/risk-results" element={<RiskResults />} />
        <Route path="/risk-predictor" element={<RiskPredictor />} />
        <Route path="/cancer-results" element={<CancerResults />} />
        <Route path="/cancer-detection" element={<CancerDetection />} />
      </Routes>
    </Router>
  );
}