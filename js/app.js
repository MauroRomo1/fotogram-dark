class Usuario {
  constructor(nombre, username, email, password, imagen, activo = true) {
    this.nombre = nombre;
    this.username = username;
    this.email = email;
    this.password = password;
    this.imagen = imagen;
    this.activo = activo;
  }
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

//form registro validación---------------------------------
let forms = document.querySelectorAll(".needs-validation");

// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        console.log("todo bien");
        agregarUsuario();
      }

      form.classList.add("was-validated");
    },
    false
  );
});

//---------------------------------------------

//---------Agregar usuario usando el formulario de registro----

const agregarUsuario = function () {
  let email = document.querySelector("#validationCustom01").value;
  let nombre = document.querySelector("#validationCustom02").value;
  let username = document.querySelector("#validationCustom03").value;
  let password = document.querySelector("#validationCustom04").value;
  let avatar = document.querySelector("#validationCustom05").value;

  //llamo a la función que valida email y username si ya existe
  let validar = validarUsuario(email, username);

  if (!validar) {
    usuarios.push(new Usuario(nombre, username, email, password, avatar));
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro realizada con exito");
    location.href = "../index.html";
  } else {
    alert("Usuario ya existe, inicie sesión con sus datos");

    location.reload();
  }
};

//Validar si el correo y username ya existe en el arreglo de susuarios
const validarUsuario = function (correo, username) {
  let checkEmail = usuarios.find(function (usuario) {
    return usuario.email === correo;
  });

  let checkUsername = usuarios.find(function (usuario) {
    return usuario.username === username;
  });

  if (checkEmail || checkUsername) {
    return true;
  } else {
    return false;
  }
};

//validar datos de logueo---------------------------------------

//Validar los datos de logueo----------------------
const validarDatos = function () {
  let inputEmail = document.querySelector("#input_email").value;
  let inputPassword = document.querySelector("#input_password").value;

  let validar_email = usuarios.find(function (usuario) {
    return usuario.email === inputEmail;
  });

  if (validar_email) {
    //Verifico si el usuario está activo sino no avanzará
    if (!validar_email.activo) {
      return alert("No puede iniciar sesión con este usuario");
    }
    //-------------------------------------------

    if (validar_email.password === inputPassword) {
      console.log("Usuario encontrado");
      let datos = {
        email: validar_email.email,
        username: validar_email.username,
        avatar: validar_email.imagen,
      };
      localStorage.setItem("usuario", JSON.stringify(datos));

      location.replace("./pages/home.html");
    } else {
      alert("Email o contraseña incorrecto");
    }
  } else {
    alert("Email o contraseña incorrecto");
  }
};

if (document.querySelector("#formulario")) {
  document
    .querySelector("#formulario")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      validarDatos();
    });
}
