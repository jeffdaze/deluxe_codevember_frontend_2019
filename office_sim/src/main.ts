import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Font Awesome core items...
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//set up individual icons here...
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(faFontAwesome, faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: {
    FontAwesomeIcon
  },
  render: h => h(App)
}).$mount("#app");
