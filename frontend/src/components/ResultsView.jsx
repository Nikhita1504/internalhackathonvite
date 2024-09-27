import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ResultsView.css'; // Ensure you link your CSS file here

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

  // List of all schemes from the image
  const schemes = [
    { name: 'Senior Citizens Savings Scheme (SCSS)', value: 0.933, demographic: 'Senior Citizens', action: 'Organize SCSS-specific melas', time: 'April - June' },
    { name: 'Sukanya Samriddhi Accounts (SSA)', value: 0.82, demographic: 'Female Children below 10 years', action: 'Host workshops', time: 'June - July' },
    { name: 'Public Provident Fund (PPF)', value: 0.80, demographic: 'Working Professionals', action: 'Increase awareness campaigns', time: 'January - March' },
    { name: 'Kisan Vikas Patra (KVP)', value: 0.73, demographic: 'Farmers', action: 'Set up booths at agricultural fairs', time: 'November - December' },
    { name: 'Mahila Samman Savings Certificate (MSSC)', value: 0.69, demographic: 'Women', action: 'Arrange financial literacy programs', time: 'October - November' },
    { name: 'PM CARES for Children Scheme, 2021', value: 0.553, demographic: 'Children from affected families', action: 'Coordinate with local NGOs', time: 'Any time' },
    { name: 'Postal Life Insurance', value: 0.453, demographic: 'Postal employees and employees of telegraph department', action: ' Organize specialized life insurance enrollment drives', time: 'Any time' },
    { name: 'Rural Postal Life Insurance', value: 0.678, demographic: 'Rural residents, including farmers and general population', action: 'Coordinate with local NGOs and community centers to promote RPLI benefits', time: 'Any time' },
  ];

  const sortedSchemes = schemes.sort((a, b) => b.value - a.value);

  return (
    <div className="results-container">
      <h3>Scheme Recommendations for {villageName}</h3>
      <table className="schemes-table">
        <thead>
          <tr>
            <th>SCHEME NAME</th>
            <th>TARGET DEMOGRAPHIC</th>
            <th>RECOMMENDATION SCORE</th>
            <th>SUGGESTED ACTION</th>
            <th>BEST TIME TO LAUNCH</th>
            <th>SCHEDULE</th>
          </tr>
        </thead>
        <tbody>
          {sortedSchemes.map((scheme, index) => (
            <tr key={index}>
              <td className="scheme-name">{scheme.name}</td>
              <td>{scheme.demographic}</td>
              <td>
                <div className="circular-progress">
                  <CircularProgressbar
                    value={scheme.value * 100}
                    text={`${(scheme.value * 100).toFixed(1)}%`}
                    styles={buildStyles({
                      pathColor: `url(#common-gradient)`,  // Use a single gradient for all progress bars
                      textColor: '#fff',
                      trailColor: '#d6d6d6',
                      textSize: '20px',
                    })}
                  />
                  <svg style={{ height: 0 }}>
                    <defs>
                      <linearGradient id="common-gradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="#FFBB28" /> {/* Bright cyan */}
                        <stop offset="100%" stopColor="#FFBB28" /> {/* Bright greenish cyan */}
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </td>
              <td>{scheme.action}</td>
              <td>{scheme.time}</td>
              <td>
                <button className='schedule' onClick={() => handleScheduleClick(scheme)}>
                  {scheduledSchemes[scheme.name] ? 'Scheduled' : 'Add Event'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsView;
