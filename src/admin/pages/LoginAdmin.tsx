import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces';
import * as useService from '../../services/userService';
import Swal from 'sweetalert2';

interface LoginProps {
    onLogin: () => void;
}


const LoginAdmin: React.FC<LoginProps> = ({onLogin}) => {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState<User>({
        username: '',
        name: null,
        email: null,
        phone: null,
        password: '',
        address: null,
        isActive: true,
        rolId: null, // 1=user 2=admin
        rol: null,
    })
    
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          if (loginFormData.username !== '' && loginFormData.password !== '') {
            const user = await useService.login(loginFormData);
      
            // Assuming login() returns an object with a valid user or a token
            if (user && user.userName) {
              // Save the user object in the localStorage
              localStorage.setItem("admin", JSON.stringify(user));
      
              Swal.fire({
                icon: "success",
                title: "Inicio de sesion exitoso!",
                text: "Bienvenido " + user.userName + "!",
                confirmButtonText: 'Continuar'
              }).then(() => {
                onLogin();
                return navigate("/admin/productos")
              });
            } else {
              // Show error message when credentials are invalid
              Swal.fire({
                icon: "error",
                title: "Credenciales incorrectas",
                text: "Por favor verifica tu nombre de usuario y contraseña e intenta nuevamente.",
                confirmButtonText: "Intentar de nuevo"
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Datos incompletos",
              text: "Por favor complete todos los campos.",
              confirmButtonText: "Intentar de nuevo"
            });
          }
        } catch (error) {
          console.log(error.message)
          Swal.fire({
            icon: "error",
            title: "¡Error de inicio de sesión!",
            text: "Por favor, verifica tus credenciales e intenta nuevamente.",
            confirmButtonText: "Intentar nuevamente",
          });
        }
      };
      

    return (
        <div className="sm-container mt-5">
            <form
                className="form form--login"
                onSubmit={handleLoginSubmit}
            >
                <div className="form__header d-flex flex-column align-items-center">
                    <span className="form__title m-0">Inicia sesión</span>
                    <span className="lead">como administrador</span>
                </div>
                <div className="form__group">
                    <label className="form__label">Username</label>
                    <input
                        name='username'
                        type="text"
                        className="form__input"
                        placeholder="Text here..."
                        value={loginFormData.username}
                        onChange={handleLoginChange}
                        required
                    />
                </div>
                <div className="form__group">
                    <label className="form__label">Contraseña</label>
                    <input
                        type="password"
                        name='password'
                        className="form__input"
                        placeholder="Text here..."
                        value={loginFormData.password}
                        onChange={handleLoginChange}
                        required
                    />
                </div>
                <button type="submit" className="form__btn">
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default LoginAdmin;
