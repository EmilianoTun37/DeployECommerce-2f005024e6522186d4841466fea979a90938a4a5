// Register.tsx

import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../interfaces";
import { register } from "../services/userService";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

  const initialFormData: User = {
    name: "",
    email: "",
    username: "",
    isActive: true,
    rolId: 0,
    rol: { rolId: 0, name: "", description: "", users: [] },
  };

  const [formData, setFormData] = useState<User>(initialFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (
        formData.email !== "" &&
        formData.name !== "" &&
        formData.username !== "" &&
        regex.test(formData.email) &&
        formData.password !== "" 
      ) {
        // Si los datos son válidos, llamamos a la función del servicio para realizar el registro
        const response = await register(formData);
        console.log("Registro exitoso:", response);
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Usuario registrado correctamente. Por favor, inicia sesión.",
          confirmButtonText: "Continuar",
        }).then(() => {
          navigate("/login");
        });
      } else {
        alert("Datos incorrectos");
      }
    } catch (error) {
      console.error("Error al registrar:", error.message);
      alert("Error al registrar el usuario");
    }
  };

  return (
    <div className="container">
      <form className="form form--register" onSubmit={handleSubmit}>
        <div className="form__header">
          <span className="form__title">Registrate</span>
        </div>
        <div className="form__group">
          <label className="form__label">Nombre completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form__input"
            placeholder="Text here..."
            required
          />
        </div>
        <div className="form__group">
          <label className="form__label">Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form__input"
            placeholder="Text here..."
            required
          />
        </div>
        <div className="form__group">
          <label className="form__label">Correo electronico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form__input"
            placeholder="Text here..."
            required
          />
        </div>
        <div className="form__group">
          <label className="form__label">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form__input"
            placeholder="Text here..."
            required
          />
        </div>
        <div className="form__group">
          <label className="form__label">Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form__input"
            placeholder="Text here..."
            required
          />
        </div>
        <div className="form__group">
          <label className="form__label">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form__input"
            placeholder="Text here..."
            required
          />
        </div>
        <button type="submit" className="form__btn">
          Completar registro
        </button>
        <Link to="/login" className="linkBtn">Iniciar sesion</Link>

      </form>
    </div>
  );
};

export default Register;
