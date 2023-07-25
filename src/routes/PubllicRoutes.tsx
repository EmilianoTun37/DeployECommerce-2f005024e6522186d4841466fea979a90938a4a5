import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as pages from '../pages'
import Navbar from "../components/Navbar";

const PublicRoutes = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    return (
        <>
            {window.location.pathname !== '/login' && window.location.pathname !== '/register' && (
                <Navbar isLoggedIn={localStorage.getItem('user') ? true : false} onLogout={handleLogout} />
            )}            <Routes>
                {/* <Route
                        index
                        element={<Navigate to="/" replace={true}  />}
                    /> */}
                <Route index path="/" element={<pages.Home />} />
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to={"/"} /> : <pages.Login onLogin={handleLogin} />} />

                <Route path="/register" element={isLoggedIn ? <Navigate to={"/"} /> : <pages.Register />} />

                <Route path='/productos' element={<pages.Productos />} />
                <Route path='/carrito' element={<pages.CarritoCompra />} />
            </Routes>
        </>
    )

}


export default PublicRoutes;