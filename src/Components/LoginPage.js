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
import Icons from "react-native-vector-icons/MaterialIcons";
import { styles } from "../Stylesheets/StylesLoginPage";

// Redux Flow
import { LOGIN } from "../Store/Types";
import constant from "../HttpServiceManager/constant";
import { connect } from "react-redux";
import { request } from "../Store/Action/ServiceAction";
import { validateEmail, AlertHelper } from "../utility/utility";
import HttpServiceManager from "../HttpServiceManager/HttpServiceManager";
import {
  onFacebookSignin,
  onGoogleSignIn,
} from "../Store/Services/SocialLoginService";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    icEye: "visibility",
    isPassword: true,
  };
  componentDidMount() {}

  login = () => {
    const { email, password } = this.state;
    if (!validateEmail(email)) {
      AlertHelper.show("error", "Validation", "Invalid email formate");
      //   alert("Invalid email formate");
    } else if (password == "") {
      AlertHelper.show("error", "Validation", "Please Enter Password");
    } else {
      let params = {
        username: email,
        password,
      };
      this.loginRequest(params);
    }
  };

  loginRequest = (params) => {
    const { request } = this.props;
    request(
      constant.login,
      "post",
      params,
      LOGIN,
      true,
      this.cbSuccess,
      this.cbFailure
    );
  };
  cbSuccess = (response) => {
    //   Navigation
    HttpServiceManager.getInstance().userToken =
      response.user.access_token.accessToken;
    this.props.navigation.navigate("Home");
  };
  cbFailure = (response) => {};

  changePwdType = () => {
    const { isPassword } = this.state;
    // set new state value
    this.setState({
      icEye: isPassword ? "visibility-off" : "visibility",
      isPassword: !isPassword,
    });
  };

  render() {
    return (
      <ImageBackground
        style={styles.imageStyle}
        imageStyle={{
          borderColor: "transparent",
          resizeMode: "cover",
        }}
        source={require("../assets/bg.png")}
      >
        <ScrollView style={{ height: "100%", width: "100%", flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {/* <ScrollView> */}
            <SafeAreaView>
              <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#0C1A1E"
              />
              <View style={{ width: "100%", height: "100%" }}>
                {/*half upper */}
                <View style={styles.halfScreen}>
                  <View style={[StylesHeader.backArrow, { marginTop: 20 }]}>
                    <Text style={StylesHeader.regularHeadingText}>Login</Text>
                  </View>

                  {/*email emailWholeBox*/}
                  <View style={styles.emailWholeBox}>
                    <View style={styles.placeholderTop}>
                      <Text style={styles.placeholderTopText}>Email</Text>
                    </View>
                    <TextInput
                      caretHidden
                      style={styles.placeholderBox}
                      placeholderTextColor="#808080"
                      placeholder="youremail@gmail.com"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      autoCompleteType="email"
                      onChangeText={(text) => {
                        this.setState({ email: text });
                      }}
                    />
                  </View>

                  {/*password emailWholeBox*/}
                  <View style={styles.emailWholeBox}>
                    <View style={styles.placeholderTop}>
                      <Text style={styles.placeholderTopText}>Password</Text>
                    </View>

                    <TextInput
                      style={[styles.placeholderBox, { paddingTop: 15 }]}
                      secureTextEntry={this.state.isPassword}
                      placeholderTextColor="#808080"
                      placeholder="* * * * * * * *"
                      onChangeText={(text) => {
                        this.setState({ password: text });
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
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.forgot}
                    onPress={() => {
                      this.props.navigation.navigate("ForgotPassword");
                    }}
                  >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.loginBtn}
                    onPress={this.login}
                  >
                    <Text style={styles.smText2}>Login</Text>
                  </TouchableOpacity>

                  <View style={styles.lowerHalfScreen}>
                    <View style={styles.or}>
                      <View style={styles.line}></View>
                      <Text style={styles.orText}>Or</Text>
                      <View style={styles.line}></View>
                    </View>

                    <TouchableOpacity
                      style={styles.socialBtn}
                      activeOpacity={0.5}
                      onPress={() => onFacebookSignin(this.loginRequest)}
                    >
                      <Image
                        style={styles.fbImage}
                        source={require("../assets/fb.png")}
                      ></Image>
                      <View style={{ justifyContent: "center" }}>
                        <Text style={styles.smTextbtn}>
                          Continue with Facebook
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.socialBtn, { backgroundColor: "#db4a39" }]}
                      activeOpacity={0.5}
                      onPress={() => onGoogleSignIn(this.loginRequest)}
                    >
                      <Image
                        style={styles.fbImage}
                        source={require("../assets/gmail.png")}
                      ></Image>
                      <View style={{ justifyContent: "center" }}>
                        <Text style={styles.smTextbtn}>
                          Continue with Gmail
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.block3}
                      onPress={() => {
                        this.props.navigation.navigate("SignUp");
                      }}
                    >
                      <Text style={styles.smText3}>
                        Are you a new user?{" "}
                        <Text
                          style={[
                            styles.smText3,
                            { textDecorationLine: "underline" },
                          ]}
                        >
                          {" "}
                          Sign up now
                        </Text>{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, actions)(LoginPage);
