import React from 'react'
import styled from 'styled-components'

const StyledNavbar = styled.div`
  width: 100vw;
  height: 60px;

  display: flex;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;

  justify-content: space-between;
`

const NavbarItemContainer = styled.div`

`

const NavbarItem = styled.div`
`

const NavbarBrand = styled.div`
  
`
  
export default function Navbar() {
  return (
    <>
      <StyledNavbar>
        <NavbarBrand>BLACK SHEEP</NavbarBrand>

        <NavbarItemContainer>
          <NavbarItem>
            Dropdown
          </NavbarItem>

        </NavbarItemContainer>
      </StyledNavbar>
    
    </>
  )
}
