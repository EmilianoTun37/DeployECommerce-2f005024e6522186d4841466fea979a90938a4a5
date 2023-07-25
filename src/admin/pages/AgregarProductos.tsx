import { FormEvent, useEffect, useState } from 'react';
import * as productService from '../../services/productService';
import * as categoryServices from '../../services/categoryService'
import { useNavigate } from 'react-router-dom';
import { Product } from '../../interfaces';
import Swal from 'sweetalert2';

const AgregarProductos = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        async function getData() {
            const result = await categoryServices.getCategories();
            setCategories(result);
        }
        getData();
    }, [])

    const initialFormData: Product = {
        nameProduct: "",
        descriptionProduct: "",
        price: 0,
        stock: 0, 
        isActive: true,
        idCategory: 0,
        imageProduct: '',
        oCategory: null,
    }

    const [formData, setFormData] = useState<Product>(initialFormData);

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
                formData.nameProduct !== "" &&
                formData.descriptionProduct !== "" &&
                formData.imageProduct !==  "" &&
                formData.idCategory !== 0
            ){
                const response = await productService.addProduct(formData);
                console.log("Producto agregado correctamente", response);
                Swal.fire({
                    icon: "success",
                    title: "Producto agregado correctamente",
                    confirmButtonText: "Continuar",
                }).then(() => {
                    navigate("/admin/productos");
                });
            }else{
                Swal.fire({
                    icon:'error',
                    title: 'Error',
                    text: 'Por favor, complete todos los campos antes de agregar el producto',
                });
            }
        } catch (error) {
            console.error('Error al agregar el producto', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al agregar el producto. Por favor, intente nuevamente.',
            });
        }
    };

    return (
        <>
            <div className="container d-flex align-items-center justify-content-center">
                <div className="card p-3 w-100 card-agregar mt-5">
                    <span className="h5 mb-3">Agregar producto</span>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Product name
                            </label>
                            <input
                                type="text"
                                name="nameProduct"
                                value={formData.nameProduct}
                                onChange={handleChange}
                                id="name"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Price product
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                id="price"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Image product
                                <input
                                    type="text"
                                    name="imageProduct"
                                    value={formData.imageProduct}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Category
                                <select
                                    className='form-select'
                                    name="idCategory" value={formData.idCategory} onChange={handleChange}>
                                    <option value="">Select a category</option>
                                    {categories?.map((category) => (
                                        <option key={category.idCategory} value={category.idCategory}>
                                            {category.nameCategory}
                                        </option>
                                    ))}
                                </select>
                            </label>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label">
                                Stock available
                            </label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                name="stock"
                                id="stock"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Description product
                            </label>
                            <input
                                name="descriptionProduct"
                                value={formData.descriptionProduct}
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

export default AgregarProductos;
