import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MovieBoxFull from "./Explore/MovieBoxFull";
import { postDetailStyles } from "../Stylesheets/StylesPostDetails";
import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import constant from "../HttpServiceManager/constant";
import {
  COMMENTS,
  GENERAL_POST,
  POSTS,
  POST_DETAIL,
  REPLYS,
  UPDATE_POST,
  WATCHLIST,
} from "../Store/Types";
import { PostCard, FlatListHandler, RoundImage } from "../reuseableComponents";
import moment from "moment";
import { Metrics, AppStyles } from "../theme";
import { globalStyles } from "../Stylesheets/GlobalStyles";
import _ from "lodash";
import RBSheet from "react-native-raw-bottom-sheet";
import { AlertHelper } from "../utility/utility";
import Share from "react-native-share";

class PostDetails extends Component {
  state = { comment: "", sharedPostTitle: "", postID: 0, isMyPost: false };

  componentDidMount() {
    const { postDetail, request, generalPosts } = this.props;
    let id = postDetail.id ?? 0;
    request(
      constant.comments + id,
      "get",
      { limit: 10, offset: 0 },
      COMMENTS,
      false,
      undefined,
      undefined,
      false,
      true
    );
  }

  // Post Like Handler
  likeDislikeHandler = (postID) => (count) => {
    const { generalSaveAction, request, generalPosts, postDetail } = this.props;
    let selectedPost = { ...postDetail };
    let updatedPost = {
      ...selectedPost,
      likedByMe: !selectedPost.likedByMe,
      likeCount: count,
    };
    generalSaveAction(POST_DETAIL.SUCCESS, updatedPost);
    request(constant.likePost + postID, "post", null, undefined, false);
  };

  commentFocusHandler = (postID) => () => {
    this.commentFieldRef && this.commentFieldRef.focus();
  };

  // Post add or remover from Watchlish
  addOrRemoveToWatchList = (postID) => () => {
    const { request } = this.props;
    request(
      constant.subscribePost + postID,
      "post",
      null,
      undefined,
      true,
      this.onWatchListRequestSuccess(postID)
    );
  };

  onWatchListRequestSuccess = (postID) => (responseOnSuccess) => {
    const { generalSaveAction, watchList } = this.props;
    let updatedWatchList = watchList.includes(postID)
      ? watchList.filter((id) => id != postID)
      : [postID, ...watchList];

    generalSaveAction(POST_DETAIL.SUCCESS, responseOnSuccess.post);
    generalSaveAction(WATCHLIST.SUCCESS, updatedWatchList);
  };

  //   Internal Share Handler
  sharePostHandler = (postID) => () => {
    this.setState({ sharedPostTitle: "", postID }, () =>
      this.RBSheetForSharePost.open()
    );
  };

  //   Internal Share Handler
  internalPostShare = () => {
    const { request, generalSaveAction } = this.props;
    const { postID, sharedPostTitle } = this.state;
    this.RBSheetForSharePost.close();
    request(
      constant.sharePost + postID,
      "post",
      { text: sharedPostTitle },
      undefined,
      true,
      this.onInternalPostShareSuccess
    );
  };

  onInternalPostShareSuccess = (responseOnSuccess) => {
    const {
      generalSaveAction,
      generalPosts,
      posts,
      navigation,
      postDetail,
    } = this.props;
    const postID = navigation.getParam("postID", 0);
    let { sharedPostFlag, sharedPost } = generalPosts[postID];
    let isSharePostAvailable = !_.isUndefined(sharedPostFlag) && sharedPostFlag;
    let postData = isSharePostAvailable ? sharedPost : generalPosts[postID];
    let updatedPost = {
      ...postData,
      shareCount: (postData["shareCount"] += 1),
    };
    if (isSharePostAvailable) {
      updatedPost = {
        ...generalPosts[postID],
        sharedPost: updatedPost,
      };
    }
    let updatePostDetail = {
      ...postDetail,
      shareCount: (postDetail.shareCount += 1),
    };

    generalSaveAction(UPDATE_POST, responseOnSuccess);
    generalSaveAction(POSTS.SUCCESS, [responseOnSuccess.id, ...posts]);
    generalSaveAction(POST_DETAIL.SUCCESS, updatePostDetail);

    AlertHelper.show("success", "", "Post has been shared succesfully !");
  };

  //  External Share Handler
  externalPostShare = async () => {
    const { generalPosts } = this.props;
    const { postID, sharedPostTitle } = this.state;
    let { sharedPostFlag, sharedPost } = generalPosts[postID];
    let isSharePostAvailable = !_.isUndefined(sharedPostFlag) && sharedPostFlag;
    let postURL = isSharePostAvailable
      ? sharedPost["link"]
      : generalPosts[postID]["link"];
    try {
      this.RBSheetForSharePost.close();
      let result = await Share.open({
        message: sharedPostTitle,
        title: "Viewed",
        url: postURL ?? "Oops, Something went wrong.!",
      });
    } catch (error) {
      error && global.log("error on external post share", error);
    }
  };

  OtherProfileHandler = (createdBy) => () => {
    const { navigation, user } = this.props;
    let routeName = user.id == createdBy.id ? "MyProfile" : "OtherUser";
    navigation.navigate(routeName, { otherUser: createdBy });
  };

  updateTitleText = (text) => {
    this.setState({ sharedPostTitle: text });
  };

  //   ===========================================================

  onChangeCommentHandler = (text) => {
    this.setState({ comment: text });
  };

  commentHandler = () => {
    const { postComments, postDetail, request, generalSaveAction } = this.props;
    const { comment } = this.state;
    let params = {
      ref_id: postDetail.id,
      ref_type: "post",
      text: comment,
    };
    request(constant.comments, "post", params, undefined, true, (response) => {
      let updatedCommntsList = [response, ...postComments];
      // updatedCommntsList.push(response);
      let updatePostDetail = {
        ...postDetail,
        commentsCount: (postDetail.commentsCount += 1),
      };
      generalSaveAction(POST_DETAIL.SUCCESS, updatePostDetail);
      generalSaveAction(COMMENTS.SUCCESS, updatedCommntsList);
      this.setState({ comment: "" });
    });
  };

  commentStatusHandler = (comnt) => () => {
    const { id } = comnt;
    const { postComments, generalSaveAction, request } = this.props;
    let allComments = postComments.map((element) =>
      element.id == id ? { ...element, likedByMe: !element.likedByMe } : element
    );
    generalSaveAction(COMMENTS.SUCCESS, allComments);
    request(constant.likeComment + id, "post", null, undefined, false);
  };

  commentReplys = (comnt) => () => {
    const { id } = comnt;
    const { navigation, request } = this.props;
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

  getLikeButtonColor = (item) => (item.likedByMe ? "#FF2632" : "#738388");
  getLikeText = (item) => (item.likedByMe ? "Liked" : "Like");

  getDateFrom = (givenDate) => {
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

  // ===============================================

  handlerPostDisplayStatus = (postID) => () => {
    const { generalPosts } = this.props;
    let post = generalPosts[postID];
    this.setState({ postID, isMyPost: post["myPost"] }, () =>
      this.RBSheetForPostDisplayStatus.open()
    );
  };

  deletePostHandler = () => {
    const {
      request,
      generalPosts,
      generalSaveAction,
      posts,
      navigation,
    } = this.props;
    const { postID } = this.state;
    this.RBSheetForPostDisplayStatus.close();
    request(
      constant.postDelete + postID,
      "delete",
      null,
      undefined,
      true,
      () => {
        let updateGeneralPostList = { ...generalPosts };
        delete updateGeneralPostList[postID];
        let updatedPost = posts.filter((ids) => ids != postID);
        generalSaveAction(GENERAL_POST.SUCCESS, updateGeneralPostList);
        generalSaveAction(POSTS.SUCCESS, updatedPost);
        AlertHelper.show("success", "", "Post Deleted");
        navigation.pop();
      }
    );
  };

  hidePostHander = () => {
    const { request, generalPosts, generalSaveAction, posts } = this.props;
    const { postID } = this.state;
    this.RBSheetForPostDisplayStatus.close();
    request(
      constant.hidePost + postID,
      "patch",
      null,
      undefined,
      true,
      (response) => {
        global.log("post", response.post);
        generalSaveAction(UPDATE_POST, response.post);
        // AlertHelper.show("success", "", "Post Deleted");
      }
    );
  };

  reportPostHander = () => {
    const { request, generalPosts, generalSaveAction, posts } = this.props;
    const { postID } = this.state;
    this.RBSheetForPostDisplayStatus.close();
    request(
      constant.reportPost + postID,
      "patch",
      null,
      undefined,
      true,
      (response) => {
        AlertHelper.show("success", "", "Post has been reported");
      }
    );
  };

  //   ===========================================================
  //   ===========================================================

  renderPostComments = ({ item, index }) => {
    const { name, avatar } = item["sender"].user;
    let senderName = name;
    let senderImageUri = avatar;
    let commentText = item["text"];
    let commentAt = this.getDateFrom(item.createdAt);
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
              <TouchableOpacity onPress={this.commentStatusHandler(item)}>
                <Text
                  style={[
                    styles.textJustViewed3,
                    { color: this.getLikeButtonColor(item) },
                  ]}
                >
                  {this.getLikeText(item)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.commentReplys(item)}>
                <Text style={styles.textJustViewed3}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {!_.isUndefined(item["repliesCount"]) &&
          this.RenderReplies(item, item["repliesCount"], item.replies)}
      </View>
    );
  };

  RenderReplies = (parentComment, repliesCount, replies) => {
    let sliceArray = +repliesCount > 2 ? replies.slice(0, 2) : replies;
    return (
      <TouchableOpacity
        style={{
          marginLeft: Metrics.xDoubleBaseMargin,
        }}
        onPress={this.commentReplys(parentComment)}
        activeOpacity={0.5}
      >
        {sliceArray.map((reply, index) => {
          const {
            text,
            sender: { user },
          } = reply;
          const { avatar, name } = user;
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

  rednerMovieBox = () => {
    const { generalPosts, postDetail } = this.props;
    let postID = postDetail.id;
    if (_.isUndefined(postDetail) || _.isEmpty(postDetail)) return;
    try {
      return (
        <PostCard
          data={postDetail}
          cbOnLike={this.likeDislikeHandler(postID)}
          cbOnComment={this.commentFocusHandler(postID)}
          cbOnWatchlist={this.addOrRemoveToWatchList(postID)}
          cbOnSharePost={this.sharePostHandler(postID)}
          cbForUserProfileSearch={this.OtherProfileHandler}
          // cbForPostDisplayStatus={this.handlerPostDisplayStatus(postID)}
          containerStyle={{
            marginTop: 0,
            borderRadius: 8,
            backgroundColor: "white",
            padding: 10,
            marginHorizontal: 0,
          }}
        />
      );
    } catch (error) {
      global.log("error", error);
      return (
        <View style={globalStyles.postNotFound}>
          <Text>Oops, Something went wrong !</Text>
        </View>
      );
    }
  };

  render() {
    const { postComments, user, postDetail, isCommentFetching } = this.props;
    const { comment, sharedPostTitle, isMyPost } = this.state;
    let name = user?.name;
    let avatar = user?.name;
    return (
      <SafeAreaView style={postDetailStyles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0C1A1E"
        />
        <View style={{ flex: 1, backgroundColor: "#122024" }}>
          <View style={postDetailStyles.userSignup}>
            <TouchableOpacity
              style={postDetailStyles.backArrow}
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
            <View style={postDetailStyles.user}>
              <Text style={postDetailStyles.loginText}>Post Detail</Text>
            </View>
          </View>
          {/* header End */}

          {/* Post Detail */}
          <ScrollView
            style={{
              backgroundColor: "white",
              // borderWidth: 5,
              margin: Metrics.smallMargin,
              borderRadius: 10,
            }}
          >
            {this.rednerMovieBox()}
            {/* Seperator */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#BFBFBF",
                marginHorizontal: Metrics.smallMargin,
              }}
            />

            {/* Comments Section */}

            {isCommentFetching ? (
              <ActivityIndicator
                color="#FF2632"
                size="large"
                style={{ marginTop: 50, alignSelf: "center" }}
              />
            ) : (
              <FlatListHandler
                data={postComments}
                extraData={postComments}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 70,
                }}
                renderItem={this.renderPostComments}
              />
            )}
          </ScrollView>
          {/* Text Field For write A comment */}
          <View style={styles.placeholderBox}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Image
                style={{ width: 35, height: 35 }}
                source={require("../assets/smile.png")}
              />
              <TextInput
                ref={(cmntInputRef) => {
                  this.commentFieldRef = cmntInputRef;
                }}
                // autoFocus
                multiline
                style={styles.placeholderBox1}
                placeholderTextColor="#B5B5B5"
                placeholder="Write here..."
                value={comment}
                onChangeText={this.onChangeCommentHandler}
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
              onPress={this.commentHandler}
              disabled={_.isEmpty(comment)}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/send.png")}
              />
            </TouchableOpacity>
          </View>

          <>
            <RBSheet
              ref={(ref) => {
                this.RBSheetForSharePost = ref;
              }}
              // closeOnDragDown={true}
              height={250}
              openDuration={250}
              customStyles={{
                wrapper: {
                  backgroundColor: "rgba(52, 52, 52, 0.8)",
                },
                draggableIcon: {
                  // backgroundColor: "#000",
                  backgroundColor: "transparent",
                },
                container: {
                  borderTop: 0.5,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: "#F7F7F7",
                },
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.item}>
                    <RoundImage
                      source={avatar ? { uri: avatar } : undefined}
                      imgStyle={globalStyles.RBAvatar}
                    />
                    <Text style={styles.title}>{name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.RBSheetForSharePost.close()}
                  >
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: "contain",
                        margin: 10,
                        // ...AppStyles.dropShadow(),
                      }}
                      source={require("../assets/closeModal.png")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "column" }}>
                  <TextInput
                    style={{
                      paddingLeft: 30,
                      height: 60,
                      fontSize: 18,
                      opacity: 0.6,
                    }}
                    value={sharedPostTitle}
                    placeholder={"Say something about this..."}
                    placeholderTextColor="#738388"
                    onChangeText={this.updateTitleText}
                  />
                </View>
                <TouchableOpacity onPress={this.internalPostShare}>
                  <View style={styles.item1}>
                    <Image
                      style={{
                        width: 18,
                        height: 18,
                        marginHorizontal: 10,
                      }}
                      resizeMode="contain"
                      source={require("../assets/shareOther.png")}
                    />
                    <Text style={[styles.title, { fontWeight: "bold" }]}>
                      Internal
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.externalPostShare}>
                  <View style={styles.item1}>
                    <Image
                      style={{
                        width: 18,
                        height: 18,
                        marginHorizontal: 10,
                      }}
                      resizeMode="contain"
                      source={require("../assets/shareOther.png")}
                    ></Image>
                    <Text style={[styles.title, { fontWeight: "bold" }]}>
                      External
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </RBSheet>

            {/* RBSheet For Post Display Status */}

            <RBSheet
              ref={(ref) => {
                this.RBSheetForPostDisplayStatus = ref;
              }}
              closeOnDragDown={true}
              height={isMyPost ? 160 : 130}
              openDuration={250}
              customStyles={{
                wrapper: {
                  backgroundColor: "rgba(52, 52, 52, 0.8)",
                },
                draggableIcon: {
                  backgroundColor: "transparent",
                },
                container: {
                  borderTop: 0.5,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: "#F7F7F7",
                },
              }}
            >
              <View
                style={{
                  marginHorizontal: Metrics.baseMargin,
                }}
              >
                {/* <TouchableOpacity
                    onPress={() => this.RBSheetForPostDisplayStatus.close()}
                    style={{
                      justifyContent: "flex-end",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                      }}
                      source={require("../assets/closeModal.png")}
                    />
                  </TouchableOpacity> */}

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    borderBottomWidth: 0.7,
                    borderBottomColor: "#738388",
                    paddingBottom: 5,
                  }}
                  activeOpacity={0.5}
                  onPress={this.hidePostHander}
                >
                  <Image
                    source={images.hide}
                    style={{
                      width: Metrics.widthRatio(18),
                      height: Metrics.widthRatio(18),
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: Metrics.smallMargin,
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Hide
                  </Text>
                </TouchableOpacity>

                {isMyPost && (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      borderBottomWidth: 0.7,
                      borderBottomColor: "#738388",
                      paddingBottom: 5,
                    }}
                    activeOpacity={0.5}
                    onPress={this.deletePostHandler}
                  >
                    <Image
                      source={images.delete}
                      style={{
                        width: Metrics.widthRatio(20),
                        height: Metrics.widthRatio(20),
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: Metrics.smallMargin,
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    borderBottomWidth: 0.7,
                    borderBottomColor: "#738388",
                    paddingBottom: 5,
                  }}
                  activeOpacity={0.5}
                  onPress={this.reportPostHander}
                >
                  <Image
                    source={images.flag}
                    style={{
                      width: Metrics.widthRatio(20),
                      height: Metrics.widthRatio(20),
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: Metrics.smallMargin,
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Report
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>
          </>
        </View>
      </SafeAreaView>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({
  postDetail,
  comments,
  user,
  generalPosts,
  watchList,
  posts,
}) => ({
  posts: posts["data"],
  postDetail: postDetail["data"],
  postComments: comments["data"],
  isCommentFetching: comments["isFetching"],
  user: user["data"].user,
  generalPosts: generalPosts["data"],
  watchList: watchList["data"],
});

export default connect(mapStateToProps, actions)(PostDetails);

const styles = StyleSheet.create({
  placeholderBox: {
    position: "absolute",
    bottom: 10,
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
