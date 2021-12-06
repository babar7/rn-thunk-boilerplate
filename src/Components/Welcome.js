import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { styles } from "../Stylesheets/StylesWelcome";

import { LOGIN } from "../Store/Types";
import constant from "../HttpServiceManager/constant";
import { connect } from "react-redux";
import { request, multipleRequest } from "../Store/Action/ServiceAction";
import HttpServiceManager from "../HttpServiceManager/HttpServiceManager";
import {
  onFacebookSignin,
  onGoogleSignIn,
} from "../Store/Services/SocialLoginService";

class Welcome extends Component {
  componentDidMount() {}

  socialLogin = (payload) => {
    const { request } = this.props;
    request(
      constant.login,
      "post",
      payload,
      LOGIN,
      true,
      (response) => {
        HttpServiceManager.getInstance().userToken =
          response.user.access_token.accessToken;
        this.props.navigation.navigate("Home");
      }
      //   this.onFbLoginSuccess,
      //   this.onFbLoginError,
    );
  };

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
            {/*half upper */}
            <View style={styles.halfScreen}>
              <Image
                style={{
                  width: 122,
                  height: 211,
                  resizeMode: "contain",
                }}
                source={require("../assets/eye.png")}
              ></Image>

              <Text style={styles.smText}>Welcome to</Text>
              <Text style={styles.lgText}>Viewed</Text>
            </View>
            <View style={styles.lowerHalfScreen}>
              <TouchableOpacity
                style={styles.socialBtn}
                activeOpacity={0.5}
                onPress={() => onFacebookSignin(this.socialLogin)}
              >
                <Image
                  style={styles.fbImage}
                  source={require("../assets/fb.png")}
                  resizeMode="contain"
                />
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.smTextbtn}>Continue with Facebook</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialBtn, { backgroundColor: "#db4a39" }]}
                activeOpacity={0.5}
                onPress={() => onGoogleSignIn(this.socialLogin)}
              >
                <Image
                  style={styles.fbImage}
                  source={require("../assets/gmail.png")}
                ></Image>
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.smTextbtn}>Continue with Gmail</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.block2}
                onPress={() => {
                  this.props.navigation.navigate("SignUp");
                }}
              >
                <Text style={styles.smText2}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.block3}
                onPress={() => {
                  this.props.navigation.navigate("LoginPage");
                }}
              >
                <Text style={styles.smText3}>
                  Already have an account?{" "}
                  <Text style={{ textDecorationLine: "underline" }}>
                    {" "}
                    Log in{" "}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ user }) => ({});

export default connect(mapStateToProps, actions)(Welcome);
