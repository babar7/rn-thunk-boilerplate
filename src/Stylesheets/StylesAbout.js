import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  halfScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    padding: 20,
  },
  textContent: {
    color: "#ffffff",
    opacity: 0.8,
    marginBottom: 22,
    textAlign: "left",
    fontSize: 16,
    fontFamily: "SF-Regular",
  },
});
