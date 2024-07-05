<template>
    <div>
        <main>

            <form @submit.prevent="authStore.onLogin(form)">
                <div class="form-box">
                    <!-- <label for="email">Email:</label> -->
                    <input placeholder="Email" v-model="form.email" type="email">
                </div>

                <div class="form-box">
                    <!-- <label for="password">Password:</label> -->
                    <input placeholder="Password" v-model="form.password" type="password">
                </div>

                <div>
                    <button type="submit" class="button submit">Login</button>
                </div>
            </form>
            <div class="user-already">
                <p>Forget password?</p>


                <button>
                    <router-link to="/register">Not a member yet? Sign up.</router-link>
                </button>

            </div>
        </main>
    </div>
</template>





<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";
    import { useAuthStore } from "../stores/auth";
    import { useRouter } from 'vue-router'
    axios.defaults.withCredentials = true;

    const authStore = useAuthStore();
    const router = useRouter();

    const form = ref({
        email: null,
        password: null
    })

    const user = ref();

    // Pierwszy działający kod crdruc
    // async function onLogin() {
    //     await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    //     await axios.post("/api/login", {
    //         email: form.value.email,
    //         password: form.value.password,
    //     });

    //     let { data } = await axios.get("http://localhost:8000/api/user");
    //     user.value = data;
    //     router.push('/');
    // }
</script>

<style>
    .form-box input {
        width: 40%;
        margin-top: 5px;
    }

    .submit {
        margin: 20px 0 20px 0;
        width: 20%;
    }
</style>