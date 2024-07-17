import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(task.imageUrl || null);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setImageUri(task.imageUrl || null);
  }, [task]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImageUri(uri);
      const response = await fetch(uri);
      const blob = await response.blob();
      setImage(blob);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUri(null);
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Title and description cannot be empty.');
      return;
    }
    onSubmit({ title, description, imageUrl: imageUri, createdAt: task.createdAt }, image);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Pick Image" onPress={handlePickImage} />
      {imageUri && (
        <View>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button title="Remove Image" onPress={handleRemoveImage} />
        </View>
      )}
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default TaskForm;
