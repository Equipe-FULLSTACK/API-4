import styled from "styled-components"
import{ ItemWrapper as NavItemWrapper} from "../../helpers/ItemWrapper"


export const Container = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 90vh;
    width: 90vw;
    margin-top: 10vh;
    margin-left: 10vw;
`

export const Wrapper = styled(NavItemWrapper)`
    display: ${(props)=>props.display ? props.display  : "flex"};
    flex-direction: ${(props)=>props.flexDirection ? props.flexDirection  : "column"};
    align-items:  ${(props)=>props.alignItems ? props.alignItems  : "center"};
    align-content: ${(props)=>props.alignContent ? props.alignContent  : "center"};
    justify-content: ${(props)=>props.justifyContent ? props.justifyContent  : "center"};
    flex-wrap: ${(props)=>props.flexWrap ? props.flexWrap : "wrap"};
    max-width: ${(props)=>props.maxWidth ? props.maxWidth  : "none"};
    min-width: ${(props)=>props.minWidth ? props.minWidth  : "none"};
    margin: ${(props)=>props.margin ? props.margin  : "0"};
    padding: ${(props)=>props.padding ? props.padding  : ""};
`

export const Link = styled.a`
    
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: left;
    text-decoration: none;
    text-align: center;
    padding: 0.5rem;
    color: ${props => props.theme.colors.fontSecondarycolor};

    &>img{
        margin-right: 0.5rem
    }
`