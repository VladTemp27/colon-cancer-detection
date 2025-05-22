import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    setErrors({
      ...errors,
      [field]: ''
    });
    setTouchedFields({
      ...touchedFields,
      [field]: true
    });
  };

  const validateForm = () => {
    const newErrors = {};

    const isFormEmpty = Object.values(formData).every((value) => value === '' || value === null);
    if (isFormEmpty) {
      return { form: 'The form is empty. Please fill out all required fields.' };
    }

    // Personal Information Validation
    if ((!formData.age || isNaN(formData.age) || formData.age <= 0) && touchedFields.age) {
      newErrors.age = 'Please enter a valid age.';
    }
    if (!formData.gender && touchedFields.gender) {
      newErrors.gender = 'Please select a gender.';
    }
    if ((!formData.bmi || isNaN(formData.bmi) || formData.bmi <= 0) && touchedFields.bmi) {
      newErrors.bmi = 'Please enter a valid BMI.';
    }

    // Lifestyle Validation
    if (!formData.lifestyle && touchedFields.lifestyle) {
      newErrors.lifestyle = 'Please select a lifestyle.';
    }
    if (!formData.ethnicity && touchedFields.ethnicity) {
      newErrors.ethnicity = 'Please select an ethnicity.';
    }

    // Medical History Validation
    if (formData.familyHistory === null && touchedFields.familyHistory) {
      newErrors.familyHistory = 'Please select if you have a family history.';
    }
    if (!formData.preExistingCondition && touchedFields.preExistingCondition) {
      newErrors.preExistingCondition = 'Please select a pre-existing condition.';
    }

    // Nutrition Intake Validation
    if ((!formData.carbohydrates || isNaN(formData.carbohydrates) || formData.carbohydrates < 0) && touchedFields.carbohydrates) {
      newErrors.carbohydrates = 'Please enter a valid amount of carbohydrates.';
    }
    if ((!formData.protein || isNaN(formData.protein) || formData.protein < 0) && touchedFields.protein) {
      newErrors.protein = 'Please enter a valid amount of protein.';
    }
    if ((!formData.fats || isNaN(formData.fats) || formData.fats < 0) && touchedFields.fats) {
      newErrors.fats = 'Please enter a valid amount of fats.';
    }
    if ((!formData.iron || isNaN(formData.iron) || formData.iron < 0) && touchedFields.iron) {
      newErrors.iron = 'Please enter a valid amount of iron.';
    }
    if ((!formData.vitaminA || isNaN(formData.vitaminA) || formData.vitaminA < 0) && touchedFields.vitaminA) {
      newErrors.vitaminA = 'Please enter a valid amount of Vitamin A.';
    }
    if ((!formData.vitaminC || isNaN(formData.vitaminC) || formData.vitaminC < 0) && touchedFields.vitaminC) {
      newErrors.vitaminC = 'Please enter a valid amount of Vitamin C.';
    }

    setErrors(newErrors);

    return newErrors;
  };

  function mapFormDataToModelInput(formData) {
  // Gender: only 'male' is 1, else 0
  const gender_1 = formData.gender === 'male' ? 1 : 0;

  // Lifestyle: one-hot for 'active', 'moderate', 'sedentary', 'smoker'
  const lifestyle_1 = formData.lifestyle === 'active' ? 1 : 0;
  const lifestyle_2 = formData.lifestyle === 'moderate' ? 1 : 0;
  // (If you have more categories, add more variables)

  // Ethnicity: one-hot for 'asian', 'african_american', 'caucasian', 'hispanic'
  const ethnicity_1 = formData.ethnicity === 'asian' ? 1 : 0;
  const ethnicity_2 = formData.ethnicity === 'african_american' ? 1 : 0;
  // (If you have more categories, add more variables)

  // Family history: boolean to 1/0
  const familyHistory_1 = formData.familyHistory === true ? 1 : 0;

  // Pre-existing conditions: one-hot for 'diabetes', 'hypertension', 'obesity', 'none'
  const preExistingCondition_1 = formData.preExistingCondition === 'diabetes' ? 1 : 0;
  const preExistingCondition_2 = formData.preExistingCondition === 'hypertension' ? 1 : 0;
  const preExistingCondition_3 = formData.preExistingCondition === 'obesity' ? 1 : 0;
  const preExistingCondition_4 = formData.preExistingCondition === 'none' ? 1 : 0;
  const preExistingCondition_5 = 0;
  return {
    input: [
      Number(formData.age),
      Number(formData.bmi),
      Number(formData.carbohydrates),
      Number(formData.protein),
      Number(formData.fats),
      Number(formData.iron),
      Number(formData.vitaminA),
      Number(formData.vitaminC),
      gender_1,
      lifestyle_1,
      lifestyle_2,
      ethnicity_1,
      ethnicity_2,
      familyHistory_1,
      preExistingCondition_1,
      preExistingCondition_2,
      preExistingCondition_3,
      preExistingCondition_4,
      preExistingCondition_5
    ]
  };
}

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mapFormDataToModelInput(formData)),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form data.');
        }

        const result = await response.json();
        console.log('API Response:', result);

        navigate('/risk-results', { state: { result: result.prediction, formData } });      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('An error occurred while submitting the form.');
      }
    } else {
      // Generalized error message
      toast.error('Please fix the errors in the form.');

      // Show each specific error
      Object.values(validationErrors).forEach((error) => {
        toast.error(error);
      });
    }
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
              className={`input-field input-age ${errors.age ? 'input-error' : ''}`}
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
            />
            <div className="row-group">
              <select
                className={`input-field input-gender ${errors.gender ? 'input-error' : ''}`}
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
                className={`input-field input-bmi ${errors.bmi ? 'input-error' : ''}`}
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
              className={`input-field input-lifestyle ${errors.lifestyle ? 'input-error' : ''}`}
              value={formData.lifestyle}
              onChange={(e) => handleInputChange('lifestyle', e.target.value)}
            >
              <option value="" disabled>Lifestyle</option>
              <option value="active">Active</option>
              <option value="moderate">Moderate Exercise</option>
              <option value="sedentary">Sedentary</option>
              <option value="smoker">Smoker</option>
            </select>
            <select
              className={`input-field input-ethnicity ${errors.ethnicity ? 'input-error' : ''}`}
              value={formData.ethnicity}
              onChange={(e) => handleInputChange('ethnicity', e.target.value)}
            >
              <option value="" disabled>Ethnicity</option>
              <option value="african_american">African American</option>
              <option value="asian">Asian</option>
              <option value="caucasian">Caucasian</option>
              <option value="hispanic">Hispanic</option>
            </select>
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
                className={`input-field input-pre-existing ${errors.preExistingCondition ? 'input-error' : ''}`}
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
              className={`input-field ${errors.carbohydrates ? 'input-error' : ''}`}
              value={formData.carbohydrates}
              onChange={(e) => handleInputChange('carbohydrates', e.target.value)}
            />
            <input
              type="text"
              placeholder="Protein (g)"
              className={`input-field ${errors.protein ? 'input-error' : ''}`}
              value={formData.protein}
              onChange={(e) => handleInputChange('protein', e.target.value)}
            />
            <input
              type="text"
              placeholder="Fats (g)"
              className={`input-field ${errors.fats ? 'input-error' : ''}`}
              value={formData.fats}
              onChange={(e) => handleInputChange('fats', e.target.value)}
            />
            <input
              type="text"
              placeholder="Iron (mg)"
              className={`input-field ${errors.iron ? 'input-error' : ''}`}
              value={formData.iron}
              onChange={(e) => handleInputChange('iron', e.target.value)}
            />
            <input
              type="text"
              placeholder="Vitamin A (IU)"
              className={`input-field ${errors.vitaminA ? 'input-error' : ''}`}
              value={formData.vitaminA}
              onChange={(e) => handleInputChange('vitaminA', e.target.value)}
            />
            <input
              type="text"
              placeholder="Vitamin C (mg)"
              className={`input-field ${errors.vitaminC ? 'input-error' : ''}`}
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