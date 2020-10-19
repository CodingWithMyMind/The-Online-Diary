<template>
  <nav class="menu block">
    <!-- menu Title  -->
    <h2 class="menuTitle">The Online Diary</h2>
    <!-- Hamburger menu button which will change the css class state to open or closed) -->
    <a v-on:click="menuOpenState = !menuOpenState" class="icon">
      <i class="fa fa-bars" style="padding: 1em;"></i>
    </a>
    <!-- items in menu nav -->
    <div v-bind:class="{ open: menuOpenState }">
      <!-- router links to the pages on the site -->
      <!-- home -->
      <li><i class="fas fa-home"></i><router-link to="/">Home</router-link></li>
      <!-- all entries -->
      <li>
        <i class="fas fa-book-open"></i
        ><router-link to="/all">All Entries</router-link>
      </li>
      <!-- emotional graph -->
      <li>
        <i class="fas fa-chart-line"></i
        ><router-link to="/graph">Emotional Graph</router-link>
      </li>
    </div>
  </nav>
</template>

///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////

<script>
export default {
  data() {
    return {
      menuOpenState: true,
    };
  },
};
</script>
///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////

<style scoped>
.menu {
  border-radius: 15px 50px 30px 10px;
  grid-area: menu;
  background-color: rgb(153, 50, 204, 0.4);
  padding: 2rem;
}

.menuTitle {
  font-size: 35px;
}
li {
  padding-top: 2rem;
}
i {
  padding-right: 1em;
}
.search {
  border: none;
  width: 8rem;
  height: 1.5rem;
  border-radius: 10px;
}
/* Remove mobile hamburger icon*/
.icon {
  display: none;
}

@media screen and (max-width: 900px) {
  /* setting new layout for tablets */
  /* showing icon on smaller devices */
  .icon {
    display: block;
  }
  /* hide the menu items */
  .open {
    display: none;
  }

  /* let menu take up width */
  .menu {
    display: auto;
    min-width: none;
  }
  .menuTitle {
    display: none;
  }
}
@media only screen and (max-width: 675px) {
  .menuTitle {
    display: block;
  }
}
</style>
