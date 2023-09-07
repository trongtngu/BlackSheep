import React from 'react'

import styled from 'styled-components'

import SetsAndRepsBox from './SetsAndRepsBox';

interface ExerciseColumnProps {
  name: string;
  sets: number;
  reps: number;
  callback: (value: Boolean) => void;
}

const StyledExerciseColumn = styled.div`

  &.clicked {
    background: red;
  }
`

const ExerciseName = styled.div`
  border: 1px solid #F4F5F7;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.05);
  height: 10vh;
  width: 40vw;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-weight: bold;

  background: white;
`

const ExerciseColumn: React.FC<ExerciseColumnProps> = ({name, sets, reps, callback}) => {
  const setsAndRepsRender = () => {
    return Array.from({length: sets}).map((_, idx) => {
      return (
      <SetsAndRepsBox key={idx} callback={callback}>
        <div>{reps}</div>
        <div>20kg</div>
      </SetsAndRepsBox>
      )
    })
  }

  return (
    <StyledExerciseColumn
    >
      <ExerciseName>
        {name}
      </ExerciseName>
      {setsAndRepsRender()}
    </StyledExerciseColumn>
  )
}

export default ExerciseColumn;
