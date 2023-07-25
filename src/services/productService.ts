import { Product } from '../interfaces';
import * as http from './httpService';
const endpoint = '/api/product';

export async function getProducts(): Promise<Product[]> {
    return await http.httpGet(endpoint.concat('/list'));
}

export async function addProduct(product): Promise<Product> {
    return await http.httpPost(endpoint.concat('/add'), product);
}

export async function updateProduct(id): Promise<string> {
    return await http.httpPut(endpoint.concat('/update'), id);
}

export async function deleteProduct(id): Promise<string> {
    return await http.httpDelete(endpoint.concat('/delete'), id);
}
