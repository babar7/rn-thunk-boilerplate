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
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { StylesHeader } from "../Stylesheets/StylesHeader";
import { styles } from "../Stylesheets/StylesContact";

export default class ContactUs extends Component {
  state = {
    isSelected1: true,
    isSelected2: false,
  };

  render() {
    return (
      <ImageBackground
        style={styles.imageStyle}
        imageStyle={{
          borderColor: "transparent",
          resizeMode: "stretch",
        }}
        source={require("../assets/bg.png")}
      >
        <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {/* <ScrollView> */}
            <SafeAreaView>
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
                      <Text style={StylesHeader.headingText}>Contact Us</Text>
                    </View>
                    <View>
                      <Text style={styles.pageDescription}>
                        We're here to help & answer any questions you might
                        have.
                      </Text>
                    </View>

                    {/*email emailWholeBox*/}
                    <View style={styles.emailWholeBox}>
                      <View style={styles.placeholderTop}>
                        <Text style={styles.placeholderTopText}>Email</Text>
                      </View>
                      <TextInput
                        style={styles.placeholderBox}
                        placeholderTextColor="white"
                        placeholder="youremail@gmail.com"
                      ></TextInput>
                    </View>

                    {/*email emailWholeBox*/}
                    <View style={styles.emailWholeBox}>
                      <View style={styles.placeholderTop}>
                        <Text style={styles.placeholderTopText}>Subject</Text>
                      </View>
                      <TextInput
                        style={styles.placeholderBox}
                        placeholderTextColor="white"
                        placeholder="Enter your subject"
                      ></TextInput>
                    </View>
                    {/*email emailWholeBox*/}
                    <View style={styles.messageBox}>
                      <View style={styles.placeholderTop}>
                        <Text style={styles.placeholderTopText}>Message</Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          height: 200,
                          borderRadius: 7,
                          borderWidth: 0.8,
                          borderColor: "white",
                          color: "#fff",
                          paddingVertical: 7,
                        }}
                      >
                        <TextInput
                          style={styles.placeholderBoxMessage}
                          placeholderTextColor="white"
                          multiline={true}
                          placeholder="Enter your message"
                        ></TextInput>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.loginBtn}>
                      <Text style={styles.smText2}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    );
  }
}
