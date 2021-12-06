import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { IconButton } from "react-native-paper";
import MainChat from "./MainChat";
import { SafeAreaView } from "react-native";
import AllChat from "./AllChat";

const ChatHomeStack = createStackNavigator();

export default function ChatHome() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatHomeStack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6646ee",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontFamily: "SF-SemiBold",
            fontSize: 22,
          },
        }}
      >
        <ChatHomeStack
          name="Chat"
          component={MainChat}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                icon="message-plus"
                size={28}
                color="#ffffff"
                onPress={() => navigation.navigate("MainChat")}
              />
            ),
          })}
        />
        <ChatHomeStack name="Room" component={AllChat} />
      </ChatHomeStack>
    </SafeAreaView>
  );
}