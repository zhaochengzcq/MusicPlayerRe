<template>
  <div id="login">
    <header>
      <div>
        <img class="login__qrcode"
             src="../../assets/img/qrcode.png"
             alt="">
      </div>

      <!-- <img class="login__welcome"
           src="../../assets/img/welcome.gif"
           alt=""> -->
      <i class="bi-x font-x"
         @click="close"></i>
    </header>
    <main>
      <div class="login__main">
        <div class="login__account">
          <el-input class="account"
                    placeholder="请输入手机号"
                    type="tel"
                    v-model="tel">
            <el-select v-model="conturyTelCode"
                       slot="prepend"
                       placeholder="请选择">
              <i slot="prefix"
                 class="bi-phone font-phone"></i>
              <el-option v-for="(item,index) in country"
                         :key="index"
                         :value="'+'+item.phone_code">
                <img class="contury-flag"
                     :src="getImg(item.country_code)"
                     alt="">
                <span class="contury-name">{{item.chinese_name}}</span>
                <span class="phone-code">+{{item.phone_code}}</span>
              </el-option>
            </el-select>
          </el-input>
          <el-input class="password"
                    placeholder="请输入密码"
                    type="password"
                    v-model="pw"
                    ref="password">
            <i slot="prefix"
               class="bi-shield-lock"></i>
          </el-input>
        </div>
        <div class="login__remember">
          <el-checkbox class="no-drag"
                       v-model="checked">
            自动登录
          </el-checkbox>
          <span v-show="isErr"
                class="bi-exclamation-circle login_warn">手机号或密码错误</span>
        </div>
        <div class="login_buttons">
          <el-button type="danger"
                     @click="login">登录</el-button>
          <el-button @click="singUp">注册</el-button>
        </div>
      </div>
    </main>

  </div>
</template>
<script>
import country from "../../assets/JS/country";
export default {
  data() {
    return {
      checked: false,
      tel: "",
      pw: "",
      country,
      conturyTelCode: "+86",
      isErr: false,
    };
  },
  computed: {
    getImg() {
      return function (name) {
        if (name && name !== "") {
          return require(`../../assets/img/flags/${name.toLowerCase()}.png`);
        }
      };
    },
  },
  methods: {
    close() {
      window.ipcRenderer.send("loginClose");
    },
    focusPW() {
      this.$refs.password.$el.childNodes[0].setAttribute("class", "focus el-input-group__prepend");
    },
    blurPw() {
      this.$refs.password.$el.childNodes[0].setAttribute("class", "el-input-group__prepend");
    },
    login() {
      this.axios
        .post("/login/cellphone", { phone: this.tel, password: this.pw }, { withCredentials: true })
        .then(res => {
          if (res.data.code === 200) {
            this.isErr = false;
            this.$store.commit("setUserInfo", res.data);
            if (this.checked) {
              window.ipcRenderer.send("setCookie", res.data.cookie);
            } else {
              window.ipcRenderer.send("setCookie", null);
            }
          } else {
            this.isErr = true;
          }
        });
    },
    singUp() {
      window.ipcRenderer.receive("getCookieReply", val => {
        console.log(val);
      });
      window.ipcRenderer.send("getCookie");
    },
  },
  mounted() {
    // this.axios
    //   .post("/login/cellphone", {
    //     phone: "13373182365",
    //     password: "3014159261993",
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });
  },
};
</script>
<style lang="stylus" scoped>
.no-drag
  -webkit-app-region: no-drag

.contury-flag
  width: 16px
  display: inline-block

.contury-name
  padding-left: 10px

.phone-code
  float: right

#login
  -webkit-app-region: drag

  header
    display: flex
    justify-content: space-between
    padding-bottom: 100px

    .login__welcome
      width: 100%
      position: absolute
      top: 0
      z-index: -1
      opacity: 0.6

    .font-x
      font-size: 30px
      color: #666
      -webkit-app-region: no-drag

      &:hover
        color: #000

  main
    display: flex
    justify-content: center

    .login__main
      width: 260px
      -webkit-app-region: no-drag

      .login__account
        .font-phone
          font-size: 18px
          color: #666
          line-height: 40px
          cursor: pointer

        &>>>.el-input__inner
          padding-right: 0
          font-size: 12px

        &>>>.el-input__suffix
          right: 0

        &>>>.el-select .el-input
          width: 85px

        .password
          padding-top: 20px

          &>>>.el-input__prefix
            box-sizing: border-box
            padding-top: 20px
            display: flex
            align-items: center

      .login__remember
        padding: 10px 0

        &>>>.el-checkbox__label
          font-size: 12px

        .login_warn
          user-select: none
          font-size: 12px
          float: right
          color: #dd0000

      .login_buttons
        button
          display: block
          width: 100%

        &>>>.el-button+.el-button
          margin-top: 10px
          margin-left: 0
</style>
