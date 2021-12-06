import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import Slider from "./Components/Slider";
import Welcome from "./Components/Welcome";
import LoginPage from "./Components/LoginPage";
import InviteFriends from "./Components/InviteFriends";
import ForgotPassword from "./Components/ForgotPassword";
import SignUp from "./Components/SignUp";
import Otp from "./Components/Otp";
import Home from "./Components/Home";
import ExplorePost from "./Components/ExplorePost";
import AllChat from "./Components/AllChat";
import MainChat from "./Components/MainChat";
import FavMovies from "./Components/FavMovies";
import Users from "./Components/Users";
import Genre from "./Components/Genre";
import MyProfile from "./Components/MyProfile";

//import Profile from "./Components/MyProfile";

import MovieBox from "./Components/Explore/MovieBox";
import MovieBoxFull from "./Components/Explore/MovieBoxFull";
import { StyleSheet, Dimensions, Platform } from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Icon } from "react-native-elements";
import WatchList from "./Components/WatchList";
import PostDetails from "./Components/PostDetails";
import CommentReply from "./Components/CommentReply";

import ChangePassword from "./Components/ChangePassword";
import WriteReview from "./Components/WriteReview";
import Notifications from "./Components/Notifications";
import Faq from "./Components/Faq";
import ExplorePage from "./Components/ExplorePage";
import EditAboutMe from "./Components/EditAboutMe";
import EditFavoriteQoutes from "./Components/EditFavoriteQoutes";
import Followers from "./Components/Followers";
import Following from "./Components/Following";
import AboutUs from "./Components/AboutUs";
import EditProfile from "./Components/EditProfile";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsConditions from "./Components/TermsConditions";
import ContactUs from "./Components/ContactUs";
import Title from "./Components/Title";
import Category from "./Components/Category";
import AvailableOn from "./Components/AvailableOn";
import ResetPassword from "./Components/ResetPassword";
import { styles } from "./Stylesheets/StylesAppNav";
// import { TouchableOpacity } from "react-native-gesture-handler";
import OtherUser from "./Components/Explore/OtherUser";
// import OtherUser from "./Components/OtherUser";

import { store } from "../App";
import { logout, request } from "./Store/Action/ServiceAction";
import { StackActions, NavigationActions } from "react-navigation";
import { DUMP } from "./Store/Types";
import constant from "./HttpServiceManager/constant";
import Comments from "./Components/Comments";
import { RoundImage } from "./reuseableComponents";
import _ from "lodash";

const { width } = Dimensions.get("window");
const CustomDrawerNavigation = (props) => {
  const { data } = store.getState().user;
  let name = "";
  let source = require("./assets/user.png");
  if (!_.isUndefined(data.user) && !_.isEmpty(data.user)) {
    name = data?.user?.name;
    source = { uri: data?.user?.avatar };
  }
  return (
    <ImageBackground
      style={{
        width: "100%",
        height: "100%",
      }}
      imageStyle={{
        borderColor: "transparent",
        resizeMode: "stretch",
      }}
      source={require("./assets/bg.png")}
    >
      <ScrollView>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: "never", horizontal: "always" }}
        >
          <View>
            <View style={styles.Container}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginVertical: 0,
                  paddingLeft: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.closeDrawer()}
                >
                  <Image
                    style={{
                      width: 26,
                      height: 20,
                      resizeMode: "contain",
                    }}
                    source={require("../src/assets/backArrow.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.view1}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props.navigation.navigate("MyProfile")}
                >
                  <RoundImage
                    // source={require("./assets/user2.png")}
                    source={source ?? undefined}
                    imgStyle={styles.ImageLetters}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props.navigation.navigate("MyProfile")}
                >
                  <Text style={styles.name}>{name}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props.navigation.navigate("MyProfile")}
                >
                  <Text style={styles.name1}>nomaniqbal@gmail.com</Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <ScrollView>
              <DrawerItems
                {...props}
                activeBackgroundColor="#FF2632"
                activeTintColor="#ffffff"
                height={80}
                inactiveTintColor="#ffffff"
                labelStyle={{
                  fontSize: 18,
                  fontFamily: "SF-Regular",
                  fontWeight: "200",
                }}
                itemStyle={{
                  borderColor: "#FFFFFF1A",
                  borderWidth: 0.5,
                }}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const WatchListNavigator = createStackNavigator(
  {
    WatchList: { screen: WatchList },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
const MainChatNavigator = createStackNavigator(
  {
    MainChat: { screen: MainChat },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const AboutUsNavigator = createStackNavigator(
  {
    AboutUs: { screen: AboutUs },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const PrivacyPolicyNavigator = createStackNavigator(
  {
    PrivacyPolicy: { screen: PrivacyPolicy },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const TermsConditionsNavigator = createStackNavigator(
  {
    TermsConditions: { screen: TermsConditions },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const FaqNavigator = createStackNavigator(
  {
    Faq: { screen: Faq },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);
const InviteFriendsNavigator = createStackNavigator(
  {
    InviteFriends: { screen: InviteFriends },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const ContactUsNavigator = createStackNavigator(
  {
    ContactUs: { screen: ContactUs },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const LogoutNavigator = createStackNavigator(
  {
    Logout: { screen: LoginPage },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => (
          <Icon type="font-awesome" name="home" size={25} color={"#ffffff"} />
        ),
      },
    },
    WatchList: {
      screen: WatchListNavigator,
      navigationOptions: {
        title: "Watchlist",
        drawerIcon: () => (
          <Icon type="font-awesome" name="star" size={25} color={"#ffffff"} />
        ),
      },
    },
    MainChat: {
      screen: MainChatNavigator,
      navigationOptions: {
        title: "Chat",
        drawerIcon: () => (
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: "contain",
            }}
            source={require("./assets/images/Icons/menu/chat.png")}
          ></Image>
        ),
      },
    },
    InviteFriends: {
      screen: InviteFriendsNavigator,
      navigationOptions: {
        title: "Invite Friends",
        drawerIcon: () => (
          <Icon type="font-awesome" name="users" size={20} color={"#ffffff"} />
        ),
      },
    },
    AboutUs: {
      screen: AboutUsNavigator,
      navigationOptions: {
        title: "About Us",
        drawerIcon: () => (
          <Icon
            type="font-awesome"
            name="info-circle"
            size={25}
            color={"#ffffff"}
          />
        ),
      },
    },
    PrivacyPolicy: {
      screen: PrivacyPolicyNavigator,
      navigationOptions: {
        title: "Privacy Policy",
        drawerIcon: () => (
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: "contain",
            }}
            source={require("./assets/images/Icons/menu/privacy.png")}
          ></Image>
        ),
      },
    },
    TermsConditions: {
      screen: TermsConditionsNavigator,
      navigationOptions: {
        title: "Terms and Conditions",
        drawerIcon: () => (
          <Icon
            type="font-awesome"
            name="file-text"
            size={25}
            color={"#ffffff"}
          />
        ),
      },
    },

    Faq: {
      screen: FaqNavigator,
      navigationOptions: {
        title: "FAQs",
        drawerIcon: () => (
          <Icon
            type="font-awesome"
            name="file-text"
            name="question-circle"
            size={25}
            color={"#ffffff"}
          />
        ),
      },
    },
    ContactUs: {
      screen: ContactUsNavigator,
      navigationOptions: {
        title: "Contact Us",
        drawerIcon: () => (
          <Icon type="font-awesome" name="phone" size={25} color={"#ffffff"} />
        ),
      },
    },
    Logout: {
      screen: LogoutNavigator,
      navigationOptions: ({ navigation }) => {
        if (navigation.isFocused()) {
          logoutAndResetNavigationStack(navigation);

          // const { user } = store.getState().user.data;
          // store.dispatch(
          //   request(
          //     constant.logout + user.id,
          //     "delete",
          //     {},
          //     undefined,
          //     true,
          //     (res) => {
          //       // logoutAndResetNavigationStack(navigation);
          //     }
          //   )
          // );
        }
        return {
          title: "Logout",
          drawerIcon: () => (
            <Icon
              type="font-awesome"
              name="sign-out"
              size={25}
              color={"#ffffff"}
            />
          ),
        };
      },
    },
  },
  {
    drawerPosition: "left",
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    initialRouteName: "Home",
    gestureEnabled: false,
    drawerWidth: (width / 2.5) * 2,
  }
);

const logoutAndResetNavigationStack = (navigation) => {
  store.dispatch(logout());

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "LoginPage" })],
  });
  navigation.dispatch(resetAction);
};

const AppNavigator = (isUserLoggedIn) => {
  return createStackNavigator(
    {
      //MyProfile:MyProfile,
      Slider: Slider,
      Welcome: Welcome,
      LoginPage: LoginPage,
      ForgotPassword: ForgotPassword,
      SignUp: SignUp,
      Otp: Otp,
      ResetPassword: ResetPassword,
      MovieBox: MovieBox,
      MovieBoxFull: MovieBoxFull,
      WriteReview: WriteReview,
      Notifications: Notifications,
      ExplorePage: ExplorePage,
      Faq: Faq,
      AppDrawerNavigator: AppDrawerNavigator,
      EditAboutMe: EditAboutMe,
      AllChat: AllChat,
      MainChat: MainChat,
      EditFavoriteQoutes: EditFavoriteQoutes,
      WatchList: WatchList,
      PostDetails: PostDetails,
      ChangePassword: ChangePassword,
      FavMovies: FavMovies,
      Users: Users,
      Title: Title,
      Genre: Genre,
      Category: Category,
      AvailableOn: AvailableOn,
      MyProfile: MyProfile,
      ExplorePost: ExplorePost,
      CommentReply: CommentReply,
      //Profile:Profile,

      EditProfile: EditProfile,
      Followers: Followers,
      Following: Following,
      OtherUser: OtherUser,

      Comments: Comments,
    },
    {
      initialRouteName: isUserLoggedIn ? "AppDrawerNavigator" : "Slider",
      headerMode: "none",
      defaultNavigationOptions: {
        gestureEnabled: false,
        // cardOverlayEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      },
    }
  );
};

const rootNavigator = (isUserLoggedIn) =>
  createAppContainer(AppNavigator(isUserLoggedIn));

export default rootNavigator;
