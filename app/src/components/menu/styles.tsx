import styled from "styled-components"
import{ ItemWrapper as NavItemWrapper} from "../../helpers/ItemWrapper"


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    /* width: 200px; */
`

export const Wrapper = styled(NavItemWrapper)`
    display: ${(props)=>props.display ? props.display  : "flex"};
    flex-direction: ${(props)=>props.flexDirection ? props.flexDirection  : "column"};
    align-items:  ${(props)=>props.alignItems ? props.alignItems  : "flex-start"};
    align-content: ${(props)=>props.alignContent ? props.alignContent  : "center"};
    justify-content: ${(props)=>props.justifyContent ? props.justifyContent  : "center"};
    flex-wrap: ${(props)=>props.flexWrap ? props.flexWrap : "wrap"};
    max-width: ${(props)=>props.maxWidth ? props.maxWidth  : "none"};
    min-width: ${(props)=>props.minWidth ? props.minWidth  : "none"};
    margin: ${(props)=>props.margin ? props.margin  : "0"};
    padding: ${(props)=>props.padding ? props.padding  : "0"};
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
export const Menu = styled.a`
    
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    padding: 0.5rem;
    color: ${props => props.theme.colors.fontSecondarycolor};
`

export const UserName = styled.span`
    color: ${props => props.theme.colors.fontSecondarycolor};
    
    &:after{
        color: var(--font-secondary-color);
        width: auto;
        height: auto;
        content: '';
        margin-left: 1rem;
        padding: 0.5rem 2rem;
        align-items: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url(${avatar});
        cursor:pointer;
    }
`