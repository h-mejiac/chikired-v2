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
class Usuario {
    constructor(empleado = '', nombre = '', correo = '', menorocho = false, mayornueve = false, hijos = 0){
        this.empleado = empleado;
        this.nombre = nombre;
        this.correo = correo;
        this.menorocho = menorocho;
        this.mayornueve = mayornueve;
        this.hijos = hijos;
    }
}
export default {
    data() {
        return {
            usuario: new Usuario,
            usuario: [],
        }
    },
    methods: {
        addUsuario() {
            fetch('/api', {
                method: 'POST',
                body: JSON.stringify(this.usuario),
                headers: {
                    'Accept':'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            this.usuario = new Usuario();
        }
    }
}
</script>