import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  SafeAreaView,
  TextInput,
} from "react-native";
import { List, Divider } from "react-native-paper";
// import firestore from "@react-native-firebase/firestore";
import BottomNavigation from "./Explore/BottomNavigation";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../Stylesheets/StylesMainChat";

function Item({ title, image, description, time }) {
  return (
    <View style={styles.item}>
      <Image
        style={{
          width: 45,
          height: 45,
          resizeMode: "contain",
          //marginLeft: 7
        }}
        source={image}
      ></Image>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.listDescription}>{description}</Text>
      </View>
      <Text style={styles.listDescription}>{time}</Text>
    </View>
  );
}

export default class MainChat extends Component {
  state = {
    ChatList: [
      {
        id: "1",
        image: require("../assets/images/users/boy1.png"),
        title: "Bilal Hussain",
        description: "New Message",
        time: "Today",
      },
      {
        id: "2",
        image: require("../assets/girl3.png"),
        title: "Kiran Khan",
        description: "New Message",
        time: "Yesterday",
      },
      {
        id: "3",
        image: require("../assets/boy2.png"),
        title: "Noman Iqbal",
        description: "New Message",
        time: "Yesterday",
      },
      {
        id: "4",
        image: require("../assets/girl2.png"),
        title: "Samreen Asad",
        description: "New Message",
        time: "Yesterday",
      },
      {
        id: "5",
        image: require("../assets/girl1.png"),
        title: "Bisma Hussain",
        description: "New Message",
        time: "6/24/2020",
      },
      {
        id: "6",
        image: require("../assets/boy2.png"),
        title: "Ahmed Sheikh",
        description: "New Message",
        time: "6/23/2020",
      },
    ],
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0C1A1E"
        />
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
        >
          <View style={styles.userSignup}>
            <View style={styles.user}>
              <Text style={styles.loginText}>Chat</Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.searchView}>
              <Image
                style={styles.searchImg}
                source={require("../assets/search.png")}
              ></Image>
              <TextInput
                placeholderTextColor="#738388"
                placeholder="Search here"
                style={styles.searchBar}
              ></TextInput>
            </View>
            <FlatList
              // data={threads}
              data={this.state.ChatList}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("AllChat")}
                >
                  <Item
                    title={item.title}
                    image={item.image}
                    description={item.description}
                    time={item.time}
                  />
                </TouchableOpacity>
              )}
            />
          </ScrollView>
          <TouchableOpacity
            style={styles.fabView}
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate("Users")}
          >
            <MaterialCommunityIcons
              size={35}
              color={"#FFFFFF"}
              name={"android-messages"}
            />
          </TouchableOpacity>
          <BottomNavigation navigation={this.props.navigation} />
        </View>
      </SafeAreaView>
    );
  }
}