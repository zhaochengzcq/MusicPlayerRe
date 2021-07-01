<template>
  <div id="header">
    <div id="toolbar">
      <div class="toolbar__logo">
        云音乐网易
      </div>
      <div class="toolbar--bundle">
        <div class="toolbar__search">
          <i class="bi-chevron-left"></i>
          <i class="bi-chevron-right"></i>
          <el-input placeholder="搜索"
                    class="no-drag">
            <i slot="prefix"
               class="bi-search"></i>
          </el-input>
        </div>
        <div class="toolbar__control">
          <div class="login"
               @click="login">
            <i class="bi-person noProfilePic"
               v-if="!avatarUrl">

            </i>
            <i class="profilePic"
               v-if="avatarUrl">
              <img :src="avatarUrl"
                   alt="profilePic">
            </i>
            <!-- <i class="no-drag profilePic"></i> -->
            <span class="user-name">{{nickname}}</span>
          </div>
          <i class="bi-gear font-gear no-drag"></i>
          <i class="bi-envelope font-envelope no-drag"></i>
          <span class="font-divide">|</span>
          <i class="bi-box-arrow-in-up-right font-mini-widow no-drag"></i>
          <i class="font-mini no-drag"
             @click="minimize">—</i>
          <i class="bi-square font-square no-drag"
             @click="maximize"
             v-show="!isMaximized"></i>
          <i class="bi-files font-square no-drag"
             @click="restore"
             v-show="isMaximized"></i>
          <i class="bi-x font-x no-drag"
             @click="close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMaximized: false,
      nickname: this.$store.state.profile?.nickname ?? "未登录",
      avatarUrl: this.$store.state.profile?.avatarUrl ?? null,
    };
  },
  created() {},
  mounted() {
    this.axios
      .post(
        "/user/detail",
        {
          uid: this.$store.state.account.id,
          cookie: this.$store.state.cookie,
        },
        { retry: 5, retryDelay: 1000 },
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    close() {
      window.ipcRenderer.sendSync("close");
    },
    minimize() {
      window.ipcRenderer.sendSync("minimize");
    },
    maximize() {
      this.isMaximized = window.ipcRenderer.sendSync("maximize");
    },
    restore() {
      this.isMaximized = window.ipcRenderer.sendSync("unmaximize");
    },
    login() {
      window.ipcRenderer.send("login");
    },
  },
};
</script>

<style lang="stylus" scoped>
.no-drag
  display: inline-block
  -webkit-app-region: no-drag

#header
  box-sizing: border-box
  width: 100%
  height: 60px
  padding: 2px
  background: #5DADE2
  position: fixed
  top: 0

  #toolbar
    width: 100%
    height: 100%
    -webkit-app-region: drag
    display: flex

    .toolbar__logo
      width: 198px
      height: 100%
      flex-shrink: 0

    .toolbar--bundle
      width: 100%
      display: flex
      justify-content: space-between

      .toolbar__search
        display: flex
        color: #fff

      .toolbar__control
        display: flex
        padding-right: 20px
        color: #fff
        align-items: center

        .login
          display: flex
          align-items: center
          -webkit-app-region: no-drag

          .noProfilePic
            display: inline-block
            width: 28px
            height: 28px
            margin-right: 6px
            border-radius: 14px
            background-color: #eee
            text-align: center
            line-height: 28px
            font-size: 24px

          .profilePic
            display: inline-block
            width: 28px
            height: 28px
            margin-right: 6px
            border-radius: 14px
            overflow: hidden

            img
              width: 100%

          .user-name
            font-size: 12px

        i, span
          cursor: pointer

        .font-x
          padding: 2px 0 0 12px
          font-size: 26px

        .font-square
          padding-left: 25px
          font-size: 14px

        .font-mini
          padding-left: 25px
          font-size: 12px

        .font-mini-widow
          padding: 2px 0 0 12px
          font-size: 16px

        .font-divide
          padding-left: 12px
          font-weight: lighter

        .font-gear, .font-envelope
          font-size: 18px
          padding: 2px 0 0 20px
</style>
