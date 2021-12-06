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
  TouchableWithoutFeedback,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import * as Font from "expo-font";
import { Icon } from "react-native-elements";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Rating, AirbnbRating } from "react-native-elements";

class MovieBox extends Component {
  state = {
    like: false,
    wishlist: false,
  };

  componentDidMount() {}
  updateLike = () => {
    this.setState({
      like: !this.state.like,
    });
  };

  RBsheetHandler = () => {
    this.RBSheet.close();
    setTimeout(() => this.RBSheetShare.open(), 500);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("OtherUser")}
        >
          <View style={styles.justViewedBox}>
            {/*pic*/}
            <View style={styles.pic}>
              <Image
                style={styles.picImage}
                source={require("../../assets/pic.png")}
              ></Image>
            </View>

            <View style={styles.just}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={styles.menu}
                  onPress={() => this.RBSheetVisible.open()}
                >
                  <Image
                    style={styles.iconImage}
                    source={require("../../assets/menu.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.nameAndJustViwedBox}>
                <TouchableOpacity
                  opacity={0.7}
                  onPress={() => this.props.navigation.navigate("OtherUser")}
                >
                  <Text style={styles.boldName}>Noman Iqbal</Text>
                </TouchableOpacity>
                <Text style={styles.textJustViewed}>just viewed</Text>
              </View>

              <View style={styles.nameAndJustViwedBox2}>
                <Text style={styles.boldName2}>Extraction Part II</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.dateAndStarsRatings}>
          <Text style={styles.dateText}>June 02 at 7:25 PM </Text>

          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../assets/dot.png")}
          ></Image>

          <Image
            style={{ width: 12, height: 12, marginRight: 10, marginLeft: 4 }}
            source={require("../../assets/people.png")}
          ></Image>

          <View style={{ flexDirection: "row", bottom: 1 }}>
            <View>
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={15}
                ratingImage={require("../../assets/2nd.png")}
                //showRating
                fractions={1}
                readonly
                // backgroundColor="blue"
                //overlayColor='blue'
                startingValue={2.5}
                //ratingTextColor={styles.smText3}
                ratingBackgroundColor="#C7C7C7"
                style={{ paddingVertical: 10, bottom: 11 }}
                //reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
              />
            </View>
          </View>
        </View>

        {/*movie image */}

        <View
          style={{
            width: "100%",
            height: 200,
            borderWidth: 0,
            borderColor: "#738388",
            borderRadius: 7,
          }}
        >
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
            imageStyle={{
              borderWidth: 0,
              borderColor: "#738388",
              borderRadius: 7,
            }}
            source={require("../../assets/imgMovie.png")}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderWidth: 0,
                borderColor: "#738388",
                borderRadius: 7,
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                alignSelf: "flex-end",
                margin: 5,
              }}
            >
              <TouchableOpacity>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    // borderRadius: 7,
                    alignSelf: "center",
                  }}
                  source={require("../../assets/Available/N.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/*action /catergory*/}

        <View
          style={{
            width: "100%",
            height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#BFBFBF",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              width: "40%",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Image
              style={{ width: 15, height: 15 }}
              source={require("../../assets/groupIcon.png")}
            ></Image>

            <Text style={{ left: 10, fontWeight: "500" }}>Action</Text>
          </View>

          {this.state.wishlist ? (
            <TouchableOpacity
              onPress={() => this.setState({ wishlist: !this.state.wishlist })}
            >
              <Image
                style={{
                  width: 17,
                  height: 17,
                  marginTop: 10,
                }}
                source={require("../../assets/redStar.png")}
              ></Image>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.setState({ wishlist: !this.state.wishlist })}
            >
              <Image
                style={{
                  width: 17,
                  height: 17,
                  marginTop: 10,
                }}
                source={require("../../assets/starb.png")}
              ></Image>
            </TouchableOpacity>
          )}
        </View>

        {/*like share comment*/}
        <View
          style={{
            width: "100%",
            height: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#BFBFBF",
            top: 5,
            //borderBottomWidth:1
          }}
        >
          <View
            style={{
              width: "40%",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              //borderWidth:2,
              justifyContent: "flex-start",
            }}
          >
            {this.state.like ? (
              <TouchableOpacity onPress={this.updateLike}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    right: 5,
                    marginLeft: 10,
                    justifyContent: "center",
                    backgroundColor: "#FF2632",
                    borderRadius: 50,
                  }}
                >
                  <Icon
                    type="font-awesome"
                    name="thumbs-up"
                    size={18}
                    color={"#ffffff"}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.updateLike}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    right: 5,
                    marginLeft: 10,
                    justifyContent: "center",
                    backgroundColor: "#1E2C3003",
                    borderRadius: 50,
                    borderColor: "#949494",
                    borderWidth: 0.5,
                  }}
                >
                  <Icon
                    type="font-awesome"
                    name="thumbs-up"
                    size={18}
                    color={"#949494"}
                  />
                </View>
              </TouchableOpacity>
            )}

            {this.state.like ? (
              <Text style={{ left: 2, color: "#FF2632", fontWeight: "500" }}>
                09
              </Text>
            ) : (
              <Text style={{ left: 2, color: "#949494", fontWeight: "500" }}>
                08
              </Text>
            )}

            {/*2*/}

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("PostDetails")}
            >
              <Image
                style={{ width: 35, height: 35, left: 10 }}
                source={require("../../assets/comment.png")}
              ></Image>
            </TouchableOpacity>

            <Text style={{ left: 14, color: "#949494", fontWeight: "500" }}>
              21
            </Text>
          </View>

          {/*end side share */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.RBSheet.open()}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 10,
                  alignSelf: "center",
                }}
                source={require("../../assets/share.png")}
              ></Image>
            </TouchableOpacity>

            <Text style={{ fontWeight: "500", color: "#949494" }}>21</Text>
          </View>
        </View>
        <TouchableWithoutFeedback>
          <RBSheet
            ref={(ref) => {
              this.RBSheetVisible = ref;
            }}
            // closeOnDragDown={true}
            height={220}
            openDuration={300}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(52, 52, 52, 0.8)",
              },
              draggableIcon: {
                // backgroundColor: "#000",
                backgroundColor: "transparent",
              },
              container: {
                borderTop: 0.5,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: "#F7F7F7",
              },
            }}
          >
            <ScrollView>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.item}>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: "contain",
                        marginLeft: 7,
                      }}
                      source={require("../../assets/images/users/boy1.png")}
                    ></Image>
                    <Text style={styles.title}>Bilal Hussain</Text>
                  </View>
                  <TouchableOpacity onPress={() => this.RBSheetVisible.close()}>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: "contain",
                        margin: 10,
                      }}
                      source={require("../../assets/closeModal.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity>
                  <View style={styles.item1}>
                    <Text style={[styles.title, { fontWeight: "bold" }]}>
                      Hide Post
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.item1}>
                    <Text style={[styles.title, { fontWeight: "bold" }]}>
                      Delete Post
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </RBSheet>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            // closeOnDragDown={true}
            height={280}
            openDuration={300}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(52, 52, 52, 0.8)",
              },
              draggableIcon: {
                // backgroundColor: "#000",
                backgroundColor: "transparent",
              },
              container: {
                borderTop: 0.5,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: "#F7F7F7",
              },
            }}
          >
            <ScrollView>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.item}>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: "contain",
                        marginLeft: 7,
                      }}
                      source={require("../../assets/images/users/boy1.png")}
                    ></Image>
                    <Text style={styles.title}>Bilal Hussain</Text>
                  </View>
                  <TouchableOpacity onPress={() => this.RBSheet.close()}>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: "contain",
                        margin: 10,
                      }}
                      source={require("../../assets/closeModal.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "column" }}>
                  <TextInput
                    style={{
                      paddingLeft: 30,
                      height: 60,
                      fontSize: 18,
                      opacity: 0.6,
                    }}
                    placeholder={"Say something about this..."}
                    placeholderTextColor="#738388"
                  />
                </View>
                <TouchableOpacity>
                  <View style={styles.item1}>
                    <Image
                      style={{
                        width: 18,
                        height: 18,
                        resizeMode: "contain",
                        marginLeft: 7,
                      }}
                      source={require("../../assets/shareOther.png")}
                    ></Image>
                    <Text style={[styles.title, { fontWeight: "bold" }]}>
                      Internal
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => this.RBSheetShare.open()}> */}
                <TouchableOpacity onPress={this.RBsheetHandler}>
                  <View style={styles.item1}>
                    <Image
                      style={{
                        width: 18,
                        height: 18,
                        resizeMode: "contain",
                        marginLeft: 7,
                      }}
                      source={require("../../assets/shareOther.png")}
                    ></Image>
                    <Text style={[styles.title, { fontWeight: "bold" }]}>
                      External
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </RBSheet>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <RBSheet
            ref={(ref) => {
              this.RBSheetShare = ref;
            }}
            height={250}
            openDuration={300}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(52, 52, 52, 0.8)",
              },
              draggableIcon: {
                backgroundColor: "transparent",
              },
              container: {
                borderTop: 0.5,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: "#F7F7F7",
              },
            }}
          >
            <ScrollView>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.item}>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: "contain",
                        marginLeft: 7,
                      }}
                      source={require("../../assets/images/users/boy1.png")}
                    ></Image>
                    <Text style={styles.title}>Bilal Hussain</Text>
                  </View>
                  <TouchableOpacity onPress={() => this.RBSheetShare.close()}>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: "contain",
                        margin: 10,
                      }}
                      source={require("../../assets/closeModal.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal={true}
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: "#B7BDBF",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity>
                    <View style={[styles.item1, { borderWidth: 0 }]}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: "contain",
                          marginLeft: 7,
                        }}
                        source={require("../../assets/whatsapp.png")}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={[styles.item1, { borderWidth: 0 }]}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: "contain",
                          marginLeft: 7,
                        }}
                        source={require("../../assets/twitter.png")}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={[styles.item1, { borderWidth: 0 }]}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: "contain",
                          marginLeft: 7,
                        }}
                        source={require("../../assets/insta.png")}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={[styles.item1, { borderWidth: 0 }]}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: "contain",
                          marginLeft: 7,
                        }}
                        source={require("../../assets/Bitmap.png")}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={[styles.item1, { borderWidth: 0 }]}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: "contain",
                          marginLeft: 7,
                        }}
                        source={require("../../assets/skype.png")}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginHorizontal: 20,
                  marginVertical: 10,
                  backgroundColor: "#FFF",
                  height: 40,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    paddingLeft: 30,
                    height: 40,
                    fontSize: 18,
                    opacity: 0.6,
                    alignSelf: "flex-start",
                  }}
                  placeholder={"Copy"}
                  placeholderTextColor="#000000"
                />
                <TouchableOpacity>
                  <View
                    style={[
                      styles.item1,
                      { borderWidth: 0, flex: 1, justifyContent: "flex-end" },
                    ]}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: "contain",
                        marginRight: 2,
                      }}
                      source={require("../../assets/copy.png")}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </RBSheet>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default MovieBox;

const styles = StyleSheet.create({
  dateAndStarsRatings: {
    width: "85%",
    alignSelf: "flex-end",
    height: "7%",
    //borderWidth:1,
    bottom: 4,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  item: {
    paddingTop: 10,
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  item1: {
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#738388",
    borderWidth: 0.5,
  },
  title: {
    fontSize: 18,
    color: "#000000",
    width: "100%",
    fontWeight: "900",
    marginLeft: 15,
  },

  dateText: {
    fontSize: 12,
    color: "#738388",
  },

  boldName: {
    fontSize: 15,
    fontWeight: "bold",
  },

  boldName2: {
    fontSize: 15,
    fontWeight: "bold",
    //left:-2,
    bottom: 2,
  },
  textJustViewed: {
    fontSize: 12,
    top: 2,
    left: 7,
    color: "#738388",
  },

  nameAndJustViwedBox: {
    width: "100%",
    height: 20,
    //alignItems:"flex-start",
    //justifyContent:"center",
    flexDirection: "row",
    //marginRight:"2%",
    //borderWidth:2,
    //flexDirection:"row"
  },

  nameAndJustViwedBox2: {
    width: "100%",
    height: "50%",
    //alignItems:"flex-start",
    //justifyContent:"center",
    //flexDirection:"row",
    //marginRight:"2%",
    //borderWidth:2,
    //flexDirection:"row"
  },

  just: {
    width: "85%",
    height: "100%",
    //alignItems:"flex-start",
    justifyContent: "center",
    //marginRight:"2%",
    //borderWidth:2,
    //flexDirection:"row"
  },

  picImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },

  pic: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    paddingTop: 4,
    //marginRight:"2%",
    //borderWidth:2,
    //flexDirection:"row"
  },

  justViewedBox: {
    width: "100%",
    height: 40,
    //borderWidth:2,
    flexDirection: "row",
  },
  iconImage: {
    width: 20,
    height: "100%",
    resizeMode: "contain",
  },

  menu: {
    width: "100%",
    height: 10,
    //borderWidth:1,
    borderColor: "cyan",

    alignItems: "flex-end",
  },
  //movieBox styles above
});
