import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";

import BottomNavigation from "./Explore/BottomNavigation";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import { stylesHead } from "../Stylesheets/WhiteHeader";
import { styles } from "../Stylesheets/StylesAllChat";

export default class AllChat extends Component {
  state = {
    messages: [],
    ChatName: this.props.navigation.state.params
      ? this.props.navigation.state.params.title
      : " ",
  };

  handleButtonPress = () => {
    this.props.navigation.navigate("DrawerToggle");
  };
  componentDidMount = () => {
    this.setState({
      messages: [
        {
          _id: 2,
          text: "Yess ",
          createdAt: new Date(),
          quickReplies: {
            type: "checkbox", // or 'radio',
            values: [
              {
                title: "😋 Yes",
                value: "yes",
              },
              {
                title: "📷 send me picture!",
                value: "yes_picture",
              },
              {
                title: "😞 Nop",
                value: "no",
              },
            ],
          },
          user: {
            _id: 1,
            name: "Arman",
          },
        },
        {
          _id: 2,
          text: "Hey! there?",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Yasir",
          },
        },
      ],
    });
  };

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#29373B",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };
  renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={38} color="#949494" />
        </View>
      </Send>
    );
  };
  onSend = (messages = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={20} color="#949494" />
      </View>
    );
  };

  renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0C1A1E" />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0C1A1E"
        />

        <View style={{ width: "100%", height: "100%" }}>
          <View style={stylesHead.topHeader}>
            <TouchableOpacity
              style={stylesHead.backArrow}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
                source={require("../assets/backArrowBlack.png")}
              />
            </TouchableOpacity>
            <View style={stylesHead.user}>
              <Text style={stylesHead.headText1}>Noman Iqbal</Text>
            </View>
          </View>
          <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <GiftedChat
              messages={this.state.messages}
              onSend={(messages) => this.onSend(messages)}
              user={{ _id: 2, _id: 1 }}
              placeholder="Write here..."
              renderBubble={this.renderBubble}
              showUserAvatar
              alwaysShowSend
              scrollToBottomComponent={this.scrollToBottomComponent}
              renderSend={this.renderSend}
              renderLoading={this.renderLoading}
            />
          </View>
          <BottomNavigation navigation={this.props.navigation} />
        </View>
      </SafeAreaView>
    );
  }
}