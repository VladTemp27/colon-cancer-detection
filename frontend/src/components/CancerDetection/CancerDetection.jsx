import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageIcon from '../../assets/Upload.png';
import BackIcon from '../../assets/Back.png';
import Loading from '../Loading/Loading';
import './CancerDetection.css';

export default function CancerDetection() {
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

  const handleDetection = async () => {
    if (!imagePreview) {
      toast.error('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setShowLoadingScreen(true);

    try {
      // Get the file from the file input
      const fileInput = document.getElementById('file-input');
      const file = fileInput && fileInput.files && fileInput.files[0];
      if (!file) {
        toast.error('No file selected.');
        setIsLoading(false);
        setShowLoadingScreen(false);
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);

      // Call backend API
      const response = await fetch('http://localhost:8000/classify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to classify image');
      }
      const result = await response.json();

      // Map backend response to CancerResults expected format
      const detectionResult = {
        tumorDetected: result.class === 1,
        confidence: Math.round(result.confidence * 100), // confidence as percentage
        raw: result,
      };

      navigate('/cancer-results', {
        state: {
          imageData: imagePreview,
          detectionResult: detectionResult,
          fileName: file.name,
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