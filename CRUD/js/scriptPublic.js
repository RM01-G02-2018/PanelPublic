
//arreglo para mostrar las imagenes en los formularios de modificar y agregar
var imagenes = [];
// var simagenes = [];
var idpublicaciones = { idpublic: "" };
var eliminar = []
var insertar = []

const app = new Vue({
    el: "#app",
    created: function () {
        this.mostrar()

    },

    data: {
        id: "",
        contenido: '',
        titulo: '',
        autor: '',
        // imagenes = al arreglo de imagenes
        imagenes: imagenes,
        //arreglo obtenido al pulsar el boton actualizar
        items: [],
        publicaciones: [],
        eliminar: eliminar,
        img: "",
        insertar: insertar,

    },
    methods: {
        encodeImageFileAsURL(event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {

                var imgs = { img: "" }
                // insertar las imagenes obtenidas por el formulario al json imgs
                imgs.img = reader.result
                // insertar  el json imgs al arreglo imagenes
                imagenes.push(imgs);

            }
            reader.readAsDataURL(file);

        },
        getImage(event) {
            //Asignamos la imagen a  nuestra data
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {

                var imgs = { img: "", idpublic: "" }
                // insertar las imagenes obtenidas por el formulario al json imgs
                imgs.img = reader.result
                imgs.idpublic = idpublicaciones.idpublic
                // insertar  el json imgs al arreglo imagenes
                imagenes.push(imgs);

                var imgPu = { img: "", id: "" }
                // insertar las imagenes obtenidas por el formulario al json imgs
                imgPu.img = reader.result
                imgPu.id = idpublicaciones.idpublic
                // insertar  el json imgs al arreglo imagenes
                insertar.push(imgPu);


            }
            reader.readAsDataURL(file);

            // console.log(file);

        },

        mostrar() {
            axios.get('http://192.168.32.90/Publicaciones_eventos2/apiRest/public/api/publicaciones/lista')
                .then(response => {
                    //asignarle al arreglo publicaciones la respuesta donde obtenemos todas las publicaciones
                    var ordenar = response.data.public
                    ordenar.sort((a, b) => b.id - a.id);
                    // console.log(ordenar);
                    this.publicaciones = ordenar

                })
                .catch(error => {
                    console.log(error);
                })
        },
        /////////////////////////////////////////////////////////  para eliminar imagenes   /////////////////////////////////////////////////
        borrar: function (img) {
            //for para comparar las images para poder eliminarlas de el arreglo con splice      
            for (var i = 0; i < imagenes.length; i++) {
                if (imagenes[i].img == img) {
                    imagenes.splice(i, 1);
                    break;
                }
            }
        },
        ///////////////////////////////////////// Agregar publicacion  //////////////////////////////////////////////
        limpiar: function () {
            this.contenido = '',
            this.titulo = '',
            this.autor = '',
         
            $("#agre").removeAttr("data-dismiss", "modal");
            for (let i = 0; i < imagenes.length; i++) {
                imagenes.splice(i);
                $('.delete').remove();
            }
        },
        agregar: function (data) {
            if (this.contenido && this.titulo && this.autor && this.imagenes != null && this.imagenes != "") {
                /*si los campos estan llenos  */
                $("#agre").attr("data-dismiss", "modal");
                axios.post('http://192.168.32.90/Publicaciones_eventos2/apiRest/public/api/publicaciones/insertar', {
                    contenido: this.contenido,
                    titulo: this.titulo,
                    autor: this.autor,
                    imagenes: this.imagenes
                })

                    .then(response => {

                        console.log(response);
                        this.mostrar()
                Swal.fire({

                    type: 'success',
                    title: 'Publicacion Realizada',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.contenido = '',
                    this.titulo = '',
                    this.autor = ''
                 
                   
                    })
                    .catch(error => {
                        console.log(error);
                        alert(error)
                    })
               
            } else {

                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: '¡Rellene todos los campos !',
                })

            }





        },
        /////////////////////////////////////    eliminar Publicacion   ///////////////////////////////////////////////
        vaciarDatosForm: function () {
            this.contenido = '',
                this.titulo = '',
                this.autor = ''
               
        },
        elimina: function (id) {


            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                        '¡Eliminado!',
                        'Su Publicacion ha sido eliminado.',
                        'success'
                    )

                    axios.get('http://192.168.32.90/Publicaciones_eventos2/apiRest/public/api/publicaciones/eliminar', {
                        params: {
                            id: id
                        }
                    })
                        .then(response => {
                            console.log(response);
                            this.mostrar()
                        })
                        .catch(error => {
                            console.log(error);
                            alert(error)
                        })

                }
            })

        },
        //////////////////////////////////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////    Actualizar Publicacion   /////////////////////////////////////////////////////////////
        actualizar: function (item) {

            // asignandole a el arreglo items  el arreglo item que obtenemos al pulsar el boton actualizar
            this.items = item


            for (let i = 0; i < insertar.length; i++) {
                insertar.splice(i);

            }

            for (let i = 0; i < eliminar.length; i++) {
                eliminar.splice(i);

            }

            for (let i = 0; i < imagenes.length; i++) {
                imagenes[i].img = null;
                $('.delete').remove();
            }
            // asignandole a el arreglo h  el valor de el arreglo de imagenes            
            var h = this.items.img
            // for para recorrer el arreglo h que contiene todas las imagenes que obtenemos de la publicacion seleccionada
            for (let i = 0; i < h.length; i++) {
                // obteniendo el valor de una imagen
                var m = h[i].img;
                var d = h[i].id;

                var imgs = { img: "", id: "", idpublic: "" }
                // insertar la imagen obtenida por cada giro y asignarle la imagen a el json imgs
                imgs.img = m
                imgs.id = d
                imgs.idpublic = item.id
                // insertar  el json imgs al arreglo imagenes
                imagenes.push(imgs);

            }
            idpublicaciones.idpublic = item.id

        }
        ,
        /////////////////////////////////////////////////////////  para eliminar imagenes   /////////////////////////////////////////////////
        borrar2: function (imgs) {

            //asignandole el valor de la imagen que obtenemos al pulsar el boton de borrar imagen y selo asignamos a la varible img
            var img = imgs.img
            var id = imgs.id


            var eli = { id: "" }
            eli.id = imgs.id
            eliminar.push(eli)


            this.img = img
            //for para comparar las images para poder eliminarlas de el arreglo con splice 
            for (var i = 0; i < imagenes.length; i++) {
                if (imagenes[i].img == img) {
                    imagenes.splice(i, 1);
                    break;
                }
            }
            //for para comparar las images para poder eliminarlas de el arreglo insertar con splice 
            for (var i = 0; i < insertar.length; i++) {
                if (insertar[i].img == img) {
                    insertar.splice(i, 1);
                    break;
                }
            }


        },
        /////////////////////////////////////////////////////////////////////////

        modificar: function (id) {

            axios.put('http://192.168.32.90/Publicaciones_eventos2/apiRest/public/api/publicaciones/modi', {

                id: id,
                contenido: this.items.contenido,
                titulo: this.items.titulo,
                autor: this.items.autor,
                eliminar: this.eliminar,
                insertar: this.insertar
            })

                .then(response => {
                    this.mostrar()
                    Swal.fire({
                        type: 'success',
                        title: 'Modificación con Éxito',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.log(error);
                    alert(error)
                })

        }
        ,
        /////////////////////////////////////    eliminar Publicacion   ///////////////////////////////////////////////

        vermas: function (id) {
            window.location.href = "../vista/Beta2.html?=" + id
        },
    }
});