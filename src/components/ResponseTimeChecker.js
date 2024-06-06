import React, { useState } from 'react';
import './ResponseTimeChecker.css';

function ResponseTimeChecker() {
  const [responseTime, setResponseTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkResponseTime = () => {
    setIsLoading(true);
    const startTime = performance.now();

    // Symulacja żądania do serwera (opóźnienie 120ms)
    setTimeout(() => {
      const endTime = performance.now();
      const time = endTime - startTime;

      setResponseTime(time);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div id="response-time">
      <button onClick={checkResponseTime}>
        Sprawdź czas odpowiedzi
        {isLoading && <span className="loader"></span>}
      </button>
      <p id="response-result" className={responseTime > 100 ? 'working' : ''}>
        {responseTime !== null ? `Czas odpowiedzi: ${responseTime.toFixed(2)} ms` : ''}
      </p>
    </div>
  );
}

export default ResponseTimeChecker;
