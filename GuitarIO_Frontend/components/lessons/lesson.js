// components/Component.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './card';
const ComponentContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background: #f8f8f8;
`;

const Lesson = ({ Lesson }) => {

  return (
    <div>
      <ComponentContainer>
        <h2>Lesson Title: {Lesson.title}</h2>
        {/* <p>lesson: {Lesson.isAvailable ? 'Yes' : 'No'}</p>
        
        <p>lesson: {Lesson.isComplete ? 'Yes' : 'No'}</p> */}
        <p>Number: {Lesson.number}</p>
        <p>Chapter: {Lesson.chapter}</p>
        <Card content={Lesson.content}  />
      </ComponentContainer>
    </div>
  );
};

export default Lesson;
