import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell, ResponsiveContainer } from 'recharts';
import Modal from 'react-modal';
// import './ChartView.css'; 

const ChartView = ({ villageDetails, villageName }) => {
  const [hoveredChart, setHoveredChart] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  // Data processing functions
  const getPopulationData = () => {
    if (!villageDetails) return [];
    return [
      { name: 'Male-Population', value: villageDetails['Total Population Male'] },
      { name: 'Female-Population', value: villageDetails['Total Population Female'] }
    ];
  };

  const getAgeGroupData = () => {
    if (!villageDetails) return [];
    return [
      {
        name: '0-10',
        Male: villageDetails['Population in the age group 0-10 Male'],
        Female: villageDetails['Population in the age group 0-10 Female']
      },
      {
        name: '11-18',
        Male: villageDetails['Population in the age group 11-18 Male'],
        Female: villageDetails['Population in the age group 11-18 Female']
      },
      {
        name: '19-59',
        Male: villageDetails['Population in the age group 19-59 Male'],
        Female: villageDetails['Population in the age group 19-59 Female']
      },
      {
        name: '60+',
        Male: villageDetails['Population in the age group 60+ Male'],
        Female: villageDetails['Population in the age group 60+ Female']
      }
    ];
  };

  const getOccupationData = () => {
    if (!villageDetails) return [];
    return [
      // { name: 'Main Male Agricultural Labourers', value: villageDetails['Main Agricultural Labourers Population Male'] },
      // { name: 'Main Female Agricultural Labourers', value: villageDetails['Main Agricultural Labourers Population Female'] },
      // { name: 'Marginal Male Agricultural Labourers', value: villageDetails['Marginal Agriculture Labourers Population Male'] },
      // { name: 'Marginal Female Agricultural Labourers', value: villageDetails['Marginal Agriculture Labourers Population Female'] },
      { name: 'Agricultural Labourers', value: villageDetails['Main Agricultural Labourers Population Person'] },
      { name: 'Marginal Agricultural Labourers', value: villageDetails['Marginal Agriculture Labourers Population Person'] },
      { name: 'Main Household Industries', value: villageDetails['Main Household Industries Population Person'] },
      { name: 'Marginal Household Industries', value: villageDetails['Marginal Household Industries Population Person'] },

      { name: 'Other Workers Population', value: villageDetails['Main Other Workers Population Person'] },

      { name: 'Marginal Other Workers Population ', value: villageDetails['Marginal Other Workers Population Person'] },
      { name: 'Non-working Population', value: villageDetails['Non Working Population Person'] },

    ];
  };

  const openModal = (chartType) => {
    setHoveredChart(chartType);
  };

  const closeModal = () => {
    setHoveredChart(null);
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Demographic Insights of {villageName}</h2>
      <div className="chart-container">
        {/* Population Pie Chart */}
        <div className="chart-box" id='chart1' onClick={() => openModal('population')}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={getPopulationData()}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                innerRadius={50}
                fill="#8884d8"
              >
                {getPopulationData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="square"
                formatter={(value, entry) => `${value} (${entry.payload.value})`}
              />
            </PieChart>
          </ResponsiveContainer>
          <p>Population Based Chart</p>
        </div>

        {/* Age Group Bar Chart */}
        <div className="chart-box" id='chart2' onClick={() => openModal('ageGroup')}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={getAgeGroupData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Male" fill="#8884d8" />
              <Bar dataKey="Female" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <p>Age Groups Based Chart</p>
        </div>

        {/* Occupation Based Chart */}
        <div className="chart-box" id='chart3' onClick={() => openModal('occupation')}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%',marginBottom: '20px' }}>
            <ResponsiveContainer width="70%" height={250}>
              <BarChart data={getOccupationData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  interval={0}
                  tick={{
                    fontSize: "12px",
              
                    width: 80, // Adjust width to control when text breaks
                    wordBreak: "break-word",
                    whiteSpace: "normal" // Allows text to wrap
                  }}
                  tickFormatter={(name) => {
                    // Check if the name is too long and split it into multiple lines
                    return name.length > 15 ? name.replace(/\s+/g, '\n') : name;
                  }}
                />

                <YAxis  />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p>Occupation Based Chart</p>
        </div>


        {/* Modal for Enlarged Charts */}
        <Modal
          isOpen={hoveredChart !== null}
          onRequestClose={closeModal}
          contentLabel="Chart Modal"
          className="chart-modal"
        >
          {hoveredChart === 'population' && (
            <div className="modal-chart">
              <h2>Population Based Chart</h2>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={getPopulationData()}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    innerRadius={50}
                    fill="#8884d8"
                  >
                    {getPopulationData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="square"
                    formatter={(value, entry) => `${value} (${entry.payload.value})`}
                  />
                </PieChart>
              </ResponsiveContainer>
              <p>Population</p>
            </div>
          )}

          {hoveredChart === 'ageGroup' && (
            <div className="modal-chart">
              <h2>Age Groups Based Chart</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={getAgeGroupData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Male" fill="#8884d8" />
                  <Bar dataKey="Female" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              <p>Age Groups</p>
            </div>
          )}

          {hoveredChart === 'occupation' && (
            <div className="modal-chart">
              <h2>Occupation Based Chart</h2>
              <ResponsiveContainer width="100%" height={350}>
              <BarChart data={getOccupationData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  interval={0}
                  tick={{
                    fontSize: "12px",
              
                    width: 80, // Adjust width to control when text breaks
                    wordBreak: "break-word",
                    whiteSpace: "normal" // Allows text to wrap
                  }}
                  tickFormatter={(name) => {
                    // Check if the name is too long and split it into multiple lines
                    return name.length > 15 ? name.replace(/\s+/g, '\n') : name;
                  }}
                />

                <YAxis  />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
              <p>Occupation Insights</p>
            </div>
          )}
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    </>
  );
};

export default ChartView;
