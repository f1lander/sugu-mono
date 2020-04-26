/* eslint-disable @typescript-eslint/explicit-function-return-type, func-names */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
