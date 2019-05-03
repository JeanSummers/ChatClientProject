<template>
    <div>
        <h1>Credentials test</h1>
        <div v-if="users.length">Пользователи</div>
        <div v-if="users.length">
            <table>
                <thead>
                    <tr>
                        <th v-for="key in Object.keys(users[0])" :key="key" >{{ key }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="`user-${index}`">
                        <td v-for="value in user" :key="value" >{{ value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="chats.length">Чаты</div>
        <div v-if="chats.length">
            <table> 
                <thead>
                    <tr>
                        <th v-for="key in Object.keys(chats[0])" :key="key" >{{ key }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(chat, index) in chats" :key="`chat-${index}`">
                        <td v-for="value in chat" :key="value" >{{ value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-for="(list, name) in messages" :key="name">
            <div v-if="list.length">{{ name }}</div>
            <table v-if="list.length">
                <thead>
                    <tr>
                        <th v-for="key in Object.keys(list[0])" :key="`list-${key}`" >{{ key }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(msg, index) in list" :key="`msg-${index}`">
                        <td v-for="(value, index) in msg" :key="index" >{{ value }}</td>
                    </tr>
                </tbody>
            </table>    
        </div>
        <input type="text" v-model="username"><input type="text" v-model="password"><br>
        <button @click=login>Войти</button>
        <button @click=logout>Выйти</button><br>
        <button @click=create>Создать пользователя</button>
        <button @click=deleteAll>Удалить всех</button>
        <div>{{ socketStatus }}</div>
        <input type="text" v-model="message" @keypress.enter="sendMessage">
        <input type="number" v-model="chatId" @keypress.enter="sendMessage">
        <button @click=sendMessage>Отослать сообщение</button>
        <div>{{ lastMsg }}</div>
    </div>
</template>

<script>
const wsBackend = 'ws://chat-route-jeansummers-test.a3c1.starter-us-west-1.openshiftapps.com'
const backend = 'https://chat-route-jeansummers-test.a3c1.starter-us-west-1.openshiftapps.com';

import axios from "axios";
axios.defaults.withCredentials = true;

import Vue from 'vue'

export default {
    data: () => ({
        users: [],
        chats: [],
        messages: {},
        username: 'admin',
        password: 'password',
        lastMsg: '',
        sessionId: '',
        socket: null,
        socketStatus: 'Ожидание подключения вебсокета...',
        message: '',
        chatId: 0
    }),
    created: function() {
        this.updateSessionID();
        this.updateUsers();
        this.updateChats();
        this.setupSocket();
    },
    methods: ({
        login: function() {
            axios.get(backend + `/user/login/${this.username}/${this.password}`)
            .then(value => {
                this.lastMsg = value.data;
                this.updateUsers();
                this.updateChats();
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
        updateUsers: async function() {
            let value;
            try {
                value = await axios.get(backend + '/user/get/all');
                if (typeof value.data !== 'string')
                    this.users = value.data
            } catch(e) {
                console.log(e);
            }
        },
        updateChats: async function() {
            let value;
            try {
                value = await axios.get(backend + '/chat/get/all');
                if (typeof value.data !== 'string')
                    this.chats = value.data
            } catch(e) {
                console.log(e);
            }

            for (let chat of this.chats) {
                let list = await axios.get(backend + '/chat/get/messages/' + chat.sid);
                Vue.set(this.messages, chat.name, list.data);
                console.log(this.messages, chat.name, list.data)
            }
            console.log(this.messages);
        },
        setupSocket: function() {
            this.socket = new WebSocket(wsBackend);

            this.socket.onerror = error => console.log("Ошибка " + error.message);
            this.socket.onopen = () => {
                console.log("Соединение установлено. Регистрация сокета...");
                this.registerSocket();
            }

            this.socket.onclose = event => {
                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }
                console.log('Код: ' + event.code + ' причина: ' + event.reason);
                this.socketStatus = 'Соединение разорвано. Сокет ожидает подключения';
                
                if (this.socket.readyState > 2)
                    setTimeout(() => this.setupSocket(), 1000);
            };

            this.socket.onmessage = event => {
                console.log("Получены данные " + event.data);
                if (event.data === 'CONNECTED') {
                    this.socketStatus = 'Сокет подключен. Ожидаем регистрации';
                    return;
                }
                if (event.data === 'REGISTERED') {
                    this.socketStatus = 'Сокет готов к работе';
                    return;
                }

                let data;
                try {
                    data = JSON.parse(event.data);
                    this.lastMsg = event.data;
                    this.updateChats();
                } catch(err) {
                    console.log(err, event.data);
                }
            };
        },
        registerSocket: async function() {
            let res = await axios.get(backend + '/sessionId');
            this.socket.send(JSON.stringify({
                type: 'login',
                sessionId: res.data
            }))
        },
        sendMessage: function() {
            this.socket.send(JSON.stringify({
                type: 'message',
                chatId: this.chatId,
                text: this.message
            }));
            this.message = '';
        }
    })
};
</script>

<style>
table {
    border: solid 1px #DDEEEE;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
}
thead th {
    background-color: #DDEFEF;
    border: solid 1px #DDEEEE;
    color: #336B6B;
    padding: 10px;
    text-align: left;
    text-shadow: 1px 1px 1px #fff;
}
tbody td {
    border: solid 1px #DDEEEE;
    color: #333;
    padding: 10px;
    text-shadow: 1px 1px 1px #fff;
}



input, select {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
    background-color: #4CAF50;
    border: none;
    display: inline-block;
    padding: 8px 16px;
    vertical-align: middle;
    overflow: hidden;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    color: white;
    margin: 2px;
}

div {
    font: normal 15px "Noto Sans", sans-serif;
    margin: 8px;
}
</style>
