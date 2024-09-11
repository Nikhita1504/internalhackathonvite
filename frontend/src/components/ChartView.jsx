import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell, ResponsiveContainer } from 'recharts';
import Modal from 'react-modal';
// import './ChartView.css'; 

const ChartView = ({ villageDetails }) => {
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
        Male : villageDetails['Population in the age group 0-10 Male'],
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

  const getAgriculturalLabourersData = () => {
    if (!villageDetails) return [];
    return [
      { name: 'Main Male AgriculturalLabourers', value: villageDetails['Main Agricultural Labourers Population Male'] },
      { name: 'Main Female AgriculturalLabourers', value: villageDetails['Main Agricultural Labourers Population Female'] },
      { name: 'Marginal Male AgriculturalLabourers', value: villageDetails['Marginal Agriculture Labourers Population Male'] },
      { name: 'Marginal Female AgriculturalLabourers', value: villageDetails['Marginal Agriculture Labourers Population Female'] }
      
    ];
  };

  const getCultivatorsData = () => {
    if (!villageDetails) return [];
    return [
      { name: 'Household Industries', value: villageDetails['Main Household Industries Population Person'] },
      { name: 'Other workers population', value: villageDetails['Main Other Workers Population Person'] },
      { name: 'Non-working population', value: villageDetails['Non Working Population Person'] },
      { name: 'Agricultural labourers', value: villageDetails['Main Agricultural Labourers Population Person'] }
    ];
  };

  const openModal = (chartType) => {
    setHoveredChart(chartType);
  };

  const closeModal = () => {
    setHoveredChart(null);
  };

  return (
    <div className="chart-container">
      {/* Population Pie Chart */}
      <div className="chart-box" onClick={() => openModal('population')}>
        <ResponsiveContainer width="100%" height={300}>
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
      <div className="chart-box" onClick={() => openModal('ageGroup')}>
        <ResponsiveContainer width="100%" height={300}>
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

      {/* Agricultural Labourers Pie Chart */}
      <div className="chart-box" onClick={() => openModal('agriculturalLabourers')}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={getAgriculturalLabourersData()}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              innerRadius={40}
              fill="#8884d8"
            >
              {getAgriculturalLabourersData().map((entry, index) => (
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
        <p>Agricultural Labourers Based Chart</p>
      </div>

      {/* Cultivators Pie Chart */}
      <div className="chart-box" onClick={() => openModal('cultivators')}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={getCultivatorsData()}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              innerRadius={40}
              fill="#8884d8"
            >
              {getCultivatorsData().map((entry, index) => (
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
        <p>Economic Cycle Based Chart</p>
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
            <ResponsiveContainer width="100%" height={300}>
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
            <ResponsiveContainer width="100%" height={300}>
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

        {hoveredChart === 'agriculturalLabourers' && (
          <div className="modal-chart">
            <h2>Agricultural Labourers Based Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getAgriculturalLabourersData()}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  innerRadius={40}
                  fill="#8884d8"
                >
                  {getAgriculturalLabourersData().map((entry, index) => (
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
            <p>Agricultural Labourers</p>
          </div>
        )}

        {hoveredChart === 'cultivators' && (
          <div className="modal-chart">
            <h2>Cultivators Based Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getCultivatorsData()}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  innerRadius={40}
                  fill="#8884d8"
                >
                  {getCultivatorsData().map((entry, index) => (
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
            <p>Economic Cycle </p>
          </div>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ChartView;
