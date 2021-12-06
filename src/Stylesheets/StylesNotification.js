import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  half: {
    width: "100%",
    height: 80,
    justifyContent: "center",
  },
  timeView: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
  },
  notificationView: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.8,
  },
  notificationTxt: {
    marginLeft: 15,
    marginTop: 5,
    width: "100%",
    borderWidth: 0,
    height: 40,
    justifyContent: "center",
  },
  box: {
    width: "100%",
    height: "24%",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#D6D6D6",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textInsideBox: {
    fontFamily: "SF-SemiBold",
    fontSize: 14,
  },

  movieBoxView: {
    marginTop: 10,
    width: "100%",
    height: 350,

    borderRadius: 7,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    padding: 10,
  },
  emailWholeBox: {
    marginTop: "3%",
    width: "90%",
    height: "20%",
    borderColor: "blue",
  },
  backArrow2: {
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
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  pic: {
    width: "15%",
    height: "100%",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  smText: {
    color: "#404040",
    fontFamily: "SF-SemiBold",
    fontSize: 12,
  },
  smText2: {
    fontFamily: "SF-SemiBold",
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
  },
  smText3: {
    fontFamily: "SF-SemiBold",
    fontSize: 13,
    color: "#738388",
  },
});
