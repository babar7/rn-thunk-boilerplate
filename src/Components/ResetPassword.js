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
} from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";
import { styles } from "../Stylesheets/StylesResetPassword";

export default class ResetPassword extends Component {
  state = {
    isSelected1: true,
    isSelected2: false,
    icEye: "visibility",
    isPassword: true,
    icEyeConfirm: "visibility",
    isPasswordConfirm: true,
  };

  changePwdType = () => {
    const { isPassword } = this.state;
    // set new state value
    this.setState({
      icEye: isPassword ? "visibility-off" : "visibility",
      isPassword: !isPassword,
    });
  };

  changeConfirmPwdType = () => {
    const { isPasswordConfirm } = this.state;
    // set new state value
    this.setState({
      icEyeConfirm: isPasswordConfirm ? "visibility-off" : "visibility",
      isPasswordConfirm: !isPasswordConfirm,
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            // dark-content, light-content and default
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
              <ScrollView>
                <View style={styles.halfScreen}>
                  <TouchableOpacity
                    style={styles.backArrow}
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

                  <View style={styles.userSignup}>
                    <View style={styles.user}>
                      <Text style={styles.loginText}>Reset Password</Text>
                    </View>
                  </View>

                  {/*password emailWholeBox*/}
                  <View style={styles.emailWholeBox}>
                    <Text style={styles.placeholderTopText2}>
                      What would you like your new {"\n"}password to be?
                    </Text>
                  </View>
                  {/*end */}

                  {/*password emailWholeBox*/}
                  <View style={styles.emailWholeBox}>
                    <View style={styles.placeholderTop}>
                      <Text style={styles.placeholderTopText}>
                        New password
                      </Text>
                    </View>

                    <TextInput
                      style={[styles.placeholderBox, { paddingTop: 15 }]}
                      secureTextEntry={this.state.isPassword}
                      placeholderTextColor="white"
                      placeholder="* * * * * * * * * * * * *"
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
                      <Text style={styles.placeholderTopText}>
                        Confirm new password
                      </Text>
                    </View>

                    <TextInput
                      style={[styles.placeholderBox, { paddingTop: 15 }]}
                      secureTextEntry={this.state.isPasswordConfirm}
                      placeholderTextColor="white"
                      placeholder="* * * * * * * * * * * * *"
                    ></TextInput>
                    <Icons
                      name={this.state.icEyeConfirm}
                      style={styles.eyeIcon}
                      size={25}
                      color="#ffffff"
                      onPress={this.changeConfirmPwdType}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      this.props.navigation.navigate("Home");
                    }}
                    style={styles.loginBtn}
                  >
                    <Text style={styles.smText2}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
