import { StyleSheet } from "react-native";
export const StylesHeader = StyleSheet.create({
  headingText: {
    // fontFamily: "SF-SemiBold",
    // fontSize: 35,
    // alignSelf: "flex-start",
    // alignItems: "flex-start",
    // textAlign: "left",
    // color: "white",
    fontFamily: "SF-Regular",
    fontSize: 43,
    color: "white",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
  },
  backArrow: {
    width: "90%",
    height: 70,
    justifyContent: "center",
  },
  headerView: {
    flexDirection: "row",
    width: "90%",
    height: 50,
  },
  regularHeadingText: {
    fontFamily: "SF-Regular",
    fontSize: 35,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    color: "white",
  },
});
