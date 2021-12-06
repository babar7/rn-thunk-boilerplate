import {
  Dimensions,
  Share,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import ImagePicker from "react-native-image-picker";

const { width, height } = Dimensions.get("window");

export const screenWidth = width;
export const screenHeight = height;

export const validateEmail = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  }
  return true;
};

export const getCurrentLocationWithWatch = (
  enableHighAccuracyLocation = false
) => {
  let options = {
    enableHighAccuracy: enableHighAccuracyLocation,
    timeout: 20000,
    maximumAge: 1000,
  };

  if (Platform.OS === "android") {
    options = {
      enableHighAccuracy: true,
      timeout: 100,
      maximumAge: 100,
      distanceFilter: 0,
    };
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        console.log("error: ", error);
        reject(error);
      },
      options
    );
  });
};

export async function checkAndRequestLocation() {
  try {
    const check = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (check === false) {
      try {
        var request = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return request;
      } catch (err) {
        console.warn(err);
      }
    } else if (check === true) {
      return PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.warn(err);
  }
}

export const getCurrentLocation = (enableHighAccuracyLocation = false) => {
  let options = {
    enableHighAccuracy: enableHighAccuracyLocation,
    timeout: 20000,
    maximumAge: 1000,
  };

  if (Platform.OS === "android") {
    options = {
      enableHighAccuracy: false,
      timeout: 20000,
    };
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      options
    );
  });
};

export const uploadImage = () => {
  const options = {
    quality: 0.1,
    maxWidth: 300,
    maxHeight: 300,
    storageOptions: {
      skipBackup: true,
    },
  };
  return new Promise((resolve, reject) => {
    // console.log("Response = ", response);
    // if (response.didCancel) {
    //   console.log("User cancelled photo picker");
    //   reject('')
    // } else if (response.error) {
    //   console.log("ImagePicker Error: ", response.error);
    //    reject('')
    // } else if (response.customButton) {
    //   console.log("User tapped custom button: ", response.customButton);
    // } else {
    //   console.log("response.uri : ", response.uri)
    //   resolve(response.uri)
    // }

    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        //reject('')
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
        //reject('')
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        // reject('')
      } else {
        console.log("response.uri : ", response.uri);
        resolve(response.uri);
      }
    });
  });
};

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const removeArrayIndex = (array, index) => {
  const tempArray = [...array];
  tempArray.splice(index, 1);
  return tempArray;
};

export const searchArrayByKey = (array = [], key = "", searchWith = "name") => {
  const tempArray = [...array];
  let keyword = key.trim().toLowerCase();
  let filteredArray = tempArray.filter((item) =>
    item[searchWith].toLowerCase().includes(keyword)
  );
  return filteredArray;
};

//React-Native-DropDown-Alert
//Helper

export class AlertHelper {
  static dropDown;
  static onClose;

  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }

  static show(type, title, message) {
    if (this.dropDown) {
      this.dropDown.alertWithType(type, title, message);
    }
  }

  static setOnClose(onClose) {
    this.onClose = onClose;
  }

  static invokeOnClose() {
    if (typeof this.onClose === "function") {
      this.onClose();
    }
  }
}

export const isObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

export const isPlatformAndroid = () => Platform.OS === "android";
export const isPlatformIOS = () => Platform.OS === "ios";
