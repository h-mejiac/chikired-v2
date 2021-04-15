<template>
    <div class="planetas-der">
        <div class="planetas-izq">
            <div class="row white-bk">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <div class="text-center">
                        <img src="assets/images/logos-header.jpg" class="img-fluid astronauta" alt="">
                    </div>
                </div>
                <div class="col-md-4"></div>
            </div>
            <div class="container h-100">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
                <div class="row pt-2 h-100 d-flex flex-wrap align-items-center">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <div class="text-center">
                            <img src="assets/images/logo.png" class="img-fluid logo" alt="">
                        </div>
                        <div class="card mt-3" v-if="this.formulario">
                            <div class="card-body text-center">
                                <p v-if="sindatos == 1">Revisa tu información</p>
                                <p v-if="mastarde">Por favor vuelve a intentarlo en 2 días</p>
                                <div v-if="this.usuarioToEdit.length > 0 ">
                                <form @submit.prevent="registroUsuario()">
                                    <h4>{{ this.usuario.nombre }}</h4>
                                    <div class="form-group">
                                    <input type="email" v-model="usuario.correo" placeholder="correo" class="form-control" required>
                                    <small id="emailHelp" class="form-text text-muted">Antes de enviar tu solicitud, asegúrate de haber escrito correctamente tu correo electrónico.</small>
                                    </div>
                                    <p>¿Qué edad tienen sus niños?</p>
                                    <div class="custom-control custom-radio text-left pl-5">
                                    <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" v-model="usuario.rango" value="5 a 8 años" required>
                                    <label class="custom-control-label" for="customRadio1">5 a 8 años</label>
                                    </div>
                                    <div class="custom-control custom-radio text-left pl-5">
                                    <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" v-model="usuario.rango" value="9 a 12 años">
                                    <label class="custom-control-label" for="customRadio2">9 a 12 años</label>
                                    </div>
                                    <div class="custom-control custom-radio text-left pl-5">
                                    <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" v-model="usuario.rango" value="Tengo niños de ambas edades">
                                    <label class="custom-control-label" for="customRadio3">Tengo niños de ambas edades</label>
                                    </div>
                                    <br>
                                    <div class="form-group">
                                        <label for="hijos">¿Cúantos niños tiene?</label>
                                        <select class="form-control" id="hijos" v-model="usuario.hijos" required>
                                        <option disabled selected>Selecciona una opción</option>
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
                                    <button class="btn btn-danger btn-block">Enviar</button>
                                </form>
                                </div>
                                <div v-else>
                                <form @submit.prevent="buscarUsuario">
                                    <h3>REGISTRO</h3>
                                <div class="form-group">
                                    <input type="text" name="empleado" v-model="usuario.empleado" id="empleado" placeholder="Número de empleado" class="form-control">
                                </div>
                                    <p>Si tienes dudas escríbenos a <a target="_blank" href="mailto:evento@chikired.com">evento@chikired.com</a></p>
                                <button class="btn btn-danger btn-block">Iniciar</button>
                                </form>
                                </div>
                            </div>
                        </div>
                        <div v-if="this.registro" class="text-center mt-5 mb-5 text-white">
                            <h2>¡GRACIAS POR <br>TU REGISTRO!</h2>
                            <h4>EN BREVE RECIBIRÁS UN <br>CORREO DE CONFIRMACIÓN.</h4>
                            <p>Si no recibes o no te llega el correo de confirmación, revisa tu bandeja de spam o no deseados. Cualquier duda escríbenos a <a target="_blank" href="mailto:evento@chikired.com">evento@chikired.com</a></p>
                        </div>
                        <div v-if="this.registroHecho" class="text-center mt-5 mb-5 text-white">
                            <h2>EL NÚMERO DE EMPLEADO QUE INGRESÓ YA SE HA REGISTRADO.</h2>
                            <p>Si no recibes o no te llega el correo de confirmación, revisa tu bandeja de spam o no deseados. Cualquier duda escríbenos a <a target="_blank" href="mailto:evento@chikired.com">evento@chikired.com</a></p>
                        </div>
                        <div class="text-center mt-3">
                            <img src="assets/images/astronauta.png" class="img-fluid astronauta" alt="">
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
class Usuario {
    constructor(empleado = '', nombre = '', correo = '', rango = '', hijos = 0, registro = Date.now()){
        this.empleado = empleado;
        this.nombre = nombre;
        this.correo = correo;
        this.rango = rango;
        this.registro = registro;
        this.hijos = hijos;
    }
}
export default {
    data() {
        return {
            usuario: new Usuario,
            sindatos: false,
            registro: false,
            registroHecho: false,
            mastarde: false,
            formulario: true,
            usuarioToEdit: '',
            timestamp: '',
            contador: 0,
        }
    },
    created() {
        setInterval(this.getNow, 1000);
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
                    const { _id, empleado, nombre, correo, rango, hijos ,registro } = data;
                    this.usuario = new Usuario(empleado, nombre, correo, rango, hijos ,registro);
                    this.usuario.registro = this.timestamp;
                    if (this.usuario.correo != '') {
                        this.registroHecho = !this.registroHecho;
                        this.formulario = !this.formulario;
                    }
                    this.usuarioToEdit = _id;
                    this.sindatos = false;
                } else {
                    this.sindatos = true;
                    console.log(this.contador);
                    if (this.contador == 1) {
                        this.mastarde = !this.mastarde;
                        this.contador = 0;
                    } else {
                        this.contador = parseInt(this.contador) + 1;
                    }
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
            this.formulario = !this.formulario;
            this.usuarioToEdit = '';
          });
        },
        getNow() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.timestamp = dateTime;
        },
    }
}
</script>