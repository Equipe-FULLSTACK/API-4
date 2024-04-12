import styled from "styled-components"
import{ ItemWrapper as NavItemWrapper} from "../../helpers/ItemWrapper"
import img_fundo from '../../assets/imgs/fundo_sidebar.jpg'

/* import img_fundo from '../../assets/imgs/fundo_sidebar.jpg 

    background-image: url(${avatar});
*/


export const Container = styled.div`
    position: absolute;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 200px;
    max-width: 200px;
    min-width: 100px;
    margin-top: 10vh;
    height: 90vh;
    background-image: url(${img_fundo});

    `

export const Wrapper = styled(NavItemWrapper)`
    display: ${(props)=>props.display ? props.display  : "flex"};
    flex-direction: ${(props)=>props.flexDirection ? props.flexDirection  : "row"};
    align-items:  ${(props)=>props.alignItems ? props.alignItems  : "flex-start"};
    align-content: ${(props)=>props.alignContent ? props.alignContent  : "center"};
    justify-content: ${(props)=>props.justifyContent ? props.justifyContent  : "center"};
    flex-wrap: ${(props)=>props.flexWrap ? props.flexWrap : "wrap"};
    max-width: ${(props)=>props.maxWidth ? props.maxWidth  : "200px"};
    width: ${(props)=>props.width ? props.width : "100px"};
    min-width: ${(props)=>props.minWidth ? props.minWidth  : "100px"};
    margin-left: ${(props)=>props.margin ? props.margin  : "0"};
    padding: ${(props)=>props.padding ? props.padding  : "0"};
    background-color: rgba(255, 255, 255, 0);

`

export const Link = styled.a`
    
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: left;
    text-decoration: none;
    text-align: center;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 0.8rem;
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    color: ${props => props.theme.colors.fontSecondarycolor};

    &>img{
        margin-right: 0.5rem;
        background-color: rgba(255, 255, 255, 0);
    }
    background-color: rgba(255, 255, 255, 0);

    
`
