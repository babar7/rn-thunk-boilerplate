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
import RadioButton from "react-native-radio-button";
import Icons from "react-native-vector-icons/MaterialIcons";
// import * as ImagePicker from "expo-image-picker";
// import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
import ImagePicker from "react-native-image-picker";

import CountryPicker, { Flag } from "react-native-country-picker-modal";
import { styles } from "../Stylesheets/StylesSignup";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { SIGNUP } from "../Store/Types";
import { validateEmail, AlertHelper } from "../utility/utility";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: "pl", //picker requirement
      initialFlag: "pk",
      countryCode: "+971",
      phoneNumber: "",
      fullNumber: "",
      country: "",
      countryName: "Pakistan",
      showPicker: false,
      isVisibleCountryList: false,
      isGenderMale: true,
      isGenderFemale: false,
      icEye: "visibility",
      isPassword: true,
      icEyeConfirm: "visibility",
      isPasswordConfirm: true,
      image: null,
      countries: ["+92", "+93"],
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
      resourcePath: {},
    };
  }

  // componentDidMount() {
  //   this.getPermissionAsync();
  // }

  validateInputFields = () => {
    const {
      email,
      password,
      username,
      confirmPassword,
      isGenderMale,
      isGenderFemale,
    } = this.state;
    let error = "";
    if (_.isEmpty(username.trim())) error = "Username is Required";
    else if (!validateEmail(email)) error = "Invalid email formate";
    else if (password.length < 5)
      error = "Password length must be greater than 5 characters";
    else if (confirmPassword !== password)
      error = "Confirm password does not match";
    else if (!isGenderMale && !isGenderFemale) error = "Please select gender";

    if (!_.isEmpty(error)) AlertHelper.show("error", "", error);
    return _.isEmpty(error);
  };

  selectFile = () => {
    var options = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose file from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (res) => {
      console.log("Response = ", res);

      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
  };

  SignUp = () => {
    const { email } = this.state;
    const { request } = this.props;

    if (this.validateInputFields()) {
      let params = {
        type: "signup",
        emailAddress: email,
      };
      request(
        constant.verify_email,
        "post",
        params,
        undefined,
        true,
        this.cbSuccess,
        this.cbFailure
      );
    }
  };

  cbSuccess = (response) => {
    const { generalSaveAction, navigation } = this.props;
    const {
      email,
      password,
      username,
      isGenderMale,
      image,
      contactNumber,
      countryCode,
    } = this.state;
    let phone_number = contactNumber;
    // let payload = new FormData();
    // payload.append("emailAddress", email);
    // payload.append("name", username);
    // payload.append("password", password);
    // payload.append("gender", isGenderMale ? "male" : "female");
    // payload.append("phone_number", phoneNumber);
    // if (image) {
    //   payload.append("avatar", {
    //     uri: image,
    //     type: "image/jpg",
    //     name: "image",
    //   });
    // }

    let signupUserData = {
      emailAddress: email,
      gender: isGenderMale ? "male" : "female",
      password,
      name: username,
      phone_number,
      countryCode
    };
    if (image) signupUserData.avatar = image;

    generalSaveAction(SIGNUP["SUCCESS"], signupUserData);
    navigation.navigate("Otp");
  };
  cbFailure = (response) => {
    global.log("Failure", response);
  };

  changePwdType = () => {
    const { isPassword } = this.state;
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

  toggleCountryList = () => {
    this.setState((prevState) => ({
      showPicker: !prevState.showPicker,
    }));
  };

  renderFlagButton = () => {
    const { country, countryCode } = this.state;

    return (
      <View style={styles.countryContainer}>
        <TouchableOpacity
          style={styles.flag}
          onPress={() => this.toggleCountryList()}
          activeOpacity={0.7}
        >
          <Text style={styles.flagText}>{countryCode}</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Image
              source={require("../assets/down-arrow.png")}
              style={{ width: 12, height: 8, marginLeft: 5 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    let { image } = this.state;
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
            <SafeAreaView>
              <StatusBar
                barStyle="light-content"
                // dark-content, light-content and default
                hidden={false}
                backgroundColor="#0C1A1E"
              />
              <ImageBackground
                style={styles.imageStyle}
                imageStyle={{
                  borderColor: "transparent",
                  resizeMode: "cover",
                }}
                source={require("../assets/bg.png")}
              >
                {/*half upper */}
                <View style={styles.halfScreen}>
                  <View style={styles.View1}>
                    <View style={styles.backArrow}>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.goBack();
                        }}
                      >
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: "contain",
                            //marginLeft: 7
                          }}
                          source={require("../assets/backArrow.png")}
                        ></Image>
                      </TouchableOpacity>
                    </View>

                    {/*login */}
                    <View style={styles.userSignup}>
                      <View
                        style={{
                          flex: 3,
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={styles.loginText}>Sign up</Text>
                      </View>
                      <View style={styles.user}>
                        <View style={styles.userImage}>
                          {this.state.resourcePath.data ? (
                            <Image
                              source={{
                                uri:
                                  "data:image/jpeg;base64," +
                                  this.state.resourcePath.data,
                              }}
                              style={styles.userImage2}
                            />
                          ) : (
                            <Image
                              source={require("../assets/placeholder.png")}
                              style={styles.userImage2}
                            />
                          )}
                        </View>
                        <TouchableOpacity
                          style={styles.uploadImage}
                          onPress={this.selectFile}
                        >
                          <Image
                            style={styles.uploadImage2}
                            source={require("../assets/upload.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.ScrollPortion}>
                    <ScrollView>
                      {/*email emailWholeBox*/}
                      <View style={styles.emailWholeBox}>
                        <View style={styles.placeholderTop}>
                          <Text style={styles.placeholderTopText}>
                            Username
                          </Text>
                        </View>

                        <TextInput
                          style={styles.placeholderBox}
                          placeholderTextColor="#808080"
                          placeholder="Enter your username"
                          onChangeText={(text) => {
                            this.setState({ username: text });
                          }}
                        ></TextInput>
                      </View>
                      {/*end */}

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
                          onChangeText={(text) => {
                            this.setState({ email: text });
                          }}
                        ></TextInput>
                      </View>
                      {/*end */}

                      {/*password emailWholeBox*/}
                      <View style={styles.emailWholeBox}>
                        <View style={styles.placeholderTop}>
                          <Text style={styles.placeholderTopText}>
                            Password
                          </Text>
                        </View>

                        <TextInput
                          secureTextEntry={this.state.isPassword}
                          placeholderTextColor="#808080"
                          style={[styles.placeholderBox, { paddingTop: 15 }]}
                          placeholder="* * * * * * * * * * * * *"
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
                      <View style={styles.emailWholeBox}>
                        <View style={styles.placeholderTop}>
                          <Text style={styles.placeholderTopText}>
                            Confirm password
                          </Text>
                        </View>
                        <View>
                          <TextInput
                            secureTextEntry={this.state.isPasswordConfirm}
                            placeholderTextColor="#808080"
                            placeholder="* * * * * * * * * * * * *"
                            style={[styles.placeholderBox, { paddingTop: 15 }]}
                            onChangeText={(text) => {
                              this.setState({
                                confirmPassword: text,
                              });
                            }}
                          ></TextInput>
                          <Icons
                            name={this.state.icEyeConfirm}
                            style={styles.eyeIcon}
                            size={25}
                            color="#ffffff"
                            onPress={this.changeConfirmPwdType}
                          />
                        </View>
                      </View>
                      <View style={styles.emailWholeBox}>
                        <View style={styles.placeholderTop}>
                          <Text style={styles.placeholderTopText}>
                            Contact Number{" "}
                            <Text
                              style={{
                                color: "#FF2632",
                                fontFamily: "SF-Regular",
                                fontSize: 16,
                              }}
                            >
                              (optional)
                            </Text>
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            borderRadius: 5,
                            borderWidth: 0.5,
                            borderColor: "white",
                          }}
                        >
                          <CountryPicker
                            placeholder
                            withFilter
                            withCountryNameButton
                            onChange={(value) => {
                              console.log("value is :", value);
                              this.setState({
                                country: value.name,
                                countryName: value.name,
                                cca2: value.cca2,
                                countryCode: `+${value.callingCode[0]}`,
                              });
                            }}
                            onSelect={(value) => {
                              console.log("onSelect value is :", value);
                              if (value) {
                                this.setState({
                                  country: value.name,
                                  countryName: value.name,
                                  cca2: value.cca2,
                                  countryCode: `+${value.callingCode[0]}`,
                                });
                              }
                            }}
                            cca2={this.state.cca2.toLocaleLowerCase()}
                            translation="eng"
                            countryModalStyle={countryModalStyle}
                            renderFlagButton={this.renderFlagButton}
                            onClose={() => {
                              this.setState({
                                showPicker: false,
                              });
                            }}
                            onOpen={() => {
                              this.setState({
                                showPicker: true,
                              });
                            }}
                            visible={this.state.showPicker}
                            style={{
                              height: 20,
                              width: 20,
                            }}
                          />
                          <TextInput
                            style={styles.placeholderBox1}
                            placeholderTextColor="#808080"
                            placeholder="(0000) 000 000"
                            onChangeText={(text) => {
                              this.setState({ contactNumber: text });
                            }}
                            keyboardType="number-pad"
                          />
                        </View>
                      </View>
                      {/*end */}

                      {/*email emailWholeBox*/}
                      <View style={styles.emailWholeBox}>
                        <View style={styles.placeholderTop}>
                          <Text style={styles.placeholderTopText}>Gender</Text>
                        </View>
                        <View style={styles.radiobtnBox}>
                          <View style={styles.radioBtnStyle1}>
                            <RadioButton
                              animation={"bounceIn"}
                              outerColor="#FF2632"
                              innerColor="#FF2632"
                              isSelected={this.state.isGenderMale}
                              onPress={() => {
                                this.setState({
                                  isGenderMale:
                                    this.state.isGenderMale == false
                                      ? true
                                      : false,
                                  isGenderFemale: false,
                                });
                              }}
                            />
                            <Text style={styles.radioTxtStyle1}>Male</Text>
                          </View>

                          <View style={styles.radioBtnStyle1}>
                            <RadioButton
                              animation={"bounceIn"}
                              outerColor="#FF2632"
                              innerColor="#FF2632"
                              isSelected={this.state.isGenderFemale}
                              onPress={() =>
                                this.setState({
                                  isGenderFemale:
                                    this.state.isGenderFemale == false
                                      ? true
                                      : false,
                                  isGenderMale: false,
                                })
                              }
                            />
                            <Text style={styles.radioTxtStyle1}>Female</Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginVertical: 10,
                          padding: 10,
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.5}
                          style={styles.loginBtn}
                          onPress={this.SignUp}
                        >
                          <Text style={styles.smText2}>Continue</Text>
                        </TouchableOpacity>
                      </View>
                      {/* </View> */}
                    </ScrollView>
                  </View>
                </View>
              </ImageBackground>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, actions)(SignUp);

// StyleSheet
const countryModalStyle = StyleSheet.create({
  countryName: {
    color: "black",
    fontSize: 15,
  },
  letterText: {
    color: "black",
    fontSize: 15,
  },
});
