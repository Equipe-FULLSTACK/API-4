import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import NavBar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/Sidebar';
import Menu from '../../components/menu/Menu';

import {
  Wrapper,
  Divider,
} from "./styles"

export default function Home() {

  return (
    <>
      <NavBar userName={"leo"} pageName={'NavBar'} />
      <Divider />
        <Wrapper
            display='flex'
            flexDirection='collum'
            justifyContent='flex-start'
            flexWrap='nowrap'
        >
          <SideBar pageName={'SideBar'} /> 
          <Menu pageName={'Menu'} />
        </Wrapper>
      <Footer pageName={'Footer'} />
    </>
  );
}