import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Font Awesome core items...
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//set up individual icons here...
import { faUserSecret, faGlobe, faArchive, faAtom, faAward, faBacon, faBolt, faChartPie, faCreditCard, faCubes, faDiagnoses, faDiceD20, faFlask, faHdd, faMoneyCheck, faNetworkWired} from '@fortawesome/free-solid-svg-icons'
import { faBitbucket, faGitAlt, faMandalorian, faVuejs } from '@fortawesome/free-brands-svg-icons'

library.add(  faBitbucket, faGitAlt, faMandalorian, faVuejs, faUserSecret, faGlobe, faArchive, faAtom, faAward, faBacon, faBolt, faChartPie, faCreditCard, faCubes, faDiagnoses, faDiceD20, faFlask, faHdd, faMoneyCheck, faNetworkWired)

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
