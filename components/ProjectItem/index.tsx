import React from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";

interface ProjectItemProps {
  project: {
    id: string,
    title: string,
    createdAt: string
  }
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const { id, title, createdAt} = project;

  const onPress = () => {
    console.warn(`open project ${title}`)
  }

  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="file-outline" size={24} color="grey" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{createdAt}</Text>
      </View>
    </Pressable>
  );
};

export default ProjectItem;