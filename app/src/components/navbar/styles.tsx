import styled from "styled-components"
import { ItemWrapper as NavItemWrapper } from "../../helpers/ItemWrapper"

/* Imagens */
import avatar from '../../assets/icons/user_icon.webp'

export const Wrapper = styled(NavItemWrapper)`
    display: flex;
    flex-direction: row;
    align-items:  center;
    justify-content: center;
    padding: 1rem;
    }
` 

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 1rem;
    border-bottom: 4px solid ${props => props.theme.colors.bgSecondarycolor};

`
export const Logo = styled.img`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    background-size: cover;
    cursor:pointer;
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