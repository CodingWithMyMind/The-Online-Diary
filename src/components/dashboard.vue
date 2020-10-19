// dashboard component where other components are rendered

<template>
  <div class="dash">

    <!-- here our nested components that we have registered locally are all being rendered -->

    <!-- navigation menu -->
    <nav-bar class="menu"></nav-bar>
    <!-- passing in name via props -->
    <welcome-block class="main" v-bind:userName="userName"></welcome-block>
    <!-- where a quote is shown -->
    <quote-block class=""></quote-block>
    <!-- where we add our own diary entry -->
    <diary-block></diary-block>
    <!-- for the weather -->
    <weather-block></weather-block>
    <!-- shows previous entries -->
    <previous-block></previous-block>
  </div>
</template>
///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////
<script>

// importing components and registering them locally
import diaryBlock from "./diaryBlock.vue";
import weatherBlock from "./weatherBlock.vue";
import welcomeBlock from "./welcomeBlock.vue";
import quoteBlock from "./quoteBlock.vue";
import previousBlock from "./previousBlock.vue";

export default {
  props: ["userName"],
  // components used in this component
  components: {
    "previous-block": previousBlock,
    "diary-block": diaryBlock,
    "weather-block": weatherBlock,
    "welcome-block": welcomeBlock,
    "quote-block": quoteBlock,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////

<style>
.dash {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: 250px 3fr 1.5fr;
  grid-template-rows: 1fr 1fr 2fr 1.3fr;

  grid-template-areas:
    "menu main weather "
    "menu diary weather "
    "menu diary quote"
    "menu previous previous";
}

@media screen and (max-width: 900px) {
  /* setting new layout for tablets */
  .dash {
    grid-template-columns: 0.1fr 2fr 1fr;
    grid-template-rows: 1fr 1fr 2fr 1.3fr;
    grid-template-areas:
      "menu main weather"
      "menu diary weather"
      "menu diary quote"
      "menu previous previous";
  }
}

@media only screen and (max-width: 675px) {
  /* setting new layout for mobile */
  .dash {
    grid-template-areas:
      "menu menu"
      "main main"
      "weather quote"
      "diary diary"
      "previous previous";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.1fr 0.5fr 200px 400px 170px;
  }

  /* smaller padding for blocks */
  .block {
    padding: 1em;
  }
  /* hamburger menu positioning */
  .icon {
    margin-top: 20px;
  }

  .fa-bars {
    float: right;
    height: 1em;
    color: white;
  }

  /* setting the title to take up less room on mobile */
  .menuTitle {
    margin: 0em;
    text-align: left;
    font-size: 25px;
    display: block;
  }
  /* allign menu items */
  li {
    text-align: center;
  }
  /* nav bar styling for mobile /////////////////////////// */
  .menu {
    position: relative;
    border-radius: 15px 10px 25px 10px;
    padding: 1em;
  }
  /* menulink */
  .menu a {
    color: white;
    padding: 1px 1px;

    font-size: 1.3rem;
  }
  .menu a.icon {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }
  .menu a:hover {
    background-color: rgba(7, 1, 1, 0.1);
    border-radius: 35px;
  }
}
</style>
