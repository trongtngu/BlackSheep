import React, {ReactNode} from 'react'
import styled from 'styled-components'

const StyledSetsAndRepsBox = styled.div`
  border: 1px solid #F4F5F7;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 8vh;
  width: 40vw;

  background: white;

  &.clicked {
    background: #20B2AA;
    color: white;
    font-weight: bold;
  }
`

interface SetsAndRepsBoxProps {
  children: ReactNode;
  callback: (value: Boolean) => void;
}

const SetsAndRepsBox: React.FC<SetsAndRepsBoxProps>  = ({children, callback}) => {
  
  const [clicked, setClicked] = React.useState(false)

  const handleClickAndCallback = () => {
    const done = clicked
    setClicked(!done)
    callback(done);
  }

  return (
    <StyledSetsAndRepsBox 
    className={clicked ? 'clicked' : ''}
    onClick={()=> {handleClickAndCallback()}}
    >
      {children}
    </StyledSetsAndRepsBox>
  )
}

export default SetsAndRepsBox
