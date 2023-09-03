import React, { ReactNode } from 'react'
import styled from 'styled-components'

const InfoBody = styled.div`
  border: 1px solid #F4F5F7;
  border-radius: 15px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 4rem;

  &.clicked {
    background-color: #FFA07A ;

    color: white;
  }
`

interface TrackerInfoBodyProps {
  children: ReactNode;
}

const TrackerInfoBody: React.FC<TrackerInfoBodyProps> = ({ children }) => {

  const [clicked, setClicked] = React.useState(false)

  return (
    <InfoBody
      className={clicked ? 'clicked' : ''}
      onClick={()=> setClicked(!clicked)}
    >
      { children }
    </InfoBody>
  )
}

export default TrackerInfoBody;