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
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { styles } from "../Stylesheets/StylesOTP";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { LOGIN } from "../Store/Types";
import HttpServiceManager from "../HttpServiceManager/HttpServiceManager";

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: [],
    };
    this.inputRefs = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ];
  }

  // Pass the index of the current TextInput
  // then plus that with +1
  _goNextAfterEdit(index) {
    if (index < 3) {
      this.inputRefs[index + 1].focus();
    }

    //   this.inputRefs.forEach((element, ind) => {
    //     if (index < ind) element.clear();
    //   });
    // } else if (index < 4) {
    //   this.signupAndVerifyCode();
    //   //   this.props.navigation.navigate("Home");
  }

  handleOnChangeCode = (text, ind) => {
    if (!_.isEmpty(text)) this._goNextAfterEdit(ind);
    const { verificationCode } = this.state;
    let code = [...verificationCode];
    code[ind] = text;
    this.setState({ verificationCode: code }, () => {
      if (code.length == 4) this.signupAndVerifyCode();
    });
  };

  signupAndVerifyCode = () => {
    const { verificationCode } = this.state;
    const { signupUserData, navigation, request } = this.props;
    let validation_code = verificationCode.join("");
    // signupUserData.append("validation_code", validation_code);
    let params = { ...signupUserData, validation_code };
    if (this.validate()) {
      request(
        constant.verify_email_code,
        "post",
        params,
        LOGIN,
        true,
        (response) => {
          HttpServiceManager.getInstance().userToken =
            response.user.access_token.accessToken;
          navigation.navigate("Home");
        }
      );
    }
  };

  validate = () => {
    const { verificationCode } = this.state;
    let isFilled = true;
    verificationCode.forEach((element) => {
      if (_.isEmpty(element)) isFilled = false;
    });

    return isFilled;
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
                  style={styles.backArrow1}
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
                <View style={styles.backArrow1}>
                  <Text style={styles.loginText}>OTP Verification</Text>
                </View>
                <View style={styles.emailWholeBox}>
                  <View style={styles.placeholderTop}>
                    <Text style={styles.placeholderTopText}>
                      A verification code has been sent to your email address
                    </Text>
                  </View>
                  <View style={styles.otpBox}>
                    {this.inputRefs.map((k, idx) => (
                      <TextInput
                        key={idx}
                        keyboardType={"numeric"}
                        autoFocus={false}
                        maxLength={1}
                        ref="1"
                        returnKeyType="next"
                        onChangeText={(text) =>
                          this.handleOnChangeCode(text, idx)
                        }
                        ref={(r) => (this.inputRefs[idx] = r)}
                        style={styles.otp}
                      ></TextInput>
                    ))}
                  </View>
                  <View style={styles.placeholderTop}>
                    <Text style={styles.placeholderTopText2}>
                      To complete your registration,,
                    </Text>
                    <Text style={styles.placeholderTopText2}>
                      please enter the 4-digit OTP code.
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.lowerHalfScreen}>
                <View style={styles.resend}>
                  <Text style={styles.smText3}>Didn't receive the code? </Text>
                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => {
                      //   this.props.navigation.navigate("ResetPassword");
                    }}
                  >
                    <Text style={styles.smText2}>Resend</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ signup }) => ({
  signupUserData: signup["data"],
});

export default connect(mapStateToProps, actions)(Otp);
