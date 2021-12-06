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
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { stylesHead } from "../Stylesheets/WhiteHeader";
import { styles } from "../Stylesheets/StylesTitle";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import {
  MOVIES_TITLE,
  SELECTED_TITLE,
  SELECTED_TITLE_NAME,
  SELECTED_GENRE,
  SELECTED_GENRE_DATA,
} from "../Store/Types";
import { FlatListHandler, ImageHandler } from "../reuseableComponents";

function ItemAll({ title, image, cat, date }) {
  return (
    <View style={styles.item}>
      {/* <Image
        style={{
          width: 45,
          height: 45,
          resizeMode: "contain",
        }}
        source={image}
      ></Image> */}
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title1}>
            {cat} . {date}
          </Text>
        </View>
      </View>
    </View>
  );
}

class Title extends Component {
  state = { searchTag: "" };

  get = (limit = 20, offset = 0) => {
    const { request, selectedTitle } = this.props;
    let params = { limit, offset, searchTag: this.state.searchTag };
    request(constant.movie, "get", params, MOVIES_TITLE, false);
  };

  componentDidMount() {
    const { selectedTitle } = this.props;
    _.isEmpty(selectedTitle) && this.get();
  }

  onChangeSearchHandler = (searchTag) => {
    // alert(searchTag + "1");
    this.setState({ searchTag });
    setTimeout(() => {
      this.get();
    }, 2000);
    // _.debounce(this.get, 1000)();
  };

  onSelectMovie = (movie) => () => {
    const { request, generalSaveAction, navigation } = this.props;
    let genre =
      movie.genre && movie.genre.length
        ? movie.genre.map(({ name }) => name).toString()
        : "Not Available";
    generalSaveAction(SELECTED_TITLE, movie["id"]);
    generalSaveAction(SELECTED_TITLE_NAME, movie.title.name);
    generalSaveAction(SELECTED_GENRE, genre);
    generalSaveAction(SELECTED_GENRE_DATA, movie.genre);

    navigation.pop();
  };

  rednerTitle = ({ item }) => {
    let title = item?.title?.name;
    let image =
      item?.image && item?.image.url ? { uri: item.image.url } : undefined;
    let cat =
      item.genre && item.genre.length
        ? item.genre.map(({ name }) => name).toString()
        : "Not Available";
    let date = item?.releaseDate?.year;
    const { selectedTitle } = this.props;

    return (
      <TouchableOpacity
        style={{
          ...styles.item,
          backgroundColor: item.id == selectedTitle ? "#ffe" : "#fff",
        }}
        onPress={this.onSelectMovie(item)}
      >
        <ImageHandler
          style={{
            width: 45,
            height: 45,
            resizeMode: "contain",
          }}
          defaultSource={require("../assets/movie1.png")}
          source={image}
        />
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {title.trim()}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title1}>
              {cat} . {date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { moviesTitle } = this.props;
    return (
      <SafeAreaView style={compStyles.container}>
        {/* Header */}
        <View style={stylesHead.topHeader}>
          <TouchableOpacity
            style={stylesHead.backArrow}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              style={styles.backBtn}
              source={require("../assets/backArrowBlack.png")}
            />
          </TouchableOpacity>
          <View style={stylesHead.user1}>
            <Text style={stylesHead.headText}>Title</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchView, compStyles.searchView]}>
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
            }}
            source={require("../assets/search.png")}
          ></Image>
          <TextInput
            placeholderTextColor="#738388"
            placeholder="Search here"
            style={styles.search}
            onChangeText={this.onChangeSearchHandler}
            // onEndEditing={()=>this.get()}
          ></TextInput>
        </View>

        <FlatListHandler
          data={moviesTitle}
          renderItem={this.rednerTitle}
          keyExtractor={(item) => item.id}
        />

        {/* ////////////////////////////////////// */}
      </SafeAreaView>
      //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      //     <SafeAreaView style={styles.container}>
      //       <StatusBar
      //         barStyle="light-content"
      //         hidden={false}
      //         backgroundColor="#0C1A1E"
      //       />
      //       <View style={{ width: "100%", height: "100%" }}>
      //         <View style={styles.halfScreen}>
      //           <View style={stylesHead.topHeader}>
      //             <TouchableOpacity
      //               style={stylesHead.backArrow}
      //               onPress={() => {
      //                 this.props.navigation.goBack();
      //               }}
      //             >
      //               <Image
      //                 style={styles.backBtn}
      //                 source={require("../assets/backArrowBlack.png")}
      //               />
      //             </TouchableOpacity>
      //             <View style={stylesHead.user1}>
      //               <Text style={stylesHead.headText}> Title</Text>
      //             </View>
      //           </View>

      //           <View style={styles.searchView}>
      //             <Image
      //               style={{
      //                 width: 20,
      //                 height: 20,
      //                 resizeMode: "contain",
      //               }}
      //               source={require("../assets/search.png")}
      //             ></Image>
      //             <TextInput
      //               placeholderTextColor="#738388"
      //               placeholder="Search here"
      //               style={styles.search}
      //             ></TextInput>
      //           </View>

      //           <ScrollView style={{ width: "100%" }}>
      //             <View style={styles.section}>
      //               <Text style={styles.sectionText}>Upcoming</Text>
      //             </View>
      //             <FlatListHandler
      //               data={moviesTitle}
      //               renderItem={({ item }) => (
      //                 <Item
      //                   title={item.title.name}
      //                   image={{ uri: item.image.url ?? { uri: "" } }}
      //                   cat={item.genre[0].name}
      //                   date={item.releaseDate.year}
      //                 />
      //               )}
      //               keyExtractor={(item) => item.id}
      //             />

      //             <View style={styles.section}>
      //               <Text style={styles.sectionText}>All</Text>
      //             </View>
      //             {/* <FlatListHandler
      //               data={moviesTitle}
      //               renderItem={({ item }) => (
      //                 <ItemAll
      //                   title={item.title.name}
      //                   //   image={{ uri: item.image.url }}
      //                   cat={item.cat}
      //                   date={item.releaseDate.year}
      //                 />
      //               )}
      //               keyExtractor={(item) => item.id}
      //               style={{ width: "100%" }}
      //             /> */}
      //           </ScrollView>
      //         </View>
      //       </View>
      //     </SafeAreaView>
      //   </TouchableWithoutFeedback>
    );
  }
}

const actions = { request, generalSaveAction };
const mapStateToProps = ({ moviesTitle, saveSelection }) => ({
  moviesTitle: moviesTitle["data"],
  selectedTitle: saveSelection["selectedTitle"],
  genre: saveSelection["selectedTitle"],
});

const compStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  searchView: { borderBottomWidth: 1, borderColor: "#cecece" },
});

export default connect(mapStateToProps, actions)(Title);
