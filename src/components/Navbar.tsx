import { Link, useNavigate } from "react-router-dom"
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LocalGroceryStoreSharpIcon from '@mui/icons-material/LocalGroceryStoreSharp';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';

interface NavbarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: '#fff', boxShadow: '0px 5px 30px 0px rgba(0,0,0,0.15)' }} >
                <div className="container-fluid" >
                    <a className="navbar-brand" href="/">
                        <span style={{ color: 'black', marginLeft: '150px', fontSize: '26px', fontWeight: 'bold', letterSpacing: '1px' }}>Tech eCommerce</span>
                    </a>
                    <button className="navbar-toggler btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span
                            className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className="nav-link text-black" to={"/"}>Home</Link></li>
                            <li className="nav-item"><Link className="nav-link text-black" to={"/productos"}>Productos</Link></li>
                            <Tooltip title="Account">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                {isLoggedIn ? (
                                    [
                                        <MenuItem key="shopCart" onClick={handleClose}>
                                            <LocalGroceryStoreSharpIcon />{' '}
                                            <h6 style={{ marginTop: '5px', marginLeft: '10px' }}>
                                                <Link className="nav-link text-black" to={'/carrito'}>
                                                    ShopCart
                                                </Link>
                                            </h6>
                                        </MenuItem>,
                                        <Divider key="divider" />,
                                        <MenuItem key="logout" onClick={() => {
                                            onLogout();
                                            navigate("/login")
                                        }}>
                                            <HowToRegRoundedIcon>
                                                <Logout fontSize="small" />
                                            </HowToRegRoundedIcon>
                                            <h6 style={{ marginTop: '5px', marginLeft: '10px' }}>Logout</h6>
                                        </MenuItem>,
                                    ]
                                ) : (
                                    [
                                        <Divider key="divider" />,
                                        <MenuItem key="login" onClick={handleClose}>
                                            <LoginRoundedIcon>
                                                <Settings fontSize="small" />
                                            </LoginRoundedIcon>
                                                <Link className="nav-link text-black" to='/login'>
                                            <h6 style={{ marginTop: '5px', marginLeft: '10px' }}>
                                                    Login
                                            </h6>
                                                </Link>
                                        </MenuItem>,
                                        <MenuItem key="register" onClick={handleClose}>
                                            <HowToRegRoundedIcon>
                                                <Logout fontSize="small" />
                                            </HowToRegRoundedIcon>
                                            <h6 style={{ marginTop: '5px', marginLeft: '10px' }}>
                                                <Link className="nav-link text-black" to={'/register'}>
                                                    Register
                                                </Link>
                                            </h6>
                                        </MenuItem>,
                                    ]
                                )}
                            </Menu>

                        </ul>
                    </div>
                </div>
            </nav>
        </div >
    )
}

export default Navbar