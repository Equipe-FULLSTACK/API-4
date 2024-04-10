import {createGlobalStyle} from "styled-components"

export default createGlobalStyle`

    * {
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: ${props => props.theme.colors.bgSecondarycolor};
    color: white;
    }
    
`