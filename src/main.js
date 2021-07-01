import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import {
  Button,
  Select,
  Input,
  Radio,
  RadioGroup,
  RadioButton,
  Option,
  OptionGroup,
  Checkbox,
} from "element-ui";
Vue.use(VueAxios, axios);
Vue.use(Button)
  .use(Select)
  .use(Input)
  .use(Radio)
  .use(RadioGroup)
  .use(RadioButton)
  .use(Option)
  .use(OptionGroup)
  .use(Checkbox);
Vue.config.productionTip = false;
axios.defaults.baseURL = "https://zcq-music-api.vercel.app";
/**
 * axios 拦截器，拦截超时错误并重新发送请求
 * use like this :
 * axios.get("/xxx/xx",{retry:5,retryDelay:1000}).then().catch()
 */

axios.interceptors.response.use(undefined, err => {
  let config = err.config;
  console.log(config);

  // if config does not exit or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);
  // set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;
  // check if we've maxed out the total numbel of tetries
  if (config.__retryCount >= config.retry) {
    return Promise.reject(err);
  }
  //increase the retry count
  config.__retryCount += 1;
  //create new promise to handle exponential backoff
  let backoff = new Promise(resolve => {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });
  return backoff.then(() => {
    return axios(config);
  });
});
// 需要改造vuex中的写入方法
window.remote.getSession(cookie => {
  store.commit("setCookie", cookie);
  axios
    .post("/login/status", { cookie: cookie }, { retry: 3, retryDelay: 1000 })
    .then(res => {
      let data = res.data.data;
      if (data.code === 200) {
        store.commit("setProfile", data.profile);
        store.commit("setAccount", data.account);
      }
      new Vue({
        router,
        store,
        render: h => h(App),
      }).$mount("#app");
    })
    .catch(err => {
      console.log(err);
    });
});
// new Vue({
//   router,
//   store,
//   render: h => h(App),
// }).$mount("#app");
