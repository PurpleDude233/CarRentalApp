import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Car Rental App</Text>
      <Text style={styles.subtitle}>Rent your dream car with ease</Text>
      <Button title="Explore Cars" onPress={() => router.push('/explore')} />
      <Button title="View Profile" onPress={() => router.push('/profile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
});
