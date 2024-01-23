import { http } from '@/services';

export const setupToken = (token: string | null) => {
  if (!token) {
    if (localStorage.getItem('token')) localStorage.removeItem('token');
    delete http.defaults.headers.Authorization;
  } else {
    localStorage.setItem('token', token);
    http.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
};
