module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/],
    },
  },
};
