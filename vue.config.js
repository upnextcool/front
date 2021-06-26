module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/],
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
    /* 
       Configure preload to load all chunks
    */
    config.plugin("preload").tap((options) => {
      options[0].include = "allChunks";
      return options;
    });
  },
};
