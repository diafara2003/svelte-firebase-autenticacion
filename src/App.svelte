<script>
  import { db } from "./firebase.js";
  let nombre = "";
  let idUodate = 0;
  let email = "";
  let users = [];

  db.collection("users")
    .orderBy("nombre", "asc")
    .onSnapshot((data) => {
      users = data.docs;
    });
  function addUser() {
    db.collection("users").add({
      nombre: nombre,
      email: email,
    });
    limpiarDatos();
  }

  function updateUser() {
    db.collection("users").doc(idUodate).update({
      nombre: nombre,
      email: email,
    });
    limpiarDatos();
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
</script>

<nav class="blue" />

<div class="container">
  <h1>CRUD firestore</h1>
  <input type="hidden" bind:value={idUodate} />
  <input type="text" placeholder="Nombre" bind:value={nombre} />
  <input type="text" placeholder="Email" bind:value={email} />

  <button class="btn blue" on:click={addUser}>Guardar</button>
  <button class="btn green" on:click={updateUser}>Actualizar</button>

  <table class="highlight">
    <tr>
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
        <td>{item.id}</td>
        <td>{item.data().nombre}</td>
        <td>{item.data().email}</td>
        <td>
          <button class="btn red" on:click={deleteUser(item.id)}>
            Eliminar
          </button>
        </td>
        <td>
          <button
            class="btn orange"
            on:click={enviarForm(item.data().nombre, item.data().email, item.id)}>
            Editar
          </button>

        </td>
        <td />
      </tr>
    {:else}
      <tr>
        <td colspan="6">
          <p>No hay datos en FireStore</p>
        </td>
      </tr>
    {/each}
  </table>
</div>
