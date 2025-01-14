import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useState } from 'react';

interface User {
  username: string;
  password: string;
}

interface Car {
  brand: string;
  model: string;
  year: number;
  fuel: string;
  pricePerDay: string;
}

export default function DashboardScreen() {
  const [newUser, setNewUser] = useState<Partial<User>>({});
  const [newCar, setNewCar] = useState<Partial<Car>>({});

  const addUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log(`User added: ${newUser.username}`);
        Alert.alert('Success', 'User added successfully.');
        setNewUser({});
      } else {
        console.error('Failed to add user.');
        Alert.alert('Error', 'Failed to add user.');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', 'An error occurred while adding the user.');
    }
  };

  const addCar = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });

      if (response.ok) {
        console.log(`Car added: ${newCar.brand} ${newCar.model}`);
        Alert.alert('Success', 'Car added successfully.');
        setNewCar({});
      } else {
        console.error('Failed to add car.');
        Alert.alert('Error', 'Failed to add car.');
      }
    } catch (error) {
      console.error('Error adding car:', error);
      Alert.alert('Error', 'An error occurred while adding the car.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.addUserContainer}>
        <Text style={styles.addTitle}>Add New User</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#b0b0c3"
          value={newUser.username || ''}
          onChangeText={(text) => setNewUser({ ...newUser, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#b0b0c3"
          secureTextEntry
          value={newUser.password || ''}
          onChangeText={(text) => setNewUser({ ...newUser, password: text })}
        />
        <TouchableOpacity style={styles.addButton} onPress={addUser}>
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addCarContainer}>
        <Text style={styles.addTitle}>Add New Car</Text>
        <TextInput
          style={styles.input}
          placeholder="Brand"
          placeholderTextColor="#b0b0c3"
          value={newCar.brand || ''}
          onChangeText={(text) => setNewCar({ ...newCar, brand: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          placeholderTextColor="#b0b0c3"
          value={newCar.model || ''}
          onChangeText={(text) => setNewCar({ ...newCar, model: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          placeholderTextColor="#b0b0c3"
          keyboardType="numeric"
          value={newCar.year ? String(newCar.year) : ''}
          onChangeText={(text) => setNewCar({ ...newCar, year: parseInt(text) })}
        />
        <TextInput
          style={styles.input}
          placeholder="Fuel"
          placeholderTextColor="#b0b0c3"
          value={newCar.fuel || ''}
          onChangeText={(text) => setNewCar({ ...newCar, fuel: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Price Per Day"
          placeholderTextColor="#b0b0c3"
          value={newCar.pricePerDay || ''}
          onChangeText={(text) => setNewCar({ ...newCar, pricePerDay: text })}
        />
        <TouchableOpacity style={styles.addButton} onPress={addCar}>
          <Text style={styles.addButtonText}>Add Car</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e2e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  addUserContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#2b2b44',
    borderRadius: 10,
  },
  addCarContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#2b2b44',
    borderRadius: 10,
  },
  addTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#3b3b5c',
    borderWidth: 1,
    backgroundColor: '#2b2b44',
    borderRadius: 10,
    color: '#fff',
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 15,
    backgroundColor: '#4e4ecb',
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
