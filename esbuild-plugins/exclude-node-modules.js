const { readFileSync } = require('fs');

module.exports = {
  name: 'excludeVendorFromSourceMap',
  setup(build) {
    build.onLoad({ filter: /node_modules\/.+\.js$/ }, (args) => {
      return {
        contents:
          readFileSync(args.path, 'utf8') +
          '\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ==',
        loader: 'default',
      };
    });
  },
};
