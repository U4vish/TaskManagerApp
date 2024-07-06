// components/Task.js

import React from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';

const Task = ({ task, onDelete, onToggleStatus }) => {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskTextContainer}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskStatus}>{task.status}</Text>
      </View>
      <Switch 
        value={task.status === 'done'} 
        onValueChange={() => onToggleStatus(task.id)} 
      />
      <Button title="Delete" onPress={() => onDelete(task.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  taskTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
  },
  taskStatus: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
});

export default Task;

