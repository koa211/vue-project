import { defineStore } from 'pinia'

export const usePiniaStore = defineStore({
    id: 'session', 
    state: () => ({ //storing reactive date
        session: false
    }),
    actions: {
        async checkLogIn(username, password) {
            const res = await fetch("http://localhost:8082/api/books/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const flag = await res.json();
            console.log(flag)
            this.session = flag;
        },
        signOut() {
            this.session = false
        }
    }
})