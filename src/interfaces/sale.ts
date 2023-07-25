import { Product } from './product';

export interface Sale {
    id?: number;
    folio: string;
    total: string;
    items: Product[];
    completed: boolean;
    date: Date;
}
