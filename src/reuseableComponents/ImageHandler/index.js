/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  Image,
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Colors, Metrics } from "../../theme";

const cancelIcon = require("./img/cancel/cancel.png");
const imageHolder = require("./img/imageHolder.png");
const ImageHandler = ({
  source = imageHolder,
  defaultSource = imageHolder,
  cancelImage = cancelIcon,
  showLoader = false,
  style = {},
  removeImage = undefined,
  index = 0,
  resizeMode = "cover",
}) => {
  const [state, setState] = useState({
    imgLoading: false,
  });

  const { imgLoading } = state;
  return (
    <View>
      <Image
        defaultSource={defaultSource}
        source={source}
        style={{
          backgroundColor: Colors.background?.vlgray || "#f1eff0",
          ...style,
        }}
        onLoadStart={(e) => setState({ ...state, imgLoading: true })} //Invoked on load start.
        onLoadEnd={() => {
          setState({
            ...state,
            imgLoading: false,
          });
        }} //Invoked when load completes successfully.
        resizeMode={resizeMode}
      />
      {removeImage && (
        <TouchableOpacity
          style={{
            ...styles.removeIcon,
            left: style.width
              ? style.width - Metrics.widthRatio(25)
              : Metrics.widthRatio(62),
          }}
          onPress={() => removeImage(index)}
        >
          <Image
            style={{
              width: Metrics.icons.tiny,
              height: Metrics.icons.tiny,
            }}
            source={cancelImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {showLoader && imgLoading && (
        <ActivityIndicator
          color={Colors.icon?.theme || "#9a9a9a"}
          size="large"
          style={styles.loaderStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  removeIcon: {
    backgroundColor: Colors.background?.white,
    position: "absolute",
    // left: Metrics.widthRatio(62),
    top: 5,
    borderRadius: Metrics.widthRatio(23) / 2,
    width: Metrics.widthRatio(23),
    height: Metrics.widthRatio(23),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});

export default ImageHandler;
