import VueRouter from "vue-router";

import Login from "./pages/Login.vue"
import MainRoom from "./pages/MainRoom.vue"
import PrivateList from "./pages/PrivateList.vue"
import PrivateRoom from "./pages/PrivateRoom.vue"
import Profile from "./pages/Profile.vue"
import UserRoom from "./pages/UserRoom.vue"
import UserList from "./pages/UserList.vue"
import CredentialsTest from "./pages/CredentialTest.vue"

export default new VueRouter({
    routes: [
        { path: "/", component: Login },
        { path: "/Main", component: MainRoom },
        { path: "/Privates", component: PrivateList },
        { path: "/Users", component: UserList },
        { path: "/Private/:id", component: PrivateRoom },
        { path: "/User/:id", component: UserRoom },
        { path: "/Profile", component: Profile },
        { path: "/CredTest", component: CredentialsTest },
    ]
})