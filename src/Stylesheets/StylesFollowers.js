import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  halfScreen: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    borderColor: "red",
  },
  smText2: {
    color: "white",
    fontFamily: "SF-SemiBold",
    fontSize: 16,
    alignSelf: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  item: {
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 0,
    flex: 1,
    flexDirection: "row",
    borderColor: "#738388",
    borderTopWidth: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "SF-SemiBold",
    fontSize: 18,
    color: "#ffffff",
    width: "40%",
    marginLeft: 20,
  },
  followBtn: {
    backgroundColor: "transparent",
    width: "100%",
    height: 25,
    marginTop: 3,
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  chatBtn: {
    backgroundColor: "#FF2632",
    width: "100%",
    height: 25,
    marginTop: 3,
    justifyContent: "center",
    borderRadius: 5,
  },
});
