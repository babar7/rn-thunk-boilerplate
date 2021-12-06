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

import { Icon } from "react-native-elements";
import RadioButton from "react-native-radio-button";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
import Icons from "react-native-vector-icons/MaterialIcons";
import CountryPicker, { Flag } from "react-native-country-picker-modal";
import { styles } from "../Stylesheets/StylesEditProfile";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { LOGIN, DUMP } from "../Store/Types";

class EditProfile extends Component {
  state = {
    password: "",
    cca2: "pl", //picker requirement
    initialFlag: "pk",
    countryCode: this.props.user.countryCode || "+1",
    phoneNumber: "",
    fullNumber: "",
    country: "",
    countryName: "Pakistan",
    showPicker: false,
    isVisibleCountryList: false,
    isGenderMale: false,
    isSelected2: false,
    icEye: "visibility",
    isPassword: true,
    icEyeConfirm: "visibility",
    isPasswordConfirm: true,
    image: null,
    countries: ["+92", "+92"],
    phone_number: this.props.user.phone_number,
    name: this.props.user.name,
    emailAddress: this.props.user.emailAddress,

    userDump: { ...this.props.user },
  };

  componentDidMount() {
    // this.getPermissionAsync();
    this.setState({
      isGenderMale: this.props.user.gender == "male" ? true : false,
    });
  }

  changePwdType = () => {
    const { isPassword } = this.state;
    // set new state value
    this.setState({
      icEye: isPassword ? "visibility-off" : "visibility",
      isPassword: !isPassword,
    });
  };

  // getPermissionAsync = async () => {
  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== "granted") {
  //       alert("Sorry, we need camera roll permissions to make this work!");
  //     }
  //   }
  // };

  _pickImage = async (cover = false) => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            aspect: cover ? [16, 9] : [4, 3],
            quality: 0.1,
          });
          if (!result.cancelled) {
            global.log("result", result);
            let uri = result.uri;
            if (cover) {
              let userobject = { ...this.state.userDump, cover: uri };
              this.setState({ userDump: userobject });
              this.uploadImage(uri);
            } else {
              let userobject = { ...this.state.userDump, avatar: uri };
              this.uploadImage(uri);
              this.setState({ userDump: userobject });
            }
          }
        } catch (E) {
          // console.log(E);
          alert(E);
        }
      }
    }
  };

  uploadImage = async (image) => {
    const { request } = this.props;
    let payload = new FormData();
    payload.append("file", { uri: image });

    request(
      constant.fileUpload,
      "post",
      payload,
      undefined,
      true,
      (response) => {
        global.log("Response", response);
      }
    );
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
              style={{ width: 10, height: 7, marginLeft: 10 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let {
      image,
      emailAddress,
      name,
      phone_number,
      isGenderMale,
      countryCode,
      userDump,
    } = this.state;
    const { user_id, socialLogin, avatar, cover } = userDump;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#0C1A1E"
          />
          <View style={styles.mainView}>
            <ImageBackground
              style={styles.imageStyle}
              imageStyle={{
                borderColor: "transparent",
                resizeMode: "stretch",
              }}
              source={require("../assets/bg.png")}
            >
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

                  {/*login */}
                  <View style={styles.userSignup}>
                    <View style={styles.user}>
                      <Text style={styles.loginText}>My Profile Edit</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 10,
                    }}
                  >
                    <View style={styles.uploaderView}>
                      <Image
                        source={{ uri: avatar }}
                        style={styles.profileView}
                      />

                      <TouchableOpacity
                        onPress={() => this._pickImage(false)}
                        style={styles.coverImage}
                      >
                        <Image
                          style={styles.coverIcon}
                          source={require("../assets/cam.png")}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.lableView1}>
                      <Text style={styles.lableStyle1}>Cover Photo</Text>
                    </TouchableOpacity>
                    <View style={styles.uploadCover}>
                      <TouchableOpacity
                        onPress={() => this._pickImage(true)}
                        activeOpacity={0.7}
                      >
                        {cover ? (
                          <Image
                            source={{ uri: cover }}
                            style={styles.coverImageView}
                          />
                        ) : (
                          <View style={styles.coverImageView}>
                            <Icon
                              type="font-awesome"
                              name="camera"
                              size={27}
                              marginTop={20}
                              color={"#fff"}
                            />
                            <Text style={styles.uploadText}>Upload File</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.emailWholeBox}>
                      <View style={styles.placeholderTop}>
                        <Text style={styles.placeholderTopText}>Username</Text>
                      </View>
                      <TextInput
                        style={styles.placeholderBox}
                        placeholderTextColor="white"
                        placeholder="Enter your username"
                        value={name}
                        onChangeText={(text) => {
                          this.setState({
                            name: text,
                          });
                        }}
                      ></TextInput>
                    </View>
                    <View style={styles.emailWholeBox}>
                      <View style={styles.placeholderTop}>
                        <Text style={styles.placeholderTopText}>Email</Text>
                      </View>
                      <TextInput
                        style={styles.placeholderBox}
                        placeholderTextColor="white"
                        placeholder="youremail@gmail.com"
                        value={emailAddress}
                        onChangeText={(text) => {
                          this.setState({
                            emailAddress: text,
                          });
                        }}
                        // editable={false}
                      ></TextInput>
                    </View>
                    {/* <View style={styles.emailWholeBox}>
                                            <View style={styles.placeholderTop}>
                                                <Text
                                                    style={
                                                        styles.placeholderTopText
                                                    }
                                                >
                                                    Password
                                                </Text>
                                            </View>
                                            <TextInput
                                                disabled = {true}
                                                placeholder="* * * * * * * * * * * * *"
                                                style={[
                                                    styles.placeholderBox,
                                                    { paddingTop: 15 },
                                                ]}
                                                dis
                                                secureTextEntry={
                                                    this.state.isPassword
                                                }
                                                placeholderTextColor="white"
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        password: text,
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
                                        </View> */}
                    <View style={styles.emailWholeBox}>
                      <View style={styles.placeholderTop}>
                        <Text style={styles.placeholderTopText}>
                          Contact Number
                        </Text>
                      </View>
                      <View style={styles.countryPickerView}>
                        <CountryPicker
                          placeholder
                          withFilter
                          withCountryNameButton
                          onChange={(value) => {
                            console.warn("value is :", value);
                            this.setState({
                              country: value.name,
                              countryName: value.name,
                              cca2: value.cca2,
                              countryCode: `+${value.callingCode[0]}`,
                            });
                          }}
                          onSelect={(value) => {
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
                          placeholderTextColor="white"
                          placeholder={
                            phone_number ? phone_number : "(0000) 000 000"
                          }
                          onChangeText={(text = phone_number) => {
                            this.setState({
                              phone_number: text,
                            });
                          }}
                        />
                      </View>
                    </View>
                    {!socialLogin && (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.lableView}
                        onPress={() => {
                          this.props.navigation.navigate("ChangePassword");
                        }}
                      >
                        <Text style={styles.lableStyle}>Change Password</Text>
                      </TouchableOpacity>
                    )}
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
                                isGenderFemale: this.state.isGenderFemale
                                  ? false
                                  : true,
                                isGenderMale: false,
                              })
                            }
                          />
                          <Text style={styles.radioTxtStyle1}>Female</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.btnView}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.btnText}
                      onPress={() => {
                        // alert('a')
                        this.props.request(
                          constant.updateUser + user_id,
                          "put",
                          {
                            emailAddress,
                            name,
                            countryCode,
                            phone_number,
                            gender: isGenderMale ? "male" : "female",
                            image: this.state.profileImage,
                            cover: this.state.attachment,
                          },
                          LOGIN,
                          true,
                          (res) => {
                            alert("Saved!");
                            console.warn("res:", res);
                            console.log("res", res);
                          }
                        );
                      }}
                    >
                      <Text style={styles.btnText2}>Update Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

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

const actions = { request, generalSaveAction };
const mapStateToProps = ({ user }) => ({
  user: user["data"].user,
});

export default connect(mapStateToProps, actions)(EditProfile);
