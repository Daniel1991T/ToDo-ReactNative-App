import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);

  useEffect(() => {
    if (error) {
      Alert.alert("Invalid credentials. Try again!");
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      // save token and redirect Home
      AsyncStorage.setItem("token", data.signIn.token).then(() =>
        navigation.navigate("Home")
      );
    }
  }, [data]);

  const onSubmit = () => {
    signIn({ variables: { email, password } });
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
