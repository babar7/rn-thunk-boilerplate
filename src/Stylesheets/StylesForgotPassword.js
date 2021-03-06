import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    resetBtn: {
        width: "90%",
        height: 50,
        marginTop: 12,
        backgroundColor: "#FF2632",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 20,
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
      emailWholeBox: {
        marginVertical: 45,
        width: "90%",
        height: 90,
        borderColor: "blue",
      },
      loginText: {
        fontFamily: "SF-Regular",
        fontSize: 43,
        color: "white",
      },
      backArrow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      backArrow1: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 30,
      },
      container: {
        flex: 1,
        alignSelf: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      },
      halfScreen: {
        width: "100%",
        height: "60%",
        alignItems: "center",
        borderColor: "red",
      },
      btnText: {
        fontFamily: "SF-Regular",
        fontSize: 22,
        color: "#fff",
        alignSelf: "center",
        justifyContent: "center",
      },
      imageStyle: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
      },
});
