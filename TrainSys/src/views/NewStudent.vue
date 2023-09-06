<template>
    <Header/>
    <main class="main">
        <h2>Cadastro de aluno</h2>

        <form>
            <div class="fields">
                <label for="fullName">Nome completo: </label> <br>
                <input type="text" id="fullName" placeholder="Digite o seu nome completo..." class="inputs" v-model="fullName"> <br>
            </div>
            <div class="fields">
                <label for="email">Email:</label> <br>
                <input type="email" id="email" placeholder="Digite o seu email..." class="inputs" v-model="email"> <br>
            </div>
            <div class="fields">
                <label for="contato">Contato:</label> <br>
                <input type="number" id="contato" placeholder="Digite o seu contato..." class="inputs" v-model="contact"> <br>
            </div>
            <div class="fields">
                <label for="contato">Contato:</label> <br>
                <input type="number" id="contato" placeholder="Digite o seu contato..." class="inputs" v-model="contact"> <br>
            </div>
            <div class="fields">
                <label for="dateOfBirth">Data de nascimento:</label> <br>
                <input type="date" id="dateOfBirth" class="inputs" v-model="dateOfBirth"> <br>
            </div>
            <div class="fields">
                <label for="cep">CEP:</label> <br>
                <input type="number" placeholder = "Digite o seu CEP..."  id="cep" class="inputs" v-model="cep"><br>
            </div>
            <div class="fields">
                <label for="logradouro">Logradouro:</label> <br>
                <input type="text" id="logradouro" placeholder = "Digite o seu logradouro..." class="inputs" v-model="cep"><br>
            </div>
        </form>
    </main>
</template>

<script>
import Header from '../components/Header.vue';
import axios from 'axios'

export default{
    name: "NewStudent",
    components: {
        Header,
    }
}
</script>

<style scoped>
.main{
    height: 100vh;
    background-color: rgb(28, 28, 28);
}

h2{
    color: ghostwhite;
    font-size: 40px;
    text-align: center;
    padding-top: 30px;
}
</style>