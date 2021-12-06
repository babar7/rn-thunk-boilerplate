import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import BottomNavigation from "./BottomNavigation";
import MovieBox from "./MovieBox";
import { styles } from "../../Stylesheets/StylesProfile";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../../HttpServiceManager/constant";
import {
  NEW_REVIEW,
  MY_POSTS,
  OTHER_USER,
  OTHER_USER_POST,
  UPDATE_POST,
  WATCHLIST,
  POSTS,
  COMMENTS,
  POST_DETAIL,
} from "../../Store/Types";
// import { AlertHelper } from "../../utility/utility";
import {
  ImageHandler,
  RoundImage,
  FlatListHandler,
  PostCard,
} from "../../reuseableComponents";
import { Metrics } from "../../theme";
import moment from "moment";
import { globalStyles } from "../../Stylesheets/GlobalStyles";
import { getPostRequest } from "../../Store/Action/PostAction";
import Share from "react-native-share";
import RBSheet from "react-native-raw-bottom-sheet";
import images from "../../assets";
import { AlertHelper } from "../../utility/utility";

class OtherUser extends React.Component {
  state = {
    about: true,
    photos: false,
    reviews: false,
    imageModalVisible: false,
    isMyPost: false,
    sharedPostTitle: "",
    postID: 0,
  };

  componentDidMount() {
    const {
      request,
      navigation,
      getPostRequest,
      generalSaveAction,
    } = this.props;
    let otherUser = navigation.getParam("otherUser", null);
    if (_.isUndefined(otherUser)) return;
    let params = { other_user_id: otherUser.id };
    let postParams = { limit: 10, offset: 0, otherUserId: otherUser.id };
    request(
      constant.getOtherUser,
      "get",
      params,
      undefined,
      true,
      (response) => {
        generalSaveAction(OTHER_USER.SUCCESS, response.user);
      }
    );

    getPostRequest(constant.posts, "get", postParams, OTHER_USER_POST, true);
  }

  componentWillUnmount() {
    const { generalSaveAction } = this.props;
    generalSaveAction(OTHER_USER.CANCEL, {});
  }

  handlerFollowingStatus = (user) => () => {
    const { request } = this.props;
    const { id } = user;
    request(
      constant.followUser + id,
      "post",
      {},
      undefined,
      true,
      this.updateList
    );
  };

  updateList = (response) => {
    const { user } = response;
    const { request, followings, generalSaveAction } = this.props;
    generalSaveAction(OTHER_USER.SUCCESS, user);
  };

  // ======================================================================
  // ======================================================================

  // Post Like Handler
  likeDislikeHandler = (postID) => (count) => {
    const { generalSaveAction, request, generalPosts } = this.props;
    let selectedPost = generalPosts[postID];
    let updatedPost = {
      ...selectedPost,
      likedByMe: !selectedPost.likedByMe,
      likeCount: count,
    };
    generalSaveAction(UPDATE_POST, updatedPost);
    request(constant.likePost + postID, "post", null, undefined, false);
  };

  commentHandler = (postID) => () => {
    const { generalSaveAction, request, navigation } = this.props;
    request(
      constant.comments + postID,
      "get",
      { limit: 10, offset: 0 },
      COMMENTS,
      true,
      undefined,
      undefined,
      false,
      true
      // () => navigation.navigate("Comments")
    );

    navigation.navigate("Comments", { postID });
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

    generalSaveAction(UPDATE_POST, responseOnSuccess.post);
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
    const { generalSaveAction, generalPosts, posts } = this.props;
    const { postID } = this.state;
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

    generalSaveAction(UPDATE_POST, responseOnSuccess);
    generalSaveAction(POSTS.SUCCESS, [responseOnSuccess.id, ...posts]);
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

  postDetailHandler = (postID) => () => {
    const { generalPosts, request, generalSaveAction, navigation } = this.props;
    let id = generalPosts[postID].sharedPost.id ?? 0;
    request(
      constant.postDetail + id,
      "get",
      null,
      POST_DETAIL,
      true,
      () => navigation.navigate("PostDetails", { postID }),
      undefined,
      false,
      true
    );
    // navigation.navigate("PostDetails", { postID });
  };

  OtherProfileHandler = (createdBy) => () => {
    const { navigation, user } = this.props;
    let routeName = user.id == createdBy.id ? "MyProfile" : "OtherUser";
    navigation.navigate(routeName, { otherUser: createdBy });
  };

  updateTitleText = (text) => {
    this.setState({ sharedPostTitle: text });
  };

  rednerMovieBox = ({ item, index }) => {
    const { generalPosts } = this.props;
    let post = generalPosts[item];
    if (_.isUndefined(post)) return;
    try {
      return (
        <PostCard
          data={post}
          cbOnLike={this.likeDislikeHandler(item)}
          cbOnComment={this.commentHandler(item)}
          cbOnWatchlist={this.addOrRemoveToWatchList(item)}
          cbOnSharePost={this.sharePostHandler(item)}
          cbForUserProfileSearch={this.OtherProfileHandler}
          cbForPostDetail={this.postDetailHandler(item)}
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
    const { otherUser, navigation } = this.props;
    const { isMyPost, sharedPostTitle } = this.state;

    const {
      avatar,
      cover,
      iAmFollowing,
      quotes,
      totalPosts,
      totalReposts,
      id,
    } = otherUser;
    let postCount = totalPosts + totalReposts;
    let followerCount = otherUser["followers"];
    let followingCount = otherUser["followings"];
    let name = otherUser["name"];
    let favoriteMovies = otherUser["favoriteMovies"];
    let about = otherUser["about"];
    let favorite_quote = otherUser["quotes"];
    let favoriteGenre = otherUser["favoriteGenre"];

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0C1A1E"
        />
        <View style={styles.innerCont}>
          <ImageBackground
            style={styles.imageStyle}
            imageStyle={{
              borderColor: "transparent",
              resizeMode: "stretch",
            }}
            source={require("../../assets/bg.png")}
          >
            <ScrollView>
              <View style={styles.mainTop}>
                <ImageBackground
                  style={styles.imageStyle}
                  imageStyle={{
                    borderColor: "transparent",
                    resizeMode: "stretch",
                    alignContent: "center",
                  }}
                  source={{ uri: cover }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "rgba(100, 100, 100, 0.5)",
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginHorizontal: Metrics.baseMargin }}
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                          resizeMode: "contain",
                          tintColor: "white",
                        }}
                        source={require("../../assets/backArrowBlack.png")}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={this.handlerFollowingStatus(otherUser)}
                      style={styles.followBtn}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 17,
                          fontFamily: "SF-Regular",
                        }}
                      >
                        {iAmFollowing ? "Following" : "Follow"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.myProfileView}>
                    <TouchableOpacity activeOpacity={0.7}>
                      <RoundImage
                        imgStyle={{
                          height: Metrics.widthRatio(130),
                          width: Metrics.widthRatio(130),
                          borderRadius: Metrics.widthRatio(130 / 2),
                          marginBottom: 10,
                        }}
                        source={{ uri: avatar }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "rgba(100, 100, 100, 0.5)",
                        width: "100%",
                      }}
                    >
                      <Text style={styles.name1}>{name}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>

              {/*posts /followers / following*/}
              <View style={styles.midBarView}>
                <View style={styles.midBarCont}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        about: false,
                        photos: true,
                        reviews: false,
                      });
                    }}
                  >
                    <Text style={styles.midBarNo}>{postCount || 0}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        about: false,
                        photos: true,
                        reviews: false,
                      });
                    }}
                  >
                    <Text style={styles.midBarTxt}>Post</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.midBarCont}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Followers", {
                        otherUserId: id,
                      });
                    }}
                  >
                    <Text style={styles.midBarNo}>{followerCount || 0}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Followers", {
                        otherUserId: id,
                      });
                    }}
                  >
                    <Text style={styles.midBarTxt}>Followers</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.midBarCont}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Following", {
                        otherUserId: id,
                      });
                    }}
                  >
                    <Text style={styles.midBarNo}>{followingCount || 0}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Following", {
                        otherUserId: id,
                      });
                    }}
                  >
                    <Text style={styles.midBarTxt}>Following</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*end*/}

              {/* interests/myviews */}
              <View style={styles.aboutWholeView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      about: true,
                      photos: false,
                      reviews: false,
                    });
                  }}
                  style={
                    this.state.about == true
                      ? styles.aboutTagSelected
                      : styles.aboutTag
                  }
                >
                  <Text
                    style={
                      this.state.about == true
                        ? styles.aboutTextSelected
                        : styles.aboutText
                    }
                  >
                    Interests
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      about: false,
                      photos: true,
                      reviews: false,
                    });
                  }}
                  style={
                    this.state.photos == true
                      ? styles.aboutTagSelected
                      : styles.aboutTag
                  }
                >
                  <Text
                    style={
                      this.state.photos == true
                        ? styles.aboutTextSelected
                        : styles.aboutText
                    }
                  >
                    My Views
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                {this.AboutView(
                  about,
                  favoriteMovies,
                  favorite_quote,
                  favoriteGenre
                )}
                {this.PhotosView()}
              </View>
            </ScrollView>

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
                        source={require("../../assets/closeModal.png")}
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
                          marginHorizontal: 10,
                        }}
                        resizeMode="contain"
                        source={require("../../assets/shareOther.png")}
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
          </ImageBackground>
        </View>
      </View>
    );
  }

  AboutView(about_me, favoriteMovies, favorite_quote, favoriteGenre) {
    if (this.state.about == true)
      return (
        <View
          style={{
            width: "100%",
            backgroundColor: "#transparent",
          }}
        >
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              height: "100%",
            }}
          >
            <View style={styles.aboutView}>
              <View style={styles.editSec}>
                <Text style={styles.heading}>About Me</Text>
              </View>
              <Text style={styles.about}>{about_me}</Text>
            </View>
            <View style={styles.aboutView}>
              <View style={styles.editSec}>
                <Text style={styles.heading}>Favorite Movies</Text>
              </View>
              <View>
                <FlatListHandler
                  data={favoriteMovies}
                  renderItem={({ item, index }) => {
                    return (
                      <ImageHandler
                        style={styles.horizontalImg}
                        source={{
                          uri: item?.movie?.image?.url,
                        }}
                      />
                    );
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  emptyListMsg="No Favorite Movie"
                />
              </View>
            </View>
            <View style={styles.aboutView}>
              <View style={styles.editSec}>
                <Text style={styles.heading}>Favorite Quotes</Text>
              </View>
              <Text style={styles.about}>{favorite_quote}</Text>
            </View>

            <View style={styles.aboutView}>
              <View style={styles.editSec}>
                <Text style={styles.heading}>Genre</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <FlatListHandler
                  data={favoriteGenre}
                  emptyListMsg="No Favorite Genre"
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.GenreView}>
                        <Image
                          style={[
                            styles.horizontalImg,
                            {
                              width: 70,
                              height: 90,
                              backgroundColor: "transparent",
                              tintColor: "white",
                            },
                          ]}
                          source={{ uri: item.image }}
                        />
                        <Text
                          style={{
                            alignSelf: "center",
                            fontFamily: "SF-SemiBold",
                            fontSize: 13,
                            color: "#fff",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    );
                  }}
                  horizontal={true}
                  emptyListMsg="No Favorite Genre"
                />
              </View>
            </View>
          </View>
        </View>
      );
  }

  PhotosView() {
    const { otherUserPosts } = this.props;

    if (this.state.photos == true)
      return (
        <View
          style={{
            backgroundColor: "transparent",
          }}
        >
          <FlatListHandler
            showsVerticalScrollIndicator={false}
            data={otherUserPosts}
            extraData={otherUserPosts}
            renderItem={this.rednerMovieBox}
            contentContainerStyle={{
              paddingBottom: Metrics.doubleBaseMargin,
            }}
          />
        </View>
      );
  }
  ReviewsView() {
    if (this.state.reviews == true)
      return (
        <View style={styles.wholeViewForReviews}>
          <ScrollView></ScrollView>
        </View>
      );
  }
}

const actions = { request, generalSaveAction, getPostRequest };
const mapStateToProps = ({
  otherUser,
  otherUserPosts,
  posts,
  generalPosts,
  watchList,
  user,
}) => ({
  posts: posts["data"],
  watchList: watchList["data"],
  generalPosts: generalPosts["data"],
  user: user["data"].user,
  otherUser: otherUser["data"],
  otherUserPosts: otherUserPosts["data"],
  // otherUser
});

export default connect(mapStateToProps, actions)(OtherUser);
