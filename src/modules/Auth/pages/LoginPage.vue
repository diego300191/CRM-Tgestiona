<script lang="ts"  setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();


const ingresar = () => {
    router.push({ path: "/" });
  };

</script>

<template>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div class="row justify-content-center">
    <div class="col-md-10 col-lg-8 col-xl-9 col-xxl-8 col-xxxl-6">
      <div class="card mb-25 border-0 rounded-0 bg-white authentication-card">
        <div class="card-body letter-spacing">
          <h4 class="text-black fw-bold mb-0 text-center">
            INGRESA A TU CUENTA
          </h4>
          <form>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                USUARIO
              </label>
              <input
                type="email"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. adam127704@gmail.com"
              />
            </div>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                CONTRASEÑA
              </label>
              <input
                type="password"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="**************"
              />
            </div>
           
            <button
              class="default-btn transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 bg-success d-block w-100"
              type="submit"
              @click="ingresar()"
            >
              INGRESAR
            </button>
           
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

