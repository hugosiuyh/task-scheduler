import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/TaskService';
import { auth } from '../../firebaseConfig';
import TaskForm from '../../components/TaskForm';
import { Image } from 'expo-image';

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false, createdAt: new Date(), userId: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (user) {
        const tasks = await getTasks(user.uid);
        setTasks(tasks);
        setNewTask((prevTask) => ({ ...prevTask, userId: user.uid }));
      }
    };
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTasks();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddTask = async (task, image) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    const createdTask = await createTask({ ...task, userId: user.uid, createdAt: new Date() }, image);
    if (createdTask) {
      setTasks([...tasks, createdTask]);
      setNewTask({ title: '', description: '', completed: false, createdAt: new Date(), userId: user.uid });
    }
  };

  const handleUpdateTask = async (id, task, image) => {
    await updateTask(id, task, image);
    setTasks(tasks.map(t => (t.id === id ? { ...t, ...task } : t)));
    setEditingTaskId(null);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = async (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    if (completedTask) {
      const completedAt = new Date();
      await updateTask(id, { ...completedTask, completed: true, completedAt });
      setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: true, completedAt } : task)));
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      {editingTaskId === item.id ? (
        <TaskForm
          task={item}
          onSubmit={(task, image) => handleUpdateTask(item.id, task, image)}
          onCancel={() => setEditingTaskId(null)}
        />
      ) : (
        <>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>Created At: {item.createdAt ? item.createdAt.toString() : 'N/A'}</Text>
          {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
          {item.completed && (
            <Text>Completed At: {item.completedAt ? item.completedAt.toString() : 'N/A'}</Text>
          )}
          {!item.completed && <Button title="Complete" onPress={() => handleCompleteTask(item.id)} />}
          <Button title="Edit" onPress={() => setEditingTaskId(item.id)} />
          <Button title="Delete" onPress={() => handleDeleteTask(item.id)} />
        </>
      )}
    </View>
  );

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const ListHeaderComponent = () => (
    <View>
      <TaskForm
        task={newTask}
        onSubmit={handleAddTask}
        onCancel={() => setNewTask({ title: '', description: '', completed: false, createdAt: new Date(), userId: '' })}
      />
      <Text style={styles.heading}>Incomplete Tasks</Text>
    </View>
  );

  const ListFooterComponent = () => (
    <View>
      <Text style={styles.heading}>Completed Tasks</Text>
    </View>
  );

  const tasksWithSeparators = [
    ...incompleteTasks,
    { isSeparator: true }, // Add a separator object
    ...completedTasks,
  ];

  const renderItem = ({ item }) => {
    if (item.isSeparator) {
      return <ListFooterComponent />;
    }
    return renderTask({ item });
  };

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      data={tasksWithSeparators}
      keyExtractor={(item, index) => item.id || index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default TaskListScreen;
