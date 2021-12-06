import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Metrics } from "../../theme";
import RoundImage from "../RoundImage";
import _ from "lodash";
import moment from "moment";

const SharePostHeader = ({
  data,
  data: { createdAt, createdBy, text },
  cbForPostDisplayStatus = null,
  cbForUserProfileSearch = null,
}) => {
  let postedBy =
    !_.isUndefined(createdBy) && createdBy["user"]
      ? createdBy["user"].name
      : "Not Available";
  let createdByUserImage =
    !_.isUndefined(createdBy) && createdBy["user"]
      ? createdBy["user"].avatar
      : undefined;
  let postCreatedAt = moment(createdAt).format("MMM DD, h:mm a");

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          activeOpacity={0.5}
          onPress={cbForUserProfileSearch(
            createdBy && createdBy["user"] ? createdBy["user"] : {}
          )}
        >
          <RoundImage
            imgStyle={styles.profileImgStyle}
            imgViewStyle={{ alignSelf: "flex-start" }}
            source={
              createdByUserImage ? { uri: createdByUserImage } : undefined
            }
          />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.postTitle}>{postedBy}</Text>
            <Text style={styles.dateText}>{postCreatedAt}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={cbForPostDisplayStatus}
          style={{
            paddingLeft: 10,
          }}
        >
          <Image
            style={styles.menuIcon}
            source={require("../../assets/menu.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: Metrics.smallMargin }}>
        {!_.isEmpty(text) && (
          <Text
            style={{
              marginLeft: Metrics.smallMargin,
            }}
          >
            {text}
          </Text>
        )}
      </View>

      <View style={styles.saperator} />
    </View>
  );
};

export default SharePostHeader;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    alignItems: "center",
  },
  titleContainer: { flex: 1, marginLeft: 8 },
  postTitle: {
    fontSize: 15,
    fontWeight: "bold",
    // marginTop: 5,
  },
  textJustViewed: {
    fontSize: 12,
    top: 2,
    left: 7,
    color: "#738388",
  },

  dateText: {
    fontSize: 12,
    color: "#738388",
  },

  postTypeIcon: {
    width: Metrics.widthRatio(12),
    height: Metrics.widthRatio(12),
    marginHorizontal: 6,
  },
  menuIcon: {
    width: Metrics.widthRatio(20),
    height: Metrics.widthRatio(20),
    alignSelf: "flex-start",
  },
  profileImgStyle: {
    height: Metrics.widthRatio(45),
    width: Metrics.widthRatio(45),
    borderRadius: Metrics.widthRatio(45 / 2),
  },
  saperator: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#BFBFBF",
    marginBottom: 10,
  },
});
