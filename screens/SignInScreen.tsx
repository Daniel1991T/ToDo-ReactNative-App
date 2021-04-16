import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const onSubmit = () => {
    // submit
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Taskade Clone</Text>
      <TextInput
        placeholder="exemple@gmail.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={"#7f8c8d"}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor={"#7f8c8d"}
      />
      <TouchableOpacity style={styles.buttonSignIn} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSignUp}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={{ color: "#c0392b", fontSize: 18 }}>
          New here? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    color: "white",
    fontSize: 18,
    width: "100%",
    marginVertical: 12,
  },
  buttonSignIn: {
    backgroundColor: "#c0392b",
    borderRadius: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginVertical: 15,
  },
  buttonSignUp: {
    borderRadius: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  title: {
    color: "#c0392b",
    alignItems: "center",
    fontSize: 24,
  },
});
