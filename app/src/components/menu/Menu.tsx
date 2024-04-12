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
          <Wrapper display='column' alignItems='left' alignContent='left' margin='50px'>
            TESTE
          </Wrapper>
          <Wrapper>
            hello world
          </Wrapper>
        </Container>
          
        </>
      )
    }
    export default Menu;