<template>
    <div class="login-container">
        <h3>Área de login</h3>

        <form @submit.prevent="handlerLogin" id="form">
            <div class="fields">
                <label for="email" class="label">Email:</label>
                <input type="email" placeholder="Digite o seu e-mail..." v-model="email" class="inputs"
                    v-on:input="clearEmailError" autofocus>
                <br>
                <span class="inputErrors">{{ inputEmailError }}</span>
            </div>

            <div class="fields">
                <label for="password" class="label">Senha:</label>
                <input type="password" placeholder="Digite a sua senha..." v-model="password" class="inputs"
                    v-on:input="clearPasswordError">
                <br>
                <span class="inputErrors">{{ inputPasswordError }}</span>
            </div>

            <div class="button-container">
                <button type="submit">Entrar</button>
            </div>
        </form>

        <span class="result">{{ error }}</span>

        <span class="spanCadastro">Ainda não tem conta? <RouterLink to="/registration">Cadastre-se</RouterLink></span>
    </div>
</template>
  
<script>
import { RouterLink } from 'vue-router'
import axios from "axios"

export default {
    name: "Login",
    components: {
        RouterLink
    },
    data() {
        return {
            email: "",
            password: "",

            inputEmailError: "",
            inputPasswordError: "",

            error: ""
        }
    },
    methods: {
        handlerLogin() {
            this.inputEmailError = "";
            this.inputPasswordError = "";

            if (this.email == "" || this.password == "") {
                this.inputEmailError = "O email é obrigatório!";
                this.inputPasswordError = "A senha é obrigatória!";
            }

            axios.post('http://localhost:8080/sessions', {
                email: this.email,
                password: this.password
            }).then((response) => {
                if (response.status == 200) {
                    localStorage.setItem('name', response.data.name);

                    localStorage.setItem('token', response.data.token);

                    this.$router.push("/dashboard")
                }
            }).catch((erro) => {
                console.log(erro)
                this.error = "Email ou senha incorretos!"
            })
        },
        clearEmailError() {
            this.inputEmailError = ''
        },
        clearPasswordError() {
            this.inputPasswordError = ''
        },
    }
}
</script>

  
<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: rgb(28, 28, 28);
}

h3 {
    font-size: 30px;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    color: gold;
}

#form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    padding: 20px;
}

.fields {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 10px 0;
    width: 100%;
}

.label {
    margin-bottom: 5px;
    color: ghostwhite;
}

.inputs {
    width: 100%;
    height: 35px;
    border-radius: 10px;
    border: 2px solid ghostwhite;
    transition: all 0.5s;
}

.inputs:focus {
    border-radius: 15px;
    border: 2px solid gold;
    outline: none;
}

.inputErrors {
    color: red;
    padding-left: 10px;
    font-size: 16px;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.button-container button {
    width: 150px;
    height: 35px;
    border-radius: 40px;
    border: 2px solid gold;
    color: gold;
    background-color: transparent;
    font-size: 16px;
    transition: all 0.5s;
}

.button-container button:hover {
    cursor: pointer;
    color: ghostwhite;
    border: 2px solid ghostwhite;
}

.spanCadastro {
    display: flex;
    flex-direction: row;
    width: auto;
    height: auto;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    color: ghostwhite;
}

.spanCadastro a {
    text-decoration: underline;
    color: gold;
}

.result {
    color: red;
    margin-top: 15px;
    font-size: 16px;
}
</style>
