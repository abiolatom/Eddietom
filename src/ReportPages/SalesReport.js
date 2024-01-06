import React, { useState, useEffect } from 'react';

const App = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/sales');
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render your sales data in the frontend */}
    </div>
  );
};

export default App;
