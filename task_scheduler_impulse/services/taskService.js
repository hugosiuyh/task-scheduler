import { db } from '../firebaseConfig';

export const addTask = async (task) => {
  await db.collection('tasks').add(task);
};

export const getTasks = async () => {
  const snapshot = await db.collection('tasks').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTask = async (id, updatedTask) => {
  await db.collection('tasks').doc(id).update(updatedTask);
};

export const deleteTask = async (id) => {
  await db.collection('tasks').doc(id).delete();
};
