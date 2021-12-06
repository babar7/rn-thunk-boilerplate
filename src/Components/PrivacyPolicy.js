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
} from "react-native";
import { styles } from "../Stylesheets/StylesAbout";
import { StylesHeader } from "../Stylesheets/StylesHeader";
import { LOGIN, DUMP, FOLLOWERS } from "../Store/Types";
import constant from "../HttpServiceManager/constant";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import { store } from "../../App";

export default class PrivacyPolicy extends Component {
    state = {
        html: "",
    };
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            // The screen is focused
            // Call any action
            // console.warn("res");
            store.dispatch(request(
                constant.getCms + "policies",
                "get",
                {},
                DUMP,
                true,
                (res) => {
                    console.warn(res);
                    this.setState({ html: res[0].html });
                }
            ));
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
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
                            <TouchableOpacity
                                style={StylesHeader.backArrow}
                                onPress={() => {
                                    this.props.navigation.openDrawer();
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
                                <Text style={StylesHeader.headingText}>
                                    Privacy Policy
                                </Text>
                            </View>
                            <ScrollView>
                                <View style={styles.contentContainer}>
                                    <Text style={styles.textContent}>
                                        {this.state.html.replace(/<\/?[^>]+(>|$)/g, "")}
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        );
    }
}
