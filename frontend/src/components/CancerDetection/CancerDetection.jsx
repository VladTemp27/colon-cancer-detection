import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageIcon from '../../assets/Upload.png';
import BackIcon from '../../assets/Back.png';
import Loading from '../Loading/Loading';
import './CancerDetection.css';

export default function CancerDetection() {
  const location = useLocation();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const handleImage = (field, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload a valid image file.');
      setImagePreview(null);
      setFileName('');
    }
  };

  // TODO: This is just a simulation of the detection process, please change it to the actual API call.
  const handleDetection = async () => {
    if (!imagePreview) {
      toast.error('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setShowLoadingScreen(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const scannedImage = 'https://via.placeholder.com/300x300.png?text=Scanned+Image';
      setImagePreview(scannedImage);

      const detectionResult = {
        tumorDetected: true,
        confidence: 95,
      };

      navigate('/cancer-results', {
        state: {
          imageData: scannedImage,
          detectionResult: detectionResult,
        },
      });
    } catch (error) {
      console.error('Error detecting tumor:', error);
      toast.error('An error occurred while detecting the tumor.');
    } finally {
      setIsLoading(false);
      setShowLoadingScreen(false);
    }
  };

  const handleBack = () => {
    navigate('/risk-results');
  };

  if (showLoadingScreen) {
    return <Loading />;
  }

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