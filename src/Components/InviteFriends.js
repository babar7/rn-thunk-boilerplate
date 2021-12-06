import React, { Component } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Linking,
  Platform,
} from "react-native";
import { stylesHead } from "../Stylesheets/WhiteHeader";
import { styles } from "../Stylesheets/StylesInviteFriends";
import Contacts from "react-native-contacts";
import { PermissionsAndroid } from "react-native";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";

import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { CONTACTS } from "../Store/Types";
import { AlertHelper, searchArrayByKey } from "../utility/utility";
import { FlatListHandler, PostCard } from "../reuseableComponents";
import { Metrics } from "../theme";

let WIDTH = Dimensions.get("window").width;

class InviteFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContacts: [],
      keyword: "",
    };
    this.requestAccessPermision();
    // this.onChangeTextDelayed = _.debounce(this.searchFilterFunction, 1000);
  }
  componentDidMount() {}

  requestAccessPermision = () => {
    const { generalSaveAction } = this.props;
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: "Contacts",
      message: "Viewed would like to view your contacts.",
      buttonPositive: "Please accept bare mortal",
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === "denied") {
          // error
        } else {
          // contacts returned in Array
          let customContactsArray = contacts.map((contact) => {
            const { familyName, givenName } = contact;
            let fName = givenName ?? "";
            let lName = familyName ?? "";
            let name = `${fName} ${lName}`;

            return { ...contact, name };
          });
          generalSaveAction(CONTACTS.SUCCESS, customContactsArray);
          global.log("customContactsArray", customContactsArray);
        }
      });
    });
  };

  getSMSDivider = () => {
    return Platform.OS === "ios" ? "&" : "?";
  };

  openMsgApp = (number) => () => {
    let userName = this.props.user.name;
    let body =
      userName +
      " is inviting you to download VIEWED APP, Download from http://sgdev1.onlinetestingserver.com:3002/post/view/5f7e3bb4869abbd98421c133";
    Linking.openURL(`sms:${number}${this.getSMSDivider()}body=${body}`)
      .then((res) => global.log("res", res))
      .catch((error) => global.log(error, "error"));
  };

  renderSelectedContactSeparator = () => {
    return <View style={styles.selectedContactsDivider} />;
  };

  renderSelectedContactItem = ({ item, index }) => {
    const { name } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          //   this.removeFromSelectedContacts(item, index);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.selectedContainer}>
          <View style={styles.listView}>
            <View style={styles.innerView}>
              <ImageBackground
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 22.5,
                }}
                source={require("../assets/Invite/phone-call.png")}
              >
                <Image
                  style={styles.userImage}
                  source={require("../assets/Invite/Group.png")}
                />
              </ImageBackground>
            </View>
          </View>
          <View
            style={{
              height: "25%",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={styles.nameText}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderContactItem = ({ item, index }) => {
    const { phoneNumbers, name, selected = false } = item;
    // let fName = givenName ?? "";
    // let lName = familyName ?? "";
    // let name = `${fName} ${lName}`;
    let number =
      !_.isEmpty(phoneNumbers) && phoneNumbers[0] && phoneNumbers[0].number
        ? phoneNumbers[0].number
        : 0;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this.openMsgApp(number)}>
        <View
          style={{
            width: WIDTH,
            height: 80,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#D6D6D6",
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                height: 80,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 35,
                  backgroundColor: "#D6D6D6",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 5,
                }}
              >
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 22.5,
                  }}
                  source={require("../assets/Invite/phone-call.png")}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 2, justifyContent: "center", paddingLeft: 5 }}>
            <Text
              style={[styles.nameText, { fontSize: 18, fontWeight: "bold" }]}
            >
              {name}
            </Text>
            <Text style={styles.numberText}>{number}</Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {selected && (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
                source={require("../assets/Invite/Group1.png")}
              ></Image>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  searchFilterFunction = (text) => {
    // this.setState({ keyword: text });
  };
  searchTextChangeHandler = (text) => {
    this.setState({ keyword: text });
  };

  render() {
    const { keyword } = this.state;
    const { contacts } = this.props;

    const filteredArray = searchArrayByKey(contacts, keyword, "name");

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={stylesHead.topHeader}>
            <TouchableOpacity
              style={stylesHead.backArrow}
              onPress={() => {
                this.props.navigation.navigate("Home");
                // this.props.navigation.openDrawer();
              }}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
                source={require("../assets/backArrowBlack.png")}
              />
            </TouchableOpacity>
            <View style={stylesHead.user}>
              <Text style={stylesHead.headText1}>Invite Friends</Text>
            </View>
          </View>
          <View style={styles.searchView}>
            <View style={styles.searchImg}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require("../assets/Invite/magnifying.png")}
              />
            </View>
            <View
              style={{
                height: "100%",
                width: "75%",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={styles.textInput}
                placeholder={"Search here"}
                value={keyword}
                onChangeText={this.searchTextChangeHandler}
              />
            </View>
          </View>
          {/* {selectedContacts.length > 0 && (
            <View style={styles.selectedContactsList}>
              <FlatList
                horizontal={true}
                initialNumToRender={4}
                ItemSeparatorComponent={this.renderSelectedContactSeparator}
                data={this.state.selectedContacts}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderSelectedContactItem}
                keyExtractor={(item) => `${item.id}`}
              />
            </View>
          )} */}
          <View style={styles.contactsList}>
            <FlatListHandler
              showsVerticalScrollIndicator={false}
              data={filteredArray}
              renderItem={this.renderContactItem}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          </View>
          {/* <View style={styles.doneBtnView}>
            <TouchableOpacity style={styles.doneBtn}>
              <Text style={styles.btnText}>Done</Text>
            </TouchableOpacity>
          </View> */}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ contacts, user }) => ({
  user: user["data"].user,
  contacts: contacts["data"],
});

export default connect(mapStateToProps, actions)(InviteFriends);
