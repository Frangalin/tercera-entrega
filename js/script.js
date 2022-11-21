const titulo = document.querySelector("#titulo"),
  autor = document.querySelector("#autor"),
  isbn = document.querySelector("#isbn"),
  categoria = document.querySelector("#categoria"),
  precio = document.querySelector("#precio"),
  search = document.querySelector("#search"),
  tbody = document.querySelector("#table-body"),
  btnGuardar = document.querySelector("#btnGuardar");
const radios = document.querySelectorAll('input[type="radio"]');

const inventario = [
  {
    titulo: "El resplandor",
    autor: "Stephen King",
    isbn: "36515615",
    categoria: "Novela",
    precio: 8000,
  },
  {
    titulo: "Cementerio de animales",
    autor: "stephen king",
    isbn: "261655265",
    categoria: "Terror",
    precio: 7500,
  },
];

let libros;
if (JSON.parse(localStorage.getItem("inventario"))) {
  libros = JSON.parse(localStorage.getItem("inventario"));
} else {
  libros = [];
}

function Libro(titulo, autor, isbn, categoria, precio) {
  this.titulo = titulo;
  this.autor = autor;
  this.isbn = isbn;
  this.categoria = categoria;
  if (precio == "") {
    this.precio = 1;
  } else {
    this.precio =parseFloat(precio);
  }
}

function cargarInventario(arr, libro) {
  return arr.push(libro);
}

function guardarLS(arr) {
  localStorage.setItem("inventario", JSON.stringify(arr));
}
function guardarLS(arr,key) {
  localStorage.setItem(key, JSON.stringify(arr));
} 

function recuperarLS(key) {
  return JSON.parse(localStorage.getItem(key));
}


function filtrar(arr, filtro, param) {
  return arr.filter((el) => {
    if (param == "precio") {
      return el[`${param}`] <= parseFloat(filtro);
    } else {
      return el[`${param}`].includes(filtro);
    }
  });
}


function crearHtml(arr) {
  tbody.innerHTML = "";

  let html = "";
  for (const item of arr) {
    html = `<tr>
              <td>${item.titulo}</td>
              <td>${item.autor}</td>
              <td>${item.isbn}</td>
              <td>${item.categoria}</td>
              <td>${item.precio}</td>
              <td><button class="btn red" id="${item.isbn}">Borrar</button></td>
            </tr>`;
    tbody.innerHTML += html;
  }

  const arrayBotones = document.querySelectorAll('td .btn');
  arrayBotones.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      console.log(btn.id);
      libros= libros.filter(el=>el.isbn != btn.id);
      guardarLS(libros);
      crearHtml(libros)
    })
  })

}

function limpiarCampos() {
  titulo.value = "";
  autor.value = "";
  isbn.value = "";
  categoria.value = "";
  precio.value = "";
}

guardarLS(libros);
crearHtml(libros);

//Listeners
btnGuardar.addEventListener("click", () => {
  const nuevoLibro = new Libro(
    titulo.value,
    autor.value,
    isbn.value,
    categoria.value,
    precio.value,
  );
  cargarInventario(libros, nuevoLibro);
  limpiarCampos();
  guardarLS(libros);
  crearHtml(libros);
});


search.addEventListener("input", () => {
  let nuevoFiltro = filtrar(libros, search.value, "titulo");
  crearHtml(nuevoFiltro);
});

for (const radio of radios) {
  console.log(radio);
  radio.addEventListener('change', ()=>{
    if(radio.checked){
      search.addEventListener("input", () => {
        let nuevoFiltro = filtrar(libros, search.value, radio.value);
        crearHtml(nuevoFiltro);
      });

    }
  })
}
