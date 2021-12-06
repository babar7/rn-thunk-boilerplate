import { StyleSheet, Dimensions } from "react-native";
let WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  pic: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
  },
  usersView: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "center",
  },
  itemStyle: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5,
    paddingHorizontal: 15,
  },
  picImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
  },
  nameContainer: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
  },
  userText: {
    fontWeight: "500",
    fontFamily: "SF-SemiBold",
    fontSize: 20,
    alignSelf: "center",
    alignContent: "center",
  },
  backIconImage: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  backIconBtn: {
    height: "100%",
    width: 50,
    justifyContent: "center",
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
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
    fontSize: 15,
    flex: 1,
  },
  searchContainer: {
    width: WIDTH,
    height: 60,
    flexDirection: "row",
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 1,
  },
  inputContainer: { height: "100%", width: "75%", justifyContent: "center" },
  iconContainer: {
    height: "100%",
    width: "25%",

    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SF-SemiBold",
  },
});
