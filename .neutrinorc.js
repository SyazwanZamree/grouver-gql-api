module.exports = {
  use: [
    [
      '@neutrinojs/node', {
        hot: false,
        targets: {
          node: '6.10'
        }
    }],
    '@neutrinojs/airbnb-base',
    '@neutrinojs/jest'
  ]
};
