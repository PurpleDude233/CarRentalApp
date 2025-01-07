import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const [cars, setCars] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://127.0.0.1:5000/cars', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
        router.push('/login');
      }
    };

    fetchCars();
  }, []);

  const addToCart = (car) => {
    setCart((prevCart) => [...prevCart, car]);
    alert(`${car.model} added to cart!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Cars</Text>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.model}</Text>
            <Text>{item.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Go to Profile" onPress={() => router.push('/profile')} />
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
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
