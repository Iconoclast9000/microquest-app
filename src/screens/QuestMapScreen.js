import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import MapView from 'react-native-maps';
import { getNearbyQuests } from '../services/quest';
import QuestMarker from '../components/QuestMarker';
import QuestDetails from '../components/QuestDetails';
import CreateQuestButton from '../components/CreateQuestButton';

const QuestMapScreen = ({ navigation }) => {
  const [quests, setQuests] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    loadNearbyQuests();
  }, []);

  const loadNearbyQuests = async () => {
    const nearbyQuests = await getNearbyQuests();
    setQuests(nearbyQuests);
  };

  const handleQuestPress = (quest) => {
    setSelectedQuest(quest);
  };

  const handleAcceptQuest = () => {
    // TODO: Implement quest acceptance logic
    setSelectedQuest(null);
    navigation.navigate('QuestDetails', { quest: selectedQuest });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {quests.map(quest => (
          <QuestMarker
            key={quest.id}
            quest={quest}
            onPress={handleQuestPress}
          />
        ))}
      </MapView>

      <CreateQuestButton
        onPress={() => navigation.navigate('CreateQuest')}
      />

      <Modal
        visible={!!selectedQuest}
        transparent={true}
        animationType="slide"
      >
        {selectedQuest && (
          <View style={styles.modalContainer}>
            <QuestDetails
              quest={selectedQuest}
              onAccept={handleAcceptQuest}
              onClose={() => setSelectedQuest(null)}
            />
          </View>
        )}
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
});

export default QuestMapScreen;