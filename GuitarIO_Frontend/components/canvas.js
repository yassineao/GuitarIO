// components/Canvas.js
import React from 'react';
import styled from 'styled-components';
import Component from './Component';

const CanvasContainer = styled.div`
  flex: 1;
  padding: 20px;
  background: #ffffff;
`;

const Canvas = ({ components, updateComponent }) => {
  return (
    <CanvasContainer>
      {components.map((component) => (
        <Component
          key={component.id}
          component={component}
          updateComponent={updateComponent}
        />
      ))}
    </CanvasContainer>
  );
};

export default Canvas;
