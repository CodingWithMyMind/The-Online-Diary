<template active-class="main">
  <div class="main block">
    <!-- greets user with username passed in via props -->
    <h1 class="mainTitle">Hello {{ userName }},</h1>
    <h3>The Time is {{ displayTime }} and Todays Date is {{ displayDate }}</h3>
  </div>
</template>

///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////

<script>
// using the get date function from mixins
import mixin from "../mixins/mixin";

export default {
  data() {
    return {};
  },
  props: ["userName"],
  computed: {
    // display current time
    displayTime: function () {
      var n = new Date();
      var string = n.toLocaleTimeString([], { timeStyle: "short" });
      return string;
    },
  },
  // mixin for  date
  mixins: [mixin],
};
</script>
///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////

<style scoped>
.main {
  grid-area: main;
}
/* responsive main title text */
.mainTitle {
  font-size: clamp(30px, 4vw, 80px);
  margin-bottom: 0.6rem;
}
</style>
