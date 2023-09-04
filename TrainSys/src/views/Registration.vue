<template>
    <div class="registration-container">
        <h3>Área de login</h3>

        <form @submit.prevent="handleRegistration" id="form">
            <form>
                <div class="fields">
                    <label for="name" class="label">Nome completo: </label>
                    <input type="text" class="inputs" placeholder="Digite o seu nome completo..." id="name" v-model="name"
                        @input="clearError('name')">
                    <span class="errors">{{ errors.name }}</span>
                </div>

                <div class="fields">
                    <label for="email" class="label">Email: </label>
                    <input type="email" class="inputs" placeholder="Digite o email..." id="email" v-model="email"
                        @input="clearError('email')">
                    <span class="errors">{{ errors.email }}</span>
                </div>

                <div class="fields">
                    <label for="password" class="label">Senha: </label>
                    <input type="password" class="inputs" placeholder="Digite a sua senha..." id="password"
                        v-model="password" @input="clearError('password')">
                    <span class="errors">{{ errors.password }}</span>
                </div>

                <div class="fields">
                    <label for="repeatPassword" class="label">Repita a sua senha: </label>
                    <input type="password" class="inputs" placeholder="Repita a sua senha..." v-model="repeatPassword"
                        id="repeatPassword" @input="clearError('repeatPassword')">
                    <span class="errors">{{ errors.repeatPassword }}</span>
                </div>

                <div class="fields">
                    <label for="type_plan" class="label">Tipo do plano:</label>
                    <select v-model="type_plan" id="type_plan">
                        <option value="bronze">Bronze</option>
                        <option value="silver">Prata</option>
                        <option value="gold">Ouro</option>
                    </select>
                    <span class="errors">{{ errors.type_plan }}</span>
                </div>
            </form>

            <span class="success">{{ success }}</span>

            <div class="button-container">
                <button type="submit" class="registerButton">Cadastre-se</button>
                <button class="homeButton">
                    <RouterLink to="/">Voltar</RouterLink>
                </button>
            </div>
        </form>
    </div>
</template>
  
<script>
import * as Yup from "yup";
import { RouterLink } from "vue-router";
import axios from "axios";


export default {
    name: "Registration",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
            type_plan: "bronze",
            errors: {},
            success: "",
        };
    },
    methods: {
        async handleRegistration() {
            try {
                this.errors = {};
                const userSchema = Yup.object().shape({
                    name: Yup.string().required("Nome completo é obrigatório!"),
                    email: Yup.string().email("Email inválido!").required("Email é obrigatório!"),
                    password: Yup.string().required("Senha é obrigatória!").min(8, "Senha muito curta!").max(20, "Senha muito longa!"),
                    repeatPassword: Yup.string()
                        .oneOf([this.password, null], 'As senhas devem ser iguais!')
                        .required('A confirmação de senha é obrigatória'),
                    type_plan: Yup.string(),
                });

                await userSchema.validate(this, { abortEarly: false });

                const response = await axios.post("http://localhost:8080/users", this);
                if (response.status === 201) {
                    this.success = "Usuário cadastrado com sucesso!";

                    this.$router.push("/")
                } else {
                    console.log(response);
                }
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    error.inner.forEach((e) => {
                        this.errors[e.path] = e.message;
                    });
                }
            }
        },
        clearError(fieldName) {
            this.errors[fieldName] = "";
        },
    },
};
</script>
  
<style scoped>
.registration-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: #1c1c1c;
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

.inputs,
select {
    width: 300px;
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

select {
    outline: none;
    background-color: transparent;
    color: ghostwhite;
}

option {
    font-size: 16px;
    background-color: transparent;
    color: black;
}

.errors {
    color: red;
    font-size: 16px;
    padding-left: 5px;
    margin-top: 10px;
}

.success {
    color: green;
    font-size: 16px;
}

.button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.button-container .registerButton {
    width: 150px;
    height: 35px;
    border-radius: 40px;
    border: 2px solid ghostwhite;
    color: ghostwhite;
    background-color: gold;
    font-size: 20px;
    transition: all 0.5s;
    margin-bottom: 20px;
}

.button-container .registerButton:hover {
    cursor: pointer;
    background-color: transparent;
    border: 2px solid gold;
    color: gold;
}

.button-container .homeButton {
    width: 150px;
    height: 35px;
    border-radius: 40px;
    border: 2px solid gold;
    color: gold;
    background-color: transparent;
    font-size: 16px;
    transition: all 0.5s;
    margin-bottom: 20px;
}

.button-container .homeButton a {
    text-decoration: none;
    font-size: 20px;
    color: gold;
}

.button-container .homeButton:hover {
    border: 2px solid ghostwhite;
    background-color: gold;
}

.button-container .homeButton a:hover {
    cursor: pointer;
    color: ghostwhite;
}
</style>
  