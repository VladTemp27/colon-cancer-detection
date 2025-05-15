import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ImageIcon from '../../assets/Upload.png';
import BackIcon from '../../assets/Back.png';
import './CancerDetection.css';

export default function CancerDetection() {
  const location = useLocation();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);

  const handleImage = (field, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setFileName(file.name);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // TODO: Change this code to where it will detect the cancer results
  const handleDetection = async () => {
    if (!imagePreview) {
      alert('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imagePreview }),
      });

      if (!response.ok) {
        throw new Error('Failed to detect tumor.');
      }

      const result = await response.json();
      setDetectionResult(result);

      navigate('/cancer-results', {
        state: {
          imageData: imagePreview,
          detectionResult: result,
        },
      });
    } catch (error) {
      console.error('Error detecting tumor:', error);
      alert('An error occurred while detecting the tumor.');
    } finally {
      setIsLoading(false);
    }
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

        <div className="file-upload">
          {/* File Name Display */}
          {fileName && (
            <div className="file-name">
              <p>Uploaded File: {fileName}</p>
            </div>
          )}
          {/* Image Preview */}
          <label htmlFor="file-input" className="upload-label">
            <div className="upload-preview-container">
              {imagePreview ? (
                <img src={imagePreview} className="preview-icon" alt="Preview" />
              ) : (
                <img src={ImageIcon} className="upload-icon" alt="Upload Icon" />
              )}
            </div>
            <div
              className={`upload-text-container ${
                imagePreview ? 'with-preview' : ''
              }`}
            >
              {imagePreview && (
                <img src={ImageIcon} className="upload-icon-small" alt="Upload Icon" />
              )}
              <h2>{imagePreview ? 'Change File' : 'Upload File'}</h2>
            </div>
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
        <button className="scan-button" onClick={handleDetection} disabled={isLoading}>
          {isLoading ? 'Scanning...' : 'SCAN NOW'}
        </button>
      </div>

      {/* Back Button */}
      <button className="back-button-crc" onClick={handleBack}>
        <img src={BackIcon} className="back-button" alt="Back" />
      </button>
    </div>
  );
}