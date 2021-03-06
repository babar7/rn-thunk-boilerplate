import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    section: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#F7F8FA",
        borderTopWidth: 1,
        borderTopColor: "#cecece",
        width: "100%",
        height: 40,
        paddingHorizontal: 20,
      },
      sectionText: {
        paddingLeft: 10,
        fontWeight: "bold",
        fontFamily: "SF-SemiBold",
        fontSize: 16,
        paddingVertical: 10,
      },
      item: {
        padding: 20,
        marginVertical: 0,
        marginHorizontal: 0,
        flex: 1,
        flexDirection: "row",
        borderColor: "#cecece",
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
      },
      title1: {
        fontFamily: "SF-SemiBold",
        fontSize: 16,
        color: "#738388",
        width: "100%",
        marginLeft: 15,
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
      saveBtn: {
        width: "16%",
        height: "50%",
        borderRadius: 5,
        borderColor: "#D6D6D6",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        marginHorizontal: 15,
      },
      searchView: {
        flexDirection: "row",
        width: "100%",
        height: 70,
        paddingHorizontal: 20,
        alignItems: "center",
      },
      searchBar: {
        marginLeft: 15,
        marginTop: 5,
        width: "100%",
        borderWidth: 0,
        height: 40,
        justifyContent: "center",
      }
});
