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
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";

import { Rating } from "react-native-elements";
import { styles } from "../Stylesheets/StylesExplore";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import {
  MOVIE_PLATFORM,
  SELECTED_PLATFORMS,
  MOVIE_CATEGORY,
  SELECTED_CATEGORY,
  NEW_REVIEW,
  EXPLORE_POST,
} from "../Store/Types";
import { AlertHelper } from "../utility/utility";
import {
  ImageHandler,
  RoundImage,
  FlatListHandler,
} from "../reuseableComponents";
import { Metrics } from "../theme";
import { getPostRequest } from "../Store/Action/PostAction";

class ExplorePage extends Component {
  state = {
    ratingValue: 0,
    keyword: "",
  };

  componentDidMount() {
    const {
      request,
      selectedPlatforms,
      selectedCategories,
      generalSaveAction,
    } = this.props;
    let params = { limit: 21, offset: 0 };
    generalSaveAction(NEW_REVIEW);
    _.isEmpty(selectedPlatforms) &&
      request(constant.platform, "get", params, MOVIE_PLATFORM, false);
    _.isEmpty(selectedCategories) &&
      request(constant.genre, "get", params, MOVIE_CATEGORY, false);
  }

  handleSelection = (item, index) => {
    const { selectedPlatforms, generalSaveAction } = this.props;
    let updatedData = [...selectedPlatforms];
    if (selectedPlatforms.includes(item.id)) {
      updatedData = updatedData.filter((platformId) => platformId != item.id);
    } else {
      updatedData.push(item.id);
    }
    generalSaveAction(SELECTED_PLATFORMS, updatedData);
  };

  handleCatSelection = (item, index) => {
    const { selectedCategories, generalSaveAction } = this.props;
    let updatedData = [...selectedCategories];
    if (selectedCategories.includes(item.id)) {
      updatedData = updatedData.filter((platformId) => platformId != item.id);
    } else {
      updatedData.push(item.id);
    }
    generalSaveAction(SELECTED_CATEGORY, updatedData);
  };

  handleReset = () => {
    const { generalSaveAction } = this.props;
    generalSaveAction(NEW_REVIEW);
    this.setState({ ratingValue: 0, keyword: "" });
  };

  explorePosts = () => {
    const {
      getPostRequest,
      generalSaveAction,
      navigation,
      selectedPlatforms,
      selectedTitleName,
      selectedCategories,
    } = this.props;
    const { ratingValue, keyword } = this.state;
    let params = {
      limit: 20,
      offset: 0,
      title: keyword ?? "",
      // title: selectedTitleName ?? "",
      platforms: selectedPlatforms,
      genre: selectedCategories,
    };
    if (ratingValue) {
      params.rating = ratingValue;
    }
    console.warn(params);
    getPostRequest(
      constant.posts,
      "get",
      params,
      EXPLORE_POST,
      true,
      (success) => {
        navigation.navigate("ExplorePost");
      }
    );
  };

  render() {
    const {
      moviePlatforms,
      selectedPlatforms,
      movieCategories,
      selectedCategories,
      selectedTitleName,
    } = this.props;
    const { keyword } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.mainView}>
            <View style={styles.backArrowHead}>
              <TouchableOpacity
                style={styles.backBtn}
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
                ></Image>
              </TouchableOpacity>
              <Text style={styles.headTitle}>Explore</Text>
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={this.handleReset}
              >
                <Text style={{ color: "#738388" }}>Reset</Text>
              </TouchableOpacity>
            </View>
            {/*login */}

            <ScrollView>
              <View style={styles.backArrow}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      marginVertical: 12,
                      width: 22,
                      height: 32,
                      resizeMode: "contain",
                    }}
                    source={require("../assets/search.png")}
                  ></Image>

                  <TextInput
                    placeholder="Keyword"
                    placeholderTextColor="#738388"
                    value={keyword}
                    style={{
                      marginLeft: 15,
                      marginTop: 5,
                      width: "70%",
                      borderWidth: 0,
                      height: "100%",
                    }}
                    onChangeText={(text) => this.setState({ keyword: text })}
                  />
                </View>
              </View>

              {/*title */}

              <View style={styles.backArrow}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Title");
                  }}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.smText2}>Title</Text>
                  <Text style={styles.smText2}>{selectedTitleName}</Text>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: "contain",
                    }}
                    source={require("../assets/rightB.png")}
                  ></Image>
                </TouchableOpacity>
              </View>

              <View style={styles.starRatingBox}>
                <View
                  style={{
                    width: "100%",
                    height: "30%",
                    borderEndWidth: 0,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.smText22}>Star Rating</Text>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: "80%",
                    borderEndWidth: 0.5,
                  }}
                >
                  <View
                    style={{
                      width: "90%",
                      borderRadius: 7,
                      borderWidth: 0.5,
                      height: "70%",
                      borderColor: "#B7BDBF",
                      backgroundColor: "#F9F9F9",
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        type="custom"
                        ratingColor={"#EFC933"}
                        ratingBackgroundColor="#CDCDC5"
                        startingValue={this.state.ratingValue}
                        onFinishRating={(raitng) => {
                          let ratingValue = Math.ceil(raitng * 2) / 2;
                          this.setState({ ratingValue });
                        }}
                        tintColor={"#F9F9F9"}
                        fractions={1}
                        imageSize={40}
                        style={{
                          paddingVertical: 10,
                          backgroundColor: "#F9F9F9",
                          borderLeftWidth: 1,
                          borderLeftColor: "#F9F9F9",
                          borderRightWidth: 1,
                          borderRightColor: "#F9F9F9",
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.avialableOnBox}>
                <View style={styles.availableonTextBox}>
                  <Text style={styles.availableText}>Available on</Text>
                </View>
                <FlatListHandler
                  horizontal
                  data={moviePlatforms}
                  renderItem={({ item, index }) => {
                    const { name, thumb, image } = item;
                    let isChecked = selectedPlatforms.includes(item.id);
                    return (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          marginBottom: 10,
                          width: "100%",
                          marginRight: 10,
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.4}
                          style={{
                            width: "100%",
                            marginRight: 10,
                            borderRadius: 5,
                            borderColor: isChecked ? "#FF2632" : "#B7BDBF",
                            borderWidth: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                          }}
                          onPress={() => this.handleSelection(item)}
                        >
                          <ImageHandler
                            style={{
                              height: Metrics.widthRatio(70),
                              width: Metrics.widthRatio(70),
                              backgroundColor: "white",
                            }}
                            source={{ uri: thumb }}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>

              <View style={styles.avialableOnBox2}>
                <View style={styles.availableonTextBox}>
                  <Text style={styles.availableText}>Category</Text>
                </View>

                <View style={styles.category}>
                  <FlatListHandler
                    horizontal={false}
                    data={movieCategories}
                    numColumns={3}
                    renderItem={({ item, index }) => {
                      const { name, thumb, image } = item;
                      let isChecked = selectedCategories.includes(item.id);
                      return (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginBottom: 10,
                            width: "100%",
                          }}
                        >
                          <TouchableOpacity
                            activeOpacity={0.4}
                            style={{
                              paddingVertical: 10,
                              marginRight: 5,
                              paddingHorizontal: 20,
                              borderRadius: 5,
                              height: 40,
                              borderWidth: 1,
                              borderColor: isChecked ? "#FF2632" : "#B7BDBF",
                              backgroundColor: "#F9F9F9",
                              justifyContent: "center",
                            }}
                            onPress={() => this.handleCatSelection(item)}
                          >
                            <Text style={styles.btnText}>{name}</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  marginBottom: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this.explorePosts}
                  style={{
                    width: "88%",
                    borderRadius: 7,
                    height: 50,
                    backgroundColor: "#FF2632",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const actions = { request, generalSaveAction, getPostRequest };
const mapStateToProps = ({
  moviePlatforms,
  saveSelection,
  movieCategories,
}) => ({
  moviePlatforms: moviePlatforms["data"],
  movieCategories: movieCategories["data"],
  selectedPlatforms: saveSelection["selectedPlatforms"],
  selectedTitleName: saveSelection["selectedTitleName"],
  selectedCategories: saveSelection["selectedCategories"],
});

export default connect(mapStateToProps, actions)(ExplorePage);
