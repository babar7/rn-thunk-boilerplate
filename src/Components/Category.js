import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { stylesHead } from "../Stylesheets/WhiteHeader";
import { styles } from "../Stylesheets/StylesCategory";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { MOVIE_CATEGORY } from "../Store/Types";
import { AlertHelper } from "../utility/utility";
import {
  ImageHandler,
  RoundImage,
  FlatListHandler,
} from "../reuseableComponents";
import { Metrics } from "../theme";

class Category extends Component {
  state = {};

  componentDidMount() {
    const { request } = this.props;
    let params = { limit: 20, offset: 0 };

    // request(constant.genre, "get", params, MOVIE_CATEGORY, false);
  }

  renderItem = ({ item, index }) => {
    const { name, image, id } = item;
    return (
      <View
        style={[
          styles.item,
          // { backgroundColor: isChecked ? "#F6F6F6" : "#fff" },
        ]}
        activeOpacity={0.7}
        onPress={() => {}}
      >
        <View style={styles.listView}>
          <Image style={styles.logoImage} source={{ uri: image }} />
        </View>
        {/* <Image style={styles.logoImage} source={{ uri: image }} /> */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.title}>{name}</Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const { navigation, movieCategories, selectedGenreData } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#0C1A1E"
          />
          <View style={{ width: "100%", height: "100%" }}>
            <View style={styles.halfScreen}>
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
                <View style={stylesHead.listTitleContainer}>
                  <Text style={stylesHead.headText}> Category</Text>
                </View>
              </View>

              <View style={{ flex: 1, width: "100%" }}>
                <ScrollView>
                  {/* Search Input Field */}

                  {/* <View style={styles.searchView}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: "contain",
                      }}
                      source={require("../assets/search.png")}
                    ></Image>
                    <TextInput
                      placeholderTextColor="#738388"
                      placeholder="Search here"
                      style={styles.searchBar}
                    ></TextInput>
                  </View> */}
                  <FlatListHandler
                    data={selectedGenreData}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    style={{ width: "100%" }}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ movieCategories, saveSelection }) => ({
  movieCategories: movieCategories["data"],
  selectedCategories: saveSelection["selectedCategories"],
  selectedGenreData: saveSelection["selectedGenreData"],
});

export default connect(mapStateToProps, actions)(Category);
