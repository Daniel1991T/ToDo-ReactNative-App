import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import AvatarImage from '../components/AvatarImage';

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      email
      avatar
    }
  }
`;

const initialUser = {
  name: "User Example",
  email: "example@gmail.com",
  avatar: "",
};

const SettingScreen = () => {
  const [user, setUser] = useState(initialUser);
  const { data, error, loading } = useQuery(GET_USER);
  

  useEffect(() => {
    if (error) {
      Alert.alert(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setUser(data.getUser);
    }
  }, [data]);

  return (
    <View>
      <View style={styles.imageContainer}>
          <AvatarImage user={user} setUser={setUser}/>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  avatar: {
    height: 150,
    width: 150,
    backgroundColor: "black",
    borderRadius: 75,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
});
