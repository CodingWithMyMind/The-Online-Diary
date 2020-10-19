import Vue from 'vue'
import App from './App.vue'

// importing components so can be used for router
import VueRouter from 'vue-router'
import allEntries from './components/allEntries.vue'
import singleEntry from './components/singleEntry.vue'
import dashboard from './components/dashboard.vue'
import navBar from './components/navBar.vue'
import graph from './components/graphPage.vue'

// globally declaring nav bar as used alot
Vue.component('nav-bar', navBar)

// my routes for components
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: dashboard,
        props: {
            userName: 'Ben'
        }
    }, {
        path: '/all',
        component: allEntries
    }, {
        path: '/diary/:id',
        component: singleEntry
    }, {
        path: '/graph',
        component: graph
    }
]
const router = new VueRouter({routes, mode: 'history'})
export default router


// My Directives for changing background color
Vue.directive('bg-color', {
    bind(el) {
        el.style.backgroundColor = "rgba(0, 0, 0, " + Math.random() / 8;
        +")";
    }
});


// My Filters
// filter to show only part of content
Vue.filter('snippet', function (value, end) {
    return value.slice(0, end) + '...';
});

// filter to make first letter capitilised for nicer viewing
Vue.filter('capitalizeFirst', function (input) {
    if (! input) 
        // if no text then return
        return ''
    input = input.toString()
    // if there is text make first letter capital
    return input.charAt(0).toUpperCase() + input.slice(1)
});


new Vue({
    render: h => h(App),
  data() {
      // edge data shown in all entries
        return {myEdgeData: "Hope youre having a great day!"}
    },
    router: router
}).$mount('#app')
