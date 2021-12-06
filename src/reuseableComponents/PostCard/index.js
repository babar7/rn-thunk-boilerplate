import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Metrics } from "../../theme";
import RBSheet from "react-native-raw-bottom-sheet";
import { Icon } from "react-native-elements";
import { Rating } from "react-native-elements";
import RoundImage from "../RoundImage";
import ImageHandler from "../ImageHandler";
import _ from "lodash";
import moment from "moment";
import SharePostHeader from "./SharePostHeader";

const index = ({
  data = null,
  data: {
    ratingFloat,
    likedByMe,
    SubscrbedByMe,
    mutedByMe,
    likeCount,
    commentsCount,
    id,
    sharedPostFlag,
    sharedPost,
  },
  movieImgStyle = {},
  containerStyle = {},
  cbOnLike = null,
  cbOnComment = null,
  cbOnWatchlist = null,
  cbOnSharePost = null,
  cbForUserProfileSearch = null,
  cbForPostDetail = null,
  cbForPostDisplayStatus = null,
}) => {
  if (_.isUndefined(data) || _.isEmpty(data) || mutedByMe) return null;
  let isSharePostAvailable = !_.isUndefined(sharedPostFlag) && sharedPostFlag;
  let sharedPostData = isSharePostAvailable ? sharedPost : data;
  const {
    movie,
    platforms,
    shareCount,
    review,
    createdBy,
    createdAt,
  } = sharedPostData;
  let postCreatedAt = moment(createdAt).format("MMM DD, h:mm a");
  let postedBy =
    !_.isUndefined(createdBy) && createdBy["user"]
      ? createdBy["user"].name
      : "Not Available";
  let createdByUserImage =
    !_.isUndefined(createdBy) && createdBy["user"]
      ? createdBy["user"].avatar
      : undefined;
  let postedImage =
    movie && !_.isUndefined(movie["image"]) ? movie["image"].url : undefined;
  let postedMovieTitle =
    movie && !_.isUndefined(movie["title"])
      ? movie["title"].name
      : "Not Available";
  let genre =
    movie && movie["genre"] && !_.isUndefined(movie["genre"])
      ? movie["genre"]
      : [];

  // ? movie.genre.map(({ name }) => name).toString()
  // : "Not Available";

  const updateCoutHandler = () => {
    let upCount = likedByMe ? likeCount - 1 : likeCount + 1;
    // updateCount(upCount);
    cbOnLike && cbOnLike(upCount);
  };

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      {isSharePostAvailable && (
        <SharePostHeader
          data={data}
          cbForUserProfileSearch={cbForUserProfileSearch}
          cbForPostDisplayStatus={cbForPostDisplayStatus}
        />
      )}

      {/*Header */}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
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
          <View
            style={{
              marginLeft: 8,
              marginRight: Metrics.doubleBaseMargin * 2,
            }}
          >
            {/* <View style={{ flexDirection: "row", borderWidth: 0.5 }}> */}
            <Text style={{ flexDirection: "row" }} numberOfLines={2}>
              <Text style={styles.postTitle}>{postedBy}</Text>
              <Text style={styles.textJustViewed}> just viewed </Text>
              <Text style={styles.postTitle}>{postedMovieTitle.trim()}</Text>
            </Text>
            {/* </View> */}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.dateText}>{postCreatedAt}</Text>
              <Image
                style={{ width: 15, height: 15 }}
                source={require("../../assets/dot.png")}
                resizeMode="contain"
              />
              <Image
                style={styles.postTypeIcon}
                source={require("../../assets/people.png")}
                resizeMode="contain"
              />
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={12}
                ratingImage={require("../../assets/2nd.png")}
                fractions={1}
                readonly
                startingValue={ratingFloat}
                ratingBackgroundColor="#C7C7C7"
              />
            </View>
          </View>
        </TouchableOpacity>
        {!isSharePostAvailable && (
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
        )}
      </View>

      {/*User Review  Message*/}
      <View style={{ marginVertical: Metrics.smallMargin }}>
        {!_.isEmpty(review) && (
          <Text style={{ marginLeft: Metrics.smallMargin }}>{review}</Text>
        )}
      </View>

      {/* Post Image */}
      <TouchableOpacity
        style={{ marginVertical: Metrics.smallMargin }}
        activeOpacity={0.7}
        onPress={isSharePostAvailable ? cbForPostDetail : cbOnComment}
        // disabled={_.isEmpty(cbForPostDetail)}
      >
        <ImageHandler
          style={{
            width: Metrics.screenWidth - 35,
            height: Metrics.screenHeight / 3,
            borderRadius: 7,
            ...movieImgStyle,
          }}
          source={postedImage ? { uri: postedImage } : undefined}
        />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 5,
            right: 0,
            flexWrap: "wrap-reverse",
          }}
        >
          {platforms &&
            Array.isArray(platforms) &&
            platforms.map((platform, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 5,
                    marginRight: 4,
                    marginBottom: 4,
                  }}
                >
                  <ImageHandler
                    source={{ uri: platform["thumb"] ?? undefined }}
                    resizeMode="contain"
                    style={{
                      backgroundColor: "transparent",
                      width: Metrics.widthRatio(35),
                      height: Metrics.widthRatio(35),
                    }}
                  />
                </View>
              );
            })}
        </View>
      </TouchableOpacity>
      <View style={styles.genreCont}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {genre &&
            Array.isArray(genre) &&
            genre.map(({ name, image }, index) => {
              return (
                <View key={index} style={{ flexDirection: "row" }}>
                  <Image
                    style={styles.genreIcon}
                    source={{ uri: image }}
                    resizeMode="contain"
                  />
                  <Text style={styles.genreText}>{name}</Text>
                </View>
              );
            })}
        </View>
        <TouchableOpacity onPress={cbOnWatchlist}>
          <Image
            style={{
              ...styles.genreIcon,
              tintColor: SubscrbedByMe ? "#FF2632" : "#000",
            }}
            source={require("../../assets/starb.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.saperator} />

      {/* Reaction, FeedBack View */}
      <View style={styles.reactionContainer}>
        <TouchableOpacity
          style={{
            ...styles.likeIcon,
            backgroundColor: likedByMe ? "#FF2632" : "#fff",
            borderColor: likedByMe ? "#FF2632" : "#949494",
          }}
          onPress={updateCoutHandler}
        >
          <Icon
            type="font-awesome"
            name="thumbs-up"
            size={17}
            color={likedByMe ? "#ffffff" : "#949494"}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: likedByMe ? "#FF2632" : "#949494",
            fontWeight: "500",
          }}
        >
          {likeCount}
        </Text>

        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={cbOnComment}>
            <Image
              style={styles.commentIcon}
              source={require("../../assets/comment.png")}
            />
          </TouchableOpacity>

          <Text style={{ color: "#949494", fontWeight: "500" }}>
            {commentsCount}
          </Text>
        </View>

        <TouchableOpacity onPress={cbOnSharePost}>
          <Image
            style={styles.commentIcon}
            source={require("../../assets/share.png")}
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: "500", color: "#949494" }}>
          {shareCount}
        </Text>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    // height: Metrics.screenHeight / 2.5,
    marginTop: 10,
    borderRadius: 8,
    borderColor: "white",
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: Metrics.smallMargin,
  },
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

  genreIcon: { height: Metrics.widthRatio(18), width: Metrics.widthRatio(18) },
  genreText: {
    fontSize: 13,
    fontWeight: "500",
    // flex: 1,
    marginHorizontal: Metrics.smallMargin,
  },
  genreCont: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  saperator: {
    borderBottomWidth: 1,
    borderBottomColor: "#BFBFBF",
    marginVertical: 5,
  },

  likeIcon: {
    height: Metrics.widthRatio(23),
    width: Metrics.widthRatio(23),
    marginRight: Metrics.smallMargin,
    justifyContent: "center",
    borderRadius: Metrics.widthRatio(23 / 2),
    borderWidth: 0.5,
  },

  commentIcon: {
    height: Metrics.widthRatio(30),
    width: Metrics.widthRatio(30),
    marginHorizontal: Metrics.smallMargin,
  },
  reactionContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  // =========
  dateAndStarsRatings: {
    width: "85%",
    alignSelf: "flex-end",
    height: "7%",
    //borderWidth:1,
    bottom: 4,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  item: {
    paddingTop: 10,
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  item1: {
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 0,

    flexDirection: "row",
    alignItems: "center",
    borderColor: "#738388",
    borderWidth: 0.5,
  },
  title: {
    fontSize: 18,
    color: "#000000",
    width: "100%",
    fontWeight: "900",
    marginLeft: 15,
  },

  nameAndJustViwedBox: {
    width: "100%",
    height: 20,
    //alignItems:"flex-start",
    //justifyContent:"center",
    flexDirection: "row",
    //marginRight:"2%",
    //borderWidth:2,
    //flexDirection:"row"
  },

  nameAndJustViwedBox2: {
    width: "100%",
    height: "50%",
    //alignItems:"flex-start",
    //justifyContent:"center",
    //flexDirection:"row",
    //marginRight:"2%",
    //borderWidth:2,
    //flexDirection:"row"
  },

  just: {
    width: "85%",
    height: "100%",
    //alignItems:"flex-start",
    justifyContent: "center",
    //marginRight:"2%",
    //borderWidth:2,
    //flexDirection:"row"
  },

  picImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },

  pic: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    paddingTop: 4,
    //marginRight:"2%",
    //borderWidth:2,
    //flexDirection:"row"
  },

  justViewedBox: {
    width: "100%",
    height: 40,
    //borderWidth:2,
    flexDirection: "row",
  },

  menu: {
    width: "100%",
    height: 10,
    //borderWidth:1,
    borderColor: "cyan",

    alignItems: "flex-end",
  },
});
