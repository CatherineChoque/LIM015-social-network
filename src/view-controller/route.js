import { createLogin, createSignup, createHome } from './logingroup.js';
import { createNewPost, viewPost, editPost } from './postgroup.js';
// import { showAuthUsers } from './authuser.js';
import { showFsPost, showMyPosts } from './fsPost.js';
import { signOff } from './logout.js';
import { registerValidation } from './validations.js';
import { showCommentary } from './comments.js';
import { pageNotFound } from './notfound.js';
import { pageprofile, setProfileAttributes } from './profile.js';

const segments = document.querySelector('#segments');

const showSeccion = (route) => {
  segments.innerHTML = '';
  function setHash(seccion) {
    segments.innerHTML = seccion;
  }
  switch (route) {
    case '#login': {
      setHash(createLogin);
      showingPassword();
      loginClick();
      googleRegistration();
      // console.log('hola estoy en login');
      break;
    }
    case '#signup': {
      setHash(createSignup);
      cancelRegistration();
      registerValidation();
      // console.log('hola estoy en regsitro');
      break;
    }
    case '#newpost': {
      setHash(createNewPost);
      addNewPost();
      signOff();
      // console.log('hola estoy en crear post');
      break;
    }

    case '#viewpost': {
      segments.innerHTML = viewPost;
      window.addEventListener('hashchange', dataPost());
      showCommentary();
      dataPost();
      modalFunction();
      removePost();
      signOff();
      // console.log('hola estoy en ver post');
      break;
    }

    case '#editpost': {
      segments.innerHTML = editPost;
      postEditing();
      savePost();
      signOff();
      // console.log('hola estoy en crear post');
      break;
    }
    case '#home': {
      segments.innerHTML = createHome;
      showFsPost();
      signOff();
      // console.log('hola estoy en muro');
      break;
    }
    case '#profile': {
      segments.innerHTML = pageprofile;
      setProfileAttributes();
      showMyPosts();
      signOff();
      // console.log('hola estoy en profile');
      break;
    }
    case '': {
      segments.innerHTML = createLogin;
      showingPassword();
      loginClick();
      googleRegistration();
      // console.log('hola estoy en login');
      break;
    }
    case '/': {
      segments.innerHTML = createLogin;
      showingPassword();
      loginClick();
      googleRegistration();
      // console.log('hola estoy en login');
      break;
    }
    default: {
      segments.innerHTML = pageNotFound;
      break;
    }
  }
};
//--------------

// si el usuario esta logeado
const userLoggedIn = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      showSeccion(window.location.hash);
    } else {
      window.location.hash = '#login';
    }
  });
  window.addEventListener('hashchange', () => showSeccion(window.location.hash));
};
// función que muestra la vista al momento de recargar
window.addEventListener('load', userLoggedIn);
//-------------

// FLECHAS DE ATRAS Y ADELANTE
window.addEventListener('popstate', () => {
  // console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state);
  // console.log('POPOPOPOPOP');
  if (window.location.pathname === 'login') {
    segments.innerHTML = createLogin;
    // console.log(' LOGIN');
  } else if (window.location.pathname === 'signup') {
    segments.innerHTML = createSignup;
    // console.log(' REGISTRO');
  }
}); // -----------
