// All entries page/component

<template>
  <keep-alive>
    <div class="all-entries">
      <!-- search bar -->
      <nav-bar class="menu"></nav-bar>
      <div class="entries">
        <div class="block">
          <h1 class="mainTitle">All Diary Entries</h1>
          <!-- search box binded to search proeperty -->
          <input
            class="searchInput"
            type="text"
            v-model="search"
            placeholder="  Search for an Entry"
          />
          <!-- search icon -->
          <i class="fas fa-search"></i>
          <!-- edge case for data example -->
          {{ this.$root.myEdgeData }}
        </div>

        <!-- where results/all will be shown -->
        <div class="results">
          <!-- v-for to iterate through the filtered diarys, if no search inpput then it shows all entrys -->
          <div
            v-for="diary in filteredDiarys"
            v-bind:key="diary.id"
            class="single-diary"
          >
            <!-- diarys made with the links to the single page view added -->
            <router-link v-bind:to="'/diary/' + diary.id">
              <article class="block" v-bg-color>
                <!-- entry date -->
                <h2>{{ diary.date }}</h2>
                <br />
                <!-- showing only a bit of the entry content -->
                <h3>{{ diary.content | snippet(100) | capitalizeFirst }}</h3>
              </article>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////

<script>
import mixin from "../mixins/mixin";

export default {
  data() {
    return {
      // where diarys are stored once retrieved from firebase
      diarys: [],
      // swhere search term is stored
      search: "",
    };
  },
  created() {
    // fetching diarys from firebase
    var _this = this;
    fetch("https://onlinediarycli.firebaseio.com/posts.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // temporay array
        var diarysArray = [];
        for (let key in data) {
          // setting unique id for each post
          data[key].id = key;
          // adding entry to front of array
          diarysArray.unshift(data[key]);
        }
        // adding diary objects retrived to local storage
        _this.diarys = diarysArray;
      });
  },
  // for filtered diarys to be shown
  mixins: [mixin],
};
</script>
///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////
<style>
.fa-search {
  padding: 1em;
}
.searchInput {
  width: auto;
  height: 60%;
  resize: none;
  font-size: 1.2rem;
  border: none;
  background: rgba(255, 255, 255, 0.171);
  padding: 0.2em;
  border-radius: 15px;
  color: rgba(20, 20, 20, 0.8);
}
.searchInput ::placeholder {
  color: rgb(20, 20, 20);
}

.single-diary {
  padding-top: 0.5em;
}

.entries {
  overflow: auto;
  grid-area: entries;
  height: 100%;
}
.menu {
  grid-area: menu;
}

.all-entries {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: 250px 4.5fr;

  grid-template-areas: "menu entries";
}
.mainTitle {
  font-size: clamp(30px, 4vw, 80px);
  margin-bottom: 0.6rem;
}
/* styling for mobile */
@media screen and (max-width: 900px) {
  .all-entries {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-gap: 10px;
    padding: 10px;
    grid-template-columns: 0.1fr 4.5fr;

    grid-template-areas: "menu entries";
  }
}

@media only screen and (max-width: 675px) {
  /* setting new layout for mobile */
  .all-entries {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-gap: 10px;
    padding: 10px;
    grid-template-columns: 1fr;
    grid-auto-rows: 0.1fr 3fr;

    grid-template-areas:
      "menu"
      "entries";
  }
}
</style>
