import axios from 'axios';
import { SERVER_URL } from '@/config/global';

export const http = axios.create({
  baseURL: SERVER_URL,
});

export class HttpService {
  static async get(url: string, params: any = {}) {
    return await http.get(url, { params }).then(res => res.data);
  }

  static async post(url: string, data: any, params: any = {}) {
    return await http.post(url, data, { params }).then(res => res.data);
  }

  static async put(url: string, data: any, params: any = {}) {
    return await http.put(url, data, { params }).then(res => res.data);
  }

  static async delete(url: string, params: any = {}) {
    return await http.delete(url, { params }).then(res => res.data);
  }
}
