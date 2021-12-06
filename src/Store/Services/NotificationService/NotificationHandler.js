import { Platform } from "react-native";
import firebase from "react-native-firebase";
// import {
//   // setNotificationViewed,
//   getNotificationBadge,
//   // callDispatch,
//   // setUnreadCountInReducer,
// } from '../../reusableFuncs';
import _ from "lodash";
// import {onNotiTap} from '../../actions/onNotiTap';
// import {generalSaveAction} from '../../actions/ServiceAction';
// import {SET_CHAT_UNREAD_COUNT} from '../../actions/ActionTypes';

global.isInChatWith = 0;

export const forgroundHandler = (notification) => {
  global.log("RECIEVED NOTIFICATION IN FOREGROUND STATE: ", notification);

  // const {
  //   identifier,
  //   userBadge,
  //   customData: { body, order_id },
  // } = parseData({ notification });

  //   if (identifier == 'send_message') {
  //     if (data.actor.id == global.isInChatWith) {
  //       return;
  //     } else {
  //       //   setUnreadCountInReducer({
  //       //     total_unread_count: data?.total_unread_count ?? 0,
  //       //     users_unread_count: data?.users_unread_count ?? [],
  //       //   });
  //     }
  //   }

  //   getNotificationBadge();

  const channelId = new firebase.notifications.Android.Channel(
    "Default",
    "Default",
    firebase.notifications.Android.Importance.High
  );
  firebase.notifications().android.createChannel(channelId);

  let notification_to_be_displayed = new firebase.notifications.Notification({
    data: notification.data,
    sound: "default",
    show_in_foreground: true,
    title: notification.title,
    body: notification.body,
  });

  if (Platform.OS == "android") {
    notification_to_be_displayed.android
      .setPriority(firebase.notifications.Android.Priority.High)
      .android.setChannelId("Default")
      .setSound("default")
      .android.setSmallIcon("ic_notification")
      .android.setAutoCancel(true);
  } else {
    notification_to_be_displayed.ios.setBadge(0);
  }

  firebase.notifications().displayNotification(notification_to_be_displayed);
};

export const initialHandler = (notification) => {
  global.log("RECIEVED NOTIFICATION IN INITIAL STATE : ", notification);
  // getNotificationBadge();
  onOpenedHandler(notification);
};

export const onOpenedHandler = (notification) => {
  global.log("ON NOTIFICATION OPEN STATE: ", notification);

  // const {
  //   userBadge,
  //   customData: { body },
  // } = parseData(notification);

  // global.log("body: ", body);
  // global.log("userBadge: ", userBadge);

  navigateOnTap(body);
};

export const navigateOnTap = (data) => {
  //   setNotificationViewed(id);
  global.log("onTapNotifi", data);
};

const parseData = (notification) => {
  const _data = notification.notification._data;
  let parsedData = {};
  let customData = "";

  if (Platform.OS == "android") {
    parsedData.identifier = _data?.identifier;
    parsedData.userBadge = _data?.user_badge;
    customData = _data?.message;
  } else {
    parsedData.identifier = _data["gcm.notification.identifier"];
    parsedData.userBadge = _data["gcm.notification.user_badge"];
    customData = _data["gcm.notification.message"];
  }

  parsedData.customData = JSON.parse(customData);

  return parsedData;
};
