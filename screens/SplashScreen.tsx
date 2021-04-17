import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "@expo-google-fonts/inter";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  let [fontsLoaded] = useFonts({
    "DelaGothicOan-Regular": require("../assets/fonts/DelaGothicOne-Regular.ttf"),
  });
  const navigation = useNavigation();
  useEffect(() => {
    if (isAuthentication()) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("SignIn");
    }
  }, []);
  const isAuthentication = () => {
    return true;
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
    fontFamily: "DelaGothicOan-Regular",
  },
});
