import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

export default function ExploreScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPlaceholderData, setShowPlaceholderData] = useState(false);
  const router = useRouter();

  const placeholderData = [
    "Wide Variety of Vehicles: Choose from a fleet of sedans, SUVs, and luxury cars to suit your needs.",
    "Affordable Rates: Competitive daily, weekly, and monthly pricing.",
    "Convenient Pickup Locations: Rent from multiple locations across the city for ease of access.",
    "Flexible Rental Periods: Rent for a day, a week, or even a month—your choice.",
    "24/7 Support: Our customer care team is available around the clock to assist you.",
    "Weekend Deals: 20% off on weekend rentals.",
    "Early Bird Discounts: Book in advance and save up to 15%.",
    "Loyalty Program: Earn points for every rental and redeem them for discounts.",
    "Unlimited Mileage: Drive as far as you want without worrying about additional charges.",
    "Eco-Friendly Options: Electric and hybrid vehicles available for a greener drive.",
  ];

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/admin/check', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('Error verifying admin status:', error);
      }
    };

    checkAdminStatus();
  }, []);

  const features = [
    { id: '1', title: 'Browse Cars', description: 'Explore various car models available for rent.', route: '/cars' },
    ...(isAdmin ? [{ id: '2', title: 'Dashboard', description: 'Manage car availability.', route: '/dashboard' }] : []),
    { id: '3', title: 'Support', description: 'Contact our 24/7 customer support for assistance.', externalLink: 'https://wit.pwr.edu.pl/studenci/dziekanat/godziny-otwarcia' },
    { id: '4', title: 'Why Choose Us?', description: 'Learn about the benefits of renting with us.', placeholder: true },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Features</Text>
      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              if (item.route) {
                router.push(item.route);
              } else if (item.externalLink) {
                Linking.openURL(item.externalLink);
              } else if (item.placeholder) {
                setShowPlaceholderData(!showPlaceholderData);
              }
            }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      {showPlaceholderData && (
        <View style={styles.placeholderContainer}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          {placeholderData.map((point, index) => (
            <Text key={index} style={styles.placeholderText}>• {point}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
  cardDescription: {
    fontSize: 14,
    color: '#b0b0c3',
  },
  placeholderContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#b0b0c3',
    marginBottom: 10,
  },
});
