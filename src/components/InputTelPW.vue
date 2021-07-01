/* eslint-disable */
<template>
  <div class="login__account">
    <el-input class="account"
              placeholder="请输入手机号"
              type="tel"
              v-model="tel">
      <el-select v-model="conturyTel"
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
</template>
<script>
import country from "../assets/JS/country";
export default {
  name: "input-tel-pw",
  props: {},
  data() {
    return {
      tel: "",
      pw: "",
      country,
      conturyTel: "+86",
    };
  },
  computed: {
    getImg() {
      return function (name) {
        if (name && name !== "") {
          return require(`../assets/img/flags/${name.toLowerCase()}.png`);
        }
      };
    },
  },
  mounted() {},
  methods: {
    focusPW() {
      this.$refs.password.$el.childNodes[0].setAttribute("class", "focus el-input-group__prepend");
    },
    blurPw() {
      this.$refs.password.$el.childNodes[0].setAttribute("class", "el-input-group__prepend");
    },
  },
};
</script>
<style lang="stylus" scoped>
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

.contury-flag
  width: 16px
  display: inline-block

.contury-name
  padding-left: 10px

.phone-code
  float: right
</style>