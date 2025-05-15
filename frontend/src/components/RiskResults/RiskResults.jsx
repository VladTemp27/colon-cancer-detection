import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ImageIcon from '../../assets/Image.png';
import BackIcon from '../../assets/Back.png';
import './RiskResults.css';

export default function RiskResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  const [riskStatus, setRiskStatus] = useState('');

  // TODO: Change this code to where it will detect the cancer results
  useEffect(() => {
    const fetchRiskStatus = async () => {
      if (!formData) {
        setRiskStatus('Unknown Risk');
        return;
      }

      try {
        const response = await fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to calculate risk.');
        }

        const result = await response.json();
        setRiskStatus(result.riskStatus);
      } catch (error) {
        console.error('Error calculating risk:', error);
        setRiskStatus('Error calculating risk');
      }
    };

    fetchRiskStatus();
  }, [formData]);

  const handleDetection = () => {
    navigate('/cancer-detection');
  };

  const handleBack = () => {
    navigate('/risk-predictor');
  };

  return (
    <div className="result-container">
      <div className="result-box">

        <h1 className="result-title">Results:</h1>

        <div className="risk-status">
          <h2>{riskStatus ? `Patient is ${riskStatus}` : 'No Risk Data Available'}</h2>
        </div>

        <div className="risk-details">
          <h2>Dietary and Lifestyle Patterns of Patient:</h2>
          <ul>
            <li>Age: {formData?.age}</li>
            <li>Gender: {formData?.gender}</li>
            <li>BMI: {formData?.BMI}</li>
            <li>Lifestyle: {formData?.lifestyle}</li>
            <li>Ethnicity: {formData?.ethnicity}</li>
            <li>CRC Family History: {formData?.familyHistory ? 'Yes' : 'No'}</li>
            <li>Pre-existing Condition: {formData?.preExistingCondition}</li>
            <li>Carbohydrates: {formData?.carbohydrates}</li>
            <li>Protein: {formData?.protein}</li>
            <li>Fats: {formData?.fats}</li>
            <li>Iron: {formData?.iron}</li>
            <li>Vitamin A: {formData?.vitaminA}</li>
            <li>Vitamin C: {formData?.vitaminC}</li>
          </ul>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={handleBack}>
        <img src={BackIcon} className="back-button" alt="Back" />
      </button>

      {/* Submit */}
      <button className="detect-button" onClick={handleDetection}>
        <img src={ImageIcon} alt="Icon" className="button-icon" />
        Detect Malignant or Benign on WSI (Whole Slide Images)
      </button>
    </div>
  );
}