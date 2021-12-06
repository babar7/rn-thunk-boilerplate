import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import * as Font from "expo-font";
import { Icon } from "react-native-elements";
import { Rating, AirbnbRating } from "react-native-elements";

import { connect } from "react-redux";
import {
  request,
  generalSaveAction,
  multipleRequest,
} from "../../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../../HttpServiceManager/constant";
import {
  POSTS,
  NEW_REVIEW,
  WATCHLIST,
  POST_DETAIL,
  COMMENTS,
  UPDATE_POST,
} from "../../Store/Types";
import { AlertHelper } from "../../utility/utility";
import {
  FlatListHandler,
  PostCard,
  RoundImage,
  ImageHandler,
} from "../../reuseableComponents";
import { Metrics } from "../../theme";
import moment from "moment";
import Share from "react-native-share";

class MovieBoxFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedPostTitle: "",
      commentOnPost: "",
      replyOnComment: "",
    };
  }

  componentDidMount() {}

  getLikeButtonColor = (item) => (item.likedByMe ? "#FF2632" : "#738388");
  getLikeText = (item) => (item.likedByMe ? "Liked" : "Like");

  updateLike = () => {
    this.setState({
      like: !this.state.like,
    });
  };
  RBsheetHandler = () => {
    this.RBSheet.close();
    this.RBSheetShare.open();
  };

  //   ===========================================================
  //   ===========================================================

  // Post Like Handler
  likeDislikeHandler = (count) => {
    const { generalSaveAction, request, generalPosts, postID } = this.props;
    let selectedPost = generalPosts[postID];
    let updatedPost = null;
    if (selectedPost.sharedPostFlag) {
      updatedPost = {
        ...selectedPost,
        sharedPost: {
          ...selectedPost.sharedPost,
          likedByMe: !selectedPost.sharedPost.likedByMe,
          likeCount: count,
        },
      };
    } else {
      updatedPost = {
        ...selectedPost,
        likedByMe: !selectedPost.likedByMe,
        likeCount: count,
      };
    }
    generalSaveAction(UPDATE_POST, updatedPost);
    request(constant.likePost + postID, "post", null, undefined, false);
  };

  textFieldFocus = () => this.commentFieldRef.focus();

  commentHandler = (ref_id, ref_type) => () => {
    const {
      generalSaveAction,
      request,
      postComments,
      postID,
      generalPosts,
    } = this.props;
    const { commentOnPost, replyOnComment } = this.state;
    let commntText = ref_type == "post" ? commentOnPost : replyOnComment;
    let params = {
      ref_id,
      ref_type,
      text: commntText,
    };

    request(constant.comments, "post", params, undefined, true, (response) => {
      let updatedCommntsList = [...postComments];
      updatedCommntsList.push(response);
      let updatePostDetail = {
        ...generalPosts[postID],
        commentsCount: (generalPosts[postID].commentsCount += 1),
      };
      generalSaveAction(UPDATE_POST, updatePostDetail);
      generalSaveAction(COMMENTS.SUCCESS, updatedCommntsList);
      this.setState({ commentOnPost: "" });
    });
  };

  commentStatusHandler = (item) => () => {
    item.likedByMe = !item.likedByMe;
    this.setState({ item });
  };

  addOrRemoveToWatchList = () => {
    const { postID, generalSaveAction, request } = this.props;
    request(
      constant.subscribePost + postID,
      "post",
      null,
      undefined,
      true,
      this.onRequestSuccess
    );
  };

  onRequestSuccess = (responseOnSuccess) => {
    const { generalSaveAction, request } = this.props;
    // let updatePostDetail = {
    //   ...postDetail,
    //   SubscrbedByMe: !postDetail.SubscrbedByMe,
    // };
    generalSaveAction(UPDATE_POST, responseOnSuccess.post);
    let params = { limit: 10, offset: 0, subscribedPosts: true };
    request(constant.posts, "get", params, WATCHLIST, false);
  };

  //   Internal Share Handler
  sharePostHandler = () => {
    this.setState({ sharedPostTitle: "" }, () =>
      this.RBSheetForSharePost.open()
    );
  };

  //   Internal Share Handler
  internalPostShare = () => {
    const { generalSaveAction, request, generalPosts, postID } = this.props;
    const { sharedPostTitle } = this.state;
    this.RBSheetForSharePost.close();
    request(
      constant.sharePost + postID,
      "post",
      { text: sharedPostTitle },
      undefined,
      true,
      () => {
        AlertHelper.show("success", "", "Post Shared ");
        let updatePostDetail = {
          ...generalPosts[postID],
          shareCount: (generalPosts[postID].shareCount += 1),
        };
        generalSaveAction(UPDATE_POST, updatePostDetail);
      }
    );
  };

  //   External Share Handler

  externalPostShare = () => {
    const { generalPosts, postID } = this.props;
    const { sharedPostTitle } = this.state;
    let url =
      generalPosts[postID] && generalPosts[postID].link
        ? generalPosts[postID].link
        : "Viewed Socail App";
    try {
      this.RBSheetForSharePost.close();
      Share.open({
        message: sharedPostTitle,
        title: "Viewed",
        url,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    } catch (error) {
      error && console.log(error);
    }
  };

  updateTitleText = (text) => {
    this.setState({ sharedPostTitle: text });
  };

  //   ===========================================================

  onChangeCommentHandler = (text, comntType) => {
    this.setState({ [comntType]: text });
  };

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

  //   ===========================================================
  //   ===========================================================

  renderMoveBox = () => {
    const { generalPosts, postID } = this.props;
    let post = generalPosts[postID];
    // if (_.isUndefined(post)) return;
    try {
      let postObj = post.sharedPostFlag ? post.sharedPost : post;
      const {
        review,
        ratingFloat,
        likedByMe,
        SubscrbedByMe,
        mutedByMe,
        likeCount,
        shareCount,
        commentsCount,
        createdBy,
        movie,
        createdAt,
        id,
        platforms,
      } = postObj;
      // if (_.isUndefined(movie) && _.isEmpty(movie)) return;
      let postedBy = createdBy["user"].name;
      let createdByUserImage = createdBy["user"].link ?? undefined;
      let postedImage =
        movie && movie["image"].length && movie["image"].url
          ? movie["image"].url
          : undefined;
      let postedMovieTitle =
        movie && movie["title"] && movie["title"].name
          ? movie["title"].name
          : "Not Available";
      // let genre =  movie["genre"][0].name;
      let genre =
        movie && movie["genre"] && movie["genre"].length
          ? movie["genre"][0].name
          : "Not Available";
      let postCreatedAt = moment(createdAt).format("MMM DD, h:mm a");
      return (
        <PostCard
          review={review}
          rating={ratingFloat}
          postCreatedAt={postCreatedAt}
          likedByMe={likedByMe}
          SubscrbedByMe={SubscrbedByMe}
          mutedByMe={mutedByMe}
          likeCount={likeCount}
          shareCount={shareCount}
          commentsCount={commentsCount}
          postedBy={postedBy}
          createdByUserImage={createdByUserImage}
          postedImage={postedImage}
          postedMovieTitle={postedMovieTitle}
          genre={genre}
          platformsImageUrl={platforms}
          cbOnLike={this.likeDislikeHandler}
          cbOnComment={this.textFieldFocus}
          cbOnWatchlist={this.addOrRemoveToWatchList}
          cbOnSharePost={this.sharePostHandle}
          cbForUserProfileSearch={this.OtherProfileHandler}
          movieImgStyle={{ width: Metrics.screenWidth - 50 }}
        />
      );
    } catch (error) {
      alert(error);
      global.log("error", error);
    }
  };

  renderPostComments = ({ item, index }) => {
    const { name, avatar } = item["sender"].user;
    let senderName = name;
    let senderImageUri = avatar;
    let commentText = item["text"];
    let commentAt = this.getDateFrom(item.createdAt);

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
            <TouchableOpacity
            //   onPress={() => {
            //     let comments = this.state.comments;
            //     comments[index].reply = !comments[index].reply;
            //     this.setState({ comments });
            //   }}
            >
              <Text style={styles.textJustViewed3}>Reply</Text>
            </TouchableOpacity>
          </View>
          {false ? (
            <View style={styles.placeholderBox}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require("../../assets/smile.png")}
                />
                <TextInput
                  autoFocus
                  multiline
                  style={styles.placeholderBox1}
                  placeholderTextColor="#B5B5B5"
                  placeholder="Write here..."
                ></TextInput>
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
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../assets/send.png")}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  //   ===========================================================
  render() {
    const { postComments, postID } = this.props;
    const { commentOnPost, sharedPostTitle } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.renderMoveBox()}

        {/* Seperator */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#BFBFBF",
            marginHorizontal: 5,
          }}
        />

        {/* Comments Section */}

        <FlatListHandler
          data={postComments}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 12 }}
          renderItem={this.renderPostComments}
        />

        {/* Text Field For write A comment */}

        <View style={styles.placeholderBox}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../../assets/smile.png")}
            />
            <TextInput
              // autoFocus
              ref={(cmntInputRef) => {
                this.commentFieldRef = cmntInputRef;
              }}
              value={commentOnPost}
              multiline
              style={styles.placeholderBox1}
              placeholderTextColor="#B5B5B5"
              placeholder="Write here..."
              onChangeText={(text) =>
                this.onChangeCommentHandler(text, "commentOnPost")
              }
            ></TextInput>
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
            onPress={this.commentHandler(postID, "post")}
            disabled={_.isEmpty(commentOnPost)}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/send.png")}
            />
          </TouchableOpacity>
        </View>

        {/* End Comment section */}

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
                  <Image
                    style={{
                      width: Metrics.widthRatio(60),
                      height: Metrics.widthRatio(60),
                      borderRadius: Metrics.widthRatio(60 / 2),
                      resizeMode: "contain",
                      marginHorizontal: 10,
                    }}
                    source={require("../../assets/images/users/boy1.png")}
                  />
                  <Text style={styles.title}>User Name</Text>
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
                    }}
                    source={require("../../assets/closeModal.png")}
                  ></Image>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "column" }}>
                <TextInput
                  caretHidden={true}
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
                      resizeMode: "contain",
                      marginLeft: 7,
                    }}
                    source={require("../../assets/shareOther.png")}
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
                      resizeMode: "contain",
                      marginLeft: 7,
                    }}
                    source={require("../../assets/shareOther.png")}
                  ></Image>
                  <Text style={[styles.title, { fontWeight: "bold" }]}>
                    External
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </>
      </SafeAreaView>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ postDetail, comments, generalPosts }) => ({
  postID: postDetail["data"],
  postComments: comments["data"],
  generalPosts: generalPosts["data"],
});

export default connect(mapStateToProps, actions)(MovieBoxFull);

const styles = StyleSheet.create({
  placeholderBox: {
    marginTop: 10,
    width: "100%",
    paddingVertical: 5,
    flexDirection: "row",
    // height: "60%",
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#738388",
    //backgroundColor:"pink",
    paddingLeft: 7,
    //marginBottom: 43,
    alignItems: "center",
  },
  placeholderBox1: {
    width: "90%",
    // paddingVertical: 15,
    paddingHorizontal: 10,
    // flex: 1,
    flexDirection: "row",
    // height: 50,
    borderWidth: 0,
  },
  dateAndStarsRatings: {
    width: "85%",
    alignSelf: "flex-end",
    height: 30,
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
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 0,
    flex: 1,
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
    //marginRight:4
  },

  boldName: {
    fontSize: 15,
    fontWeight: "bold",
  },

  boldName2: {
    fontSize: 15,
    fontWeight: "bold",
    //left:-2,
    bottom: 2,
  },
  textJustViewed1: {
    fontSize: 13,
    color: "#000000",
    textAlign: "left",
    flex: 1,
    flexWrap: "wrap",
    marginTop: 5,

    // fontWeight: "bold",
  },
  textJustViewed3: {
    paddingVertical: 3,
    fontSize: 12,
    marginHorizontal: 3,
    // width: 300,
    // fontWeight: "900",
    //alignSelf:"flex-end",
    color: "#738388",
    // fontWeight: "bold",
  },
  nameAndJustViwedBox: {
    width: "100%",
    height: 20,
    //alignItems:"flex-start",
    //justifyContent:"center",
    flexDirection: "row",
  },

  nameAndJustViwedBox2: {
    width: "100%",
    height: 20,
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
  just1: {
    width: "85%",
    // height: "88%",
    // backgroundColor: "#F1F1F1",
    // borderRadius: 5,
    // padding: 5,
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
  justViewedBox1: {
    // paddingVertical: 10,
    width: "100%",
    // height: 120,
    //borderWidth:2,
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
    //borderWidth:1,
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
