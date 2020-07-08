import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import firebase from "firebase/app";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBvuba6NlvY_fJPG69FH3NDm-jpi5UeZtA",
  authDomain: "notes-2cba6.firebaseapp.com",
  databaseURL: "https://notes-2cba6.firebaseio.com",
  projectId: "notes-2cba6",
  storageBucket: "notes-2cba6.appspot.com",
  messagingSenderId: "936205319989",
  appId: "1:936205319989:web:58f7cd0e18935d95ad567c"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
