<template>
    <div>
      <Header />
      <main class="main">
        <div class="texts">
          <span class="material-symbols-outlined">face</span>
          <h3>Cadastro de aluno</h3>
        </div>
  
        <form id="form" @submit.prevent="handlerStudentRegister">
          <div class="fields-container">
            <div class="fields" v-for="field in formFields" :key="field.name">
              <label :for="field.name">{{ field.label }}:</label>
              <input
                :type="field.type"
                :id="field.name"
                :placeholder="field.placeholder"
                class="inputs"
                v-model="formData[field.name]"
                @input="clearError(field.name)"
              />
              <br />
              <span class="fieldsErrors">{{ fieldsErrors[field.name] }}</span>
            </div>
          </div>
  
          <div class="buttons">
            <button type="submit" class="register-button">Cadastrar</button>
          </div>
        </form>
  
        <span class="fieldsErrors">{{ errors }}</span>
        <span class="success">{{ success }}</span>
      </main>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import * as Yup from 'yup';
  import axios from 'axios';
  
  export default {
    name: 'NewStudent',
    components: {
      Header,
    },
    data() {
      return {
        formData: {
          name: '',
          email: '',
          contact: '',
          date_birth: null,
          cep: '',
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          province: '',
          complement: '',
        },
        fieldsErrors: {},
        errors: '',
        success: '',
      };
    },
    computed: {
      formFields() {
        return [
          {
            name: 'name',
            label: 'Nome completo',
            type: 'text',
            placeholder: 'Digite o seu nome completo...',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Digite o seu email...',
          },
          {
            name: 'contact',
            label: 'Contato',
            type: 'text',
            placeholder: 'Digite o seu contato...',
          },
          {
            name: 'date_birth',
            label: 'Data de nascimento',
            type: 'date',
            placeholder: 'Digite a data de nascimento...',
          },
          {
            name: 'cep',
            label: 'CEP',
            type: 'text',
            placeholder: 'Digite o seu CEP...',
          },
          {
            name: 'street',
            label: 'Logradouro',
            type: 'text',
            placeholder: 'Digite o seu logradouro...',
          },
          {
            name: 'number',
            label: 'Número',
            type: 'text',
            placeholder: 'Digite o número da casa...',
          },
          {
            name: 'neighborhood',
            label: 'Bairro',
            type: 'text',
            placeholder: 'Digite o nome do seu bairro...',
          },
          {
            name: 'city',
            label: 'Cidade',
            type: 'text',
            placeholder: 'Digite o nome da sua cidade...',
          },
          {
            name: 'province',
            label: 'Estado',
            type: 'text',
            placeholder: 'Digite a sigla do seu estado...',
          },
          {
            name: 'complement',
            label: 'Complemento',
            type: 'text',
            placeholder: 'Digite algum complemento...',
          },
        ];
      },
    },
    methods: {
      async validateAddress() {
        const url = `https://viacep.com.br/ws/${this.formData.cep}/json/`;
        localStorage.setItem('studentName', this.formData.name);
  
        try {
          const response = await axios.get(url);
  
          if (response.data.cep) {
            this.formData.street = response.data.logradouro || '';
            this.formData.number = '';
            this.formData.neighborhood = response.data.bairro || '';
            this.formData.city = response.data.localidade || '';
            this.formData.province = response.data.uf || '';
            this.formData.complement = '';
          } else {
            this.clearAddressFields();
            console.error('CEP não encontrado');
          }
        } catch (error) {
          console.error('Erro ao buscar endereço:', error);
          this.fieldsErrors.cep = 'Erro ao buscar o endereço.';
        }
      },
  
      async handlerStudentRegister() {
        try {
          this.fieldsErrors = {};
  
          const studentSchema = Yup.object().shape({
            name: Yup.string().required('O nome completo é obrigatório!'),
            email: Yup.string().email('Digite um e-mail válido'),
            contact: Yup.string().required('O contato é obrigatório!'),
            date_birth: Yup.date()
              .max(new Date(), 'A data de nascimento é inválida!')
              .required('A data de nascimento é obrigatória!'),
            cep: Yup.string()
              .matches(/^\d{5}-\d{3}$/, 'CEP inválido')
              .required('O cep é obrigatório!'),
            street: Yup.string().required('O logradouro é obrigatório!'),
            number: Yup.string().required('O número da casa é obrigatório!'),
            neighborhood: Yup.string().required('O bairro é obrigatório!'),
            city: Yup.string().required('A cidade é obrigatória!'),
            province: Yup.string().required('O estado é obrigatório!'),
            complement: Yup.string(),
          });
  
          await studentSchema.validate(this.formData, { abortEarly: false });
  
          await this.validateAddress();

          const response = await axios.post('http://localhost:8080/students', this.formData).then((response)=>{
            console.log(response.data)

            this.success = 'Estudante cadastrado com sucesso!';
          }).catch(error=>{
            console.log(error)
          })

        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            error.inner.forEach((err) => {
              this.fieldsErrors[err.path] = err.message;
            });
          }
        }
      },
  
      clearError(fieldName) {
        this.fieldsErrors[fieldName] = '';
      },
  
      clearAddressFields() {
        this.formData.street = '';
        this.formData.number = '';
        this.formData.neighborhood = '';
        this.formData.city = '';
        this.formData.province = '';
        this.formData.complement = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(28, 28, 28);
    padding: 20px;
  }
  
  .texts,
  .texts h3,
  .texts span {
    color: ghostwhite;
    font-size: 40px;
  }
  
  .texts {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    padding-top: 30px;
  }
  
  .texts h3 {
    margin-left: 20px;
  }
  
  #form {
    max-width: 800px;
    width: 100%;
    padding-top: 50px;
  }
  
  .fields-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }
  
  .fields {
    flex: 1;
    margin: 10px;
  }
  
  label {
    color: ghostwhite;
    display: block;
    margin-bottom: 5px;
  }
  
  .inputs {
    width: 320px;
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
  
  .fieldsErrors {
    color: red;
    font-size: 16px;
    padding-left: 40px;
  }
  
  #form button {
    width: 250px;
    height: 35px;
    border-radius: 30px;
    color: gold;
    font-size: 20px;
    border: 2px solid gold;
    background-color: transparent;
    margin-left: 30%;
    margin-top: 30px;
    margin-bottom: 50px;
    transition: all 0.5s;
  }
  
  #form button:hover {
    border: 2px solid ghostwhite;
    color: ghostwhite;
    cursor: pointer;
  }
  
  .success {
    color: green;
    font-size: 18px;
    text-align: center;
  }
  
  
  @media (max-width: 600px) {
    #form .fields {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  
    #form .buttons {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  </style>
  