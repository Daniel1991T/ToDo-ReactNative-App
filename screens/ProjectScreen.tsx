import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
import ProjectItem from "../components/ProjectItem";
import { View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { useQuery, gql } from "@apollo/client";

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
