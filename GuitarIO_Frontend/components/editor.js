// components/Editor.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Canvas from './canvas';

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Editor = () => {
  const [components, setComponents] = useState([]);

  const addComponent = (type) => {
    setComponents([...components, { id: components.length + 1, type, style: '' }]);
  };

  const updateComponent = (id, newStyle) => {
    setComponents(
      components.map((comp) => (comp.id === id ? { ...comp, style: newStyle } : comp))
    );
  };

  return (
    <EditorContainer>
      <Sidebar addComponent={addComponent} />
      <Canvas components={components} updateComponent={updateComponent} />
    </EditorContainer>
  );
};

export default Editor;
