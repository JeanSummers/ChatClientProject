<template>
    <div>
        <h1>Credentials test</h1>
        <div>
            <table>
                <tr v-if="users.length">
                    <th>№</th>
                    <th>Имя</th>
                    <th>Админ</th>
                </tr>
                <tr v-for="user in users" :key="user.a">
                    <td>{{ user.sid }}</td>
                    <td>{{ user.nickname }}</td>
                    <td>{{ user.admin ? 'Да' : 'Нет' }}</td>
                </tr>
            </table>
        </div>
        <input type="text" v-model="username"><input type="text" v-model="password"><br>
        <button @click=login>Login</button>
        <button @click=logout>Logout</button><br>
        <button @click=create>Create</button>
        <button @click=deleteAll>DeleteAll</button>
        <div>{{ lastMsg }}</div>
    </div>
</template>

<script>
const backend = 'http://localhost:8999';

import axios from "axios";
axios.defaults.withCredentials = true;

export default {
    data: () => ({
        users: [],
        username: 'admin',
        password: 'password',
        lastMsg: '',
        sessionId: ''
    }),
    created: function() {
        this.updateSessionID();
        this.updateUsers();
    },
    methods: ({
        login: function() {
            axios.get(backend + `/user/login/${this.username}/${this.password}`)
            .then(value => {
                this.lastMsg = value.data;
                this.updateUsers();
            })
            .catch(err => {
                console.log(err);
            })
        },
        logout: function() {
            axios.get(backend + `/user/logout`)
            .then(() => this.updateUsers());
        },
        create: function() {
            axios.get(backend + `/user/create/${this.username}/${this.password}`)
            .then(value => {
                this.lastMsg = value.data;
                this.updateUsers()
            });
        },
        deleteAll: function() {
            axios.get(backend + `/user/delete/all`)
            .then(value => {
                this.lastMsg = value.data;
                this.updateUsers()
            });
        },
        updateSessionID: function() {
            axios.get(backend + '/sessionId')
            .then(value => this.sessionId = value.data)
        },
        updateUsers: function() {
            axios.get(backend + '/user/get/all')
                .then(value => {
                    let result;
                    try {
                        if (typeof value.data !== 'string')
                            this.users = value.data
                    } catch(e) {
                        console.log(e);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })
};
</script>
