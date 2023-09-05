<template>
    <Header />
    <main>
        <div class="title_div">
            <span class="material-symbols-outlined">
                fitness_center
            </span>
            <h2>Exercícios</h2>
        </div>

        <form id="form">
            <div class="field">
                <input type="text" placeholder="Digite o nome do exercício..." class="inputs" v-model="exercise_name"
                    autofocus>
            </div>
            <button class="submit_button" @click.prevent="handlerExercise">Cadastrar</button>
        </form>

        <span class="inputError">{{ errors }}</span>
        <span class="successMessage">{{ successMessage }}</span>

        <div class="apiResponse">
            <table class="exercise-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição do Exercício</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(exercise, index) in registeredExercises" :key="exercise.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ exercise }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
import axios from "axios"
import Header from "../components/Header.vue"

export default {
    name: "Exercises",
    components: {
        Header
    },
    data() {
        return {
            exercise_name: "",
            errors: "",
            successMessage: "",
            nonExistentExerciseMessage: "",
            apiResponse: [],
            registeredExercises: []
        }
    },
    mounted() {
        axios.get("http://localhost:8080/exercises").then((response) => {
            this.apiResponse = response.data;

            this.registeredExercises = this.apiResponse.map(exercise => exercise.description);

            console.log(this.registeredExercises)
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        handlerExercise() {
            if (this.exercise_name == "") {
                this.errors = "Digite o nome do exercício!"
            } else {
                this.errors = ""

                axios.post("http://localhost:8080/exercises", {
                    description: this.exercise_name
                }).then((response) => {
                    this.apiResponse = response.data

                    this.registeredExercises.push(this.exercise_name);

                    this.successMessage = "Exercício cadastrado com sucesso!"

                    this.exercise_name = ""

                    setTimeout(() => {
                        this.successMessage = ""
                    }, 3000)
                })
            }
        }
    }
}
</script>

<style scoped>
main {
    height: auto;
    background-color: rgb(28, 28, 28);
}

.title_div {
    width: auto;
    display: flex;
    padding-top: 30px;
    border-bottom: 2px solid ghostwhite;
}

.title_div h2 {
    color: ghostwhite;
    font-size: 40px;
    margin-left: 15px;
}

.title_div .material-symbols-outlined {
    color: ghostwhite;
    font-size: 40px;
    margin-left: 160px;
}

#form {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
}

#form input {
    width: 320px;
    height: 35px;
    outline: none;
    border-radius: 10px;
    border: 2px solid ghostwhite;
    transition: all 0.5s;
}

.error-border {
    border: 2px solid red;
    border-radius: 10px;
}

#form input:focus {
    border: 2px solid gold;
    border-radius: 20px;
}

#form button {
    width: 160px;
    height: 35px;
    outline: none;
    border-radius: 10px;
    border: 2px solid gold;
    background-color: transparent;
    color: gold;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
    transition: all 0.5s;
}

#form button:hover {
    border: 2px solid ghostwhite;
    color: ghostwhite;
}

.inputError {
    color: red;
    font-size: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}

.successMessage {
    color: green;
    font-size: 18px;
    width: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}

.exercise-table {
    border-collapse: collapse;
    margin: 0 auto;
    width: 70%;
    border: 2px solid gold;
    background-color: rgb(28, 28, 28);
    margin-bottom: 50px;
}

.exercise-table thead {
    background-color: gold;
    color: ghostwhite;
}

.exercise-table th,
.exercise-table td {
    border: 2px solid gold;
    padding: 8px;
    font-size: 16px;
    color: ghostwhite;
    text-align: center;
}

.exercise-table th:first-child,
.exercise-table td:first-child {
    display: none;
}
</style>