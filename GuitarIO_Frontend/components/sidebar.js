// components/Sidebar.js
import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 300px;
  padding: 20px;
  background: #f8f8f8;
  border-right: 1px solid #ccc;
`;

const Sidebar = ({ addComponent }) => {
  return (
    <SidebarContainer>
      <h2>Components</h2>
      <button onClick={() => addComponent('text')}>Text</button>
      <button onClick={() => addComponent('image')}>Image</button>
      {/* Add more components as needed */}
    </SidebarContainer>
  );
};

export default Sidebar;
