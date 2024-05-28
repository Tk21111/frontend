import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomNumber = () => {
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const response = await axios.get('/randnum');
        setNumber(response.data.number);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNumber();
  }, []);

  return (
    <div>
      <h1>Random Number: {number}</h1>
    </div>
  );
};

export default RandomNumber;
