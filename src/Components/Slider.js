import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import Icon from "@expo/vector-icons/Ionicons";
import { styles } from "../Stylesheets/StylesSlider";

export default class Slider extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.skip}
          onPress={() => {
            this.props.navigation.navigate("Welcome");
          }}
        >
          <Icon name="ios-close" size={40} color="white" />
          <Text
            style={{
              color: "white",
              fontFamily: "SF-SemiBold",
              fontSize: 18,
              left: 8,
              bottom: 0.8,
              alignSelf: "center",
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0C1A1E"
        />
        <SliderBox
          images={[
            require("../assets/1.png"),
            require("../assets/2.png"),
            require("../assets/3.png"),
          ]}
          sliderBoxHeight={"100%"}
          sliderBoxWidth={"100%"}
          dotColor="#FF2632"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={10}
          autoplay
          resizeMode={"cover"}
          dotStyle={{
            width: 20,
            height: 20,
            borderRadius: 20,
            marginHorizontal: 1,
            padding: 0,
            bottom: 35,
          }}
        />
      </SafeAreaView>
    );
  }
}
