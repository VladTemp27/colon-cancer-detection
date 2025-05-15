import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RiskPredictor.css';

export default function RiskPredictor() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    bmi: '',
    lifestyle: '',
    ethnicity: '',
    familyHistory: null,
    preExistingCondition: '',
    carbohydrates: '',
    protein: '',
    fats: '',
    iron: '',
    vitaminA: '',
    vitaminC: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    navigate('/risk-results');
  };

  return (
    <div className="risk-container">
      <div className="form-box">
        <div className="form-header">
        <h1 className="form-title">COLORECTAL CANCER PREDICTION</h1>
        </div>
        {/* Personal Information */}
        <div className="personal-info-section">
        <div className="form-section">
            <input
            type="text"
            placeholder="Age"
            className="input-field input-age"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            />
            <div className="row-group">
            <select
                className="input-field input-gender"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
            >
                <option value="" disabled>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input
                type="text"
                placeholder="BMI"
                className="input-field input-bmi"
                value={formData.bmi}
                onChange={(e) => handleInputChange('bmi', e.target.value)}
            />
            </div>
        </div>
        </div>

        {/* Lifestyle */}
        <div className="lifestyle-section">
          <div className="form-section">
            <select
              className="input-field input-lifestyle"
              value={formData.lifestyle}
              onChange={(e) => handleInputChange('lifestyle', e.target.value)}
            >
              <option value="" disabled>Lifestyle</option>
              <option value="active">Active</option>
              <option value="moderate">Moderate Exercise</option>
              <option value="sedentary">Sedentary</option>
              <option value="smoker">Smoker</option>
            </select>
            <input
              type="text"
              placeholder="Ethnicity"
              className="input-field"
              value={formData.ethnicity}
              onChange={(e) => handleInputChange('ethnicity', e.target.value)}
            />
          </div>
        </div>

        {/* Medical History */}
        <div className="medical-history-section">
        <div className="form-section">
            <div className="row-group">
            <div className="checkbox-group">
                <span className="label">Family History</span>
                <label>
                <input
                    type="checkbox"
                    checked={formData.familyHistory === true}
                    onChange={() => handleInputChange('familyHistory', true)}
                />
                Yes
                </label>
                <label>
                <input
                    type="checkbox"
                    checked={formData.familyHistory === false}
                    onChange={() => handleInputChange('familyHistory', false)}
                />
                No
                </label>
            </div>

            <select
                className="input-field input-pre-existing"
                value={formData.preExistingCondition}
                onChange={(e) => handleInputChange('preExistingCondition', e.target.value)}
            >
                <option value="" disabled>Pre-existing condition</option>
                <option value="diabetes">Diabetes</option>
                <option value="hypertension">Hypertension</option>
                <option value="obesity">Obesity</option>
                <option value="none">None</option>
            </select>
            </div>
        </div>
        </div>

        {/* Nutrition Intake */}
        <div className="nutrition-intake-section">
          <div className="form-section">
            <input
              type="text"
              placeholder="Carbohydrates (g)"
              className="input-field"
              value={formData.carbohydrates}
              onChange={(e) => handleInputChange('carbohydrates', e.target.value)}
            />
            <input
              type="text"
              placeholder="Protein (g)"
              className="input-field"
              value={formData.protein}
              onChange={(e) => handleInputChange('protein', e.target.value)}
            />
            <input
              type="text"
              placeholder="Fats (g)"
              className="input-field"
              value={formData.fats}
              onChange={(e) => handleInputChange('fats', e.target.value)}
            />
            <input
              type="text"
              placeholder="Iron (mg)"
              className="input-field"
              value={formData.iron}
              onChange={(e) => handleInputChange('iron', e.target.value)}
            />
            <input
              type="text"
              placeholder="Vitamin A (IU)"
              className="input-field"
              value={formData.vitaminA}
              onChange={(e) => handleInputChange('vitaminA', e.target.value)}
            />
            <input
              type="text"
              placeholder="Vitamin C (mg)"
              className="input-field"
              value={formData.vitaminC}
              onChange={(e) => handleInputChange('vitaminC', e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <button className="submit-button" onClick={handleSubmit}>
          PREDICT NOW
        </button>
      </div>
    </div>
  );
}