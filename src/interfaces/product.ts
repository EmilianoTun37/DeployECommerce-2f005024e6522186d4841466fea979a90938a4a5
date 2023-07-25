import { Category } from '.';

export interface Product {
    idProduct?: number;
    nameProduct: string;
    price: number;
    stock: number;
    isActive: boolean;
    quantity? : number;
    imageProduct?: string;
    idCategory: number;
    oCategory: Category;
    descriptionProduct: string;
    total?: number;
}
