import { useLocation, useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/Back.png';
import './CancerResults.css';

export default function CancerResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageData = location.state?.imageData;
  const detectionResult = location.state?.detectionResult;
  const fileName = location.state?.fileName;

  const handleBack = () => {
    navigate('/cancer-detection');
  };

  return (
    <div className="predictedResults-container">
      <div className="predictedResults-box">

        <h1 className="predictedResults-title">Results:</h1>

        <div className="predictedResults-status">
          {detectionResult?.tumorDetected ? (
            <h2>Tumor Detected</h2>
          ) : (
            <h2>No Tumor Detected</h2>
          )}
          {typeof detectionResult?.confidence === 'number' && (
            <div className="predictedResults-confidence">
              <strong>Confidence:</strong> {detectionResult.confidence}%
            </div>
          )}
        </div>

        <div className="predictedResults-preview">
          {imageData ? (
            <img src={imageData} className="predictedResults-image" alt="Result Preview" />
          ) : (
            <p>No image data available</p>
          )}
        </div>
        {fileName && (
          <div className="predictedResults-filename">{fileName}</div>
        )}
      </div>

      {/* Back Button */}
      <button className="back-button-results" onClick={handleBack}>
        <img src={BackIcon} className="back-button" alt="Back" />
      </button>
    </div>
  );
}