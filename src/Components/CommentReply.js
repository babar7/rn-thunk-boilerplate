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

const CommentReply = (props) => {
  const {
    postComments,
    navigation,
    generalSaveAction,
    request,
    postID,
    generalPosts,

    commentOnReply,
  } = props;

  const { comments, comment } = commentOnReply;
  const [reply, onChangeReply] = useState("");

  useEffect(() => {
    // global.log("commentFieldRef", commentFieldRef);
    // commentFieldRef.focus();
  }, []);

  const replyStatusHandler = (reply) => () => {
    const { id } = reply;
    let allReplies = comments.map((element) =>
      element.id == id ? { ...element, likedByMe: !element.likedByMe } : element
    );
    let updatedCommntsList = {
      ...commentOnReply,
      comments: allReplies,
      // comment: {
      //   ...commentOnReply["comment"],
      //   repliesCount: (commentOnReply["comment"]["repliesCount"] += 1),
      // },
    };
    generalSaveAction(REPLYS.SUCCESS, updatedCommntsList);
    request(constant.likeComment + id, "post", null, undefined, false);
  };

  const commentReplys = () => commentFieldRef.focus();

  const replyHander = () => {
    const { id } = comment;
    let params = {
      ref_id: id,
      ref_type: "comment",
      text: reply,
    };
    request(constant.comments, "post", params, undefined, true, (response) => {
      let updatedCommntReplyList = [response, ...comments];
      let updatedCommntsList = {
        ...commentOnReply,
        comments: updatedCommntReplyList,
        comment: {
          ...commentOnReply["comment"],
          repliesCount: (commentOnReply["comment"]["repliesCount"] += 1),
        },
      };
      generalSaveAction(REPLYS.SUCCESS, updatedCommntsList);
      let updateParentComment = postComments.map((comnt) =>
        comnt.id == comment.id
          ? {
              ...comnt,
              replies: updatedCommntReplyList,
              repliesCount: (comnt.repliesCount += 1),
            }
          : comnt
      );
      generalSaveAction(COMMENTS.SUCCESS, updateParentComment);
      onChangeReply("");
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
            <TouchableOpacity onPress={replyStatusHandler(item)}>
              <Text
                style={[
                  styles.textJustViewed3,
                  { color: getLikeButtonColor(item) },
                ]}
              >
                {getLikeText(item)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={commentReplys}>
              <Text style={styles.textJustViewed3}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
        <View style={{ ...globalStyles.user, left: 45 }}>
          <Text style={globalStyles.loginText}>Reply</Text>
        </View>
      </View>

      <FlatListHandler
        data={comments}
        extraData={comments}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        renderItem={renderPostComments}
      />

      {/* Text Field For write A reply */}
      <View style={styles.placeholderBox}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../assets/smile.png")}
          />
          <TextInput
            ref={(cmntInputRef) => {
              commentFieldRef = cmntInputRef;
            }}
            autoFocus
            multiline
            style={styles.placeholderBox1}
            placeholderTextColor="#B5B5B5"
            placeholder="Write here..."
            value={reply}
            onChangeText={onChangeReply}
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
          onPress={replyHander}
          disabled={_.isEmpty(reply)}
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
const mapStateToProps = ({
  postDetail,
  comments,
  generalPosts,
  commentReply,
}) => ({
  commentOnReply: commentReply["data"],
  postID: postDetail["data"],
  postComments: comments["data"],
  generalPosts: generalPosts["data"],
});
export default connect(mapStateToProps, actions)(CommentReply);

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
