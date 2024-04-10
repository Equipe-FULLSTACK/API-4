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
export const Divider = styled.div`
    border-bottom: 2px solid ${props => props.theme.colors.bgTertiarycolor};
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
    width: 100%;
    }
` 


