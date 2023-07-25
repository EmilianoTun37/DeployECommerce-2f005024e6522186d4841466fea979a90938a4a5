import { Route, Routes, Navigate } from "react-router-dom"
import NavbarAdmin from "../admin/components/NavbarAdmin"
import * as adminPages from '../admin/pages'
import * as pages from '../pages'
import { useState } from "react"

const AdminRoutes = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }
    return(
        <>
        <NavbarAdmin isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
                    <Route
                        path="/"
                        children={
                            <Route
                                path=""
                                element={
                                    <Navigate
                                        to="/login"
                                        replace={true}
                                    />
                                }
                            />
                        }
                    />
                    <Route path="/login" element={ <adminPages.LoginAdmin onLogin={handleLogin} />} />
                    <Route
                        path="/productos"
                        element={<adminPages.Productos />}
                    />
                    <Route
                        path="/productos/agregar"
                        element={<adminPages.AgregarProductos />}
                    />
                    <Route
                        path="/categoria/"
                        element={<adminPages.Categoria />}
                    />
                    <Route
                        path="/categoria/agregar"
                        element={<adminPages.AgregarCategoria />}
                    />
                    <Route path="/404" element={<pages.NotFound />} />
                    <Route
                        path="*"
                        element={<Navigate to="/404" replace={true} />}
                    />
                </Routes>
        </>
    )
}

export default AdminRoutes