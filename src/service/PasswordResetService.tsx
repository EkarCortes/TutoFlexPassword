import axiosInstance from '../api/axiosConfig';


export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axiosInstance.post('/users/resetPassword', { token, newPassword });
    return { 
      success: true, 
      message: response.data.message || 'Contraseña actualizada correctamente' 
    };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Error al restablecer contraseña',
      errorCode: error.response?.status
    };
  }
};