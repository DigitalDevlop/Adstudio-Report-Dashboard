import {authRegister} from '../../../common/axiosCall';

export const register = async (data, callback) => {
  try {
    const response = await authRegister(data);

    if (response.status === 200) {
      console.log('register successful');
      if (callback) callback(200);
    } else {
      console.error('Registration failed. Please check your input details.');
      if (callback) callback(response.status);
    }
  } catch (error) {
    console.error('An error occurred while making the register request.', error);
    if (callback) callback(500);
  }
};

