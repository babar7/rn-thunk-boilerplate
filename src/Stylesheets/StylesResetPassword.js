import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  user: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  loginBtn: {
    width: "90%",
    height: 50,
    marginTop: 40,
    backgroundColor: "#FF2632",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  forgot: {
    width: "90%",
    height: "8%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  placeholderTop: {
    width: "100%",
    height: 30,
    justifyContent: "center",
  },
  placeholderTopText: {
    color: "white",
    fontSize: 18,
    fontFamily: "SF-Regular",
  },
  placeholderBox: {
    width: "100%",
    height: 50,
    color: "#fff",
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "white",
    paddingHorizontal: 15,
    fontFamily: "SF-Regular",
  },
  placeholderTopText2: {
    color: "white",
    fontSize: 25,
    fontFamily: "SF-Regular",
  },
  emailWholeBox: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    height: 80,
  },
  loginText: {
    fontFamily: "SF-Regular",
    fontSize: 43,
    color: "white",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
  },
  backArrow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  userSignup: {
    width: "90%",
    height: 80,
    justifyContent: "center",
  },
  container: {
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  halfScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderColor: "red",
  },
  smText2: {
    fontFamily: "SF-Regular",
    fontSize: 22,
    color: "#fff",
    alignSelf: "center",
    justifyContent: "center",
  },
  arrow: {
    justifyContent: "flex-start",
    // paddingRight: 50
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  eyeIcon: {
    position: "relative",
    top: -38,
    right: 10,
    alignSelf: "flex-end",
  },
});
