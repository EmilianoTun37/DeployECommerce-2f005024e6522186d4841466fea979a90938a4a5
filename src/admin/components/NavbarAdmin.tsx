import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const NavbarAdmin: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const products = useRef<HTMLAnchorElement>(null);
    const categoria = useRef<HTMLAnchorElement>(null);
    const sales = useRef<HTMLAnchorElement>(null);

    const logout = () => {
        localStorage.clear();
        onLogout(); // Call the onLogout function to handle logout logic in parent component
        navigate('/admin/login');
    };

    useEffect(() => {
        // Set the active route based on the current pathname
        const pathname = location.pathname;
        if (pathname === '/admin/productos') {
            products.current?.classList.add('text-white');
            categoria.current?.classList.remove('text-white');
            sales.current?.classList.remove('text-white');
        } else if (pathname === '/admin/categoria') {
            products.current?.classList.remove('text-white');
            categoria.current?.classList.add('text-white');
            sales.current?.classList.remove('text-white');
        } else if (pathname === '/admin/ventas') {
            products.current?.classList.remove('text-white');
            categoria.current?.classList.remove('text-white');
            sales.current?.classList.add('text-white');
        }
    }, [location]);

    return (
        <div className="header w-100 d-flex align-items-center bg-dark text-light gap-4 p-4">
            <h4 className="m-0">Administrador</h4>
            {isLoggedIn && (
                <>
                    <nav className="d-flex align-items-center gap-3 ms-auto">
                        <Link
                            to="/admin/productos"
                            className={`text-secondary text-decoration-none`}
                            ref={products}
                        >
                            Productos
                        </Link>
                        <Link
                            to="/admin/categoria"
                            className={`text-secondary text-decoration-none`}
                            ref={categoria}
                        >
                            Categoria
                        </Link>
                        <Link
                            to="/admin/ventas"
                            className={`text-secondary text-decoration-none`}
                            ref={sales}
                        >
                            Ventas
                        </Link>
                    </nav>
                    <div className="d-flex ms-auto gap-3">
                        <button className="btn btn-light d-flex align-items-center justify-content-center py-2">
                            <i className="material-icons">account_circle</i>
                        </button>
                        <button
                            className="btn btn-danger d-flex align-items-center justify-content-center py-2"
                            onClick={logout}
                        >
                            <i className="material-icons">logout</i>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default NavbarAdmin;
