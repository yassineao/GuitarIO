// components/Component.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ComponentContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background: #f8f8f8;
`;

const Component = ({ component, updateComponent }) => {
  const [style, setStyle] = useState(component.style);

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    updateComponent(component.id, event.target.value);
  };

  return (
    <ComponentContainer>
      <h3>{component.type}</h3>
      <textarea value={style} onChange={handleStyleChange}></textarea>
      <div dangerouslySetInnerHTML={{ __html: component.style }} />
    </ComponentContainer>
  );
};

export default Component;
