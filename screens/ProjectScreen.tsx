import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, FlatList, Alert, Pressable } from "react-native";
import ProjectItem from "../components/ProjectItem";
import { View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { useQuery, gql } from "@apollo/client";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MY_PROJECTS = gql`
query myProjects {
  myProjects {
    id
    title
    createdAt
  }
}
`;

export default function ProjectScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{marginRight: 10}} onPress={() => navigation.navigate("Setting")}>
          <MaterialCommunityIcons name="account-settings" size={24} color="white" />
        </Pressable>
      )
    })
  }, [navigation])

  const [project, setProject] = useState([]);
  const {data, error, loading} = useQuery(MY_PROJECTS);
  useEffect(() => {
    if(error) {
      Alert.alert('Error fetching projects', error.message);
    }
  }, [error]);
  console.log(error)
  console.log(data)
  useEffect(() => {
    if(data) {
      setProject(data.myProjects);
    }
  },[data])
  return (
    <View style={styles.container}>
      <FlatList
        data={project}
        renderItem={({ item }) => <ProjectItem project={item} />}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
