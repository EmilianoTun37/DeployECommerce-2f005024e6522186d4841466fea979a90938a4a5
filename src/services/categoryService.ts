import { Category } from '../interfaces';
import * as http from './httpService';
const endpoint = '/api/category';

export async function getCategories(): Promise<Category[]> {
    return await http.httpGet(endpoint.concat('/list'));
}

export async function addCategory(category): Promise<string> {
    return await http.httpPost(endpoint.concat('/add'), category);
}

export async function editCategory(category): Promise<string> {
    return await http.httpPut(endpoint.concat('/edit'), category);
}

export async function deleteCategory(id): Promise<string> {
    return await http.httpDelete(endpoint.concat('/delete'), id);
}
