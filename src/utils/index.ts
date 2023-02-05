import axios from 'axios';
import jwtDecode from 'jwt-decode';
import user from 'sanity-backend/schemas/user';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any,addUser:any) => {
  const decoded:{name:string,picture:string,sub:string} =jwtDecode(response.credential);
  
  
  // destruction from decoded
  const{name,picture,sub} =decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };

  addUser(user);
  await axios.post(`${BASE_URL}/api/auth`,user)
};