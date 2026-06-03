import { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500); // Wait for fade out
          return 100;
        }
        return prev + Math.floor(Math.random() * 10 + 5); // Increment rapidly
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`preloader ${progress >= 100 ? 'fade-out' : ''}`}>
      <div className="scanner-line"></div>
      <div className="preloader-content">
        <h1 className="system-text display-font">INITIALIZING SYSTEM...</h1>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="percentage">{progress > 100 ? 100 : progress}%</p>
      </div>
    </div>
  );
}
