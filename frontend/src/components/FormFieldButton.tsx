import React, { ReactNode} from 'react'
import styled from 'styled-components'

const MyButton = styled.div`
  border: 1px solid grey;
  border-radius: 5px;

  font-size: 1.4rem;

  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  text-align: center;

  width: 80vw;

  &.clicked {
    background-color: #FFA07A;

    color: white;
    font-weight: bold;
  }
`

interface FormFieldProps {
  children: ReactNode;
  value: string;
}

const FormFieldButton: React.FC<FormFieldProps> = ( {children, value} ) => {

  const [clicked, setClicked] = React.useState(false)
  return (
    <>
    <MyButton
      className={clicked ? 'clicked' : ''}
      onClick={()=> setClicked(!clicked)}
      >
      {children}
    </MyButton>
    </>
  )
}

export default FormFieldButton;