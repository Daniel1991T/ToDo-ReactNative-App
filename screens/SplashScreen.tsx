import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkUser = async () => {
      if (await isAuthentication()) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("SignIn");
      }
    };
    checkUser()
  }, []);
  const isAuthentication = async () => {
    // await AsyncStorage.removeItem("token");
    const token = await AsyncStorage.getItem("token");
    console.log(token)
    return !!token;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Taskade Clone</Text>
      <ActivityIndicator color="white" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    marginVertical: 20,
    fontSize: 30,
  },
});
