<script>
  import { auth } from "./firebase.js";
  import { push } from "svelte-spa-router";

  let email = "";
  let password = "";
  let IsError = false;

  auth.onAuthStateChanged((user) => {
    if (user) push("/Crud");
  });

  function registro(email, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("registrado");
      })
      .catch((error) => {
        IsError = true;
      });
  }

  function login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        push("/Crud");
      })
      .catch((error) => {
        IsError = true;
      });
  }
</script>

<h1>Login/Registro</h1>

<input type="email" placeholder="Email" bind:value={email} />
<input type="password" placeholder="Password" bind:value={password} />
<button class="btn blue" on:click={login(email, password)}>
  Iniciar Session
</button>
<button class="btn green" on:click={registro(email, password)}>
  Registrarse
</button>
{#if IsError}
  <div class="row">
    <div class="col s12 red" style="margin-top:10px;padding:10px">
      <span class=" white-text">Usuario o clave invalidos</span>
    </div>
  </div>
{/if}
