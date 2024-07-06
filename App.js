// App.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Task from './components/Task';
import { db } from './firebase';
import { ref, onValue, set } from 'firebase/database';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const tasksRef = ref(db, 'tasks');
    onValue(tasksRef, (snapshot) => {
      const tasksData = snapshot.val();
      if (tasksData) {
        const tasksList = Object.keys(tasksData).map(key => ({
          id: key,
          title: tasksData[key].title,
          status: tasksData[key].status
        }));
        setTasks(tasksList);
      } else {
        setTasks([]);
      }
    });
  }, []);

  const addTask = async () => {
    if (title.trim()) {
      await set(ref(db, 'tasks/' + Date.now()), { title: title, status: 'due' });
      setTitle('');
    }
  };

  const deleteTask = async (id) => {
    await set(ref(db, 'tasks/' + id), null);
  };

  const toggleTaskStatus = async (id, currentStatus, currentTitle) => {
    const newStatus = currentStatus === 'due' ? 'done' : 'due';
    await set(ref(db, 'tasks/' + id), { title: currentTitle, status: newStatus });
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Task Title" 
        value={title} 
        onChangeText={setTitle} 
      />
      <Button title="Add Task" onPress={addTask} disabled={!title.trim()} />
      <FlatList 
        data={tasks} 
        renderItem={({ item }) => (
          <Task task={item} onDelete={() => deleteTask(item.id)} onToggleStatus={() => toggleTaskStatus(item.id, item.status, item.title)} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default App;



