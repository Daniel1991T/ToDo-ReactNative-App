import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";


const initialUser = {
  name: "User Example",
  email: "example@gmail.com",
  avatar: "",
};

const SettingScreen = () => {
  const [user, setUser] = useState(initialUser);
  const [selectedImage, setSelectedImage] = useState("");
  
  useEffect(() => {
    setUser({
      ...initialUser,
      avatar: selectedImage,
    });
  }, [selectedImage]);

  const openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    const base64Img = `data:image/jpeg;base64,${pickerResult.base64}`;
    const apiUrl = 'https://api.cloudinary.com/v1_1/dunmfhbir/image/upload';
    const data = {
      file: base64Img,
      upload_preset: 'taskade_avatar'
    }
    fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async (response) => {
      const data = await response.json();
      console.log(data.url)
      setSelectedImage(data.url)
    }).catch(err => {
      console.log(err)
      Alert.alert("Upload avatar failed!")
    })
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        {!user.avatar && (
          <Pressable onPress={() => openImagePicker()}>
            <EvilIcons name="user" size={100} color="white" />
          </Pressable>
        )}
        {user.avatar !== "" && (
          <Image style={styles.avatar} source={{ uri: selectedImage }} />
        )}
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
    borderRadius: 75
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 30
  }
});
