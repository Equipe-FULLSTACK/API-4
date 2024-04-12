import React from 'react';
import { useState } from 'react';

import {
  Wrapper,
  Container,
} from "./styles"

interface dataMenu {
    pageName: string;
  }

const Menu: React.FC<dataMenu> = ({dataMenu}) => {
    
      return (
        <>
        <Container>
          <Wrapper>
            TESTE
          </Wrapper>
        </Container>
          
        </>
      )
    }
    export default Menu;