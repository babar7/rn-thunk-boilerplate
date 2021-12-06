import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import _ from "lodash";
import { connect, useSelector } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import { FlatListHandler, RoundImage } from "../reuseableComponents";
import moment from "moment";
import { store } from "../../App";
import { Metrics } from "../theme";
import { globalStyles } from "../Stylesheets/GlobalStyles";
import constant from "../HttpServiceManager/constant";
import { COMMENTS, REPLYS, UPDATE_POST } from "../Store/Types";

const Comments = (props) => {
  const {
    postComments,
    navigation,
    generalSaveAction,
    request,
    generalPosts,
    isCommentsFetching,
  } = props;
  let postID = navigation.getParam("postID", 0);
  global.log("postID", postID);
  const [comment, onChangeComment] = useState("");

  useEffect(() => {
    // global.log("commentFieldRef", commentFieldRef);
    // commentFieldRef.focus();
  }, []);

  const commentStatusHandler = (comnt) => () => {
    const { id } = comnt;
    let allComments = postComments.map((element) =>
      element.id == id ? { ...element, likedByMe: !element.likedByMe } : element
    );
    generalSaveAction(COMMENTS.SUCCESS, allComments);
    request(constant.likeComment + id, "post", null, undefined, false);
  };

  const commentReplys = (comnt) => () => {
    const { id } = comnt;
    global.log("parent Comment", id);
    request(
      constant.replies + id,
      "get",
      { limit: 10, offset: 0 },
      REPLYS,
      true,
      undefined,
      undefined,
      false,
      true
    );
    navigation.navigate("CommentReply");
  };

  const commentHandler = () => {
    let params = {
      ref_id: postID,
      ref_type: "post",
      text: comment,
    };
    request(constant.comments, "post", params, undefined, true, (response) => {
      let updatedCommntsList = [response, ...postComments];
      // updatedCommntsList.push(response);
      let updatePostDetail = {
        ...generalPosts[postID],
        commentsCount: (generalPosts[postID].commentsCount += 1),
      };
      generalSaveAction(UPDATE_POST, updatePostDetail);
      generalSaveAction(COMMENTS.SUCCESS, updatedCommntsList);
      onChangeComment("");
    });
  };

  const getLikeButtonColor = ({ likedByMe }) =>
    likedByMe ? "#FF2632" : "#738388";
  const getLikeText = ({ likedByMe }) => (likedByMe ? "Liked" : "Like");

  const getDateFrom = (givenDate) => {
    return moment(givenDate).fromNow(
      moment.updateLocale("en", {
        relativeTime: {
          future: "in %s",
          past: "%s ",
          s: "just now",
          m: "%d m",
          mm: "%d m",
          h: "%d h",
          hh: "%d h",
          d: "%d d",
          dd: "%d d",
          M: "a mth",
          MM: "%d mths",
          y: "y",
          yy: "%d y",
        },
      })
    );
  };

  const renderPostComments = ({ item, index }) => {
    const { name, avatar } = item["sender"].user;
    let senderName = name;
    let senderImageUri = avatar;
    let commentText = item["text"];
    let commentAt = getDateFrom(item.createdAt);

    return (
      <View>
        <View style={styles.justViewedBox1}>
          <View style={styles.pic}>
            <RoundImage
              imgStyle={styles.picImage1}
              source={senderImageUri ? { uri: senderImageUri } : undefined}
            />
          </View>
          <View style={styles.just1}>
            <View style={styles.justCom}>
              <Text style={styles.boldName}>{senderName}</Text>
              <Text style={styles.textJustViewed1}>{commentText}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.textJustViewed3}>{commentAt}</Text>
              <TouchableOpacity onPress={commentStatusHandler(item)}>
                <Text
                  style={[
                    styles.textJustViewed3,
                    { color: getLikeButtonColor(item) },
                  ]}
                >
                  {getLikeText(item)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={commentReplys(item)}>
                <Text style={styles.textJustViewed3}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {!_.isUndefined(item["repliesCount"]) && (
          <RenderReplies
            replies={item.replies}
            repliesCount={item["repliesCount"]}
            parentComment={item}
          />
        )}
      </View>
    );
  };

  const RenderReplies = ({ parentComment, repliesCount, replies }) => {
    let sliceArray = +repliesCount > 2 ? replies.slice(0, 2) : replies;
    return (
      <TouchableOpacity
        style={{
          marginLeft: Metrics.xDoubleBaseMargin,
        }}
        onPress={commentReplys(parentComment)}
        activeOpacity={0.5}
      >
        {sliceArray.map((reply, index) => {
          const {
            text,
            sender: { user },
            createdAt,
          } = reply;
          const { avatar, name } = user;
          let replyAt = getDateFrom(createdAt);
          return (
            <View
              key={`${index}_reply`}
              style={{
                flexDirection: "row",
                marginTop: Metrics.smallMargin,
                marginLeft: Metrics.baseMargin,
              }}
            >
              <View
                style={{
                  width: "15%",
                  height: "100%",
                }}
              >
                <RoundImage
                  imgStyle={{
                    width: Metrics.widthRatio(30),
                    height: Metrics.widthRatio(30),
                    borderRadius: Metrics.widthRatio(30 / 2),
                    // resizeMode: "contain",
                  }}
                  source={avatar ? { uri: avatar } : undefined}
                />
              </View>

              <View style={{ ...styles.justCom, width: "82%" }}>
                <Text style={styles.boldName}>{name}</Text>
                <Text style={styles.textJustViewed1} numberOfLines={2}>
                  {text}
                </Text>
              </View>
            </View>
          );
        })}

        {+repliesCount > 2 ? (
          <View>
            <Text
              style={{
                marginTop: Metrics.baseMargin,
                marginLeft: Metrics.xDoubleBaseMargin * 2,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              View all replies
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ ...globalStyles.container, backgroundColor: "#fff" }}
    >
      <View style={globalStyles.userSignup}>
        <TouchableOpacity
          style={globalStyles.backArrow}
          onPress={() => {
            navigation.goBack();
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
        <View style={globalStyles.user}>
          <Text style={globalStyles.loginText}>Comments</Text>
        </View>
      </View>

      <FlatListHandler
        data={postComments}
        extraData={postComments}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        renderItem={renderPostComments}
        emptyListMsg="No Comments"
        // isFetching={isCommentsFetching}
      />

      {/* Text Field For write A comment */}
      <View style={styles.placeholderBox}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../assets/smile.png")}
          />
          <TextInput
            // ref={(cmntInputRef) => {
            //   commentFieldRef = cmntInputRef;
            // }}
            autoFocus
            multiline
            style={styles.placeholderBox1}
            placeholderTextColor="#B5B5B5"
            placeholder="Write here..."
            value={comment}
            onChangeText={onChangeComment}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 35,
            width: 35,
            borderRadius: 50,
            backgroundColor: "#949494",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginHorizontal: 10,
          }}
          onPress={commentHandler}
          disabled={_.isEmpty(comment)}
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../assets/send.png")}
          />
        </TouchableOpacity>
      </View>

      {/* End Comment section */}
    </SafeAreaView>
  );
};

const actions = { request, generalSaveAction };
const mapStateToProps = ({ comments, generalPosts }) => ({
  postComments: comments["data"],
  isCommentsFetching: comments["isFetching"],
  generalPosts: generalPosts["data"],
});
export default connect(mapStateToProps, actions)(Comments);

const styles = StyleSheet.create({
  placeholderBox: {
    position: "absolute",
    bottom: 5,
    backgroundColor: "white",
    marginHorizontal: 10,
    width: "95%",
    paddingVertical: 5,
    flexDirection: "row",
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#738388",
    paddingLeft: 7,
  },
  placeholderBox1: {
    width: "85%",
    paddingHorizontal: 10,
    // flex: 1,
    flexDirection: "row",
  },
  dateAndStarsRatings: {
    width: "85%",
    alignSelf: "flex-end",
    height: 30,
    bottom: 4,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 18,
    color: "#000000",
    width: "100%",
    fontWeight: "900",
    marginLeft: 15,
  },

  dateText: {
    fontSize: 12,
    color: "#738388",
    fontWeight: "bold",
  },

  boldName: {
    fontSize: 15,
    fontWeight: "bold",
  },

  boldName2: {
    fontSize: 15,
    fontWeight: "bold",
    bottom: 2,
  },
  textJustViewed1: {
    fontSize: 13,
    color: "#000000",
    textAlign: "left",
    flex: 1,
    flexWrap: "wrap",
    marginTop: 5,
  },
  textJustViewed3: {
    paddingVertical: 4,
    paddingRight: 10,
    fontSize: 12,
    marginHorizontal: 2,
    color: "#738388",
  },
  nameAndJustViwedBox: {
    width: "100%",
    height: 20,
    flexDirection: "row",
  },

  nameAndJustViwedBox2: {
    width: "100%",
    height: 20,
  },

  just: {
    width: "85%",
    height: "100%",
    justifyContent: "center",
  },
  just1: {
    width: "85%",

    paddingTop: 10,
  },
  justCom: {
    flexDirection: "column",
    backgroundColor: "#F1F1F1",
    borderRadius: 5,
    padding: 5,
  },

  picImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },
  picImage1: {
    width: Metrics.widthRatio(40),
    height: Metrics.widthRatio(40),
    borderRadius: Metrics.widthRatio(40 / 2),
    resizeMode: "contain",
  },
  pic: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    paddingTop: 12,
  },

  justViewedBox: {
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  justViewedBox1: {
    width: "98%",

    flexDirection: "row",
  },
  iconImage: {
    width: 20,
    height: "100%",
    resizeMode: "contain",
  },

  menu: {
    width: "100%",
    height: 10,
    borderColor: "cyan",

    alignItems: "flex-end",
  },
  //movieBox styles above

  commentsFlatListStyle: {
    flex: 1,
    backgroundColor: "red",
  },
  commentsItemContainer: {},
  userImageStyle: {},
  commentSection: {},
});
