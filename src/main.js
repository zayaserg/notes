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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "notes-2cba6.firebaseapp.com",
  databaseURL: "https://notes-2cba6.firebaseio.com",
  projectId: "notes-2cba6",
  storageBucket: "notes-2cba6.appspot.com",
  messagingSenderId: "936205319989",
  appId: process.env.FIREBASE_APP_ID
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
