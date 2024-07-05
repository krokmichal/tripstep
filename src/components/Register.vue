<template>
    <div>
        Register HERE!
        <form action="" @submit.prevent="authStore.handleRegister(form)">
            <div class="form-box">
                <!-- <label>first name</label> -->
                <input placeholder="name" type="text" v-model="form.name" />
            </div>

            <div class="form-box">
                <!-- <label>email</label> -->
                <input placeholder="email" type="email" v-model="form.email" />
            </div>
            <div class="form-box">
                <!-- <label placeholder="password">password</label> -->
                <input placeholder="password" type="password" v-model="form.password" />
            </div>
            <div class="form-box">
                <!-- <label placeholder="confirm password">confirm password</label> -->
                <input placeholder="confirm password" type="password" v-model="form.password_confirmation" />
            </div>
            <button type="submit" class="button">REGISTER</button>
        </form>
        <div class="user-already">
            <p>Already have an account?</p>
            <p>
                Log in
                <button>
                    <router-link to="/login">here</router-link>
                </button>
            </p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../stores/auth';

    const authStore = useAuthStore();

    const form = ref({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
</script>

<style>
    .form-box input {
        margin-left: 20px;
    }
</style>
