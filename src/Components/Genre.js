import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Keyboard,
    FlatList,
    TouchableWithoutFeedback,
    SafeAreaView,
} from "react-native";
import { stylesHead } from "../Stylesheets/WhiteHeader";
import { styles } from "../Stylesheets/StylesGenre";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { LOGIN, MOVIE_CATEGORY, MY_POSTS, SELECTED_CATEGORY } from "../Store/Types";
import { AlertHelper } from "../utility/utility";
import { FlatListHandler } from "../reuseableComponents";

class Genre extends Component {
    state = {
        updatedData: this.props.selectedCategories  
    };
  async componentDidMount() {
        const { request, generalSaveAction } = this.props;
        let params = { limit: 20, offset: 0, myPosts: true };
        request(constant.genre, "get", params, MOVIE_CATEGORY, false);
        // alert('a')
        const res = await this.props.user.favoriteGenre.map((item)=>item.id);
        generalSaveAction(SELECTED_CATEGORY, res);
        this.setState({updatedData: [...this.props.selectedCategories]})
        // console.warn('selectedCategories',this.props.selectedCategories)
        // console.warn("res", res)
        // console.warn("updatedData", this.state.updatedData)
    }


    handleSelection = (item, index) => {
        // const { movies } = this.state;
        // movies[index].isChecked = !movies[index].isChecked;
        // this.setState({ movies });
        const { selectedCategories, generalSaveAction } = this.props;
        this.setState ({updatedData: [...selectedCategories]});
        if (selectedCategories.includes(item.id)) {
            this.setState ({updatedData : selectedCategories.filter((platformId) => platformId != item.id)});
        } else {
            this.state.updatedData.push(item.id)
            this.setState ({updatedData: this.state.updatedData});
        }
        console.warn(this.state.updatedData)
        // generalSaveAction(SELECTED_CATEGORY, updatedData);
    };

    renderItem = ({ item, index }) => {
        // console.warn(item)
        const { name: title, 
          image, 
          // isChecked = false
         } = item;
        // const { name, thumb, image } = item;
        const {
          selectedCategories,
        } = this.props;
        const { keyword } = this.state;
        let isChecked = this.state.updatedData.includes(item.id);
        return (
        //   <View
        //   style={{
        //     flex: 1,
        //     flexDirection: "row",
        //     marginBottom: 10,
        //     width: "100%",
        //   }}
        // >
        //   <TouchableOpacity
        //     activeOpacity={0.4}
        //     style={{
        //       paddingVertical: 10,
        //       marginRight: 5,
        //       paddingHorizontal: 20,
        //       borderRadius: 5,
        //       height: 40,
        //       borderWidth: 1,
        //       borderColor: isChecked ? "#FF2632" : "#B7BDBF",
        //       backgroundColor: "#F9F9F9",
        //       justifyContent: "center",
        //     }}
        //     onPress={() => this.handleCatSelection(item)}
        //   >
        //     <Text style={styles.btnText}>{name}</Text>
        //   </TouchableOpacity>
        // </View>
      
            <TouchableOpacity
                style={[
                    styles.item,
                    { backgroundColor: isChecked ? "#F6F6F6" : "#fff" },
                ]}
                activeOpacity={0.7}
                onPress={() => {
                    this.handleSelection(item, index);
                }}
            >
                <View style={styles.itemView}>
                    <Image style={styles.itemImg} source={{uri:image}} ></Image>
                </View>

                <View style={styles.itemTitle}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    {isChecked && (
                        <Image
                            style={{
                                width: 35,
                                height: 35,
                                borderRadius: 17.5,
                            }}
                            source={require("../assets/Invite/Group1.png")}
                        ></Image>
                    )}
                    {!isChecked && <View style={styles.isChecked}></View>}
                </View>
            </TouchableOpacity>
        );
    };
    render() {
        const { navigation } = this.props;
        const { user_id, favoriteGenre } = this.props.user;
        // console.warn(favoriteGenre)
        const {
          moviePlatforms,
          selectedPlatforms,
          movieCategories,
          selectedCategories,
        } = this.props;
        const { keyword } = this.state;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                        hidden={false}
                        backgroundColor="#0C1A1E"
                    />

                    <View style={{ width: "100%", height: "100%" }}>
                        {/*half upper */}
                        <View style={styles.halfScreen}>
                            <View style={stylesHead.topHeader1}>
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
                                <View style={stylesHead.genreTitleContainer1}>
                                    <Text style={stylesHead.headText1}>
                                        Genre
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                  onPress={()=>{
                                    generalSaveAction(SELECTED_CATEGORY, this.state.updatedData);
                                    this.props.request(
                                                    constant.updateUser +
                                                        user_id,
                                                    "put",
                                                    {
                                                      favoriteGenre: this.state.updatedData
                                                    },
                                                    LOGIN,
                                                    true,
                                                    (res) => {
                                                        // alert("Saved!");
                                                        navigation.pop()
                                                        console.warn(
                                                            "res:",
                                                            res
                                                        );
                                                        console.log("res", res);
                                                    }
                                                );
                                  } }
                                  style={styles.saveBtn}>
                                    <Text style={{ color: "#738388" }}>
                                        Save
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, width: "100%" }}>
                                <ScrollView>
                                    <View style={styles.searchView}>
                                        <Image
                                            style={styles.searchImg}
                                            source={require("../assets/search.png")}
                                        ></Image>
                                        <TextInput
                                            placeholderTextColor="#738388"
                                            placeholder="Search here"
                                            style={styles.search}
                                        ></TextInput>
                                    </View>
                                    <FlatListHandler
                                        data={this.props.movieCategories}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item) => item.id}
                                        style={{ width: "100%" }}
                                    />
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ user, myPosts, movieCategories, saveSelection }) => ({
    user: user["data"].user,
    posts: myPosts["data"],
    movieCategories: movieCategories["data"],
  selectedCategories: saveSelection["selectedCategories"],

});

export default connect(mapStateToProps, actions)(Genre);
