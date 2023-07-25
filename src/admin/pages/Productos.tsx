import { Link } from 'react-router-dom';
import { Product, Category } from '../../interfaces';
import { useEffect, useRef, useState } from 'react';
import * as productService from '../../services/productService';
import * as categoriesService from '../../services/categoryService';
import Swal from 'sweetalert2';

const Productos = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const modal = useRef<HTMLDialogElement>(null);
    const [selected, setSelected] = useState<Product | null>(null);

    const setActiveProduct = (product: Product) => {
        setSelected(product);
        modal.current?.showModal();
    };

    useEffect(() => {
        async function getData() {
            const [productData, categoriesData] = await Promise.all([
                productService.getProducts(),
                categoriesService.getCategories(),
            ]);

            setProducts(productData);
            setCategories(categoriesData);
        }

        getData();
    }, []);

    const handleEditProduct = async () => {
        try {
            if (!selected) return;

            const editedProduct: Product = { ...selected };

            const selectCategory = categories.find((category) => category.idCategory === selected.idCategory);

            if(selectCategory){
                editedProduct.oCategory = selectCategory;
            }

            await productService.updateProduct(editedProduct);

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.idProduct === editedProduct.idProduct ? editedProduct : product
                )
            );

            modal.current?.close();

            Swal.fire({
                icon: 'success',
                title: 'Producto actualizado',
                text: 'El producto ha sido actualizado correctamente',
            });
        } catch (error) {
            console.error('Error al editar el producto: ', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al editar el producto. Por favor, intente nuevamente.',
            });
        }
    };

    const handleDeleteProduct = async (idProduct: number) => {
        try {
            const result = await Swal.fire({
                icon: 'warning',
                title: '¿Estas seguro?',
                text: 'Esta accion eliminara el producto de forma permanente',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
            });
            if (result.isConfirmed) {
                await productService.deleteProduct(idProduct);

                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.idProduct !== idProduct)
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                    text: 'El producto ha sido eliminado correctamente',
                });
            }
        } catch (error) {
            console.error('Error al eliminar el producto: ', error.message);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al eliminar el producto. Por favor, intente nuevamente.',
            });
        }
    };

    return (
        <>
            <dialog
                ref={modal}
                className="p-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    setSelected(null);
                    modal.current?.close();
                }}
            >
                <form>
                    <span className="h5 mb-3 text-center d-block w-100">
                        Edit product
                    </span>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name product
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            value={selected?.nameProduct || ''}
                            onChange={(e) =>
                                setSelected((prev) => ({
                                    ...prev,
                                    nameProduct: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price product
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            className="form-control"
                            value={selected?.price || 0}
                            onChange={(e) =>
                                setSelected((prev) => ({
                                    ...prev,
                                    price: parseFloat(e.target.value),
                                }))
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Image product
                        </label>
                        <input
                            type="text"
                            name="imageProduct"
                            id="image"
                            className="form-control"
                            value={selected?.imageProduct || ''}
                            onChange={(e) =>
                                setSelected((prev) => ({
                                    ...prev,
                                    imageProduct: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='category' className='form-label'>
                            Category
                        </label>
                        <select
                            name='idCategory'
                            id='category'
                            className='form-select'
                            value={selected?.idCategory || ''}
                            onChange={(e) =>
                                setSelected((prev) => ({
                                    ...prev,
                                    idCategory: parseInt(e.target.value),
                                }))
                            }
                        >
                            <option value="">Select a category</option>
                            {categories?.map((category) => (
                                <option key={category.idCategory} value={category.idCategory}>
                                    {category.nameCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="stock" className="form-label">
                            Stock
                        </label>
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            className="form-control"
                            value={selected?.stock || 0}
                            onChange={(e) =>
                                setSelected((prev) => ({
                                    ...prev,
                                    stock: parseInt(e.target.value),
                                }))
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">
                            Description product
                        </label>
                        <textarea
                            name="descriptionProduct"
                            id="descriptionProduct"
                            className="form-control edit-desc"
                            value={selected?.descriptionProduct || ''}
                            onChange={(e) =>
                                setSelected((prev) => ({
                                    ...prev,
                                    descriptionProduct: e.target.value,
                                }))
                            }
                        ></textarea>
                    </div>
                    <div className="d-flex w-100 gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setSelected(null);
                                modal.current?.close();
                            }}
                            className="btn btn-secondary w-100"
                        >
                            Close
                        </button>
                        <button className="btn btn-primary w-100" 
                            onClick={() => handleEditProduct()}>
                            Editar
                        </button>
                    </div>
                </form>
            </dialog>
            <div className="container-fluid d-flex align-items-center justify-content-between h-100 py-3 px-4">
                <h3>Listado de productos</h3>
                <Link className="btn btn-primary" to="/admin/productos/agregar">
                    Agregar producto
                </Link>
            </div>
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th scope="col" className="py-2 px-4">
                            Codigo
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Categoria
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Producto
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Precio
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Existencias
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Descripcion
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Image
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product, index) => (
                        <tr key={index}>
                            <td className="py-3 px-4">{product.idProduct}</td>
                            <td className="py-3 px-4">{product.oCategory?.nameCategory}</td>
                            <td className="py-3 px-4">{product.nameProduct}</td>
                            <td className="py-3 px-4">${product.price}</td>
                            <td className="py-3 px-4">{product.stock}</td>
                            <td className="py-3 px-4">{product.descriptionProduct}</td>
                            <td className="py-3 px-4">
                                <img src={product.imageProduct} alt={product.nameProduct} style={{ width: '100px', height: '100px' }} />
                            </td>
                            <td className="py-3 px-4">
                                <div className="d-flex gap-2 h-100 align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-success d-flex align-items-center justify-content-center py-2"
                                        onClick={() => {
                                            setActiveProduct(product);
                                        }}
                                    >
                                        <i className="material-icons">edit</i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger d-flex align-items-center justify-content-center py-2"
                                        onClick={() => {
                                            handleDeleteProduct(product.idProduct);
                                        }}
                                    >
                                        <i className="material-icons">delete</i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Productos;
