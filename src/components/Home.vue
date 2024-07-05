<template>
    <div>
        <div v-if="!authStore.user">
            <section class="hero-section">
                <div class="container">
                    <div class="row">
                        <div class="col-5 hero-info">
                            <div class="row">
                                <div class="col-12 text-logo"><span>tripstep</span></div>
                            </div>
                        </div>
                        <div class="col-7">
                            <img id="hero-img" :src="heroImage" alt="" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8 offset-2">
                            <button class="button" type="submit">Start now</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div v-else>
            <section class="hero-section">
                <div class="container">
                    <div class="row">
                        <div class="col-12 hero-info">
                            <div class="row">
                                <div class="col-12 text-logo"><span>Let's go somewhere!</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8 offset-2">
                            <button class="button" type="submit">Create trip</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
    import heroImage from "@/assets/hero-img.jpg"
    import { useAuthStore } from "../stores/auth";
    import { onMounted } from 'vue';

    const authStore = useAuthStore();

    onMounted(async () => {
        await authStore.getUser();
    });








    // import { ref, onMounted } from 'vue';
    // import axios from 'axios';

    // axios.defaults.withCredentials = true;

    // const user = ref();
    // onMounted(async () => {
    //     await getToken();
    //     const data = await axios.get("http://localhost:8000/api/user");
    //     user.value = data;
    //     console.log(data);
    // })

    // const getToken = async () => {
    //     await axios.get("/sanctum/csrf-cookie");
    // }
</script>

<style>
    .hero-section {
        height: 97vh;
    }

    .hero-section .row {
        margin: 10vh 0 10vh;
    }


    .hero-info {
        display: flex;
        flex-direction: column;
        justify-content: center;


    }

    .hero-text {
        font-weight: 700;
        font-size: 2.5rem;
    }


    #hero-img {
        width: 400px;
        height: auto;
        border-radius: 66% 34% 74% 26% / 30% 55% 45% 70%;
        border: 4px solid black;
    }

    button {
        background-color: var(--banner);
    }


    .text-logo span {
        color: var(--orange);
        font-size: 4rem;
        font-weight: 900;
    }


</style>