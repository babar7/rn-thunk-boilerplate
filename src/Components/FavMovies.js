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
import { styles } from "../Stylesheets/StylesFavMovie";

import { connect } from "react-redux";
import { request, generalSaveAction } from "../Store/Action/ServiceAction";
// import _ from "lodash";
import constant from "../HttpServiceManager/constant";
import { DUMP, MOVIES_TITLE, LOGIN } from "../Store/Types";
import { validateEmail, AlertHelper } from "../utility/utility";
import { FlatListHandler } from "../reuseableComponents";


function Item({ title, image, cat, date }) {
  return (
    <View style={{...styles.item, 
    // backgroundColor: favoriteMovies.includes(item.id) ? "#ffe" : "#fff",
    }}>
      <Image
        style={{
          width: 45,
          height: 45,
          resizeMode: "contain",
          //marginLeft: 7
        }}
        source={image}
      ></Image>
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



class FavMovies extends Component {

  // componentDidMount() {
  //   request(constant.markFavMovie, "post", {movieId}, FAV_MOVIES, true, (success) => {
     
  //    alert(success)
  //     // let updatedPosts = [success.id, ...posts];
  //     // generalSaveAction(UPDATE_POST, success);
  //     // generalSaveAction(POSTS.SUCCESS, updatedPosts);
  //     // AlertHelper.show("success", "", "Post created successfuly");

  //     // navigation.pop();
  //   });
  // }

  state= {
    searchTag: ''
  }

  get = () => {
    const { request, selectedTitle } = this.props;
    let params = { limit: 10, offset: 0, searchTag: this.state.searchTag };
    // _.isEmpty(selectedTitle) &&
      request(constant.movie, "get", params, MOVIES_TITLE, false);
  }

  componentDidMount() {
    this.get()
  }
//props.favoriteMovies.includes(movieId)
  ItemAll({ title, image, cat, date, movieId, props, user_id }) {
    let id;
    return (
      <TouchableOpacity 
        onPress={()=>{
          props.favoriteMovies.some((movie)=> {if(movie.movie.id == movieId){id = movie.id; return (true)} else return false}) 
          ?
            props.request(constant.markFavMovie + '/' + id, "delete", {}, DUMP, true, (success) => {
              AlertHelper.show("success", "", "Removed successfuly");
              // props.navigation.pop();
          })
          :
            props.request(constant.markFavMovie, "post", {movieId}, DUMP, true, (success) => {
       
        //  alert(success)
        // let updatedPosts = [success.id, ...posts];
        // generalSaveAction(UPDATE_POST, success);
        // generalSaveAction(POSTS.SUCCESS, updatedPosts);
        AlertHelper.show("success", "", "Saved successfuly");
        // props.request(constant.updateUser + user_id, "put",{favoriteGenre: selectedCategories},LOGIN,true,(res) => {navigation.pop()});
  
        // props.navigation.pop();
      });
        props.request(constant.updateUser + user_id, "put",{},LOGIN,true,(res) => {props.navigation.pop()});

        }} 
        // style={styles.item}
        style={{...styles.item, 
        backgroundColor: props.favoriteMovies.includes(movieId) ? "#ffe" : "#fff",
        }}
      >
      
        <Image
          style={{
            width: 45,
            height: 45,
            resizeMode: "contain",
            //marginLeft: 7
          }}
          source={image}
        ></Image>
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
      </TouchableOpacity>
    );
  }


  render() {
  const {favoriteMovies, moviesTitle} = this.props
  const { user_id } = this.props.user;

  console.warn(favoriteMovies)
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
              <View style={[stylesHead.topHeader1, {justifyContent:'flex-start'}]}>
                <TouchableOpacity
                  style={stylesHead.backArrow}
                  onPress={() => {
                    // this.props.navigation.goBack();
                    this.props.request(constant.updateUser + user_id, "put",{},LOGIN,true,(res) => {this.props.navigation.pop()});

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
                <View style={stylesHead.favMoviesContainer1}>
                  <Text style={stylesHead.headText1}>Edit Favorite Movies</Text>
                </View>
                {/* <TouchableOpacity style={styles.saveBtn}>
                  <Text style={{ color: "#738388" }}>Save</Text>
                </TouchableOpacity> */}
              </View>
              <View style={styles.searchView}>
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
                  style={styles.searchBar}
                  onChangeText={(searchTag)=>{this.setState({searchTag}); this.get();}}

                ></TextInput>
              </View>

              <ScrollView style={{ width: "100%" }}>
                {/* <View style={styles.section}>
                  <Text style={styles.sectionText}>Upcoming</Text>
                </View>
                <FlatListHandler
                  // data={this.state.movies}
                  data={[]}
                  renderItem={({ item }) => (
                    <Item
                      title={item.title}
                      image={item.image}
                      cat={item.cat}
                      date={item.date}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  style={{ width: "100%" }}
                /> */}

                <View style={styles.section}>
                  <Text style={styles.sectionText}>All</Text>
                </View>
                <FlatListHandler
                  // data={this.props.favoriteMovies}
                  data={moviesTitle}
                  renderItem={({ item }) => (
                    <this.ItemAll
                      title={item?.title?.name.trim()}
                      image={{uri:item?.image?.url}}
                      cat={item?.genre[0]?.name }
                      date={item?.releaseDate?.year}
                      movieId={item?.id}
                      props={this.props}
                      user_id={user_id}
                      
    //                       let title = item.title.name;
    // let image = { uri: item.image.url ?? undefined };
    // let cat = item.genre[0].name;
    // let date = item.releaseDate.year;
    // const { selectedTitle } = this.props;
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  style={{ width: "100%" }}
                />
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}


const actions = { 
  request,
  generalSaveAction
   };
const mapStateToProps = ({ signup, user, saveSelection, posts, moviesTitle }) => ({
  // signupUserData: signup["data"],
  favoriteMovies: user["data"].user.favoriteMovies,
  moviesTitle: moviesTitle["data"],
  user: user["data"].user,
  // selectedPlatforms: saveSelection["selectedPlatforms"],
  // selectedPlatformsName: saveSelection["selectedPlatformsName"],
  selectedTitle: saveSelection["selectedTitle"],
  // selectedTitleName: saveSelection["selectedTitleName"],
  // posts: posts["data"],
});

export default connect(mapStateToProps, actions)(FavMovies);