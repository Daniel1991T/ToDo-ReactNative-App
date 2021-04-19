import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";
import AsyncStorage  from '@react-native-community/async-storage'

const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(input: { email: $email, password: $password, name: $name }) {
      token
      user {
        id
        name
      }
    }
  }
`;

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);
  // mutation[0]: A function to trigger the mutation
  // mutation[1]: result object
  // { data, error, loading }

  useEffect(() => {
    if (error) {
      Alert.alert('Error signing up. Try again!')
    }
  }, [error])
  useEffect(() => {
    if(data) {
      // save token and redirect Home
      AsyncStorage
        .setItem('token', data.signUp.token)
        .then(() => navigation.navigate('Home'))
    }
  }, [data])

  const onSubmit = async () => {
    try {
    await signUp({variables: { name, email, password}})
    } catch (e) {
      console.error(e)
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor={"#7f8c8d"}
      />
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
      <TouchableOpacity disabled={loading} style={styles.buttonSignIn} onPress={onSubmit}>
        {loading && <ActivityIndicator color="white" />}
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSignUp}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={{ color: "#c0392b", fontSize: 18 }}>
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

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
