import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  FlatList,
  SafeAreaView,
  TouchableOpacityBase,
} from "react-native";
import { StylesHeader } from "../Stylesheets/StylesHeader";
import { styles } from "../Stylesheets/StylesFollowers";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { LOGIN, DUMP, FOLLOWERS } from "../Store/Types";
import {
  FlatListHandler,
  ImageHandler,
  RoundImage,
} from "../reuseableComponents";
import { Metrics } from "../theme";

class Followers extends Component {
  componentDidMount() {
    const { request, navigation } = this.props;
    let otherUserId = navigation.getParam("otherUserId", 0);
    let params = {};
    if (otherUserId) params.other_user_id = otherUserId;
    request(constant.getFollowers, "get", params, FOLLOWERS, true);
  }

  getFollowText = (followStatus) => (followStatus ? "Unfollow" : "Follow");

  // ==============================================================================

  handlerFollowingStatus = (user) => () => {
    const { request } = this.props;
    const { id } = user;
    request(constant.followUser + id, "post", {}, DUMP, true, this.updateList);
  };

  updateList = (response) => {
    const { user } = response;
    const { request, followers, generalSaveAction } = this.props;
    let updatedFollowersList = followers.map((item) =>
      item.user.id == user.id ? response : item
    );
    generalSaveAction(FOLLOWERS.SUCCESS, updatedFollowersList);
  };

  renderUserCard = ({ item, index }) => {
    const { avatar, name, iAmFollowing } = item.user;
    return (
      <TouchableOpacity
        // onPress={() =>
        //   this.props.navigation.navigate("OtherUser", {
        //     otherUser: item,
        //   })
        // }
        activeOpacity={0.7}
      >
        <View style={styles.item}>
          <RoundImage
            style={{
              width: Metrics.widthRatio(45),
              height: Metrics.widthRatio(45),
            }}
            source={
              avatar
                ? {
                    uri: avatar,
                  }
                : undefined
            }
          />
          <Text style={styles.title}>{name}</Text>
          <View style={{ width: "40%" }}>
            <TouchableOpacity
              style={{ ...styles.chatBtn, height: Metrics.widthRatio(32) }}
              activeOpacity={0.6}
            >
              <Text style={styles.smText2}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.followBtn, height: Metrics.widthRatio(32) }}
              activeOpacity={0.6}
              onPress={this.handlerFollowingStatus(item.user)}
            >
              <Text style={styles.smText2}>
                {this.getFollowText(iAmFollowing)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
        <View style={{ width: "100%", height: "100%" }}>
          <ImageBackground
            style={styles.imageStyle}
            imageStyle={{
              borderColor: "transparent",
            }}
            source={require("../assets/bg.png")}
          >
            <View style={styles.halfScreen}>
              <TouchableOpacity
                style={StylesHeader.backArrow}
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
                  source={require("../assets/backArrow.png")}
                ></Image>
              </TouchableOpacity>
              <View style={StylesHeader.headerView}>
                <Text style={StylesHeader.headingText}>Followers</Text>
              </View>
              <ScrollView>
                <View>
                  <FlatListHandler
                    data={this.props.followers}
                    renderItem={this.renderUserCard}
                  />
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ user, followers }) => ({
  user: user["data"].user,
  followers: followers["data"],
});

export default connect(mapStateToProps, actions)(Followers);
