const path = require('path');
console.log(path.resolve(__dirname, 'dist'))

module.exports = {
    entry: './src/index.js',
//   entry: {
//       "widgetSolver": "./index.js",
//   },
  output: {
      path: path.resolve(__dirname, 'dist'),
    //   path: "/home/nitish/Projects/kolibri-exercise-perseus-plugin/kolibri_exercise_perseus_plugin/assets/src/widgetSolver/build",
      // publicPath: ".",
      filename: "ok.js",
  },
  devServer: {
      historyApiFallback: "/build/",
  },
  // devtool: "source-map",
};
