<template>
  <div class="previous block">
    <h3>Previous Entries</h3>
    <div class="previousEntriesContainer">
      <!-- will iterate through all entries in diary and render them -->
      <div v-for="entry in diarys" v-bind:key="entry.id">
        <p class="previousEntry">
          <!-- add router link to each entry -->
          <router-link v-bind:to="'/diary/' + entry.id">
            <!-- display entry date -->
            <h3 class="date">{{ entry.date }}</h3>
            <br />
            <!-- display small snippet of the content -->
            {{ entry.content | snippet(60) | capitalizeFirst }}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////

<script>
export default {
  data() {
    return {
      // array to be filled with data from firebase
      diarys: [],
    };
  },
  created() {
    //   fetching data when created
    var _this = this;
    fetch("https://onlinediarycli.firebaseio.com/posts.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //   if successful then put these entries into diary array
        var diarysArray = [];
        for (let key in data) {
          // setting unique id for each entry
          data[key].id = key;
        //   adding entry to beggining so newest is first
          diarysArray.unshift(data[key]);
        }
        _this.diarys = diarysArray;
      });
  },
};
</script>
///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////

<style>
.previousEntry {
  float: left;
}
.date {
  position: inherit;
  bottom: 0px;
}

.previous {
  grid-area: previous;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 160px;
  scrollbar-color: var(--SecondaryColor) transparent;
  scrollbar-width: thin;
}
/* container for previous entries items */
.previousEntriesContainer {
  display: flex;
}
/* specific previous diary entry */
.previousEntry {
  font-size: 0.8em;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.7rem;
  margin: 0.4rem;
  border-radius: 15px;

  min-width: 150px;
  max-width: 200px;
  flex-basis: auto; /* default value */
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: auto;

  scrollbar-color: var(--SecondaryColor) transparent;
  scrollbar-width: thin;
}
</style>
