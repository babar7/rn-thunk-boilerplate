import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 0,
    flex: 1,
    flexDirection: "row",
    borderColor: "#738388",
    borderTopWidth: 0.5,
    alignItems: "center",
  },
  title: {
    fontFamily: "SF-SemiBold",
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
    width: "100%",
    marginLeft: 15,
    paddingTop: 5,
  },
  logoView: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: "#DFDFDF",
    width: 65,
    height: 65,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  logoImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    alignSelf: "center",
  },
  titleCheck: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
  listView: { height: "90%", width: "100%" },
});
