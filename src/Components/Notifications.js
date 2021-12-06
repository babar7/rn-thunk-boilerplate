import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import { stylesHead } from "../Stylesheets/WhiteHeader";
import { styles } from "../Stylesheets/StylesNotification";

import { connect } from "react-redux";
import {
  request,
  generalSaveAction,
  multipleRequest,
} from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import {
  POSTS,
  NEW_REVIEW,
  WATCHLIST,
  POST_DETAIL,
  COMMENTS,
} from "../Store/Types";
import { AlertHelper } from "../utility/utility";
import { FlatListHandler, PostCard } from "../reuseableComponents";
import { Metrics } from "../theme";
import moment from "moment";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible2: false,
      notifications: [],
    };
  }

  componentDidMount = () => {
    const { request, generalSaveAction } = this.props;
    let params = { limit: 20, offset: 0 };
    request(
      constant.notificationsList,
      "get",
      params,
      undefined,
      true,
      (resposne) => {
        this.setState({ notifications: resposne });
      }
    );
  };

  getNotificationMessage = ({ type, dataType }) => {
    if (type == "commented") {
      return " commented on your post ";
    } else if (type == "liked") {
      return " liked your post ";
    } else if (type == "added") {
      return ` added new ${dataType} `;
    }
  };

  renderItem = ({ item, index }) => {
    const { name, seen, image, content, createdAt } = item;
    return (
      <TouchableOpacity
        style={[
          styles.backArrow2,
          { backgroundColor: seen == true ? "#fff" : "#FF26320D" },
        ]}
        // onPress={() => this.props.navigation.navigate("OtherUser")}
      >
        <View style={styles.pic}>
          <Image style={styles.picImage} source={image}></Image>
        </View>

        <View
          style={{
            width: "70%",
            height: "100%",
            alignSelf: "center",
          }}
        >
          <View style={styles.half}>
            <Text numberOfLines={2}>
              <Text style={styles.smText}>{name}</Text>
              <Text style={styles.smText2}>
                {this.getNotificationMessage(item)}
              </Text>
              <Text style={styles.smText2}>{content}</Text>
            </Text>
          </View>

          <View style={styles.timeView}>
            <Text style={styles.smText3}>{createdAt}</Text>
          </View>
        </View>

        <TouchableOpacity>
          <Image
            style={{
              width: 17,
              height: 17,
              resizeMode: "contain",
            }}
            source={require("../assets/verticalDots.png")}
          ></Image>
        </TouchableOpacity>
      </TouchableOpacity>
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
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
        >
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
              <Text style={stylesHead.headText}>Notifications</Text>
            </View>
          </View>
          <View style={styles.notificationView}>
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
              source={require("../assets/search.png")}
            ></Image>
            <TextInput
              placeholderTextColor="#738388"
              placeholder="Search here"
              style={styles.notificationTxt}
            ></TextInput>
          </View>
          <FlatListHandler
            data={this.state.notifications}
            renderItem={this.renderItem}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const actions = { request, generalSaveAction, multipleRequest };
const mapStateToProps = ({ posts, user, watchList }) => ({
  posts: posts["data"],
  watchList: watchList["data"],
});

export default connect(mapStateToProps, actions)(Notifications);
