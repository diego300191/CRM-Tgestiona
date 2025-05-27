<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/modules/Auth/store/useAuthStore";
const store = useAuthStore();

const userName = ref<string>("");
const contrasena = ref<string>("");


const ingresar = (user : string, password : string) => {
  store.login(user, password, "jEQWOcnY=6565JFSDUEWBNLJFSDUE");
};


</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-md-6 col-lg-4">
      <div class="card border-0 rounded-3 shadow-sm bg-white">
        <div class="card-body p-4 text-center">
          <!-- Tgestiona Logo -->
          <img src="../../../assets/images/logo_tgestiona.png" alt="Tgestiona Logo" class="mb-4" style="max-width: 200px;" />

          <!-- Welcome Message -->
          <h5 class="text-dark mb-4">Bienvenido - Tgestiona</h5>

          <!-- Form -->
          <form @submit.prevent="ingresar(userName,contrasena)">
            <!-- Username Field -->
            <div class="mb-3 text-start">
              <label for="usuario" class="form-label text-dark">Usuario</label>
              <input
                type="text"
                id="usuario"
                class="form-control rounded-0"
                placeholder="e.g. adam127704"
                v-model="userName"
              />
            </div>

            <!-- Password Field -->
            <div class="mb-3 text-start">
              <label for="password" class="form-label text-dark">Password</label>
              <input
                type="password"
                id="password"
                class="form-control rounded-0"
                placeholder="**************"
                v-model="contrasena"
              />
            </div>

            <!-- Checkbox -->
            <div class="form-check mb-3 text-start">
              <input type="checkbox" class="form-check-input" id="mantener-conectado" checked :disabled="true"/>
              <label class="form-check-label text-dark" for="mantener-conectado">
                Mantenerme conectado
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn btn-primary w-100 rounded-3 text-white"
              style="background-color: #0056D2;"
            >
              Iniciar Sesión
            </button>
          </form>

          <!-- Forgot Password Link -->
          <!-- <div class="text-start mt-3">
            <a href="#" class="text-primary">Olvido Contraseña</a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Center the form vertically and horizontally */
.min-vh-100 {
  min-height: 100vh;
}

/* Card styling */
.card {
  border-radius: 10px !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Form input styling */
.form-control {
  border: 1px solid #ced4da;
  padding: 10px;
  font-size: 14px;
}

/* Button styling */
.btn-primary {
  background-color: #0056D2;
  border: none;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
}

/* Links */
a {
  font-size: 14px;
  color: #0056D2;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Image centering */
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>