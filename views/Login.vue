<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePiniaStore } from '@/stores/session';

const store = usePiniaStore()
console.log(store.session)

const router = useRouter()

const username = ref('')
const password = ref('')

</script>

<template>
    <h1 class="column-header">LOGIN PAGE</h1>
    <input type="text" class="register-input" v-model.trim="username" placeholder="Enter Name">
    <input type="password" class="register-input" v-model.trim="password" placeholder="Enter Password">
    <button class="register-button" @click="store.checkLogIn(username, password)">(Login)</button>
</template>

<style> 
.column-header {
    text-align: center;
}
.register-input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue
}
.register-button {
    width: 150px;
    height: 40px;
    border: 1px solid skyblue;
    display: block;
    padding-left: 20px;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
}
</style>