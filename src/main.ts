import Vue from "vue";
import App from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { apolloProvider } from "@/apollo/apollo-provider";
import VueApollo from "vue-apollo";
import { env } from "@/env";
import LogRocket from "logrocket";

Vue.config.productionTip = false;

Vue.prototype.$PROD = env.prod;
Vue.prototype.$apiUrl = env.apiUrl;
Vue.prototype.$frontUrl = env.frontUrl;
Vue.prototype.$graphqlUrl = env.graphqlUrl;

Vue.use(VueApollo);

LogRocket.init("ayfxcp/upnext");

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
