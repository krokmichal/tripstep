<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>{{ isEdit ? 'Edit Trip' : 'Create a New Trip' }}</h2>
                <form @submit.prevent="saveTrip">
                    <div class="mb-3">
                        <label for="tripName" class="form-label">Trip Name</label>
                        <input type="text" class="form-control" id="tripName" v-model="trip.name" required />
                    </div>
                    <div class="mb-3">
                        <label for="departureDate" class="form-label">Departure Date</label>
                        <input type="date" class="form-control" id="departureDate" v-model="trip.departureDate"
                            required />
                    </div>
                    <div class="mb-3">
                        <label for="returnDate" class="form-label">Return Date</label>
                        <input type="date" class="form-control" id="returnDate" v-model="trip.returnDate" required />
                    </div>
                    <div class="mb-3">
                        <label for="departureCity" class="form-label">Departure City</label>
                        <input type="text" class="form-control" id="departureCity" v-model="trip.departureCity"
                            required />
                    </div>
                    <div class="mb-3">
                        <label for="arrivalCity" class="form-label">Arrival City</label>
                        <input type="text" class="form-control" id="arrivalCity" v-model="trip.arrivalCity" required />
                    </div>
                    <div class="mb-3">
                        <label for="numberOfPeople" class="form-label">Number of People</label>
                        <input type="number" class="form-control" id="numberOfPeople" v-model="trip.numberOfPeople"
                            required />
                    </div>
                    <div class="mb-3">
                        <label for="notes" class="form-label">Notes</label>
                        <textarea class="form-control" id="notes" v-model="trip.notes" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">{{ isEdit ? 'Save changes' : 'Save trip' }}</button>
                    <button type="button" class="btn btn-secondary" @click="searchFlights">Wyszukaj</button>
                </form>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-12">
                <h3>Budget</h3>
                <p><strong>Total Spent:</strong> {{ totalSpent.toFixed(2) }}$</p>
                <div class="progress mb-3">
                    <div class="progress-bar bg-success" role="progressbar" :style="{ width: budgetPercentage + '%' }">
                        {{ budgetPercentage.toFixed(0) }}%
                    </div>
                </div>
                <p v-if="trip.budget !== null && !isNaN(trip.budget)">
                    <strong>Budget:</strong> {{ trip.budget.toFixed(2) }}$
                </p>
                <button class="btn btn-success" @click="showAddExpense = true">+ Add expense</button>
                <button class="btn btn-info" @click="showSetBudget = true">Set budget</button>

                <div v-if="showAddExpense || showEditExpense" class="modal" tabindex="-1" role="dialog"
                    style="display: block;">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">{{ showEditExpense ? 'Edit Expense' : 'Add Expense' }}</h5>
                                <button type="button" class="close" @click="cancelExpense">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="expenseAmount">Amount ($)</label>
                                    <input type="number" class="form-control" id="expenseAmount"
                                        v-model="newExpense.amount" required>
                                </div>
                                <div class="form-group">
                                    <label for="expenseCategory">Category</label>
                                    <div class="row">
                                        <div v-for="category in expenseCategories" :key="category"
                                            class="col-4 expense-category"
                                            :class="{ 'selected': newExpense.category === category }"
                                            @click="selectCategory(category)">
                                            {{ category }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="cancelExpense">Cancel</button>
                                <button type="button" class="btn btn-primary"
                                    @click="showEditExpense ? saveEditedExpense() : addExpense()">
                                    {{ showEditExpense ? 'Save Changes' : 'Done' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="showSetBudget" class="modal" tabindex="-1" role="dialog" style="display: block;">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Set Budget</h5>
                                <button type="button" class="close" @click="cancelSetBudget">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="budgetAmount">Budget Amount ($)</label>
                                    <input type="number" class="form-control" id="budgetAmount" v-model="newBudget"
                                        required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="cancelSetBudget">Cancel</button>
                                <button type="button" class="btn btn-primary" @click="saveBudget">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <ul class="list-group mt-3">
                    <li class="list-group-item d-flex justify-content-between align-items-center"
                        v-for="(expense, index) in trip.expenses" :key="expense.id">
                        <div>
                            {{ expense.category }}: {{ expense.amount.toFixed(2) }}$
                        </div>
                        <div>
                            <button class="btn btn-info btn-sm" @click="editExpense(index)">Edit</button>
                            <button class="btn btn-danger btn-sm ml-2" @click="deleteExpense(index)">Delete</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="row" v-if="flights.length">
            <div class="col-12">
                <h3>Wyniki wyszukiwania:</h3>
                <div class="card mb-3" v-for="(flight, index) in flights" :key="index">
                    <img :src="flight.imageUrl" class="card-img-top" alt="Flight Image" v-if="flight.imageUrl" />
                    <div class="card-body">
                        <h5 class="card-title">{{ flight.title }}</h5>
                        <p class="card-text">Departure: {{ flight.departureDate }}</p>
                        <p class="card-text">Arrival: {{ flight.arrivalDate }}</p>
                        <p class="card-text">From: {{ flight.departureCity }}</p>
                        <p class="card-text">To: {{ flight.arrivalCity }}</p>
                        <p class="card-text">Adults: {{ flight.numberOfPeople }}</p>
                        <p class="card-text">Price: {{ flight.price }}</p>
                        <button class="btn btn-primary" @click="bookFlight(flight)">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
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
        numberOfPeople: 1,
        notes: '',
        budget: null,
        expenses: []
    });
    const flights = ref([]);
    const showAddExpense = ref(false);
    const showSetBudget = ref(false);
    const showEditExpense = ref(false);
    const newExpense = ref({ amount: 0, category: '' });
    const editExpenseIndex = ref(null);
    const newBudget = ref(null);
    const expenseCategories = ['Flights', 'Lodging', 'Car rental', 'Transit', 'Food', 'Sightseeing', 'Activities', 'Shopping', 'Gas', 'Other'];

    const totalSpent = computed(() => {
        return trip.value.expenses.reduce((total, expense) => total + expense.amount, 0);
    });

    const budgetPercentage = computed(() => {
        if (trip.value.budget !== null && trip.value.budget > 0) {
            return (totalSpent.value / trip.value.budget) * 100;
        } else {
            return 0;
        }
    });

    const selectCategory = (category) => {
        newExpense.value.category = category;
    };

    const addExpense = () => {
        if (newExpense.value.amount > 0 && newExpense.value.category) {
            trip.value.expenses.push({ ...newExpense.value, id: Date.now() });
            newExpense.value.amount = 0;
            newExpense.value.category = '';
            showAddExpense.value = false;
        }
    };

    const editExpense = (index) => {
        editExpenseIndex.value = index;
        newExpense.value = { ...trip.value.expenses[index] };
        showEditExpense.value = true;
    };

    const saveEditedExpense = () => {
        if (newExpense.value.amount > 0 && newExpense.value.category) {
            trip.value.expenses[editExpenseIndex.value] = { ...newExpense.value };
            newExpense.value.amount = 0;
            newExpense.value.category = '';
            showEditExpense.value = false;
            editExpenseIndex.value = null;
        }
    };

    const deleteExpense = (index) => {
        trip.value.expenses.splice(index, 1);
    };

    const saveBudget = () => {
        if (newBudget.value !== null) {
            trip.value.budget = parseFloat(newBudget.value);
            showSetBudget.value = false;
        }
    };

    const cancelSetBudget = () => {
        newBudget.value = null;
        showSetBudget.value = false;
    };

    const cancelExpense = () => {
        newExpense.value.amount = 0;
        newExpense.value.category = '';
        showAddExpense.value = false;
        showEditExpense.value = false;
    };

    onMounted(() => {
        if (isEdit.value) {
            const savedTrip = JSON.parse(localStorage.getItem('tripToEdit'));
            if (savedTrip) {
                trip.value = savedTrip;
                if (!trip.value.expenses) {
                    trip.value.expenses = [];
                }
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
            url: 'https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip',
            params: {
                fromEntityId: trip.value.departureCity,
                toEntityId: trip.value.arrivalCity,
                departDate: trip.value.departureDate,
                returnDate: trip.value.returnDate,
                adults: trip.value.numberOfPeople
            },
            headers: {
                'x-rapidapi-key': 'c2339d4674mshe91f0999b2c5458p1f5012jsn820d3f9aa91b',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);

            flights.value = response.data.data.everywhereDestination.results.map(result => ({
                title: result.content.location?.name || 'No Title',
                price: result.content.flightQuotes?.direct?.price || 'No Price',
                departureDate: trip.value.departureDate,
                arrivalDate: trip.value.returnDate,
                departureCity: trip.value.departureCity,
                arrivalCity: trip.value.arrivalCity,
                numberOfPeople: trip.value.numberOfPeople,
                imageUrl: result.content.image?.url || ''
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const bookFlight = (flight) => {
        window.open('https://www.skyscanner.com', '_blank');
    };
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

    .expense-category {
        margin: 5px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
    }

    .expense-category.selected {
        background-color: #007bff;
        color: white;
    }

    .progress-bar {
        transition: width 0.3s ease-in-out;
    }

    .bg-danger {
        background-color: #dc3545 !important;
    }

    .list-group-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
