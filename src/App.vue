<template>
  <div id="app">
    <!-- where our router components will be shown -->
    <router-view></router-view>
  </div>
</template>

///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////
<script>
export default {
  data() {
    return {};
  },
};
</script>
///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////
<style>
#app {
  background-color: rgb(56, 42, 70);
  overflow-x: hidden;
  overflow-y: hidden;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  list-style: none;
  font-weight: 100;
  
}


/* setting colors for fonts */
body,
button,
textarea,
a,
h1,
h2,
h3,
::placeholder {
  color: white;
}
.block {
  padding: 1rem;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.1);
  transition: all 1s ease;
}
@media screen and (max-height: 800px) {
  #app {
    overflow-y: scroll;
  }
}

@media screen and (max-width: 675px) {
  #app {
    overflow-y: scroll;
  }
}
</style>
