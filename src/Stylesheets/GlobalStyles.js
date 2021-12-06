import { StyleSheet } from "react-native";
import { Metrics } from "../theme";
export const globalStyles = StyleSheet.create({
  postNotFound: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    height: 150,
    width: Metrics.screenWidth,
  },

  RBAvatar: {
    width: Metrics.widthRatio(60),
    height: Metrics.widthRatio(60),
    borderRadius: Metrics.widthRatio(60 / 2),
    marginHorizontal: 10,
  },

  // Header
  container: {
    flex: 1,
  },
  userSignup: {
    width: "100%",
    height: 70,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  backArrow: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  user: {
    justifyContent: "space-between",
    justifyContent: "center",
    left: 25,
    textAlign: "center",
  },
  loginText: {
    fontFamily: "heading",
    fontSize: 23,
    alignSelf: "center",
    color: "#060606",
  },
  // End
});
