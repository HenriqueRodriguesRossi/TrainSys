<template>
    <header>
        <h1>
            <RouterLink to="/dashboard">TrainSys</RouterLink>
        </h1>

        <span class="material-symbols-outlined" v-bind="click" @click="clickMenu">
            menu
        </span>

        <div class="list-container" v-if="click == true">
            <nav>
                <ul>
                    <li>
                        <RouterLink to="/dashboard">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/students">Alunos</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/exercises">Exercícios</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/">Sair</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
  

<script>
import { RouterLink } from 'vue-router';
export default {
    name: "Header",
    data() {
        return {
            click: false
        };
    },
    methods: {
        clickMenu() {
            if (this.click == false) {
                this.click = true
            } else {
                this.click = false
            }
        }
    }
};
</script>

<style scoped>
header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    background-color: gold;
}

header h1, span{
    padding-top: 20px;
    padding-bottom: 20px;
}

header h1 a {
    color: ghostwhite;
    text-decoration: none;
    font-size: 40px;
    margin-top: 50px;
}

header .material-symbols-outlined {
    color: ghostwhite;
    font-size: 40px;
    cursor: pointer;
    text-align: center;

}

header .list-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    background-color: rgb(28, 28, 28);
}


header .list-container ul {
    width: 100%;
    list-style: none;
}

header .list-container ul li{
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
}

header .list-container ul li a{
    font-size: 20px;
    text-decoration: none;
    color: gold;
    transition: all 0.5s;
}

header .list-container ul li a:hover{
    color: ghostwhite;
    text-decoration: underline;
}
</style>