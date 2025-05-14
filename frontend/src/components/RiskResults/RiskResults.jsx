import { useLocation } from 'react-router-dom';
import ImageIcon from '../../assets/Image.png';
import './RiskResults.css';

export default function RiskResults() {
  const location = useLocation();
  const formData = location.state?.formData;

  // Function to determine risk status based on formData
  const calculateRiskStatus = () => {
    // TODO: Implement the logic to calculate risk status based on formData
  };

  const riskStatus = calculateRiskStatus();

  return (
    <div className="result-container">
        <div className="result-box">

            <h1 className="result-title">Results:</h1>

            <div className="risk-status">
                <h2>{riskStatus} of Colorectal Cancer</h2>
            </div>

            <div className="risk-details">
                <h2>Dietary and Lifestyle patterns of Patient:</h2>
                {/* <ul>
                    <li>Age: {formData.age}</li>
                    <li>Gender: {formData.gender}</li>
                    <li>BMI: {formData.BMI}</li>
                    <li>Lifestyle: {formData.lifestyle}</li>
                    <li>Ethnicity: {formData.ethnicity}</li>
                    <li>CRC Family History: {formData.familyHistory}</li>
                    <li>Pre-existing Condition: {formData.preExistingCondition}</li>
                    <li>Carbohydrates: {formData.carbohydrates}</li>
                    <li>Protein: {formData.protein}</li>
                    <li>Fats: {formData.fats}</li>
                    <li>Iron: {formData.iron}</li>
                    <li>Vitamin A: {formData.vitaminA}</li>
                    <li>Vitamin C: {formData.vitaminC}</li>
                </ul> */}
            </div>
        </div>
        
        {/* Submit */}
        <button className="detect-button" onClick={() => alert('Redirect to WSI detection')}>
        <img src={ImageIcon} alt="Icon" className="button-icon" />
        Detect Malignant or Benign on WSI (Whole Slide Images)
        </button>
    </div>
  );
}