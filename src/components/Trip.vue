<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>{{ isEdit ? 'Edit Trip' : 'Create a New Trip' }}</h2>
                <form @submit.prevent="saveTrip">
                    <div class="mb-3">
                        <label for="tripName" class="form-label">Trip Name</label>
                        <input type="text" class="form-control" id="tripName" v-model="trip.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="departureDate" class="form-label">Departure Date</label>
                        <input type="date" class="form-control" id="departureDate" v-model="trip.departureDate"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="returnDate" class="form-label">Return Date</label>
                        <input type="date" class="form-control" id="returnDate" v-model="trip.returnDate" required>
                    </div>
                    <div class="mb-3">
                        <label for="departureCity" class="form-label">Departure City</label>
                        <input type="text" class="form-control" id="departureCity" v-model="trip.departureCity"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="arrivalCity" class="form-label">Arrival City</label>
                        <input type="text" class="form-control" id="arrivalCity" v-model="trip.arrivalCity" required>
                    </div>
                    <div class="mb-3">
                        <label for="numberOfPeople" class="form-label">Number of People</label>
                        <input type="number" class="form-control" id="numberOfPeople" v-model="trip.numberOfPeople"
                            required>
                    </div>
                    <button type="submit" class="btn btn-primary">{{ isEdit ? 'Save changes' : 'Save trip' }}</button>
                    <button type="button" class="btn btn-secondary" @click="searchFlights">Wyszukaj</button>
                </form>
            </div>
        </div>
        <div class="row" v-if="flights.length">
            <div class="col-12">
                <h3>Wyniki wyszukiwania:</h3>
                <div class="card mb-3" v-for="(flight, index) in flights" :key="index">
                    <img :src="flight.imageUrl" class="card-img-top" alt="Flight Image" v-if="flight.imageUrl">
                    <div class="card-body">
                        <h5 class="card-title">{{ flight.title }}</h5>
                        <p class="card-text">Departure: {{ flight.departureDate }}</p>
                        <p class="card-text">Arrival: {{ flight.arrivalDate }}</p>
                        <p class="card-text">From: {{ flight.departureCity }}</p>
                        <p class="card-text">To: {{ flight.arrivalCity }}</p>
                        <p class="card-text">Adults: {{ flight.numberOfPeople }}</p>
                        <p class="card-text">Price: {{ flight.price }}</p>
                        <p class="card-text">Carrier: {{ flight.carrier }}</p>
                        <button class="btn btn-primary" @click="bookFlight(flight)">Book Now</button>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter();
    const route = useRoute();

    const isEdit = ref(route.query.edit === 'true');
    const trip = ref({
        name: '',
        departureDate: '',
        returnDate: '',
        departureCity: '',
        arrivalCity: '',
        numberOfPeople: 1
    });
    const flights = ref([]);

    onMounted(() => {
        if (isEdit.value) {
            const savedTrip = JSON.parse(localStorage.getItem('tripToEdit'));
            if (savedTrip) {
                trip.value = savedTrip;
            }
        }
    });

    const saveTrip = () => {
        let trips = JSON.parse(localStorage.getItem('trips')) || [];
        if (isEdit.value) {
            const index = trips.findIndex(t => t.name === trip.value.name);
            if (index !== -1) {
                trips[index] = trip.value;
            }
        } else {
            trips.push(trip.value);
        }
        localStorage.setItem('trips', JSON.stringify(trips));
        router.push('/');
    };

    const searchFlights = async () => {
        const options = {
            method: 'GET',
            url: 'https://sky-scanner3.p.rapidapi.com/flights/search-everywhere',
            params: {
                fromEntityId: trip.value.departureCity,
                toEntityId: trip.value.arrivalCity,
                type: 'roundtrip',
                year: trip.value.departureDate.split('-')[0],
                month: trip.value.departureDate.split('-')[1],
                adults: trip.value.numberOfPeople
            },
            headers: {
                'x-rapidapi-key': 'c2339d4674mshe91f0999b2c5458p1f5012jsn820d3f9aa91b',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);  // Logowanie odpowiedzi do konsoli

            // Sprawdzenie struktury odpowiedzi i przypisanie wyników do flights
            flights.value = response.data.data.everywhereDestination.results.map(result => ({
                title: result.location?.name || 'No Title',
                price: result.flightQuotes?.cheapest?.price || 'No Price',
                carrier: result.flightQuotes?.cheapest?.carrier || 'No Carrier',
                departureDate: trip.value.departureDate,
                arrivalDate: trip.value.returnDate,
                departureCity: trip.value.departureCity,
                arrivalCity: trip.value.arrivalCity,
                numberOfPeople: trip.value.numberOfPeople,
                imageUrl: result.image?.url || ''
            }));
        } catch (error) {
            console.error(error);
        }
    };





    const bookFlight = (flight) => {
        window.open('https://www.skyscanner.com', '_blank');
    };
</script>
