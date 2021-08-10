import {createLogin, createSignup, createMuro} from './logingroup.js';
import {crearUsuarioFb} from './firebase.js';
import {showAuthUsers} from './authuser.js';
import {cerrarSesion} from './logout.js';
import {validarRegistro, camposLlenos} from './validaciones.js';


//ENROUTAMIENTO codigo bonito
const secciones = document.querySelector('#secciones');


//EVITANDO 404 - funcion cambioRuta
const cambioRuta = () => {
    console.log(window.location.pathname);
    if(window.location.pathname === '/login'){
      console.log('mostrar login');
      secciones.innerHTML = createLogin;
    } else if (window.location.pathname === '/signup'){
      console.log('mostrar registro');
      secciones.innerHTML = createSignup;
    } else if (window.location.pathname === '/muro'){
      console.log('mostrar muro');
      secciones.innerHTML = createMuro;
      showAuthUsers();
      cerrarSesion();
    }
}

// RUTA SIN #
const changeRoute = (hash) => {
  if (hash === '#login') {
    window.history.replaceState({}, 'login', '/login');
  } else if (hash === '#signup') {
    window.history.replaceState({}, 'signup', '/signup');
  } else if (hash === '#muro') {
    window.history.replaceState({}, 'muro', '/muro');
  }
  
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    changeRoute(window.location.hash);
    cambioRuta();
  } else {
    window.location.hash = 'login';
    changeRoute(window.location.hash);
    cambioRuta();
  }
});

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#signup') {
    console.log('mostrar registro');
    changeRoute(window.location.hash);
    cambioRuta();
    //PROCESO DE REGISTRO:
    const signupForm = document.querySelector("#signup-form");
    const botonForm = document.querySelector("#submit-button");
    validarRegistro();

    botonForm.addEventListener("click", (e) => {
      e.preventDefault();
      
      console.log("registrandote");
      const signupEmail = document.querySelector("#signup-email").value;
      const signupPassword = document.querySelector("#signup-password").value;
      const usernameInput = document.querySelector("#username").value;
      const fullnameInput = document.querySelector("#fullname").value;
      const passwordInput = document.querySelector('#signup-password').value;
      const emailInput = document.querySelector('#signup-email').value;

      crearUsuarioFb(signupEmail, signupPassword, usernameInput, fullnameInput, passwordInput, emailInput);
      
      console.log('cambiar pantalla');
      camposLlenos();
      if (camposLlenos()) {
        window.history.pushState( {} , 'signup', '/login' );
        changeRoute();
        cambioRuta();
      }; //okis sigamos en latarde, a que hora puedes? a las 5pm esta bien? Si, quedaaaa genial!!!
      
      
    });
  } // termina el if
    
}); // termina el evento hashchange 



// FLECHAS DE ATRAS Y ADELANTE ------> NO FUNCIONA!
/* window.onpopstate( () => {
  if(window.location.pathname === '/login'){
    secciones.innerHTML = createLogin;
    console.log(' LOGIN')
  } else if (window.location.pathname === '/signup'){
    secciones.innerHTML = createSignup;
    console.log(' REGISTRO')
  }
}); */

//PROCESO DE LOGIN

//Login con email y contraseña:
const loginForm = document.querySelector("#login-form");
const loginButon = document.querySelector('#login-button');

loginButon.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('logueandote');
  const loginEmail = document.querySelector('#login-email').value;
  const loginPassword = document.querySelector('#login-password').value;
  console.log(loginEmail, loginPassword);

  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {
      console.log('logueado');
      loginForm.reset();
      window.history.pushState( {} , 'login', '/muro' );
      cambioRuta();
    }) // fin then
    .catch((err) => {
      const wrongLoginPassword = document.querySelector('#wrongpassword');
      const wrongLoginEmail = document.querySelector('#wrongemail');
      if (err.message == 'The password is invalid or the user does not have a password.'){
        wrongLoginPassword.innerHTML = 'La contraseña es incorrecta';
        wrongLoginPassword.style.color = 'red'
      }
      if (err.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
        wrongLoginEmail.innerHTML = 'Este correo no es valido, por favor corrigelo';
        wrongLoginEmail.style.color = 'red'
      }
    })
  //Termina login con firebase
});

//Logearse con google
const googleButton = document.querySelector("#google-login");
googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log("te logueaste con google");
      loginForm.reset();
      window.history.pushState( {} , 'login', '/muro' );
      cambioRuta();
    })
    .catch((err) => {
      console.log(err);
    })
  //Termina login google con firebase
});
