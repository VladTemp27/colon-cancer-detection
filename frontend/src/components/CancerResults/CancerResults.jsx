import { useLocation, useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/Back.png';
import './CancerResults.css';

export default function CancerResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageData = location.state?.imageData;
  const detectionResult = location.state?.detectionResult;

  const handleBack = () => {
    navigate('/cancer-detection');
  };

  return (
    <div className="predictedResults-container">
      <div className="predictedResults-box">

        <h1 className="predictedResults-title">Results:</h1>

        {/* TODO: Change this to the actual tumor detected */}
        <div className="predictedResults-status">
          {detectionResult?.tumorDetected ? (
            <h2>Tumor Detected</h2>
          ) : (
            <h2>No Tumor Detected</h2>
          )}
        </div>

        <div className="predictedResults-preview">
          {imageData ? (
            <img src={imageData} className="predictedResults-image" alt="Result Preview" />
          ) : (
            <p>No image data available</p>
          )}
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button-results" onClick={handleBack}>
        <img src={BackIcon} className="back-button" alt="Back" />
      </button>
    </div>
  );
}