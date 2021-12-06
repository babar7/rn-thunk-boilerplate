import { Metrics } from ".";

const centerAligned = { alignItems: "center", justifyContent: "center" };

const dropShadow = () => {
  return {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  };
};

const flatListContentContainerStyle = {
  paddingVertical: Metrics.heightRatio(30),
  marginHorizontal: Metrics.baseMargin,
};

export default {
  centerAligned,
  dropShadow,
  flatListContentContainerStyle,
};
