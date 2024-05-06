import React, { useState, useEffect } from 'react';
import { Tooltip, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SIATTLogo from '../../assets/icons/siatt_logo.png';

interface NovoUsuarioButtonProps {
    onClick?: () => void;
    disable?: boolean;
}

const BtnSIATT: React.FC<NovoUsuarioButtonProps> = ({ onClick, disable }) => {
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false); // Variável para controlar se o componente já foi montado
    const navigate = useNavigate(); 
    
    useEffect(() => {
        if (mounted && redirect) { // Redireciona apenas se o componente já estiver montado e o redirecionamento estiver definido
            if (redirect === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        }
    }, [redirect, mounted, navigate]);

    const handleClick = () => {
        if (disable) return; // Impede que o clique seja tratado se o botão estiver desabilitado
        setLoading(true);
        
        axios.get('http://localhost:3000/ck')
            .then(res => {
                if (res.data.valid) {
                    if (res.data.role === "4") {
                        setRedirect('admin');
                    } else {
                        setRedirect('user');
                    }
                } else {
                    setRedirect('');
                }
                console.log(res);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
                setMounted(true); 
            });
    };

    return (
        <Tooltip title="SIATT" placement="bottom">
            <a onClick={handleClick} style={{ pointerEvents: disable ? 'none' : 'auto', opacity: disable ? 0.5 : 1 }}>
                {loading ? (
                    <CircularProgress size={24} />
                ) : (
                    <img src={SIATTLogo} alt="SIATT Logo" style={{ width: 150, height: 50, cursor: disable ? 'not-allowed' : 'pointer' }} />
                )}
            </a>
        </Tooltip>
    );
};

export default BtnSIATT;
