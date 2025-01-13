import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  pricePerDay: string;
}

export default function CarsScreen() {
  const [expandedCarId, setExpandedCarId] = useState<string | null>(null);
  const [rentalOption, setRentalOption] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [showRentalOptions, setShowRentalOptions] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:5000/cars', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          console.error('Failed to fetch cars');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const toggleDetails = (id: string) => {
    setExpandedCarId(expandedCarId === id ? null : id);
  };

  const rentCar = (car: Car) => {
    console.log(`Rent Car triggered for ${car.brand} ${car.model}`);
    setShowRentalOptions(true);
  };

  const confirmRental = () => {
    if (rentalOption === 'delivery' && address.trim() === '') {
      setRentalOption('delivery');
      setShowRentalOptions(false);
      return;
    }
    setRentalOption(null);
    setAddress('');
    setShowRentalOptions(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Cars</Text>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.brand} {item.model}</Text>
            <Text style={styles.cardSubtitle}>{item.pricePerDay} per day</Text>
            <TouchableOpacity style={styles.detailsButton} onPress={() => toggleDetails(item.id)}>
              <Text style={styles.detailsButtonText}>{expandedCarId === item.id ? 'Hide Details' : 'View Details'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rentButton} onPress={() => rentCar(item)}>
              <Text style={styles.rentButtonText}>Rent Car</Text>
            </TouchableOpacity>
            {expandedCarId === item.id && (
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>Year: {item.year}</Text>
                <Text style={styles.detailsText}>Fuel: {item.fuel}</Text>
              </View>
            )}
          </View>
        )}
      />

      {showRentalOptions && (
        <View style={styles.rentalOptionsContainer}>
          <Text style={styles.sectionTitle}>Rental Options</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setRentalOption('delivery')}>
            <Text style={styles.optionButtonText}>Delivery to Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setRentalOption('pickup')}>
            <Text style={styles.optionButtonText}>Pick Up at Rental Place</Text>
          </TouchableOpacity>
          {rentalOption === 'delivery' && (
            <TextInput
              style={styles.input}
              placeholder="Enter Delivery Address"
              placeholderTextColor="#b0b0c3"
              value={address}
              onChangeText={setAddress}
            />
          )}
          <TouchableOpacity style={styles.confirmButton} onPress={confirmRental}>
            <Text style={styles.confirmButtonText}>Confirm Rental</Text>
          </TouchableOpacity>
        </View>
      )}
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
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3b3b5c',
    backgroundColor: '#2b2b44',
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#b0b0c3',
    marginBottom: 10,
  },
  detailsButton: {
    paddingVertical: 10,
    backgroundColor: '#4e4ecb',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  rentButton: {
    paddingVertical: 10,
    backgroundColor: '#6a6ac9',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  rentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailsText: {
    fontSize: 14,
    color: '#b0b0c3',
  },
  rentalOptionsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#2b2b44',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionButton: {
    paddingVertical: 10,
    backgroundColor: '#4e4ecb',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  confirmButton: {
    paddingVertical: 15,
    backgroundColor: '#4e4ecb',
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
