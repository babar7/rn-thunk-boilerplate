import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  placeholderBox: {
    width: "100%",
    padding: 10,
    fontSize: 18,
    color: "#000",
    fontFamily: "SF-Regular",
    backgroundColor: "white",
  },
  user: {
    justifyContent: "space-between",
    justifyContent: "center",
    left: 20,
    textAlign: "center",
  },

  loginBtn: {
    width: "90%",
    height: 50,
    marginTop: 12,
    backgroundColor: "#FF2632",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 20,
  },

  smText2: {
    color: "white",
    fontFamily: "SF-Regular",
    fontSize: 22,
    alignSelf: "center",
    justifyContent: "center",
  },

  forgot: {
    width: "90%",
    height: "8%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  emailWholeBox: {
    marginTop: "3%",
    width: "90%",
    height: "70%",
  },

  loginText: {
    fontFamily: "SF-SemiBold",
    fontSize: 25,
    fontWeight: "600",
    //paddingLeft:7,
    alignSelf: "center",
    color: "#060606",
  },

  backArrow: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  userSignup: {
    width: "100%",
    height: 70,
    textAlign: "center",
    borderBottomWidth: 0,
    borderBottomColor: "#cecece",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#cecece",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },

  halfScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderColor: "red",
  },
});
