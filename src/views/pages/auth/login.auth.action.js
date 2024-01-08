import {authLogin} from '../../../common/axiosCall';

export const login = async (data, callback) => {
  try {
    const response = await authLogin(data);

    if (response.status === 200) {
      console.log('Login successful');
      if (callback) callback(200);
    } else {
      console.error('Login failed. Please check your credentials.');
      if (callback) callback(response.status);
    }
  } catch (error) {
    console.error('An error occurred while making the login request.', error);
    if (callback) callback(500);
  }
};



