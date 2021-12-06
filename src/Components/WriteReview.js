import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { styles } from "../Stylesheets/StylesWriteReview";
import { stylesHead } from "../Stylesheets/WhiteHeader";
import { Rating, AirbnbRating } from "react-native-elements";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { WRITE_REVIEW, POSTS, UPDATE_POST } from "../Store/Types";
import { AlertHelper } from "../utility/utility";
import { ImageHandler, RoundImage } from "../reuseableComponents";

class WriteReview extends Component {
  state = {
    modalVisible2: false,
    t1: true,
    t2: false,
    t3: false,
    t4: false,
    ratingValue: 0,
    review: "",
  };

  validate = () => {
    const { review, ratingValue } = this.state;
    const { selectedPlatforms, selectedTitle } = this.props;
    if (_.isEmpty(review)) {
      AlertHelper.show("error", "", "Please write your review");
      return false;
    } else if (_.isEmpty(selectedTitle)) {
      AlertHelper.show("error", "", "Please select title");
      return false;
    } else if (!ratingValue) {
      AlertHelper.show("error", "", "Rating is required");
      return false;
    } else if (_.isEmpty(selectedPlatforms)) {
      AlertHelper.show("error", "", "Please select available platform");
      return false;
    } else return true;
  };

  writeAReview = () => {
    const {
      request,
      generalSaveAction,
      navigation,
      selectedPlatforms,
      selectedTitle,
      posts,
    } = this.props;
    const { review, ratingValue } = this.state;

    let params = {
      movieId: selectedTitle,
      rating: ratingValue,
      review,
      platforms: selectedPlatforms,
    };
    if (this.validate()) {
      request(constant.posts, "post", params, WRITE_REVIEW, true, (success) => {
        let updatedPosts = [success.id, ...posts];
        generalSaveAction(UPDATE_POST, success);
        generalSaveAction(POSTS.SUCCESS, updatedPosts);
        AlertHelper.show("success", "", "Post created successfuly");

        navigation.pop();
      });
    }
    //   this.props.navigation.navigate("Home")
  };

  handleButtonPress = () => {
    this.props.navigation.navigate("DrawerToggle");
  };
  render() {
    const {
      user,
      selectedPlatformsName,
      selectedTitleName,
      selectedGenreName,
      selectedTitle,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#0C1A1E"
          />
          {/* header */}
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
              <Text style={stylesHead.headText1}>Write a Review</Text>
            </View>
          </View>
          {/* Scrolling Body */}
          <ScrollView>
            <View style={styles.backArrow2}>
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={styles.pic}>
                  <RoundImage
                    imgStyle={styles.picImage}
                    source={user.avatar ? { uri: user.avatar } : undefined}
                  />
                </View>

                <Text style={styles.postUserName}>{user.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.PostButton}
                onPress={this.writeAReview}
              >
                <Text style={{ color: "#738388" }}>Post</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Write a Review"
              value={this.state.review}
              multiline={true}
              style={styles.reviewBox}
              onChangeText={(text) => this.setState({ review: text })}
            ></TextInput>
            {/* <View style={{ height: 150 }} /> */}
            {/* </View> */}
            <View>
              {/* Title */}
              <TouchableOpacity
                style={this.state.t1 == true ? styles.box1 : styles.box}
                onPress={() => {
                  this.props.navigation.navigate("Title");
                  this.setState({
                    t1: true,
                    t2: false,
                    t3: false,
                    t4: false,
                  });
                }}
              >
                <Text
                  style={
                    this.state.t1 == true
                      ? styles.textInsideBox2
                      : styles.textInsideBox1
                  }
                >
                  Title
                </Text>
                <Text
                  style={
                    this.state.t1 == true
                      ? styles.textInsideBox2
                      : styles.textInsideBox1
                  }
                >
                  {selectedTitleName}
                </Text>
                <Icon
                  name="md-search"
                  size={22}
                  color={this.state.t1 == true ? "white" : "black"}
                ></Icon>
              </TouchableOpacity>
              {/* Start rating */}
              <TouchableOpacity
                style={this.state.t2 == true ? styles.box1 : styles.box}
                onPress={() => {
                  this.setState({ modalVisible2: true });
                  this.setState({
                    t1: false,
                    t2: true,
                    t3: false,
                    t4: false,
                  });
                }}
              >
                <Text
                  style={
                    this.state.t2 == true
                      ? styles.textInsideBox2
                      : styles.textInsideBox1
                  }
                >
                  Star Rating
                </Text>
                <Rating
                  readonly={true}
                  type="custom"
                  // onFinishRating={(raitng) => {
                  //   let ratingValue = Math.ceil(raitng * 2) / 2;
                  //   this.setState({ ratingValue });
                  // }}
                  // marginBetweenRatingIcon={2}
                  ratingBackgroundColor="#CDCDC5"
                  startingValue={this.state.ratingValue}
                  showRating={false}
                  tintColor={"#fff"}
                  // fractions={1}
                  imageSize={15}
                  style={{
                    // paddingVertical: 10,
                    backgroundColor: "transparent",
                    // borderLeftWidth: 1,
                    // borderLeftColor: "white",
                  }}
                />
                {/* <View style={{ flexDirection: "row" }}>
                  <Icon
                    name="md-star"
                    size={18}
                    color={this.state.t2 == true ? "white" : "black"}
                  ></Icon>
                  <Icon
                    name="md-star"
                    size={18}
                    color={this.state.t2 == true ? "white" : "black"}
                  ></Icon>
                  <Icon
                    name="md-star"
                    size={18}
                    color={this.state.t2 == true ? "white" : "black"}
                  ></Icon>
                  <Icon
                    name="md-star"
                    size={18}
                    color={this.state.t2 == true ? "white" : "black"}
                  ></Icon>
                  <Icon
                    name="md-star"
                    size={18}
                    color={this.state.t2 == true ? "white" : "black"}
                  ></Icon>
                </View> */}

                {/*star rating Modal*/}

                <Modal
                  visible={this.state.modalVisible2}
                  transparent={true}
                  animationType={"fade"}
                >
                  <View
                    style={styles.modalView}
                    onPress={() => {
                      this.setState({ modalVisible2: true });
                    }}
                  >
                    <View style={styles.ratingView}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ modalVisible2: false });
                        }}
                        style={{
                          width: "100%",
                          height: "15%",
                          borderEndWidth: 0,
                        }}
                      >
                        <Image
                          style={{
                            width: "10%",
                            alignSelf: "flex-end",
                            height: "100%",
                            resizeMode: "contain",
                          }}
                          source={require("../assets/cross.png")}
                        ></Image>
                      </TouchableOpacity>

                      <View style={styles.ratingStars}>
                        <Text style={styles.smText2}>Star Rating</Text>
                      </View>

                      <View style={styles.ratingStarsView}>
                        <Rating
                          type="custom"
                          onFinishRating={(raitng) => {
                            let ratingValue = Math.ceil(raitng * 2) / 2;
                            this.setState({ ratingValue });
                          }}
                          marginBetweenRatingIcon={2}
                          ratingBackgroundColor="#CDCDC5"
                          startingValue={this.state.ratingValue}
                          showRating={false}
                          tintColor={"#fff"}
                          fractions={1}
                          imageSize={30}
                          style={{
                            paddingVertical: 10,
                            backgroundColor: "#fff",
                            borderLeftWidth: 1,
                            borderLeftColor: "white",
                          }}
                        />
                      </View>

                      <View
                        style={{
                          width: "100%",
                          height: "20%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.smText3}>
                          {this.state.ratingValue}/5 (Average)
                        </Text>
                      </View>

                      {/*submit */}
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ modalVisible2: false });
                        }}
                        style={{
                          width: "100%",
                          height: "20%",
                          borderEndWidth: 0,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "red",
                            width: "95%",
                            // height: "80%",
                            height: 45,
                            borderRadius: 7,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "SF-Regular",
                              fontSize: 22,
                              color: "#fff",
                            }}
                          >
                            Submit
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                {/*end*/}
              </TouchableOpacity>
              <TouchableOpacity
                style={this.state.t3 == true ? styles.box1 : styles.box}
                onPress={() => {
                  this.props.navigation.navigate("AvailableOn");
                  this.setState({
                    t1: false,
                    t2: false,
                    t3: true,
                    t4: false,
                  });
                }}
              >
                <Text
                  style={
                    this.state.t3 == true
                      ? styles.textInsideBox2
                      : styles.textInsideBox1
                  }
                >
                  Available On
                </Text>
                {selectedPlatformsName.map((item) => {
                  return (
                    <Text
                      style={
                        this.state.t3 == true
                          ? styles.textInsideBox2
                          : styles.textInsideBox1
                      }
                    >
                      {item}
                    </Text>
                  );
                })}
                <Icon
                  name="md-search"
                  size={22}
                  color={this.state.t3 == true ? "white" : "black"}
                ></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.box}
                disabled={_.isEmpty(selectedTitle)}
                onPress={() => {
                  this.props.navigation.navigate("Category");
                }}
              >
                <Text style={styles.textInsideBox1}>Category</Text>
                <Text style={{ ...styles.textInsideBox1, color: "darkgrey" }}>
                  {selectedGenreName}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ signup, user, saveSelection, posts }) => ({
  signupUserData: signup["data"],
  user: user["data"].user,
  selectedPlatforms: saveSelection["selectedPlatforms"],
  selectedPlatformsName: saveSelection["selectedPlatformsName"],
  selectedTitle: saveSelection["selectedTitle"],
  selectedTitleName: saveSelection["selectedTitleName"],
  selectedGenreName: saveSelection["selectedGenreName"],
  posts: posts["data"],
});

export default connect(mapStateToProps, actions)(WriteReview);
