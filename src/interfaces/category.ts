import { Product } from '.';

export interface Category {
    idCategory: number;
    nameCategory: string;
    descriptionCategory: string;
    products?: Product[];
}
