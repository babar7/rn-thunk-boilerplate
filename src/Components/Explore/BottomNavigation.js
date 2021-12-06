import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import * as Font from "expo-font";

class BottomNavigation extends Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      t2: require("../../assets/fonts/source-sans-pro.light.ttf"),
      t1: require("../../assets/fonts/SourceSansPro-Semibold.ttf"),
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    if (this.state.fontLoaded == false) {
      return (
        <View>
          <Text>{""}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.navigationView}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              this.props.navigation.navigate("Home");
              // this.setState({selectedIcon: "home"});
            }}
          >
            <Image
              style={{ width: 15, height: 15, resizeMode: "contain" }}
              source={require("../../assets/images/Icons/bottom_nav/home.png")}
            ></Image>
            <Text style={styles.touchableText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              this.props.navigation.navigate("ExplorePage");
            }}
          >
            <Image
              style={{ width: 15, height: 15, resizeMode: "contain" }}
              source={require("../../assets/images/Icons/bottom_nav/search.png")}
            ></Image>

            <Text style={styles.touchableText}>Explore</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              this.props.navigation.navigate("WatchList");
            }}
          >
            <Image
              style={{ width: 15, height: 15, resizeMode: "contain" }}
              source={require("../../assets/images/Icons/bottom_nav/star.png")}
            ></Image>
            <Text style={styles.touchableText}>Watchlist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              this.props.navigation.navigate("MainChat");
              // this.setState({selectedIcon: "pay"});
            }}
          >
            <Image
              style={{ width: 15, height: 15, resizeMode: "contain" }}
              source={require("../../assets/images/Icons/bottom_nav/chat.png")}
            ></Image>
            <Text style={styles.touchableText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              this.props.navigation.navigate("MyProfile");
              // this.setState({selectedIcon: "pay"});
            }}
          >
            <Image
              style={{ width: 15, height: 15, resizeMode: "contain" }}
              source={require("../../assets/images/Icons/bottom_nav/user.png")}
            ></Image>
            <Text style={styles.touchableText}>Profile</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export default BottomNavigation;

const styles = StyleSheet.create({
  navigationView: {
    width: "100%",
    height: "7%",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignSelf: "flex-end",
    //position:"absolute",
    //zIndex:4,
    bottom:0,
    // borderWidth:3,
    borderColor: "red",


    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height:2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 40,

    elevation: 5,
  },

  black: { color: "#404040" },
  red: { color: "red" },
  touch: {
    height: "100%",
    flex: 1,
    // width: 90,
    // borderWidth:2,
    // borderColor:'blue',
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    // borderWidth:2,
    borderColor: "black",
    alignItems: "center",
    // borderRadius:50,

    justifyContent: "center",
  },
  touchableText: {
    // color: "#B22023",
    color: "black",
    fontSize: 15,
    // fontWeight: "bold",
    fontFamily: "SF-Regular",
    marginTop: 3,
  },
});