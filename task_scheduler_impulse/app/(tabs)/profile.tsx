import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useSession } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ProfileScreen = () => {
  const { signOut, user } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [goals, setGoals] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name || '');
          setGoals(userData.goals || '');
        } else {
          // If no user data exists, set the displayName from the auth user
          setName(user.displayName || '');
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSave = async () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { name, goals }, { merge: true });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/signin'); // Redirect to sign-in screen after sign out
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Goals"
        value={goals}
        onChangeText={setGoals}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Sign Out" onPress={handleSignOut} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
});

export default ProfileScreen;
