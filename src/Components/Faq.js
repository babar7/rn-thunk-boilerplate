import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import FaqClass from "./FaqClass";
import { styles } from "../Stylesheets/StylesAbout";
import { StylesHeader } from "../Stylesheets/StylesHeader";

export default class Faq extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0C1A1E"
        />
        <View style={{ width: "100%", height: "100%" }}>
          <ImageBackground
            style={styles.imageStyle}
            imageStyle={{
              borderColor: "transparent",
              resizeMode: "stretch",
            }}
            source={require("../assets/bg.png")}
          >
            <View style={styles.halfScreen}>
              <TouchableOpacity
                style={StylesHeader.backArrow}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: "contain",
                  }}
                  source={require("../assets/backArrow.png")}
                ></Image>
              </TouchableOpacity>
              <View style={StylesHeader.headerView}>
                <Text style={StylesHeader.headingText}>FAQ</Text>
              </View>
              <View>
                <FaqClass navigation={this.props.navigation} />
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}
