import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { stylesHead } from "../Stylesheets/WhiteHeader";
import { styles } from "../Stylesheets/StylesAvailableOn";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { MOVIE_PLATFORM, SELECTED_PLATFORMS, SELECTED_PLATFORMS_NAME } from "../Store/Types";
import { FlatListHandler } from "../reuseableComponents";

class AvailableOn extends Component {
  state = {
    selectedPlatforms: [],
  };

  componentDidMount() {
    const { request, selectedPlatforms } = this.props;
    let params = { limit: 20, offset: 0 };
    _.isEmpty(selectedPlatforms) &&
      request(constant.platform, "get", params, MOVIE_PLATFORM, true);
  }

  handleSelection = (item, index) => {
    console.warn(item)
    const { selectedPlatforms, generalSaveAction, selectedPlatformsName } = this.props;
    let updatedData = [...selectedPlatforms];
    
    if (selectedPlatforms.includes(item.id)) {
      updatedData = updatedData.filter((platformId) => platformId != item.id);
    } else {
      updatedData.push(item.id);
    }


    let updatedNameData = [...selectedPlatformsName];
    if (selectedPlatformsName.includes(item.name)) {
      updatedNameData = updatedNameData.filter((platformName) => platformName != item.name);
    } else {
      updatedNameData.push(item.name);
    }
    
    generalSaveAction(SELECTED_PLATFORMS, updatedData);
    generalSaveAction(SELECTED_PLATFORMS_NAME, updatedNameData);
    this.setState({ item });
  };

  renderItem = ({ item, index }) => {
    const { name, thumb, image } = item;
    const { selectedPlatforms } = this.props;
    let isChecked = selectedPlatforms.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: isChecked ? "#F6F6F6" : "#fff" },
          //   { borderBottomWidth: !isChecked ? 0 : 0 },
        ]}
        activeOpacity={0.7}
        onPress={() => {
          this.handleSelection(item, index);
        }}
      >
        <View style={styles.logoView}>
          <Image style={styles.logoImage} source={{ uri: image }}></Image>
        </View>

        <View style={styles.titleCheck}>
          <View>
            <Text style={styles.title}>{name}</Text>
          </View>
          {isChecked && (
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 17.5,
              }}
              source={require("../assets/Invite/Group1.png")}
            ></Image>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { movies } = this.state;
    const { moviePlatforms } = this.props;
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
                  <Text style={stylesHead.headText}>Available</Text>
                </View>
              </View>
              <ScrollView style={styles.listView}>
                <FlatListHandler
                  data={moviePlatforms}
                  //   extraData={moviePlatforms}
                  renderItem={this.renderItem}
                />
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ moviePlatforms, saveSelection }) => ({
  moviePlatforms: moviePlatforms["data"],
  selectedPlatforms: saveSelection["selectedPlatforms"],
  selectedPlatformsName: saveSelection["selectedPlatformsName"],
});

export default connect(mapStateToProps, actions)(AvailableOn);
