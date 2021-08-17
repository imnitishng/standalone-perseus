module.exports = {
  entry: {
      "widgetSolver": "./index.js",
  },
  output: {
      path: "/home/nitish/Projects/kolibri-exercise-perseus-plugin/kolibri_exercise_perseus_plugin/assets/src/widgetSolver/build",
      publicPath: ".",
      filename: "ok.js",
  },
  devServer: {
      historyApiFallback: "/build/",
  },
  devtool: "source-map",
};
