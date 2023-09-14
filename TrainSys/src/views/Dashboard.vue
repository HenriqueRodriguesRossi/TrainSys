<template>
    <Header/>
    <main>
        <h2>Bem-vindo {{ name }}!</h2>

        <div class="info_container">
            
            <div class="div-exercises">
                <span class="material-symbols-outlined">
                    face
                </span>

                <p>{{ amount_students }} estudantes</p>

                <button class="add_button"><RouterLink to="/new-student">Adicionar</RouterLink></button>
            </div>

            <div class="div-exercises">
                <span class="material-symbols-outlined" >
                    fitness_center
                </span>
                <p>{{ amount_exercises }} exercícios</p>

                <button class="add_button"><RouterLink to="/new-exercise">Adicionar</RouterLink></button> 
            </div>
        </div>
    </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from "axios"
import Header from '../components/Header.vue';

export default {
    name: "Dashboard",
    components:{
        Header
    },
    data() {
        return {
            name: "",

            amount_exercises: 0,
            amount_students: 0
        };
    },
    mounted() {
        this.name = localStorage.getItem("name");

        axios.get("http://localhost:8080/dashboard").then((response) => {
            this.amount_exercises = response.data.amount_exercises

            this.amount_students = response.data.amount_students
        })
    },
    components: {
        RouterLink
    }
}
</script>

<style scoped>
main {
    width: 100%;
    height: 100vh;
    background-color: rgb(28, 28, 28);
}

main h2 {
    color: ghostwhite;
    font-size: 24px;
    text-align: center;
    padding-top: 30px;
}

p{
    color: ghostwhite;
    font-size: 20px;
}

.info_container{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    margin-top: 100px;
}

.div-exercises, .div-students{
    border: 2px solid gold;
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    border-radius: 10px;
}

.material-symbols-outlined{
    font-size: 48px;
    color: ghostwhite;
}

.add_button{
    width: 100px;
    height: 35px;
    border-radius: 30px;
    outline: none;
    background-color: transparent;
    color: gold;
    border: 2px solid gold;
    transition: all 0.5s;
}

.add_button a{
    color: gold;
    font-size: 16px;
    text-decoration: none;
}

.add_button a:hover{
    color: ghostwhite;
}

.add_button:hover{
    border: 2px solid ghostwhite;
    color: ghostwhite;
    cursor: pointer;
    border-radius: 15px;
}
</style>