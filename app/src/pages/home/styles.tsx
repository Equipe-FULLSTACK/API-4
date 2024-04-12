import styled from "styled-components"
import{ ItemWrapper as NavItemWrapper} from "../../helpers/ItemWrapper"


export const Container = styled.div`

    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100%;
    
    
`
export const Divider = styled.div`
    border-bottom: 2px solid ${props => props.theme.colors.bgTertiarycolor};
`

export const Wrapper = styled(NavItemWrapper)`

    flex-direction: ${(props)=>props.flexDirection ? props.flexDirection  : "row"};
    align-items:  ${(props)=>props.alignItems ? props.alignItems  : "flex-start"};
    align-content: ${(props)=>props.alignContent ? props.alignContent  : "center"};
    justify-content: ${(props)=>props.justifyContent ? props.justifyContent  : "center"};
    flex-wrap: ${(props)=>props.flexWrap ? props.flexWrap : "wrap"};
    max-width: ${(props)=>props.maxWidth ? props.maxWidth  : "none"};
    min-width: ${(props)=>props.minWidth ? props.minWidth  : "none"};
    margin: ${(props)=>props.margin ? props.margin  : "0"};
    padding: ${(props)=>props.padding ? props.padding  : "0"};
    width: 90vw;
    height:100%;
    
    }
` 


