import axios from 'axios';
import { useSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
})

// const token = Cookies.get('token')
// const session = await auth()
// const session = useSession()

// const token = session?.data?.accessToken
// if (token) {
//   api.defaults.headers.common['Authorization'] = `bearer ${token}`;
// }

export default api;