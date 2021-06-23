module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxOptions: {
      swSrc: "service-worker.js",
      exclude: [/\.map$/, /_redirects/],
    },
  },
};
