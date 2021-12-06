import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";

const onFacebookSignin = (cbOnSuccess) => {
  LoginManager.LoginBehaviorAndroid = "web_only";
  LoginManager.loginBehaviorIOS = "system_account";
  LoginManager.logInWithPermissions(["public_profile", "email"]).then(
    (result) => {
      global.log("Signin With facebook", result);
      if (result.isCancelled) {
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          let accessToken = data.accessToken;
          const responseInfoCallback = (error, result) => {
            if (error) {
            } else {
              let payload = {
                username: result.email,
                name: `${result.first_name} ${result.last_name}`,
                platformId: result.id,
                platform: "facebook",
                socialLogin: 1,
                avatar:
                  result.picture &&
                  result.picture.data &&
                  result.picture.data.url &&
                  result.picture.data.url,
                //   device_type: utility.isPlatformAndroid() ? 'android' : 'ios',
                //   device_token: utility.getOneSignalPlayerId(),
                //   device: utility.isPlatformAndroid() ? 'android' : 'ios',
              };

              cbOnSuccess && cbOnSuccess(payload);

              LoginManager.logOut(); //logout fb
            }
          };
          const infoRequest = new GraphRequest(
            "/me",
            {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string:
                    "email,name,first_name,middle_name,last_name,picture.type(large)",
                },
              },
            },
            responseInfoCallback
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
        });
      }
    },
    (error) => {}
  );
};

// Somewhere in your code
const onGoogleSignIn = async (cbOnSuccess) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if (userInfo.user) {
      const { user } = userInfo;
      let payload = {
        username: user.email,
        name: user.name,
        platformId: user.id,
        platform: "google",
        avatar: user.photo,
        socialLogin: 1,

        //   social_id: userInfo.user.id,
        //   social_type: 'google_plus',
        //   device_type: utility.isPlatformAndroid() ? 'android' : 'ios',
        //   device_token: utility.getOneSignalPlayerId(),
        //   device: utility.isPlatformAndroid() ? 'android' : 'ios',
      };

      cbOnSuccess && cbOnSuccess(payload);
      await GoogleSignin.signOut();
    }
  } catch (error) {
    global.log("Google Login error", error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      global.log("user cancelled the login flow");
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      global.log("operation (f.e. sign in) is in progress already");
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      global.log(" play services not available or outdated");
      // play services not available or outdated
    } else {
      global.log(" some other error happened", error);
    }
  }
};

export { onFacebookSignin, onGoogleSignIn };
