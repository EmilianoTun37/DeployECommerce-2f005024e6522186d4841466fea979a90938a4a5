import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin, } from "../interfaces";
import * as userServices from "../services/userService";
import Swal from "sweetalert2";

interface LoginProps {
    onLogin: () => void; 
}

const Login: React.FC<LoginProps> = ({onLogin}) => {
    const navigate = useNavigate();

    localStorage.removeItem('user');
    localStorage.removeItem('carrito');

    const [loginFormData, setLoginFormData] = useState<UserLogin>({
        userName: "", 
        password: ""
    });

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          if (loginFormData.userName !== '' && loginFormData.password !== '') {
            const user = await userServices.login(loginFormData);
      
            // Assuming login() returns an object with a valid user or a token
            if (user && user.userName) {
              // Save the user object in the localStorage
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem('carrito', JSON.stringify([]))
      
              Swal.fire({
                icon: "success",
                title: "!Inicio de sesion exitoso",
                text: "Bienvenido " + user.userName + "!",
                confirmButtonText: 'Continuar'
              }).then(() => {
                onLogin();
                return navigate("/")
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
        <div className="container">
            <form className="form form--login" onSubmit={handleLoginSubmit}>
                <div className="form__header">
                    <span className="form__title">Inicia sesión</span>
                </div>
                <div className="form__group">
                    <label className="form__label">Username</label>
                    <input
                        type="text"
                        name="userName"
                        className="form__input"
                        placeholder="Text here..."
                        value={loginFormData.userName}
                        onChange={handleLoginChange}
                        required />
                </div>
                <div className="form__group">
                    <label className="form__label">Contraseña</label>
                    <input type="password" className="form__input" placeholder="Text here..."
                        name="password"
                        value={loginFormData.password}
                        onChange={handleLoginChange}
                        required />
                </div>
                <button type="submit" className="form__btn">Ingresar</button>
                <Link to="/register" className="linkBtn">Registrarse</Link>
            </form>
        </div>
    )
}

export default Login;
