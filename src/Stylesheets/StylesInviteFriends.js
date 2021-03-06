import { StyleSheet, Dimensions } from "react-native";
let WIDTH = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  loginText: {
    fontFamily: "SF-SemiBold",
    fontSize: 25,
    textAlign: "center",
    alignSelf: "center",
    color: "#060606",
  },
  user: {
    justifyContent: "center",
    left: 60,
    textAlign: "center",
  },
  backArrow: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  userSignup: {
    width: "100%",
    height: 70,
    textAlign: "center",
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
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: "SF-Regular",
  },
  headerView: {
    flexDirection: "row",
    height: 60,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  selectedContainer: {
    alignItems: "center",
    height: 120,
    width: 120,
    borderRadius: 5,
    flexDirection: "column",
  },
  selectedContactsList: {
    minHeight: 70,
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  selectedContactsDivider: {
    width: 5,
    height: "100%",
  },
  nameText: {
    fontSize: 16,
    color: "black",
  },
  numberText: {
    fontSize: 17,
    color: "black",
  },
  contactsList: {
    flex: 1,
  },
  listView: {
    height: 90,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerView: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#D6D6D6",
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 25,
    height: 25,
    position: "absolute",
    right: -10,
    bottom: -10,
  },
  doneBtnView: {
    width: WIDTH,
    height: 80,
    // backgroundColor: "red",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#F6F5F3",
    borderTopColor: "grey",
    elevation: 1,
    borderTopWidth: 1,
  },
  doneBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF2632",
    width: WIDTH - 30,
    height: 50,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontFamily: "SF-Regular",
    fontSize: 22,
    alignSelf: "center",
    justifyContent: "center",
  },
  searchView: {
    width: WIDTH,
    height: 60,
    flexDirection: "row",
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 1,
  },
  searchImg: {
    height: "100%",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  }
});
