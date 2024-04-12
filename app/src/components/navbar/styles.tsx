import styled from "styled-components"
import { ItemWrapper as NavItemWrapper } from "../../helpers/ItemWrapper"

/* Imagens */
import avatar from '../../assets/icons/user_icon.webp'

export const Wrapper = styled(NavItemWrapper)`
    display: flex;
    flex-direction: row;
    align-items:  center;
    justify-content: center;
    }
` 

export const Container = styled.div`
    display: flex;
    position: absolute;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.colors.bgTertiarycolor};
    width: 100vw;
    height: 10vh;
    `
export const Logo = styled.img`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor:pointer;
    margin-left: 10px;
`
export const UserName = styled.span`
    color: ${props => props.theme.colors.fontSecondarycolor};
    align-items: center;
    margin: 0 1rem 0 1rem;
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