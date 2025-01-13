import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkAdminStatus = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await fetch('http://127.0.0.1:5000/admin/check', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return response.ok && data.isAdmin;
  } catch (error) {
    console.error('Error verifying admin status:', error);
    return false;
  }
};
