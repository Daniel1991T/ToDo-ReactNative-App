import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    backgroundColor: "black",
    borderRadius: 75,
  },
  container: {
    height: 150,
    width: 150,
    backgroundColor: "black",
  },
  editImage:{
    alignItems: "center",
    justifyContent: 'center',
    marginTop: "75%",
    marginLeft: "75%",
    backgroundColor: 'red',
    borderRadius: 12,
    width: 30,
    height: 30,
  }
});

export default styles;
