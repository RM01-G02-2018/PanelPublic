//arreglo para mostrar las imagenes en los formularios de modificar y agregar
var imagenes = [];
// var simagenes = [];
var idpublicaciones = { idpublic: "" };
var eliminar = []
var insertar = []
// console.log("imagenes");
// console.log(imagenes);
// console.log("insertar");
// console.log(insertar);

const app = new Vue({
    el: '#app',
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
        insertar: insertar
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
                //    console.log(imagenes[0].idpublic);
                // insertar  el json imgs al arreglo imagenes
                imagenes.push(imgs);
                // console.log(reader.result);

                var imgPu = { img: "", id: "" }
                // insertar las imagenes obtenidas por el formulario al json imgs
                imgPu.img = reader.result
                imgPu.id = idpublicaciones.idpublic
                //    console.log(imagenes[0].idpublic);
                // insertar  el json imgs al arreglo imagenes
                insertar.push(imgPu);


            }
            reader.readAsDataURL(file);

            // console.log(file);

        },
        mostrar: function () {
            axios.get('http://192.168.32.106/Publicaciones_eventos2/apiRest/public/api/publicaciones/lista')
                .then(response => {
                    //asignarle al arreglo publicaciones la respuesta donde obtenemos todas las publicaciones
                    this.publicaciones = response.data.public;
                    // console.log( response);

                })
                .catch(error => {
                    console.log(error);

                })
        },
        //////////////////////////////////////////////////////////////
        /*imagenes ingresadas en Nuevas Publicaciones */ 
        borrar: function (img) {
            //for para comparar las images para poder eliminarlas de el arreglo con splice      
            for (var i = 0; i < imagenes.length; i++) {
                if (imagenes[i].img == img) {
                    imagenes.splice(i, 1);
                    break;
                }
            }
        },
        ////////////////////////////
        /* */
        vaciarDatos:function(){
           this.autor= '';
            this.titulo= '';
            this.img= '';
            this.contenido= '';
            this.imagenes= '';
        },
        ///////////////////////////
        /* Agregar publicacion  */
     
        agregar: function (data) {
            
            axios.post('http://192.168.32.106/Publicaciones_eventos2/apiRest/public/api/publicaciones/insertar', {
                contenido: this.contenido,
                titulo: this.titulo,
                autor: this.autor,
                imagenes: this.imagenes
            })

                .then(response => {

                    // console.log(response);
                    this.mostrar()
                })
                .catch(error => {
                    console.log(error);
                    alert(error)
                })
         
        },
        ///////////////////////////
        /* Eliminar Publicacion */
        elimina: function (id) {
            // alerta de confirmacion para eliminar una publicacion
            var eliminar = confirm("desea eliminar esta publicacion");
            if (eliminar == true) {
                axios.get('http://192.168.32.106/Publicaciones_eventos2/apiRest/public/api/publicaciones/eliminar', {
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
          
            } else {

            }

        },
        ////////////////////////////// 
        /* Actualizar Publicacion 
        Mostrar Datos a Modificar 
        del Item en formulario*/ 
        actualizar: function (item) {
            // asignandole a el arreglo items  el arreglo item que obtenemos al pulsar el boton actualizar
            this.items = item
            // asignandole a el arreglo h  el valor de el arreglo de imagenes            
            var h = this.items.img
            // for para recorrer el arreglo h que contiene todas las imagenes que obtenemos de la publicacion seleccionada
            for (let i = 0; i < h.length; i++) {
                // obteniendo el valor de una imagen
                var t = h[i].img;

                var imgs = { img: "" }
                // insertar la imagen obtenida por cada giro y asignarle la imagen a el json imgs
                imgs.img = t
                // insertar  el json imgs al arreglo imagenes
                imagenes.push(imgs);
                // console.log(t);

            }
            var g = item.img
            console.log(  this.items);
            

        },
        ////////////////////////////////////////////////////
        /*imagenes ingresadas en Modificar Publicaciones */ 
        borrar2: function (img) {
            //asignandole el valor de la imagen que obtenemos al pulsar el boton de borrar imagen y selo asignamos a la varible img
            this.img = img
            //for para comparar las images para poder eliminarlas de el arreglo con splice 
            for (var i = 0; i < imagenes.length; i++) {
                if (imagenes[i].img == img) {
                    imagenes.splice(i, 1);
                    break;
                }
            }
        },
        /*Actualizar/modificar la publicacion */
        modificar: function (id) {
            axios.put('http://192.168.32.106/Publicaciones_eventos2/apiRest/public/api/publicaciones/modi', {
                id: id,
                contenido: this.items.contenido,
                titulo: this.items.titulo,
                autor: this.items.autor,
                imagenes: this.imagenes,
                insertar: this.insertar
                // imagenes: this.imagenes
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
    },

})
