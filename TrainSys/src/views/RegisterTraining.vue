<template>
    <div>
        <Header />
        <main>
            <div class="title_div">
                <span class="material-symbols-outlined">fitness_center</span>
                <h2>Treino</h2>
            </div>

            <span class="message">{{ notExerciseMessage }}</span>
            <form id="form" @submit.prevent="handlerNewTraining">
                <div class="fields">
                    <label for="exercise">Qual exercício:</label>
                    <br>
                    <select v-model="formData.selectedExercise" class="custom-select">
                        <option value="" disabled selected>Selecione um exercício</option>
                        <option v-for="exercise in exercises" :key="exercise.id" :value="exercise.id">
                            {{ exercise.description }}
                        </option>
                    </select>
                    <br>
                    <span class="yupErrorMessage">{{ yupErrorMessage.selectedExercise }}</span>
                </div>

                <div class="fields">
                    <label for="repeticoes">Repetições:</label>
                    <br>
                    <input type="number" id="repeticoes" placeholder="Digite a quantidade de repetições..." class="inputs"
                        v-model="formData.repetitions">
                    <br>
                    <span class="yupErrorMessage">{{ yupErrorMessage.repetitions }}</span>
                </div>

                <div class="fields">
                    <label for="peso">Peso:</label>
                    <br>
                    <input type="number" class="inputs" placeholder="Digite o peso desejado..." v-model="formData.weight">
                    <br>
                    <span class="yupErrorMessage">{{ yupErrorMessage.weight }}</span>
                </div>

                <div class="fields">
                    <label for="pausa">Pausa:</label>
                    <br>
                    <input type="time" id="pausa" placeholder="Digite o tempo de pausa..." class="inputs"
                        v-model="formData.break_time">
                    <br>
                    <span class="yupErrorMessage">{{ yupErrorMessage.break_time }}</span>
                </div>

                <div class="fields">
                    <label for="dia">Dia da semana:</label>
                    <br>
                    <select id="diaDaSemana" v-model="formData.day">
                        <option value="segunda">Segunda-feira</option>
                        <option value="terca">Terça-feira</option>
                        <option value="quarta">Quarta-feira</option>
                        <option value="quinta">Quinta-feira</option>
                        <option value="sexta">Sexta-feira</option>
                        <option value="sabado">Sábado</option>
                        <option value="domingo">Domingo</option>
                    </select>
                    <br>
                    <span class="yupErrorMessage">{{ yupErrorMessage.day }}</span>
                </div>

                <div class="fields">
                    <label for="obs">Observação:</label>
                    <br>
                    <textarea id="obs" placeholder="Digite uma observacao..." v-model="formData.observations"></textarea>

                    <span class="yupErrorMessage">{{ yupErrorMessage.observations }}</span>
                </div>

                <button type="submit" class="button">Cadastrar</button>
            </form>

            <span class="errorMessage">{{ errorMessage }}</span>

            <span class="successMessage">{{ successMessage }}</span>
        </main>
    </div>
</template>
  
<script>
import Header from '../components/Header.vue'
import axios from 'axios'
import * as Yup from 'yup'
import captureErrorYup from '../utils/captureErroYup'

export default {
    name: "RegisterTraining",
    components: {
        Header
    },
    data() {
        return {
            formData: {
                selectedExercise: null,
                repetitions: 0,
                weight: 0,
                break_time: '00:00',
                observations: '',
                day: null
            },
            exercises: [],
            notExerciseMessage: '',
            errorMessage: '',
            successMessage: '',
            yupErrorMessage: {}
        };
    },
    mounted() {
        this.loadExercises();
    },
    methods: {
        async loadExercises() {
            try {
                const response = await axios.get('http://localhost:8080/exercises');
                this.exercises = response.data;

                if (this.exercises.length === 0) {
                    this.notExerciseMessage = "Cadaste um exercício primeiro!";
                }
            } catch (error) {
                console.error('Erro ao obter a lista de exercícios:', error);
            }
        },
        async handlerNewTraining() {
            try {
                this.errorMessage = "";
                this.successMessage = "";

                const trainingSchema = Yup.object().shape({
                    selectedExercise: Yup.string().required('Selecione um exercício'),
                    repetitions: Yup.number().required('Digite a quantidade de repetições').min(1, 'Coloque no mínimo 1 repetição!'),
                    weight: Yup.number().required('Digite o peso desejado'),
                    break_time: Yup.string().required('Digite o tempo de pausa'),
                    day: Yup.string().required('Selecione um dia da semana'),
                    observations: Yup.string(),
                });

                await trainingSchema.validate(this.formData, { abortEarly: false });

                const response = await axios.post("http://localhost:8080/workouts", {
                    student_id: localStorage.getItem('id'),
                    exercise_id: this.formData.selectedExercise,
                    repetitions: this.formData.repetitions,
                    weight: this.formData.weight,
                    break_time: this.formData.break_time,
                    observations: this.formData.observations,
                    day: this.formData.day
                });

                this.successMessage = "Treino cadastrado com sucesso!";
                console.log(response.data);
            } catch (error) {
                this.yupErrorMessage = {};

                if (error instanceof Yup.ValidationError) {
                    error.inner.forEach((error) => {
                        this.yupErrorMessage[error.path].push(error.message)
                    });
                }
                
                if (error.response && error.response.status === 500) {
                    this.errorMessage = 'Erro interno no servidor ao buscar o endereço. Tente novamente mais tarde.';
                } else {
                    this.errorMessage = 'Erro ao buscar o endereço.';
                }
                console.error('Erro ao buscar endereço:', error);
            }
        }
    }
};
</script>
  
<style scoped>
main {
    height: 100%;
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

.message {
    font-size: 26px;
    color: ghostwhite;
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
}

#form {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

label {
    color: ghostwhite;
    font-size: 20px;
}

.custom-select,
.inputs,
select {
    width: 350px;
    height: 35px;
    outline: none;
    border-radius: 10px;
    border: 2px solid ghostwhite;
    transition: all 0.5s;
}

option:hover {
    color: black;
    background-color: gold;
}

.inputs:focus {
    border-radius: 15px;
    border: 2px solid gold;
}

textarea {
    width: 350px;
    height: 300px;
    outline: none;
    border-radius: 10px;
    border: 2px solid ghostwhite;
    transition: all 0.5s;
}

textarea:focus {
    border-radius: 15px;
    border: 2px solid gold;
}

.button {
    width: 150px;
    height: 35px;
    border-radius: 10px;
    background-color: transparent;
    border: 2px solid gold;
    color: gold;
    transition: all 0.5s;
}

.button:hover {
    cursor: pointer;
    border: 2px solid ghostwhite;
    color: ghostwhite;
}

.successMessage,
.errorMessage {
    font-size: 20px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    padding-bottom: 60px;
}

.errorMessage {
    color: rgb(255, 0, 0);
}

.successMessage {
    color: green;
}
</style>
  