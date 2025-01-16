import React, { useEffect } from 'react';
import { replace, useLocation, useNavigate, useNavigation } from 'react-router-dom';

const RefreshHandler = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const data  = localStorage.getItem("user-info");
        const token = JSON.parse(data)?.token;
        if(token){
            setIsAuthenticated(true);
            if(location.pathname === "/"){
                navigate("/home", { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);   

  return null;
}

export default RefreshHandler



