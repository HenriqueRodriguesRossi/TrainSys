<template>
</template>

<script>
import axios from "axios"
export default{
    name: "Exercises",
    data(){
        return{
            exercise_name: ""
        }
    },
    mounted(){
        axios.get("http://localhost:8080/exercises").then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }
}
</script>