// add diary entry component
<template>

    <div class="diary block" id="diary block">
        <transition name="fade" mode="out-in">
      <!-- setting p all our inputs to be on a form -->
      <form
        id="form"
        key="save"
        v-if="!submitted"
        style="display: block; height: 100%;"
      >
        <!-- diary text input where you write about your day -->
        <textarea
          id="textArea"
          autofocus
          maxlength="250"
          class="diaryInput"
          placeholder="How was your day?"
          contenteditable="false"
          @keyup.enter="submit"
          v-model="diary.content"
          required
        >
        </textarea>
        <!-- How many characters remaining -->
        <p class="characterCount">{{ inputCharacterCount }}/250</p>

        <!-- bottom section of diary block -->
        <div class="bottomDiary">
          <!-- check boxes of things you did that day -->
          <div class="checkboxes">
            <div>
              <!-- meditated chackbox -->
              <label>Meditated </label>
              <input
                class="checkbox"
                type="checkbox"
                value="Meditated"
                v-model="diary.categories"
              />
            </div>
            <div>
              <!-- excercise checkbox -->
              <label>Excercised </label>
              <input
                class="checkbox"
                type="checkbox"
                value="Excercised"
                v-model="diary.categories"
              />
            </div>
            <div>
              <!-- slept enough check box -->
              <label>Slept 8 hours </label>
              <input
                class="checkbox"
                type="checkbox"
                value="Slept well"
                v-model="diary.categories"
              />
            </div>
          </div>
          <!-- Mood drop down select -->
          <div class="moodSelect">
            <label>Todays Mood</label>
            <select v-model="diary.mood">
              <option v-for="mood in moods" v-bind:key="mood.id">{{
                mood
              }}</option>
            </select>
          </div>

          <!-- emotional slider and smilies -->
          <div class="emotionalSlider">
            <i class="fas fa-frown"></i>
            <input
              type="range"
              v-model="diary.slider"
              min="1"
              max="100"
              value="50"
              class="slider"
              id="myRange"
            />
            <i class="fas fa-smile"></i>
          </div>
          <!-- submit button -->
          <button class="submitButton" v-on:click.prevent="post">
            Add Entry
          </button>
        </div>
      </form>
      <!-- displayed after submit -->
      <div v-else key="save2">
        <h1>Thank you</h1>
        <br />
        <h3>Come again back tomorrow 😊</h3>
        <br />
        <button @click="submitted = false">New Entry?</button>
      </div>
        </transition>
    </div>

</template>

///////////////////////////////////////////////////////////////SCRIPT//////////////////////////////////////////////////////////////////

<script>
import mixin from "../mixins/mixin";

export default {
  data() {
    return {
      // this is where we first define the diary object data structure.
      diary: {
        content: "",
        categories: [],
        slider: "",
        date: "",
      },
      moods: [
        "Anxious",
        "Hopeful",
        "Depressed",
        "Excited",
        "Stressed",
        "Happy",
      ],
      submitted: false,
    };
  },
  // computed property that returns how many characters have been typed so far
  computed: {
    inputCharacterCount() {
      return this.diary.content.length;
    },
  },
  methods: {
    // post function to post to firebase
    post: function () {
      var _this = this;
      // packaging our diary entry ready to send
      const data = this.diary;
      // adding timestamp
      this.diary.date = this.addTimeStamp();
      // attempting to post data to firebase
      fetch("https://onlinediarycli.firebaseio.com/posts.json", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        // if successful then reset the form and set state to submitted true
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.submitted = true;
          _this.diary.content = "";
        })
        .catch((error) => {
          // unsucessful
          console.error("Error:", error);
        });
    },
    // function make a timestamp
    addTimeStamp: function () {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
  },
};
</script>
///////////////////////////////////////////////////////////////***STYLES***//////////////////////////////////////////////////////////////////

<style>
.characterCount {
  padding: 0.7em;
}
.checkboxes {
  grid-area: check;
}
.checkbox {
  margin-right: 1em;
}
.moodSelect {
  grid-area: mood;
}
.emotionalSlider {
  grid-area: slider;
}
.submitButton {
  grid-area: submit;
}
.bottomDiary {
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 0.5fr 0.5fr;

  grid-template-areas:
    "check mood"
    "slider submit";
}

label {
  padding-right: 0.2em;
}
button {
  float: right;
  width: 5rem;
  height: 2rem;

  background: purple;
  border: none;
  position: relative;
  bottom: 0px;
  right: 0px;
  border-radius: 4px;
}
button:hover {
  background-color: rgb(95, 10, 95);
}
button:active {
  background-color: darkgoldenrod;
}

.diary {
  grid-area: diary;
  overflow: auto;
}
/* diary input text box */
.diaryInput {
  width: 100%;
  height: 40%;
  resize: none;
  font-size: 1.2rem;
  border: none;
  background: rgba(0, 0, 0, 0);
  border-radius: 15px;
}
.bottomDiary {
  height: 50%;
}
::placeholder {
  color: rgba(245, 245, 245, 0.8);
  padding: 1em;
}
textarea:focus {
  outline: none;
}
/* diary slider */
.slidecontainer {
  width: 100%;
}

.slider {
  width: 40%;
}
/* slider icons */
.fa-frown,
.fa-smile {
  font-size: 20px;
  margin: 10px;
  padding: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
