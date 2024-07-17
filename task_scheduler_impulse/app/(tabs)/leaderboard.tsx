import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getLeaderboard } from '../../services/TaskService';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [timePeriod, setTimePeriod] = useState('daily');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(timePeriod);
        console.log('Fetched data:', data);
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    console.log('Fetching leaderboard for:', timePeriod);
    fetchLeaderboard();
  }, [timePeriod]);

  const renderLeaderboardItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>User: {item.userName}</Text>
      <Text>Completed Tasks: {item.completedTasks}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setTimePeriod('daily')}>
          <Text style={[styles.button, timePeriod === 'daily' && styles.selectedButton]}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTimePeriod('weekly')}>
          <Text style={[styles.button, timePeriod === 'weekly' && styles.selectedButton]}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTimePeriod('monthly')}>
          <Text style={[styles.button, timePeriod === 'monthly' && styles.selectedButton]}>Monthly</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.userName}
        renderItem={renderLeaderboardItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    padding: 10,
  },
  selectedButton: {
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default Leaderboard;
