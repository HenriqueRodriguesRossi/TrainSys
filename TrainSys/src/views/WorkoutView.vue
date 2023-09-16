<template>
    <div>
        <Header />

        <main>
            <div class="div_container">
                <div class="texts">
                    <span class="material-symbols-outlined">face</span>
                    <h2>Treinos{{ studentName ? ` - ${studentName}` : '' }}</h2>
                </div>
            </div>

            <div class="select">
                <label for="dayOfTraining">Escolha um dia da semana:</label>
                <select id="dayOfTraining" v-model="selectedDay" @change="fetchWorkouts">
                    <option value="" disabled>Selecione um dia</option>
                    <option value="segunda">Segunda-feira</option>
                    <option value="terca">Terça-feira</option>
                    <option value="quarta">Quarta-feira</option>
                    <option value="quinta">Quinta-feira</option>
                    <option value="sexta">Sexta-feira</option>
                    <option value="sabado">Sábado</option>
                    <option value="domingo">Domingo</option>
                </select>
            </div>

            <div class="result" v-if="showMessage">
                <p class="apiResponse">Nenhum treino cadastrado para esse dia!</p>
            </div>

            <div class="training" v-else-if="workoutsData.length > 0">
                <h2>{{ selectedDay }}</h2>
                <ul>
                    <li v-for="exercise in selectedDayExercises" :key="exercise.id">
                        <label>
                            <input type="checkbox" @change="marcarExercicio(exercise, selectedDay)">
                            {{ exercise.nome }}
                        </label>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>
  
<script>
import axios from 'axios';
import Header from '../components/Header.vue';

export default {
    name: "WorkoutView",
    components: {
        Header
    },
    data() {
        return {
            id: 0,
            apiResponse: '',
            studentName: '',
            workoutsData: [],
            selectedDay: '',
            showMessage: false 
        }
    },
    mounted() {
        this.id = localStorage.getItem("id");
        this.studentName = localStorage.getItem("studentName");

        this.fetchWorkouts();
    },
    computed: {
        selectedDayExercises() {
            return this.workoutsData
                .find(day => day.dayOfWeek === this.selectedDay)
                ?.exercises || [];
        }
    },
    methods: {
        fetchWorkouts() {
            if (this.selectedDay) {
                axios.get(`http://localhost:8080/workouts?student_id=${this.id}`)
                    .then((response) => {
                        if (response.data.length > 0) {
                            this.apiResponse = response.data;
                            this.workoutsData = response.data;
                            this.showMessage = false; 
                        } else {
                            this.apiResponse = "Nenhum treino cadastrado!";
                            this.showMessage = true; 
                        }
                    })
                    .catch((error) => {
                        this.apiResponse = 'Erro ao carregar o treino!'
                        console.error('Erro ao carregar o treino:', error);
                    });
            } else {
                // Nenhum dia selecionado, redefina os dados
                this.apiResponse = '';
                this.workoutsData = [];
                this.showMessage = false;
            }
        },
        marcarExercicio(exercise, dayOfWeek) {
            axios.post('http://localhost:8080/workouts/check', {
                workout_id: exercise.id,
                student_id: this.id,
                day_of_week: dayOfWeek
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.error('Erro ao marcar o exercício:', error);
            });
        }
    }
}
</script>

  

<style scoped>
main {
    height: 100vh;
    background-color: rgb(28, 28, 28);
}

.div_container {
    padding-top: 30px;
    border-bottom: 2px solid ghostwhite;
}

.div_container,
.texts {
    width: auto;
    display: flex;
    justify-content: flex-start;
}

.div_container .texts,
h2 {
    color: ghostwhite;
    font-size: 40px;
    margin-left: 15px;
}

.div_container .texts .material-symbols-outlined {
    color: ghostwhite;
    font-size: 40px;
    margin-left: 160px;
}

.select {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.select label {
    width: auto;
    text-align: center;
    font-size: 20px;
    color: ghostwhite;
    padding-top: 50px;
    margin-bottom: 40px;
}

.select select {
    width: 300px;
    height: 35px;
    border-radius: 20px;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    color: gold;
    font-size: 16px;
    border: 2px solid gold;
}

.select select option {
    background-color: rgb(28, 28, 28);
    font-size: 16px;
}

.apiResponse {
    color: ghostwhite;
    font-size: 20px;
    width: auto;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.training {
    margin-left: 170px;
    margin-top: 20px;
}
</style>