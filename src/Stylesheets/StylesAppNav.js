import { StyleSheet, Dimensions, Platform } from "react-native";
export const styles = StyleSheet.create({
  Container: {
    height: 250,
    backgroundColor: "transparent",
    opacity: 0.9,
    paddingTop: Platform.OS === "android" ? 30 : 20,
  },
  view1: { height: 150, alignItems: "center", justifyContent: "center" },
  ImageLetters: {
    alignItems: "center",
    width: Dimensions.get("window").width - 180,
    marginTop: 30,
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    padding: 4,
    color: "#fff",
    fontSize: 18,
    fontFamily: "SF-SemiBold",
    fontWeight: "normal",
  },
  name1: {
    padding: 4,
    color: "#fff",
    fontSize: 18,
    fontFamily: "SF-Regular",
    fontWeight: "normal",
  },
});
