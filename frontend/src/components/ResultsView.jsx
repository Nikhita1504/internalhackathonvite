import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ResultsView = ({ results, villageName }) => {
  const navigate = useNavigate();
  const [scheduledSchemes, setScheduledSchemes] = useState({}); // Track scheduled schemes

  const handleScheduleClick = (scheme) => {
    if (!scheduledSchemes[scheme.name]) {
      navigate('/calendar', {
        state: { scheme: scheme.name, villageName: villageName }
      });
      setScheduledSchemes((prev) => ({ ...prev, [scheme.name]: true })); // Mark as scheduled
    }
  };

  const schemes = [
    { name: 'Senior Citizens Savings Scheme Account', value: results.SCSS },
    { name: 'Sukanya Samriddhi Account', value: results.SSA },
    { name: 'Kisan Vikas Patra', value: results.KVP },

  ];

  const sortedSchemes = schemes.sort((a, b) => b.value - a.value);

  return (
    <div className="results-container">
      <h3>Scheme Results for {villageName}</h3>
      <div className="schemes-list">
        {sortedSchemes.map((scheme, index) => (
          <div key={index} className="scheme-item">
            <span className="scheme-name">{scheme.name}</span>
            <div className="circular-progress">
              <CircularProgressbar
                value={scheme.value * 100}
                text={`${(scheme.value ).toFixed(2)}%`}
                styles={buildStyles({
                  pathColor: `url(#gradient-${scheme.name.replace(/\s+/g, '-')})`, // Use scheme.name to generate unique gradient ID
                  textColor: '#fff',
                  trailColor: '#d6d6d6',
                  textSize: '20px',
                })}
              />
              <svg style={{ height: 0 }}>
                <defs>
                  <linearGradient id={`gradient-${scheme.name.replace(/\s+/g, '-')}`} gradientTransform="rotate(90)">
                    <stop offset="0%" stopColor="#00d4ff" /> {/* Bright cyan */}
                    <stop offset="100%" stopColor="#00ff88" /> {/* Bright greenish cyan */}
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <button className='schedule' onClick={() => handleScheduleClick(scheme)}>
              {scheduledSchemes[scheme.name] ? 'Scheduled' : 'Schedule'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsView;
