import firebase from "react-native-firebase";
import {
  initialHandler,
  forgroundHandler,
  onOpenedHandler,
} from "./NotificationHandler";

class Notification {
  hasPermission = () => {
    firebase
      .messaging()
      .hasPermission()
      .then((permission) => {
        if (permission) {
          global.log("APP HAS NOTIFICATION PERMISSION");
        } else {
          global.log("REQUESTING NOTIFICATION PERMISSION");
          this.requestPermission();
        }
      });
  };

  requestPermission = () => {
    firebase
      .messaging()
      .requestPermission()
      .then((request) => {
        global.log("APP HAS NOTIFICATION PERMISSION");
      })
      .catch((error) => {
        global.log("NOTIFICATION REQUEST FAILED: ", error);
      });
  };

  fcmToken = (callback) => {
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          global.log("FCM TOKEN: ", fcmToken);
          callback && callback(fcmToken);
        } else {
          global.log("FAILED TO GET FCM TOKEN: ", fcmToken);
          callback && callback(fcmToken);
        }
      })
      .catch((error) => global.log("Error on geting FCM", error));
  };

  // works from kill state to foreground state
  initial = () => {
    firebase
      .notifications()
      .getInitialNotification()
      .then((notification) => {
        if (notification) {
          initialHandler(notification);
        }
      })
      .catch((error) => {
        global.log("FAILED TO GET INITIAL NOTIFICATION: ", error);
      });
  };

  foreground = () => {
    return firebase.notifications().onNotification((notification) => {
      forgroundHandler(notification);
    });
  };

  onOpened = () => {
    return firebase.notifications().onNotificationOpened((notification) => {
      const action = notification.action;
      onOpenedHandler(notification);
    });
  };
}
export default new Notification();
