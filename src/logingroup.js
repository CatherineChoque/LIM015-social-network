
const secciones = document.querySelector('#secciones');

// creando dinamicamente la vista login (href = muro)
export const createLogin = `
<form action="" id="login-form">
  <input type="email" placeholder="email" class="login-input" id="login-email" required>
  <input type="password" placeholder="password" class="login-input" id="login-password" required>
  <div class="mostrar">
      <input type="checkbox" class="show-password" id="show-password">
      <label for="accept" >Mostrar contraseña</label>
  </div>
  <button type="button" id="login-button" class="submit-button">LOGIN</button>
</form>
<p>OR</p>
<button type="button" id="google-login" class="google-login">
  <img src="./imagen/google.png" class="imgGoogle"/>
  Log in with  google
</button>
<p>Dont have an account?<a href="#signup" id="signingup">Sign up</a></p> 
<a href="#">Forgot my password</a>`;
secciones.innerHTML = createLogin;

// creando dinamicamente la vista registro (href = login)
export const createSignup = `
  <p>Travel with me</p>
  <form action="" id="signup-form">
    <input type="text" placeholder="Fullname" class="login-input" id="fullname" required>
    <input type="text" placeholder="Username" class="login-input" id="username" required>
    <input type="password" placeholder="Password" class="login-input"  id="signup-password" required minlength="6" maxlength="12">
    <p id="shortPassword"></p>
    <input type="password" placeholder="Confirm password" class="login-input" required>
    <input type="email" placeholder="Email" class="login-input" id="signup-email" required>
    <div class="terminos">
      <input type="checkbox" class="accept" id="accept">
      <label for="accept">He Leido y acepto los terminos y condiciones</label>
    </div>
    <button type="button" id="submit-button" class="submit-button">SIGN UP</button>
  </form>
  <button class="cancel-button" id="cancel-button">Cancel</button>`;

// creando dinamicamente la vista muro (href = login)
export const createMuro = `
    <p>LOGRASTE INGRESAR: BIENVENIDO A TRAVELER.PE</p>
    <p>Estos son los traveleros:</p>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <ul class="list-group" id="userslist">
            
          </ul>

        </div>
      </div>
    </div>
    <button class="logout-button" type="button" id="logout-button">LOGOUT</button>`;


      // icono para mostrar contraseña
      const showPassword = document.querySelector('#show-password');
      showPassword.addEventListener('change', () => {
        const password1 = document.querySelector('#login-password');
          if ( password1.type === "text" ) {
              password1.type = "password"
          } else {
              password1.type = "text"
          }
      });

