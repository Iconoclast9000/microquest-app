import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { getCurrentLocation } from '../services/location';

const CreateQuestScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');

  const handleCreateQuest = async () => {
    try {
      const location = await getCurrentLocation();
      // TODO: Implement quest creation with backend
      Alert.alert('Success', 'Quest created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create quest. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Quest Title"
        value={title}
        onChangeText={setTitle}
        maxLength={50}
      />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Quest Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        maxLength={500}
      />
      <TextInput
        style={styles.input}
        placeholder="Reward Points"
        value={reward}
        onChangeText={setReward}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateQuest}
        disabled={!title || !description || !reward}
      >
        <Text style={styles.buttonText}>Create Quest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  multiline: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateQuestScreen;