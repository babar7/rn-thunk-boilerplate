import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { styles } from "../Stylesheets/StylesForgotPassword";
import { request } from "../Store/Action/ServiceAction";
import { validateEmail, AlertHelper } from "../utility/utility";
import { connect } from "react-redux";
import { FORGOT_PASSWORD } from "../Store/Types";
import constant from "../HttpServiceManager/constant";
import _ from "lodash";

class ForgotPassword extends Component {
  state = {
    email: "",
    password: "",
    icEye: "visibility",
    isPassword: true,
  };

  changePwdType = () => {
    const { isPassword } = this.state;
    // set new state value
    this.setState({
      icEye: isPassword ? "visibility-off" : "visibility",
      isPassword: !isPassword,
    });
  };

  validateInputFields = () => {
    const { email } = this.state;

    let error = "";
    if (!validateEmail(email)) error = "Invalid email formate";
    if (!_.isEmpty(error)) AlertHelper.show("error", "", error);
    return _.isEmpty(error);
  };

  forgotPassword = () => {
    const { email } = this.state;
    const { request } = this.props;

    if (this.validateInputFields()) {
      let params = {
        type: "forgot_password",
        emailAddress: email,
      };
      request(
        constant.forgot_password,
        "post",
        params,
        FORGOT_PASSWORD,
        true,
        this.cbSuccess,
        this.cbFailure
      );
    }
  };

  cbSuccess = (response) => {
    //   Navigation
    this.props.navigation.navigate("Otp");
  };
  cbFailure = (response) => {};

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
                <View style={styles.backArrow}>
                  <Text style={styles.loginText}>Forgot Password?</Text>
                </View>
                <View style={styles.emailWholeBox}>
                  <View style={styles.placeholderTop}>
                    <Text style={styles.placeholderTopText}>
                      Enter your email address
                    </Text>
                  </View>
                  <TextInput
                    style={styles.placeholderBox}
                    placeholderTextColor="white"
                    placeholder="youremail@gmail.com"
                    onChangeText={(text) => {
                      this.setState({ email: text });
                    }}
                  ></TextInput>
                </View>
                <TouchableOpacity
                  style={styles.resetBtn}
                  onPress={this.forgotPassword}
                >
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, actions)(ForgotPassword);
