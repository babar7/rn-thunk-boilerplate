import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Accordion,
  Text,
  View,
  Image,
} from "native-base";
import { Icon } from "react-native-elements";
const dataArray = [
  {
    title:
      "It is a long established fact that a reader will bedistracted by the readable content",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title: "Aenean sed odio commodo, tincidunt neque inelementum tortor.",
    content:
      "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
  },
  {
    title: "Aenean condimentum lorem at sodales rutrum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title: "Mauris eget lorem a lacus scelerisque lobortisid cursus ligula.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title:
      "It is a long established fact that a reader will bedistracted by the readable content",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title: "Aenean condimentum lorem at sodales rutrum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title: "Mauris eget lorem a lacus scelerisque lobortisid cursus ligula.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title: "Aenean sed odio commodo, tincidunt neque inelementum tortor.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title:
      "It is a long established fact that a reader will bedistracted by the readable content",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title: "Mauris eget lorem a lacus scelerisque lobortisid cursus ligula.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title: "Aenean sed odio commodo, tincidunt neque inelementum tortor.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
  {
    title: "Mauris eget lorem a lacus scelerisque lobortisid cursus ligula.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut rutrum quam, non venenatis diam. Nam bibendum, ligula ullamcorper pretium iaculis, risus felis tristique mauris, vitae tincidunt enim nunc in nisl.",
  },
];

export default class FaqClass extends Component {
  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          paddingLeft: 5,
          paddingRight: 10,
          paddingVertical: 18,
          justifyContent: "space-between",
          alignItems: "flex-start",
          backgroundColor: "transparent",
          borderBottomWidth: expanded ? 0 : 0.5,
          borderBottomColor: "#738388",
        }}
      >
        <Text
          style={{
            width: "85%",
            color: "white",
            // paddingVertical: 5,
            opacity: 0.7,
            textAlign: "left",
            fontSize: 17,
            fontFamily: "SF-SemiBold",
          }}
        >
          {" "}
          {item.title}
        </Text>
        {expanded ? (
          <Icon
            type="font-awesome"
            name="angle-up"
            size={28}
            color={"#ffffff"}
            opacity={0.8}
          />
        ) : (
          <Icon
            type="font-awesome"
            name="angle-down"
            size={28}
            color={"#ffffff"}
            opacity={0.8}
          />
        )}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#738388" }}>
        <Text
          style={{
            color: "white",
            paddingVertical: 5,
            paddingHorizontal: 5,
            opacity: 0.7,
            textAlign: "left",
            fontSize: 16,
            fontFamily: "SF-Regular",
          }}
        >
          {item.content}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <Container
        style={{
          backgroundColor: "transparent",
          padding: 0,
          marginBottom: 50,
        }}
      >
        <Content
          padder
          style={{
            backgroundColor: "transparent",
            borderColor: "white",
          }}
        >
          <Accordion
            style={{ width: "100%" }}
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>
      </Container>
    );
  }
}
