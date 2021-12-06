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
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";
import { StylesHeader } from "../Stylesheets/StylesHeader";
import { styles } from "../Stylesheets/StylesChangePassword";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { LOGIN, DUMP } from "../Store/Types";
import { AlertHelper } from "../utility/utility";
// import { TouchableHighlight } from "react-native-gesture-handler";

class ChangePassword extends Component {
  state = {
    isSelected1: true,
    isSelected2: false,
    password: "",
    icEye: "visibility",
    icEye2: "visibility",
    icEye3: "visibility",
    isPassword: true,
    isPassword2: true,
    isPassword3: true,
  };
  changePwdType = () => {
    const { isPassword } = this.state;
    // set new state value
    this.setState({
      icEye: isPassword ? "visibility-off" : "visibility",
      isPassword: !isPassword,
    });
  };
  changePwdType2 = () => {
    const { isPassword2 } = this.state;
    // set new state value
    this.setState({
      icEye2: isPassword2 ? "visibility-off" : "visibility",
      isPassword2: !isPassword2,
    });
  };
  changePwdType3 = () => {
    const { isPassword3 } = this.state;
    // set new state value
    this.setState({
      icEye3: isPassword3 ? "visibility-off" : "visibility",
      isPassword3: !isPassword3,
    });
  };
  onPress = () => {
    const { con_password, new_password, old_password } = this.state;
    if (con_password == new_password) {
      this.props.request(
        constant.changePassword,
        "patch",
        {
          old_password,
          new_password,
        },
        DUMP,
        true,
        (res) => {
          AlertHelper.show("success", "", "Password Changed");
          this.props.navigation.pop();
        }
      );
    } else {
      AlertHelper.show("error", "", "Confirm password mismatch");
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                    this.props.navigation.goBack();
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
                  <Text style={StylesHeader.headingText}>Change Password</Text>
                </View>

                <View style={styles.emailWholeBox}>
                  <View style={styles.placeholderTop}>
                    <Text style={styles.placeholderTopText}>Old Password</Text>
                  </View>

                  <TextInput
                    style={[styles.placeholderBox, { paddingTop: 15 }]}
                    secureTextEntry={this.state.isPassword}
                    placeholderTextColor="white"
                    placeholder="* * * * * * * * * * * * *"
                    onChangeText={(text) => {
                      this.setState({
                        old_password: text,
                      });
                    }}
                  ></TextInput>
                  <Icons
                    name={this.state.icEye}
                    style={styles.eyeIcon}
                    size={25}
                    color="#ffffff"
                    onPress={this.changePwdType}
                  />
                </View>
                <View style={styles.emailWholeBox}>
                  <View style={styles.placeholderTop}>
                    <Text style={styles.placeholderTopText}>New Password</Text>
                  </View>

                  <TextInput
                    style={[styles.placeholderBox, { paddingTop: 15 }]}
                    secureTextEntry={this.state.isPassword2}
                    placeholderTextColor="white"
                    placeholder="* * * * * * * * * * * * *"
                    onChangeText={(text) => {
                      this.setState({
                        new_password: text,
                      });
                    }}
                  ></TextInput>
                  <Icons
                    name={this.state.icEye2}
                    placeholderTop
                    style={styles.eyeIcon}
                    size={25}
                    color="#ffffff"
                    onPress={this.changePwdType2}
                  />
                </View>
                <View style={styles.emailWholeBox}>
                  <View style={styles.placeholderTop}>
                    <Text style={styles.placeholderTopText}>
                      Confirm Password
                    </Text>
                  </View>

                  <TextInput
                    style={[styles.placeholderBox, { paddingTop: 15 }]}
                    secureTextEntry={this.state.isPassword3}
                    placeholderTextColor="white"
                    placeholder="* * * * * * * * * * * * *"
                    onChangeText={(text) => {
                      this.setState({
                        con_password: text,
                      });
                    }}
                  ></TextInput>
                  <Icons
                    name={this.state.icEye3}
                    style={styles.eyeIcon}
                    size={25}
                    color="#ffffff"
                    onPress={this.changePwdType3}
                  />
                </View>
                <TouchableHighlight
                  style={{
                    width: 350,
                    height: 50,
                    backgroundColor: "#FF2632",
                    justifyContent: "center",
                    borderRadius: 8,
                    marginBottom: 20,
                    marginTop: 30,
                    // alignSelf: "stretch",
                  }}
                  // activeOpacity={0.5}
                  onPress={this.onPress}
                >
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableHighlight>
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ user }) => ({
  user: user["data"].user,
});

export default connect(mapStateToProps, actions)(ChangePassword);
