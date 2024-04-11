import React from 'react';

import { useNavigate } from 'react-router-dom';


import {
  Container,
  Logo,
  Wrapper,
  UserName
} from "./styles"

//TODO CRIANDO STYLES NAVBAR

import logo from '../../assets/icons/siatt_logo.png'


interface dataNavBar {
  userName: string;
  pageName: string;
}

const NavBar: React.FC<dataNavBar> = ({userName, pageName}) => {
  
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('')
  }


  return (
    <Container>
      {/* {pageName} */}
      <Logo src={logo} onClick={returnHome} alt="icon"/>
      
      
      <Wrapper>
        <UserName>{userName.toUpperCase()} </UserName>
       {/*  <PositionedMenu/> */}
      </Wrapper>

    </Container>
  )
};
export default NavBar;