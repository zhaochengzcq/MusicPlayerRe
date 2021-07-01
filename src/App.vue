<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
    <router-view class=""
                 name="Header" />
    <keep-alive>
      <router-view class=""
                   name="Main" />
    </keep-alive>

    <router-view class=""
                 name="Footer" />
  </div>
</template>

<style lang="stylus">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  height: 100%
</style>
