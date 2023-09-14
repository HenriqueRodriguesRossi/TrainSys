<template>
<header>
        <h1><RouterLink to="/dashboard">TrainSys</RouterLink></h1>

        <nav>
            <ul>
                <RouterLink to="/dashboard">Home</RouterLink>
                <RouterLink to="/students">Alunos</RouterLink>
                <RouterLink to="/exercises">Exercícios</RouterLink>
                <RouterLink to="/">Sair</RouterLink>
            </ul>
        </nav>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';
export default{
    name:"Header"
}
</script>

<style scoped> 
header {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: gold;
}

header h1 a{
    color: ghostwhite;
    text-decoration: none;
    font-size: 40px;
}

header ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
}

header ul a {
    margin-right: 20px;
    width: auto;
    cursor: pointer;
    color: ghostwhite;
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
    transition: all 1s;
}

header ul a:hover{
    color: rgb(28, 28, 28);
    text-decoration: underline;
}
</style>