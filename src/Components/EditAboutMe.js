import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
    SafeAreaView,
} from "react-native";
import { stylesHead } from "../Stylesheets/WhiteHeader";
import { styles } from "../Stylesheets/StylesEditAbout";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { LOGIN } from "../Store/Types";

class EditAboutMe extends Component {
    state = {
        isSelected1: true,
        isSelected2: false,
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
                        <View style={styles.halfScreen}>
                            <View style={stylesHead.topHeader}>
                                <TouchableOpacity
                                    style={stylesHead.backArrow}
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
                                        source={require("../assets/backArrowBlack.png")}
                                    />
                                </TouchableOpacity>
                                <View style={stylesHead.user}>
                                    <Text style={stylesHead.headText1}>
                                        Edit About Me
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.emailWholeBox}>
                                <View>
                                    <TextInput
                                        style={styles.placeholderBox}
                                        placeholderTextColor="#738388"
                                        placeholder="Write about yourself"
                                        multiline={true}
                                        onChangeText={(about_me)=>{this.setState({about_me})}}
                                    ></TextInput>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={() => {
                                    this.props.request(
                                        constant.updateUser + this.props.user.user_id,
                                        "put",
                                        {
                                          about_me: this.state.about_me
                                        },
                                        LOGIN,
                                        true,
                                        (res) => this.props.navigation.pop(),
                                    );
                                }}
                            >
                                <Text style={styles.smText2}>Save</Text>
                            </TouchableOpacity>
                        </View>
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

export default connect(mapStateToProps, actions)(EditAboutMe);
