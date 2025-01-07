import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        router.push('/login');
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.info}>Username: {username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
  },
});
