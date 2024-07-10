<template>
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
                            <div class="col-12 text-logo">
                                <span>Let's go somewhere!</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="trips.length === 0">
                    <div class="col-8 offset-2">
                        <button class="button" @click="createTrip">Create trip</button>
                    </div>
                </div>
                <div v-else>
                    <div class="row" v-for="(trip, index) in trips" :key="index">
                        <div class="col-12">
                            <h3>Trip Details:</h3>
                            <p><strong>Trip Name:</strong> {{ trip.name }}</p>
                            <p><strong>Departure Date:</strong> {{ trip.departureDate }}</p>
                            <p><strong>Return Date:</strong> {{ trip.returnDate }}</p>
                            <p><strong>Departure City:</strong> {{ trip.departureCity }}</p>
                            <p><strong>Arrival City:</strong> {{ trip.arrivalCity }}</p>
                            <p><strong>Number of People:</strong> {{ trip.numberOfPeople }}</p>
                            <p><strong>Notes:</strong> {{ trip.notes ? 'Yes' : 'No' }}</p>
                            <button class="button" @click="editTrip(index)">Edit trip</button>
                            <button class="button btn-danger" @click="confirmDeleteTrip(index)">Delete trip</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8 offset-2">
                            <button class="button" @click="createTrip">Create trip</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import heroImage from "@/assets/hero-img.jpg";
    import { useAuthStore } from "../stores/auth";
    import { useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';

    const authStore = useAuthStore();
    const router = useRouter();
    const trips = ref(JSON.parse(localStorage.getItem('trips')) || []);

    const createTrip = () => {
        router.push('/trip');
    };

    const editTrip = (index) => {
        localStorage.setItem('tripToEdit', JSON.stringify(trips.value[index]));
        router.push({ path: '/trip', query: { edit: true } });
    };

    const confirmDeleteTrip = (index) => {
        if (confirm("Are you sure you want to delete this trip?")) {
            deleteTrip(index);
        }
    };

    const deleteTrip = (index) => {
        trips.value.splice(index, 1);
        localStorage.setItem('trips', JSON.stringify(trips.value));
    };

    onMounted(async () => {
        await authStore.getUser();
    });
</script>

<style>
    #app {
        padding-top: 20px;
    }

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