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
  callback: (value: string) => void // Function that returns nothing 
}

const FormFieldButton: React.FC<FormFieldProps> = ( {children, value, callback} ) => {
  const [clicked, setClicked] = React.useState(false);

  const handleButtonClick = () => {
    setClicked(!clicked);
    callback(value);
  }
  
  return (
    <>
    <MyButton
      className={clicked ? 'clicked' : ''}
      onClick={()=> {handleButtonClick()}}
      >
      {children}
    </MyButton>
    </>
  )
}

export default FormFieldButton;