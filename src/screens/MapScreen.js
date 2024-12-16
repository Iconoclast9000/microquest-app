import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getCurrentLocation } from '../services/location';

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    getCurrentLocation().then(location => {
      setRegion(prev => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateQuest')}
      >
        <Text style={styles.buttonText}>Create Quest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;