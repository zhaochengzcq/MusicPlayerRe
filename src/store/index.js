import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    base: ["发现音乐", "视频", "朋友", "直播", "私人FM"],
    myMusic: ["本地音乐", "下载管理", "我的音乐云盘", "我的电台", "我的收藏"],
    cookie: null,
    profile: null,
    account: null,
    token: null,
  },
  mutations: {
    setCookie(state, cookie) {
      state.cookie = cookie;
    },
    setProfile(state, profile) {
      state.profile = { ...profile };
    },
    setAccount(state, account) {
      state.account = { ...account };
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserInfo(state, info) {
      if (info) {
        state.cookie = info.cookie;
        state.profile = { ...info.profile };
        state.account = { ...info.account };
        state.token = info.token;
      }
    },
  },
  actions: {},
  modules: {},
});
