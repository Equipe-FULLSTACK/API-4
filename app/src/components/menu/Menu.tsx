import React from 'react';
import { useState } from 'react';

import {
  Wrapper,
  Container,
} from "./styles"

interface dataMenu {
    pageName: string;
  }

const Menu: React.FC<dataMenu> = ({pageName}) => {
    
      return (
          <Container>
            <Wrapper flexDirection='row' justifyContent='flex-start' padding='1rem'>
              
            </Wrapper>  
          </Container>
    
      )
    }
    export default Menu;