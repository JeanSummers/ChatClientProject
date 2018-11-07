import VueRouter from "vue-router";
import Home from "./pages/Home.vue";
import Timer from "./pages/Timer.vue";
import Button from "./pages/Button.vue";


export default new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/counter", component: Button },
        { path: "/timer", component: Timer }
    ]
})