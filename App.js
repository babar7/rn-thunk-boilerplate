import React, { Component, useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Linking,
} from "react-native";
import AppNavigator from "./src/AppNavigator";
import { useFonts } from "@use-expo/font";

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import Reducers from "./src/Store/Reducer";
import HttpServiceManager from "./src/HttpServiceManager/HttpServiceManager";
import constant from "./src/HttpServiceManager/constant";
import rootNavigator from "./src/AppNavigator";
import {
  persistStore,
  persistCombineReducers,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { PersistGate } from "redux-persist/lib/integration/react";
import logger from "redux-logger";
import {
  createFilter,
  createWhitelistFilter,
} from "redux-persist-transform-filter";
import KeyboardManager from "react-native-keyboard-manager";
import DropdownAlert from "react-native-dropdownalert";
import { AlertHelper } from "./src/utility/utility";
import rootReducer from "./src/Store/Reducer";
import Spinner from "react-native-globalspinner";
import Reachability from "react-native-reachability-popup";
import _ from "lodash";
import { GoogleSignin } from "@react-native-community/google-signin";
import * as SplashScreen from "expo-splash-screen";
import Notification from "./src/Store/Services/NotificationService/Notification";

console.disableYellwBox = true;

// const filter = createFilter("signIn", ["user"]);

const persistConfig = {
  timeout: 0, // The code base checks for falsy, so 0 disables
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  //   transforms: [filter],
  // whitelist: ["user", "generalPosts"],

  whitelist: ["user", "posts"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(ReduxThunk, logger));

export const persistor = persistStore(store);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReduxLoaded, setReduxLoaded] = useState(false);

  useEffect(() => {
    // Google Config
    GoogleSignin.configure({
      webClientId:
        "175646145221-co6bfjv7m4faqie920vvrkimn9eqtgot.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    Notification.fcmToken();

    // Notification
    Notification.initial();
    const unsubForegoundNotifications = Notification.foreground();
    const unsubOnOpenedNotifications = Notification.onOpened();

    // KeyBoard Manager Config
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setKeyboardDistanceFromTextField(10);
      KeyboardManager.setPreventShowingBottomBlankSpace(true);
      KeyboardManager.setEnableAutoToolbar(true);
      KeyboardManager.setToolbarDoneBarButtonItemText("Done");
      // KeyboardManager.setToolbarManageBehaviour(0);
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
      KeyboardManager.setShouldShowToolbarPlaceholder(true);
      KeyboardManager.setShouldResignOnTouchOutside(true);
      KeyboardManager.isKeyboardShowing().then((isShowing) => {
        // ...
      });
    }
    HttpServiceManager.initialize(constant.baseURL);

    // DeepLinking;
    Linking.addEventListener("url", _handleOpenURL);
    Linking.getInitialURL().then((url) => {
      url && _handleOpenURL({ url });
    });
    return () => {
      unsubForegoundNotifications;
      unsubOnOpenedNotifications;
      Linking.removeEventListener("url", _handleOpenURL);
    };
  }, []);

  const _handleOpenURL = ({ url }) => {
    if (url) {
      const route = url.replace(/.*?:\/\//g, "");
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split("/")[0];
      global.log("routeName", routeName, "route", route, "url", url, "id", id);
    }
  };

  const [isLoaded] = useFonts({
    "SF-SemiBold": require("./src/assets/fonts/sf.ttf"),
    "SF-Light": require("./src/assets/fonts/source-sans-pro.light.ttf"),
    "SF-Regular": require("./src/assets/fonts/source-sans-pro.regular.ttf"),
    heading: require("./src/assets/fonts/SourceSansPro-Semibold.ttf"),
  });

  const onBeforeLift = () => {
    // singleton.storeRef = store;
    setReduxLoaded(true);
    SplashScreen.hideAsync();
    // setTimeout(SplashScreen.hideAsync, 1000);
  };

  const getNavigator = () => {
    const { data } = store.getState().user;
    if (!isReduxLoaded) {
      return null;
    } else {
      if (!_.isEmpty(data)) {
        HttpServiceManager.getInstance().userToken =
          data.user?.access_token?.accessToken;
      }
      return rootNavigator(Object.keys(data).length);
    }
    // return rootNavigator();
  };

  if (isLoaded) {
    const Navigator = getNavigator();

    return (
      <Provider store={store}>
        <PersistGate onBeforeLift={onBeforeLift} persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <Navigator />
          </SafeAreaView>
        </PersistGate>
        <DropdownAlert
          defaultContainer={{
            padding: 8,
            paddingTop: StatusBar.currentHeight,
            flexDirection: "row",
          }}
          ref={(ref) => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
          closeInterval={3000}
          // showCancel={true}
        />

        <Spinner color={"#FF2632"} size="large" />

        <Reachability />
      </Provider>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#122024",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
