import "dotenv/config";

export default {
  name: "rn-shoppingapp",
  slug: "rn-shoppingapp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  description: "",
  extra: {
    parse: {
      url: process.env.PARSE_URL,
      appId: process.env.PARSE_APP_ID,
      key: process.env.PARSE_REST_KEY,
    },
  },
};
