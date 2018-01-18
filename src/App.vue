<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--<HelloWorld/>-->
    <a href="admin.html">admin</a>  |
    <a href="test.html">test</a> <br>
    <h3>app page</h3>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',
  data(){
    return {
      msg: 'app page'
    }
  },
  components: {
//    HelloWorld
  }
}
</script>

<style>

</style>
