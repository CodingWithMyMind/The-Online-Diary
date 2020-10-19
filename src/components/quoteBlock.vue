<template>
  <div class="quote block">
    <h3>Quote of the day</h3>
    <div class="quoteContainer">
        <!-- shows quote -->
      <p class="quoteText">"{{ quote }}"</p>
      <!-- if there is an author then show it else say unknown -->
      <p class="quoteAuthor" v-if="author">{{ author }}</p>
      <p class="quoteAuthor" v-else>Unknown</p>
    </div>
  </div>
</template>

///////////////////////////////////////////////////////////////SCRIPT////////////////////////////////////////////////////////////////// 

<script>
export default {
  data() {
    return {
        // where the quote and author stored
      quote: "Loading Quote",
      author: "",
    };
  },
// when it is created
  created() {
    var _this = this;
    // grab quote of the day
    fetch("https://quotes.rest/qod?language=en")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //   if that works then add the quote and author to the local storage ready to be shown
          if(data.contents){
        _this.quote = data.contents.quotes[0].quote;
        _this.author = data.contents.quotes[0].author;
          }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
</script>
///////////////////////////////////////////////////////////////***STYLES***////////////////////////////////////////////////////////////////// 

<style scoped>
.quote {
  grid-area: quote;
}
.quoteContainer {
  display: block;

  justify-content: center;
  align-items: center;
  max-height: 400px;
}
/* quote styling */
.quoteText {
  font-family: "Courier New", Courier, monospace;
  color: grey;
  text-align: center;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;

  font-size: clamp(12px, 20px, 40px);
}
.quoteAuthor {
  text-align: right;
}

@media only screen and (max-width: 675px) {
.quote{
    overflow-y: auto;
}
}

</style>
