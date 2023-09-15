<template>
    <div>
        <Header />

        <main>
            <div class="div_container">
                <div class="texts">
                    <span class="material-symbols-outlined">
                        face
                    </span>

                    <h2>Treinos {{ studentName ? ` - ${studentName}` : '' }}</h2>
                </div>
            </div>

            <div class="result">
                <p class="apiResponse">{{ apiResponse }}</p>
            </div>

            <div class="training" v-if="apiResponse !== 'Nenhum treino cadastrado!' && apiResponse !== ''">
                <h2>Hoje</h2>
                <div v-for="(day, index) in workoutsData" :key="index">
                    <h2>{{ day.dayOfWeek }}</h2>
                    <ul>
                        <li v-for="exercise in day.exercises" :key="exercise.id">
                            <label>
                                <input type="checkbox" @change="marcarExercicio(exercise, day.dayOfWeek)">
                                {{ exercise.nome }}
                            </label>
                        </li>
                    </ul>
                </div>
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
            workoutsData: []
        }
    },
    mounted() {
        this.id = localStorage.getItem("id");
        this.studentName = localStorage.getItem("studentName");

        axios.get(`http://localhost:8080/workouts?student_id=${this.id}`)
            .then((response) => {
            if (response.data.length > 0) {
                this.apiResponse = response.data;
                this.workoutsData = response.data;
            } else {
                this.apiResponse = "Nenhum treino cadastrado!"
            }
            })
            .catch((error) => {
                console.error('Erro ao carregar o treino:', error);
            });
    },
    methods: {
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