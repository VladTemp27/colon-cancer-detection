import './Loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h1>
        PROCESSING YOUR IMAGE, PLEASE WAIT<span className="dots"></span>
      </h1>
    </div>
  );
}