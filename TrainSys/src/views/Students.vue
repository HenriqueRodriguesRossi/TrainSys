<template>
    <Header />
    <main>
        <div class="div_container">
            <div class="texts">
                <span class="material-symbols-outlined">
                    face
                </span>

                <h2>Alunos</h2>
            </div>

            <button class="new-student-button">
                <RouterLink to="/new-student">Novo</RouterLink>
            </button>
        </div>
        <div class="form-container">
            <form id="form" @submit.prevent="handlerSearch">
                <div class="field">
                    <input type="text" class="inputs" placeholder="Digite o nome do aluno..." v-model="student_name"
                        autofocus @input="clearErrorStudentInput">
                </div>
                <button class="search_button">Buscar</button>
            </form>

            <div class="warnig-spans">
                <span class="span-success">{{ success }}</span>

                <span class="span-error">{{ errors }}</span>
            </div>
        </div>
        <div class="result-container">
            <span class="warning">{{ warning }}</span>

            <span class="apiResponse" v-if="apiResponse.length > 0">{{ apiResponse }}</span>
        </div>
    </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import Header from '../components/Header.vue';
import axios from 'axios'

export default {
    name: "Students",
    components: {
        Header,
        RouterLink
    },
    mounted() {
        axios.get("http://localhost:8080/students").then((response) => {
            this.apiResponse = response.data.students
        }).catch((error) => {
            console.log(error)
        })
    },
    data() {
        return {
            student_name: "",

            errors: "",
            success: "",

            apiResponse: "",
            warning: ""
        }
    },
    methods: {
        handlerSearch() {
            if (this.student_name == "") {
                this.errors = "Nome do aluno é obrigatório!"
            } else {
                axios.get("http://localhost:8080/students", {

                    params: { name: this.student_name }

                }).then((response) => {
                    if (response.data.students.length === 0) {
                        this.warning = "Nenhum aluno encontrado!";

                        self = this
                        setTimeout(function () {
                            self.warning = "";
                        }, 3000);
                    } else {
                        this.apiResponse = response.data.students;
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        clearErrorStudentInput() {
            this.errors = ""
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
    justify-content: space-around;
}

.div_container .texts h2 {
    color: ghostwhite;
    font-size: 40px;
    margin-left: 15px;
}

.div_container .texts .material-symbols-outlined {
    color: ghostwhite;
    font-size: 40px;
    margin-left: 160px;
}

.div_container .new-student-button {
    width: 150px;
    height: 33px;
    background-color: transparent;
    border-radius: 30px;
    border: 2px solid gold;
    transition: 0.5s;
}

.div_container .new-student-button:hover {
    border: 2px solid ghostwhite;
    color: ghostwhite;
    cursor: pointer;
}

.div_container .new-student-button a {
    color: gold;
    transition: 0.5s;
    text-decoration: none;
}

.div_container .new-student-button a:hover {
    color: ghostwhite;
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

.warnig-spans .span-error {
    color: red;
    font-size: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    padding-top: 10px;
}

.warnig-spans .span-success {
    color: green;
    font-size: 20px;
    display: flex;
    justify-content: center;
}

.apiResponse {
    font-size: 16px;
    color: ghostwhite;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.warning {
    color: ghostwhite;
    font-size: 20px;
    display: flex;
    justify-content: center;
}
</style>