<template>
<div>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <p v-if="sindatos == 1">Revisa tu información</p>
                        <div v-if="this.usuarioToEdit.length > 0 ">
                        <form @submit.prevent="registroUsuario()">
                            <h4>{{ this.usuario.nombre }}</h4>
                            <div class="form-group">
                            <input type="email" v-model="usuario.correo" placeholder="correo" class="form-control">
                            </div>
                            <p>¿Qué edad tienen sus hijos?</p>
                            <div class="form-check">
                            <input type="checkbox" name="menorocho" id="menorocho" class="form-check-input" v-model="usuario.menorocho" value="true">
                            <label class="form-check-label" for="menorocho">Menor de 8 años de edad</label>
                            </div>
                            <div class="form-check">
                            <input type="checkbox" name="mayornueve" id="mayornueve" class="form-check-input" v-model="usuario.mayornueve" value="true">
                            <label class="form-check-label" for="mayornueve">Mayor de 9 años de edad</label>
                            </div>
                            <br>
                            <div class="form-group">
                                <label for="hijos">¿Cúantos hijos tiene?</label>
                                <select class="form-control" id="hijos" v-model="usuario.hijos">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                </select>
                            </div>
                            <button class="btn btn-primary btn-block">Iniciar</button>
                        </form>
                        </div>
                        <div v-else>
                        <div v-if="this.registro">
                            Gracias por su registro
                        </div>
                        <div v-else>
                        <form @submit.prevent="buscarUsuario">
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
            sindatos: false,
            registro: false,
            usuarioToEdit: '',
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
        },
        buscarUsuario() {
        fetch('/api/buscar', {
                method: 'POST',
                body: JSON.stringify(this.usuario),
                headers: {
                    'Accept':'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const { _id, empleado, nombre, correo, menorocho, mayornueve, hijos } = data;
                    this.usuario = new Usuario(empleado, nombre, correo, menorocho, mayornueve, hijos);
                    this.usuarioToEdit = _id;
                    this.sindatos = false;
                } else {
                    this.sindatos = true;
                }
            })
        },
        registroUsuario() {
        fetch('/api/' +this.usuarioToEdit, {
          method: 'PUT',
          body: JSON.stringify(this.usuario),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.usuario = new Usuario();
            this.registro = !this.registro;
            this.usuarioToEdit = '';
          });
        },
    }
}
</script>