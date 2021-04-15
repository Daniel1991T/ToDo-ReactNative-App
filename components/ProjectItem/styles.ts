import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#1e1f1e",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    marginRight: 5,
    color: 'white'
  },
  time: {
    color: "darkgrey",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default styles;
