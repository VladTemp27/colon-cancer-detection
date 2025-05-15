export async function getPrediction(inputData) {
  try {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData),
    });
    if (!response.ok) throw new Error('Failed to fetch prediction');
    const data = await response.json();
    return data.prediction;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
}