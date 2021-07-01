<template>
  <div id="main">
    <div class="main__label"
         ref="mainLabel">
      <router-view class="main__sidebar"
                   name="MainSidebar"
                   ref="mainSidebar" />
      <router-view class="main__content"
                   name="MainContent"
                   ref="mainContent" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      containerWidth: null,
      nodeMainLabel: null,
      nodeMainContent: null,
      nodeMainSidebar: null,
      nodeResize: null,
    };
  },
  watch: {
    containerWidth() {
      if (this.nodeMainContent) {
        let that = this;
        let contentWidth = parseFloat(window.getComputedStyle(that.nodeMainContent)["width"]);
        let contentMinWidth = parseFloat(window.getComputedStyle(that.nodeMainContent)["minWidth"]);
        let sidebarMinWidth = parseFloat(window.getComputedStyle(that.nodeMainSidebar)["minWidth"]);
        if (
          this.containerWidth >= contentMinWidth + sidebarMinWidth &&
          contentWidth === contentMinWidth
        ) {
          this.nodeMainSidebar.style.width = this.containerWidth - contentMinWidth + "px";
        }
      }
    },
  },
  created() {},
  mounted() {
    this.nodeMainLabel = this.$refs.mainLabel;
    this.nodeMainSidebar = this.$refs.mainSidebar.$refs.sidebar;
    this.nodeMainContent = this.$refs.mainContent.$refs.content;
    this.nodeResize = this.$refs.mainSidebar.$refs.sidebarResize;
    this.containerWidth = this.nodeMainLabel.offsetWidth;
    this.nodeResize.onmousedown = this.resize;
    // this.nodeMainSidebar.ondragenter = function(event) {
    //   event.preventDefault();
    // };
    // this.nodeMainSidebar.ondragover = function(event) {
    //   event.preventDefault();
    // };
    // this.nodeMainContent.ondragenter = function(event) {
    //   event.preventDefault();
    // };
    // this.nodeMainContent.ondragover = function(event) {
    //   event.preventDefault();
    // };
    let that = this;
    window.onresize = function () {
      that.containerWidth = that.nodeMainLabel.offsetWidth;
    };
  },
  methods: {
    resize(e) {
      //禁止点击事件的冒泡行为，避免无法拖动的现象
      e.preventDefault();
      let that = this;
      // 获取左侧与右侧区域的最小尺寸
      let leftMinSize = parseFloat(window.getComputedStyle(that.nodeMainSidebar)["minWidth"]);
      let rightMinSize = parseFloat(window.getComputedStyle(that.nodeMainContent)["minWidth"]);
      //获取外层容器的宽度
      let containerWidth = this.nodeMainLabel.offsetWidth;
      document.onmousemove = function (e) {
        // 记录鼠标距起始点的距离
        let newX = e.clientX;
        // 当分割线距离viewpoint左或右边距的距离小于左或右侧容器的最小宽度时不做处理
        if (newX < leftMinSize || containerWidth - newX < rightMinSize) {
          return;
        }
        that.nodeMainSidebar.style.width = newX + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
#main
  box-sizing: border-box
  padding: 60px 0 72px 0
  height: 100%
  background-color: orange

  .main__label
    height: 100%
    display: flex
    position: relative
</style>
