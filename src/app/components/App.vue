<template>
<div>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="addUsuario">
                        <div class="form-group">
                            <input type="text" name="empleado" v-model="usuario.empleado" id="empleado" placeholder="Número de empleado" class="form-control">
                        </div>
                        <button class="btn btn-primary btn-block">Iniciar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            usuario: {
                empleado: '',
                nombre: '',
                correo: '',
                menorocho: '',
                mayornueve: '',
                hijos: ''
            }
        }
    },
    methods: {
        addUsuario() {
            console.log(this.usuario)
        }
    }
}
</script>