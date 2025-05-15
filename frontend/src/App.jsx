import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RiskResults from './components/RiskResults/RiskResults';
import RiskPredictor from './components/RiskPredictor/RiskPredictor';
import CancerResults from './components/CancerResults/CancerResults';
import CancerDetection from './components/CancerDetection/CancerDetection';

export default function App() {
  return (
    <Router basename="/colon-cancer-detection">
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