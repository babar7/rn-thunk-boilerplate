import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import Screen from "./Screen";
import { styles } from "../Stylesheets/StylesUsers";

export default class Users extends Component {
  state = {
    searchText: "",
    users: [
      { id: 1, name: "Minha", image: require("../assets/pic.png") },
      { id: 2, name: "Noor", image: require("../assets/girl2.png") },
      { id: 3, name: "Sana", image: require("../assets/girl3.png") },
      { id: 4, name: "Aneeqa", image: require("../assets/girl2.png") },
      { id: 5, name: "Mahnoor", image: require("../assets/pic.png") },
    ],
  };

  renderItem = ({ item, index }) => {
    const { name, image } = item;
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => this.props.navigation.navigate("AllChat")}
      >
        <View style={styles.pic}>
          <Image style={styles.picImage} source={image}></Image>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <Screen>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0C1A1E"
        />

        <View style={styles.headerStyle}>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <TouchableOpacity
              style={styles.backIconBtn}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                style={styles.backIconImage}
                source={require("../assets/backArrowBlack.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.usersView}>
            <Text style={styles.userText}>Users</Text>
          </View>
          <View style={{ flex: 1, paddingRight: 10 }}></View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              source={require("../assets/Invite/magnifying.png")}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={"Search here"}
              value={this.state.searchText}
              onChangeText={(text) => this.setState({ searchText: text })}
              autoFocus={false}
            />
          </View>
        </View>
        <FlatList
          data={this.state.users}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
        />
      </Screen>
    );
  }
}
