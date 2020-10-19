<template>
  <div class="single-diary">
    <nav-bar class="menu"></nav-bar>
    <div class="entry block">
      <!-- the date of the entry -->
      <h2 class="block">Date of entry: {{ diary.date }}</h2>
      <article class="diaryContent">
        <!-- content of the diary entry -->
        {{ diary.content | capitalizeFirst }}
      </article>
      <br />
      <ul>
        <!-- for each of the categorys render them with a tick -->
        <li v-for="category in diary.categories" v-bind:key="category.id">
          {{ category }} ✔️
        </li>
      </ul>
      <br /><br />
      <!-- emotional rating slider value  -->
      <h3>Day Rating: {{ diary.slider }}/100</h3>
      <!-- mood from dropdown value -->
      <h3>Day Mood: {{ diary.mood }}</h3>
    </div>
  </div>
</template>

///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////

<script>
export default {
  data() {
    return {
      // getting its own ID then using it t connect to api below
      id: this.$route.params.id,
      // where entry content will be stored
      diary: {},
    };
  },
  created() {
    var _this = this;
    // fetch api end point is to do with its own ID that is added from before
    var endpoint =
      "https://onlinediarycli.firebaseio.com/posts/" + this.id + ".json";
    fetch(endpoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // if manages to connect properly then set the data = our local diary data we made space for earlier
        _this.diary = data;
      });
  },
};
</script>
///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////

<style scoped>
.list {
  text-align: left;
}

.entry {
  grid-area: entry;
  text-align: center;
  font-size: 1em;
}

.diaryContent {
  font-size: 2em;
  font-weight: 80500;
}
article {
  padding: 1em;
}
.menu {
  grid-area: menu;
}
.single-diary {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: 1fr 4.5fr;
  display: grid;

  grid-template-areas: "menu entry";
}

@media screen and (max-width: 900px) {
  .single-diary {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-gap: 10px;
    padding: 10px;
    grid-template-columns: 0.1fr 4.5fr;

    grid-template-areas: "menu entry";
  }
}

@media only screen and (max-width: 675px) {
  /* setting new layout for mobile */
  .single-diary {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-gap: 10px;
    padding: 10px;
    grid-template-columns: 1fr;
    grid-auto-rows: 0.1fr 3fr;

    grid-template-areas:
      "menu"
      "entry";
  }
}
</style>
