import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  KeyboardAvoidingView,
  Platform,
  ScrollView 
} from "react-native";
import Checkbox from "../CheckBox";

interface TodoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
  onSubmit: () => void;
}

const ToDoItem = ({ todo, onSubmit }: TodoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState("");

  const input = useRef(null);

  useEffect(() => {
    if (!todo) {
      return;
    }
    setIsChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);
  useEffect(() => {
    if (input.current) {
      // get focus on input
      input?.current?.focus();
    }
  }, [input]);

  const onKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (event.nativeEvent.key === "Backspace" && content === "") {
      // Delete item
      console.warn("Delete item");
    }
  };

  return (
    
      <View style={styles.container}>
        <Checkbox
          isChecked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
        />
        <TextInput
          ref={input}
          value={content}
          onChangeText={setContent}
          style={styles.textInput}
          multiline
          onSubmitEditing={onSubmit}
          blurOnSubmit
          onKeyPress={onKeyPress}
        />
      </View>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
    color: "white",
  },
});
