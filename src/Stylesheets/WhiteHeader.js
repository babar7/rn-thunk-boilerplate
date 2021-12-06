import { StyleSheet } from "react-native";
export const stylesHead = StyleSheet.create({
  topHeader: {
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
  topHeader1: {
    width: "100%",
    height: 70,
    textAlign: "center",
    flexDirection: "row",
    justifyContent:'space-between',
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
  backArrow: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  user: {
    justifyContent: "center",
    // left: 35,
    textAlign: "center",
    alignItems: 'center'
  },
  user1: {
    justifyContent: "center",
    left: 60,
    textAlign: "center",
  },
  user2: {
    justifyContent: "center",
    left: 10,
    textAlign: "center",
  },
  headText: {
    fontFamily: "SF-SemiBold",
    fontSize: 25,
    fontWeight: "600",
    alignSelf: "center",
    color: "#060606",
  },
  headText1: {
    fontFamily: "SF-SemiBold",
    fontSize: 22,
    fontWeight: "600",
    alignSelf: "center",
    color: "#060606",
  },
  listTitleContainer: {
    justifyContent: "center",
    left: 25,
    textAlign: "center",
    alignItems: 'center'
  },
  genreTitleContainer: {
    justifyContent: "center",
    left: 40,
    textAlign: "center",
    alignItems: 'center'
  },
  genreTitleContainer1: {
    justifyContent: "center",
    // left: 40,
    textAlign: "center",
    alignItems: 'center'
  },
  favMoviesContainer1: {
    justifyContent: "center",
    left: 0,
    textAlign: "center",
    alignItems: 'center'
  },
});
