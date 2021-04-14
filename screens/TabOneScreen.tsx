import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Text, View } from "../components/Themed";
import Checkbox from "../components/CheckBox";
import TodoItem from "../components/ToDoItem";

let id = 13;

export default function ToDoScreen() {
  const [title, setTitle] = useState("New ToDo");
  const [todos, setTodos] = useState([
    {
      id: "1",
      content: "Buy milk",
      isCompleted: false,
    },
    {
      id: "2",
      content: "Buy cereals",
      isCompleted: false,
    },
    {
      id: "4",
      content: "Pour milk",
      isCompleted: false,
    },{
      id: "5",
      content: "Pour milk",
      isCompleted: false,
    },{
      id: "6",
      content: "Pour milk",
      isCompleted: false,
    },{
      id: "7",
      content: "Pour milk",
      isCompleted: false,
    },{
      id: "8",
      content: "Pour milk",
      isCompleted: false,
    },{
      id: "9",
      content: "Pour milk",
      isCompleted: false,
    },{
      id: "11",
      content: "Pour milk",
      isCompleted: false,
    },
  ]);

  const createNewTodo = (atIndex: number) => {
    const newTodo = [...todos];
    newTodo.splice(atIndex, 0, {
      id: id.toString(),
      content: "",
      isCompleted: false,
    });
    ++id;
    setTodos(newTodo);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 150}
      style={{flex: 1}}
    >
      <View style={styles.container}>
        <TextInput style={styles.title} value={title} onChangeText={setTitle} />
        <FlatList
          nestedScrollEnabled
          removeClippedSubviews={false}
          data={todos}
          renderItem={({ item, index }) => (
            <TodoItem todo={item} onSubmit={() => createNewTodo(index + 1)} />
          )}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={item => item.id}
          style={{ width: "100%" }}
        />
      </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },
  title: {
    fontSize: 20,
    width: "100%",
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
});
