import React from "react";
import { View, Image, Text } from "react-native";

const ListEmpty = ({ emptyListMsg = "No Data Found" }) => (
  <View style={styles.container}>
    <Image source={require("./icons/list_empty.png")} style={styles.icon} />
    <Text style={styles.description}>{emptyListMsg}</Text>
  </View>
);

const styles = {
  icon: { width: 120, height: 120, resizeMode: "contain" },
  container: {
    padding: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    marginTop: 8,
    fontSize: 19,
    color: "gray",
    fontWeight: "bold",
  },
};

export default ListEmpty;
