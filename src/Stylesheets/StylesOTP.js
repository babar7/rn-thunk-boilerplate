import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  resend: {
    width: "85%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otp: {
    width: "20%",
    height: 55,
    fontFamily: "SF-Regular",
    fontSize: 30,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#738388",
    borderRadius: 7,
  },
  loginBtn: {
    width: "25%",
    height: "100%",
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "flex-end",
    borderRadius: 7,
  },
  placeholderTop: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
  },
  placeholderTopText: {
    fontFamily: "SF-Regular",
    fontSize: 25,
    color: "white",
  },

  placeholderTopText2: {
    fontFamily: "SF-Regular",
    fontSize: 20,
    color: "white",
    alignSelf: "center",
  },

  placeholderBox: {
    width: "100%",
    height: "30%",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "white",
    paddingLeft: 7,
  },

  otpBox: {
    width: "100%",
    height: 120,
    paddingHorizontal: 20,
    borderRadius: 7,
    alignItems: "center",
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  emailWholeBox: {
    justifyContent: "space-between",
    marginTop: 10,
    width: "90%",
    height: "60%",
  },

  loginText: {
    fontFamily: "SF-Regular",
    fontSize: 43,
    color: "white",
    flexDirection: "row",
  },

  backArrow1: {
    width: "90%",
    // height: "12%",
    justifyContent: "center",
    paddingVertical: 20,
  },

  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },

  skip: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
    alignSelf: "flex-end",
    margin: 15,
    marginRight: 10,
    width: 100,
    height: 40,
  },

  halfScreen: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    borderColor: "red",
  },

  smText: {
    color: "white",
    fontFamily: "SF-SemiBold",
    fontSize: 20,
    fontWeight: "bold",
  },
  smText2: {
    color: "white",
    fontFamily: "SF-Regular",
    fontSize: 18,
    alignSelf: "center",
  },
  smText3: {
    color: "white",
    fontFamily: "SF-Regular",
    fontSize: 18,
    alignSelf: "center",
  },

  lgText: {
    color: "white",
    fontFamily: "SF-SemiBold",
    fontSize: 45,
    fontWeight: "bold",
  },

  lowerHalfScreen: {
    width: "100%",
    height: "40%",
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 40,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
