<template>
  <div id="sidebar"
       ref="sidebar">
    <div class="sidebar__container">
      <el-radio-group v-model="base"
                      fill="#f6f6f7"
                      text-color="#000">
        <div class="sidebar__container--base">
          <el-radio-button label="发现音乐"
                           class="base__font--bold"></el-radio-button>
          <el-radio-button label="视频"></el-radio-button>
          <el-radio-button label="朋友"></el-radio-button>
          <el-radio-button label="直播"></el-radio-button>
          <el-radio-button label="私人FM"></el-radio-button>
        </div>

        <div class="sidebar__container--my-music">
          <span class="my-music__title">我的音乐</span>
          <el-radio-button label="本地音乐"></el-radio-button>
          <el-radio-button label="下载管理"></el-radio-button>
          <el-radio-button label="我的音乐云盘"></el-radio-button>
          <el-radio-button label="我的电台"></el-radio-button>
          <el-radio-button label="我的收藏"></el-radio-button>
        </div>

      </el-radio-group>
    </div>
    <div class="sidebar__resize"
         ref="sidebarResize"
         draggable="false"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      base: "发现音乐",
      tel: "13373182365",
      pw: "3014159261993",
    };
  },
  mounted() {
    // this.axios
    //   .post("/login/cellphone", {
    //     phone: this.tel,
    //     password: this.pw,
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });
  },
};
</script>

<style lang="stylus" scoped>
.el-radio-group
  width: 100%

  .el-radio-button
    display: block
    width: 100%
    padding-bottom: 2px

    &>>>.el-radio-button__inner
      width: 100%
      border: none
      border-radius: 4px
      text-align: left
      font-size: 14px
      color: #333
      padding: 10px 8px

      &:hover
        color: #000
        background-color: #f6f6f7

#sidebar
  position: relative
  display: flow-root
  min-width: 200px
  height: 100%
  background-color: #fff
  flex-shrink: 0

  .sidebar__resize
    position: absolute
    top: 0
    right: 0
    padding-left: 5px
    height: 100%
    border-right: 1px solid #cdcdcd
    cursor: ew-resize

    &:hover
      border-right: 2px solid #007fd4

  .sidebar__container
    box-sizing: border-box
    height: 100%
    padding: 15px 10px
    overflow-y: scroll

    &::-webkit-scrollbar
      width: 0

    &:hover::-webkit-scrollbar
      width: 6px

    &:hover::-webkit-scrollbar-thumb
      border-radius: 6px
      background-color: #c6c6c7

    .sidebar__container--base
      &>>>.el-radio-button__inner
        font-size: 15px

      .base__font--bold
        &>>>.el-radio-button__inner
          font-size: 16px
          font-weight: 900

    .sidebar__container--my-music
      .my-music__title
        display: inline-block
        font-size: 13px
        color: #a6a6a7
        padding: 16px 8px 8px 8px

      &>>>.el-radio-button__inner
        padding: 12px 8px
</style>
