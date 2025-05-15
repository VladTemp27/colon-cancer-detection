import { useLocation, useNavigate } from 'react-router-dom';
import ImageIcon from '../../assets/Upload.png';
import BackIcon from '../../assets/Back.png';
import './CancerDetection.css';

export default function RiskResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageData = location.state?.imageData;
 
  const handleImage = (field, file) => {
    const reader = new FileReader();
    reader.onload = () => {
        setFormData({
            ...formData,
            [field]: reader.result
        });
    };
    if (file) {
        reader.readAsDataURL(file);
    }
  };
  
  const handleDetection = () => {
    navigate('/cancer-results');
  };

  const handleBack = () => {
    navigate('/risk-results');
  };

  return (
    <div className="image-container">
        {/* Title Section */}
        <div className="image-box">
            <div className="image-header">
            <h1 className="image-title">COLORECTAL CANCER DETECTION</h1>
        </div>

        {/* Upload File Section */}
        <div className="file-upload">
        <label htmlFor="file-input" className="upload-label">
            <img src={ImageIcon} className="upload-icon" alt="Upload Icon" />
            <h2>Upload File</h2>
        </label>
        <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleImage('image', e.target.files[0])}
        />
        </div>

        {/* Detect */}
        <button className="scan-button" onClick={handleDetection}>
          SCAN NOW
        </button>
        </div>
        
        {/* Back Button */}
        <button className="back-button-crc" onClick={handleBack}>
          <img src={BackIcon}className="back-button" />
        </button>
    </div>
  );
}