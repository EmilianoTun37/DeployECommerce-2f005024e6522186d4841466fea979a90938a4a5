import { Link } from 'react-router-dom';
import { Category } from '../../interfaces';
import { useEffect, useRef, useState } from 'react';
import * as categoriesService from '../../services/categoryService';
import Swal from 'sweetalert2';

const Categoria = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const modal = useRef<HTMLDialogElement>(null);
    const [selected, setSelected] = useState<Category | null>(null);

    const openModal = (category: Category) => {
        setSelected(category);
        modal.current?.showModal();
    };

    useEffect(() => {
        async function getData() {
            try {
                const categoriesData = await categoriesService.getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.log('Error al obtener las categorias: ', error.message);
            }
        }
        getData();
    }, []);

    const handleEditCategory = async () => {
        try {

            if (!selected) return;

            await categoriesService.editCategory(selected);

            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.idCategory == selected.idCategory ? selected : category
                )
            );

            modal.current?.close();

            Swal.fire({
                icon: 'success',
                title: 'Categoría actualizada',
                text: 'La categoría ha sido actualizada correctamente',
            });
        } catch (error) {
            console.error('Error al editar la categoria: ', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al editar la categoria. Por favor, intente nuevamente.',
            });
        }
    };

    const handleDeleteCategory = async (idCategory: number) => {
        try {
            const result = await Swal.fire({
                icon: 'warning',
                title: '¿Estas seguro?',
                text: 'Esta accion eliminara la categoria de forma permanente',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
            });
            if (result.isConfirmed) {
                await categoriesService.deleteCategory(idCategory);

                setCategories((prevCategories) =>
                    prevCategories.filter((categorie) => categorie.idCategory !== idCategory)
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Categoria eliminada',
                    text: 'La categoria ha sido eliminado correctamente',
                });
            }
        } catch (error) {
            console.error('Error al eliminar la categoria: ', error.message);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al eliminar la categoria. Por favor, intente nuevamente.',
            });
        }
    };

    return (
        <>
            <dialog
                ref={modal}
                className="p-4"
            >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleEditCategory();
                    }}>
                    <span className="h5 mb-3 text-center d-block w-100">
                        Edit categoria
                    </span>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name categoria
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            value={selected?.nameCategory || ''}
                            onChange={(e) =>
                                setSelected((prevCategory) => ({
                                    ...prevCategory,
                                    nameCategory: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">
                            Description product
                        </label>
                        <textarea
                            name="descriptionCategory"
                            id="descriptionCategory"
                            className="form-control edit-desc"
                            value={selected?.descriptionCategory || ''}
                            onChange={(e) =>
                                setSelected((prevCategory) => ({
                                    ...prevCategory,
                                    descriptionCategory: e.target.value,
                                }))
                            }
                        ></textarea>
                    </div>
                    <div className="d-flex w-100 gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                modal.current?.close();
                            }}
                            className="btn btn-secondary w-100"
                        >
                            Close
                        </button>
                        <button className="btn btn-primary w-100" type="submit">
                            Editar
                        </button>
                    </div>
                </form>
            </dialog>
            <div className="container-fluid d-flex align-items-center justify-content-between h-100 py-3 px-4">
                <h3>Listado de categorias</h3>
                <Link className="btn btn-primary" to="/admin/categoria/agregar">
                    Agregar categoria
                </Link>
            </div>
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th scope="col" className="py-2 px-4">
                            Codigo
                        </th>
                        <th scope="col" className="py-2 px-4">
                            NombreCategoria
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Descripcion
                        </th>                    
                        <th scope="col" className="py-2 px-4">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((category, index) => (
                        <tr key={index}>
                            <td className="py-3 px-4">{category.idCategory}</td>
                            <td className="py-3 px-4">{category.nameCategory}</td>
                            <td className="py-3 px-4">{category.descriptionCategory}</td>
                            <td className="py-3 px-4">
                                <div className="d-flex gap-2 h-100 align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-success d-flex align-items-center justify-content-center py-2"
                                        onClick={() => {
                                            openModal(category);
                                        }}
                                    >
                                        <i className="material-icons">edit</i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger d-flex align-items-center justify-content-center py-2"
                                        onClick={() => handleDeleteCategory(category.idCategory)
                                        }
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

export default Categoria;
