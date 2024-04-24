import React from 'react';
import { useParams } from 'react-router-dom';

const ModePage = () => {
    const { modeName } = useParams(); 
  
    return (
      <div>
        <h1>{modeName}</h1>
      </div>
    );
};

export default ModePage;