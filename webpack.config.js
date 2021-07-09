const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const WorkboxPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const manifest = {
  filename: "manifest.json",
  start_url: "/",
  display: "standalone",
  name: "Bitcoin Glance",
  short_name: "BitGlance",
  description: "Quickly glance at the Bitcoin market.",
  background_color: "#fff",
  theme_color: "#ff9900",
  // crossorigin: "use-credentials", //can be null, use-credentials or anonymous
  prefer_related_applications: true,
  icons: [
    {
      src: "./src/Assets/icon_192x192.png",
      sizes: "192x192",
      purpose: "maskable",
    },
    {
      src: "./src/Assets/icon_512x512.png",
      sizes: "512x512",
      purpose: "maskable",
    },
    {
      src: "./src/Assets/icon_144x144.png",
      sizes: "144x144",
      type: "image/png",
      purpose: "any",
    },
  ],
};

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new WebpackPwaManifest(manifest),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "src/View/index.html"),
      filename: "index.html",
      inject: "body",
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "src/View/brl.html"),
      filename: "brl.html",
      inject: "body",
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "src/View/about.html"),
      filename: "about.html",
      inject: "body",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        sideEffects: true,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
