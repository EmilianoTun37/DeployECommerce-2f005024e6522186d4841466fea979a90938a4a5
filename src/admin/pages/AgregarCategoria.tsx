import { FormEvent, useState } from 'react';
import * as categoryServices from '../../services/categoryService'
import { useNavigate } from 'react-router-dom';
import { Category } from '../../interfaces';
import Swal from 'sweetalert2';

const AgregarCategoria = () => {

    const navigate = useNavigate();
    const initialFormData: Category = {
        idCategory: 0,
        nameCategory: '',
        descriptionCategory: '',
        products: null
    }

    const [formData, setFormData] = useState<Category>(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit =async (event: FormEvent) => {
        event.preventDefault();

        try {
            if (
                formData.nameCategory !== '' &&
                formData.descriptionCategory !== '' 
            ){
                const response = await categoryServices.addCategory(formData);
                console.log("Categoria agregada correctamente", response);
                Swal.fire({
                    icon: "success",
                    title: "Categoria agregada correctamente",
                    confirmButtonText: "Continuar",
                }).then(() => {
                    navigate("/admin/categoria");
                });
            }else{
                Swal.fire({
                    icon:'error',
                    title: 'Error',
                    text: 'Por favor, complete todos los campos antes de agregar la categoria',
                });
            }
        } catch (error) {
            console.error('Error al agregar la categoria ', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al agregar la categoria. Por favor, intente nuevamente.',
            });
        }
    };

    return (
        <>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="card p-3 w-100 card-agregar mt-5">
                    <span className="h5 mb-3">Agregar nueva categoria</span>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Product name
                            </label>
                            <input
                                type="text"
                                name="nameCategory"
                                value={formData.nameCategory}
                                onChange={handleChange}
                                id="name"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Description product
                            </label>
                            <input
                                name="descriptionCategory"
                                value={formData.descriptionCategory}
                                onChange={handleChange}
                                className="form-control"
                            ></input>
                        </div>
                        <button className="btn btn-primary w-100">
                            Agregar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AgregarCategoria;
