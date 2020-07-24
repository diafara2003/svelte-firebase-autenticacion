<script>
  import { db } from "./firebase.js";
  import { auth } from "./firebase.js";
  import { push } from "svelte-spa-router";
  import { storage } from "./firebase";
  let emailUser = "";
  let idUser = "";

  auth.onAuthStateChanged((user) => {
    if (user) {
      emailUser = user.email;
      idUser = user.uid;
    } else push("/");
  });

  let nombre = "";
  let idUodate = 0;
  let email = "";
  let users = [];
  let ruta = "";
  let files;

  db.collection("users")
    .orderBy("nombre", "asc")
    .onSnapshot((data) => {
      users = data.docs;
    });
  function addUser() {
    let file = "";

    if (files && files[0]) {
      file = files[0].name + Math.random().toString(30);
    }

    storage
      .child("imagenes/" + file)
      .put(files[0])
      .then((onSnapshot) => {
        console.log("imagen cargada");
        onSnapshot.ref.getDownloadURL().then((url) => {
          console.log(url);

          db.collection("users").add({
            nombre: nombre,
            email: email,
            ruta: url,
          });
          limpiarDatos();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateUser() {
    db.collection("users").doc(idUodate).update({
      nombre: nombre,
      email: email,
    });
    limpiarDatos();
  }
  let user = {};
  function userbyId(id) {
    db.collection("users")
      .doc(id)
      .onSnapshot((data) => {
        user = data.data();
      });
  }
  function deleteUser(id) {
    db.collection("users").doc(id).delete();
  }
  function limpiarDatos() {
    nombre = "";
    email = "";
  }
  function enviarForm(x, y, z) {
    nombre = x;
    email = y;
    idUodate = z;
  }

  function salir() {
    auth.signOut();
    push("/");
  }
</script>

<h1>CRUD firestore</h1>
<h4>Bienvenido {emailUser}</h4>
<input type="hidden" bind:value={idUodate} />
<input type="text" placeholder="Nombre" bind:value={nombre} />
<input type="text" placeholder="Email" bind:value={email} />
<input type="file" bind:files />
<button class="btn blue" on:click={addUser}>Guardar</button>
<button class="btn green" on:click={updateUser}>Actualizar</button>

<table class="highlight">
  <tr>
    <th />
    <th>Id</th>
    <th>Nombre</th>
    <th>Correo</th>
    <th>Eliminar</th>
    <th>Editar</th>
    <th>Enviar id</th>
  </tr>
  {#each users as item}
    <!-- content here -->
    <tr>
      <td>
        <img
          src={item.data().ruta}
          width="100"
          alt=""
          height="100"
          class="circle" />
      </td>
      <td>{item.id}</td>
      <td>{item.data().nombre}</td>
      <td>{item.data().email}</td>
      <td>
        <button class="btn red" on:click={deleteUser(item.id)}>Eliminar</button>
      </td>
      <td>
        <button
          class="btn orange"
          on:click={enviarForm(item.data().nombre, item.data().email, item.id)}>
          Editar
        </button>

      </td>
      <td>
        <button class="btn cyan" on:click={userbyId(item.id)}>Enviar id</button>

      </td>
    </tr>
  {:else}
    <tr>
      <td colspan="6">
        <p>No hay datos en FireStore</p>
      </td>
    </tr>
  {/each}
</table>

{#if files && files[0]}
  <p>{files[0].name}</p>
{/if}
<button class="btn red" on:click={salir}>Cerrar sesion</button>
