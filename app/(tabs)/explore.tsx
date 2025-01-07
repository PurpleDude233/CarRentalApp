import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function ExploreScreen() {
  const features = [
    { id: '1', title: 'Browse Cars', description: 'Explore various car models available for rent.' },
    { id: '2', title: 'Special Offers', description: 'Check out the latest discounts and offers.' },
    { id: '3', title: 'Support', description: 'Contact our 24/7 customer support for assistance.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Features</Text>
      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        )}
      />
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
    backgroundColor: '#f9f9f9',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});
