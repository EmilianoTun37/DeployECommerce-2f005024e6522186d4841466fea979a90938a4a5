import { User, UserLogin } from '../interfaces';
import * as http from './httpService';
const endpoint = '/api/users';

export async function login(userLogin): Promise<UserLogin> {
    return await http.httpPost(endpoint.concat('/login'), userLogin);
}

export async function register(user): Promise<User> {
    return await http.httpPost(endpoint.concat('/register'), user);
}

