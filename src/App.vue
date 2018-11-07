<template>
    <div class='center-content'>
        <div v-if="$route.path !== '/'" >
            <router-link to="/Main">Общий чат</router-link>|
            <router-link to="/Users">Пользователи</router-link>|
            <router-link to="/Privates">Приватные чаты</router-link>|
            <router-link to="/Profile">Мой профиль</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import "./css/common.css";
export default {};
</script>