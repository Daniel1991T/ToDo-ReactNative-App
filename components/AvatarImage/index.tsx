import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Pressable, Image, View, Alert } from "react-native";
import styles from "./style";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useQuery, useMutation, gql } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const UPDATE_AVATAR = gql`
  mutation updateAvatar($avatar: String!) {
    updateAvatar(avatar: $avatar) {
      id
      email
      name
      avatar
    }
  }
`;

interface User {
  name: string;
    email: string;
    avatar: string;
}

const initialUser = {
  name: "User Example",
  email: "example@gmail.com",
  avatar: "",
};

interface AvatarImageProps {
  setUser: Dispatch<SetStateAction<User>>;
  user: User;
}

const AvatarImage = (props: AvatarImageProps) => {
  const { setUser, user } = props;
  const [selectedImage, setSelectedImage] = useState("");
  const [updateAvatar, { data: avatarData, error: avatarError }] = useMutation(
    UPDATE_AVATAR
  );
    console.log(user)
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
      base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    const manipResult = await ImageManipulator.manipulateAsync(
      pickerResult.uri,
      [{ resize: { width: 720, height: 720 } }],
      { compress: 0.7, base64: true }
    );
    const base64Img = `data:image/jpeg;base64,${manipResult.base64}`;
    const apiUrl = "https://api.cloudinary.com/v1_1/dunmfhbir/image/upload";
    const data = {
      file: base64Img,
      upload_preset: "taskade_avatar",
    };
    fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data.url);
        updateAvatar({ variables: { avatar: data.url } });
        setSelectedImage(data.url);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Upload avatar failed!");
      });
  };

  return (
    <View style={styles.container}>
      {!user.avatar ? (
        <Pressable onPress={() => openImagePicker()}>
          <EvilIcons name="user" size={100} color="white" />
        </Pressable>
      ) : (
        <View>
          <Image source={{ uri: user.avatar }} style={styles.image} />
          <Pressable style={styles.editImage} onPress={() => openImagePicker()}>
            <AntDesign name="edit" size={24} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default AvatarImage;
