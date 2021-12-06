import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: "#122024",
  },
  skip: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
    alignSelf: "flex-end",
    margin: 15,
    width: 100,
    height: 40,
  },
});
