import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Metrics, AppStyles, Colors } from "../../theme";
import { ButtonView, ImageHandler } from "../../reuseableComponents";

const profileHolder = require("./img/profileHolder.png");
const RoundImage = (props) => {
  const {
    source = profileHolder,
    onPress = undefined,
    imgViewStyle,
    imgStyle,
    defaultSource = profileHolder,
    resizeMode = "contain",
  } = props;

  return (
    <TouchableOpacity
      style={{ ...styles.imgViewStyle, ...imgViewStyle }}
      disabled={onPress == undefined}
      onPress={onPress}
    >
      <ImageHandler
        source={source}
        defaultSource={defaultSource}
        style={{ ...styles.imgStyle, ...imgStyle }}
        // resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgViewStyle: {
    ...AppStyles.centerAligned,
    // ...AppStyles.dropShadow,
  },
  imgStyle: {
    height: Metrics.widthRatio(50),
    width: Metrics.widthRatio(50),
    borderRadius: Metrics.widthRatio(50 / 2),
    borderWidth: 1,
    borderColor: Colors.border.white,
    backgroundColor: "#f1eff0",
  },
});

export default RoundImage;
