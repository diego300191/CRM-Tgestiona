
<script lang="ts" setup >
import { ref } from "vue";
import stateStore from "@/utils/store";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();


const AddOportunidad = () => {
    router.push({ name: "Oportunidad-addOportunidad" });
  };

const stateStoreInstance = stateStore;

</script>


<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
        <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
            <div
              class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
            >
            <div class="d-flex align-items-center">
                <form class="search-box position-relative me-15">
                  <input
                    type="text"
                    class="form-control shadow-none text-black rounded-0 border-0"
                    placeholder="Buscar Oportunidad"
                  />
                  <button
                    type="submit"
                    class="bg-transparent text-primary transition p-0 border-0"
                  >
                    <i class="flaticon-search-interface-symbol"></i>
                  </button>
                </form>
              
              </div>
              <div class="d-sm-flex align-items-center">
                <button
                  class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0"
                  type="button"
                @click="AddOportunidad()"
                >
                  Nuevo Oportunidad
                  <i class="flaticon-plus position-relative ms-5 fs-12"></i>
                </button>
                <!-- <button
                  class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
                  type="button"
                >
                  Exportar
                  <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
                </button> -->
              </div>
              
            </div>
            <div class="card-body p-15 p-sm-20 p-md-25">
              <div class="table-responsive">
                <table class="table text-nowrap align-middle mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                      >
                        NOMBRES 
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        EMPRESA
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        CARGOS
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        EMAIL
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        TELEFONO
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        SECTOR
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        TIPO CLIENTE
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th
                        class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                          >
                          Rola Pharmaceuticals
                          </div>
                        </div>
                      </th>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        K. Hong
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        cargo 1
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        hong3215@gmail.com
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        +1-134-345-5926
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        ENERGÍA
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        CLIENTE ACTUAL
                      </td>
                      <td
                        class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                      >
                          <button
                            class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            @click="stateStoreInstance.createNewModal"
                          >
                            <i class="flaticon-dots"></i>
                          </button>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                          >
                          Rola Pharmaceuticals
                          </div>
                        </div>
                      </th>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        K. Hong
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        cargo 1
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        hong3215@gmail.com
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        +1-134-345-5926
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        ENERGÍA
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        CLIENTE ACTUAL
                      </td>
                      <td
                        class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                      >
                          <button
                            class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            @click="stateStoreInstance.createNewModal"
                          >
                            <i class="flaticon-dots"></i>
                          </button>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                          >
                          Rola Pharmaceuticals
                          </div>
                        </div>
                      </th>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        K. Hong
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        cargo 1
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        hong3215@gmail.com
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        +1-134-345-5926
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        ENERGÍA
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        CLIENTE ACTUAL
                      </td>
                      <td
                        class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                      >
                          <button
                            class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            @click="stateStoreInstance.createNewModal"
                          >
                            <i class="flaticon-dots"></i>
                          </button>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                          >
                          Rola Pharmaceuticals
                          </div>
                        </div>
                      </th>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        K. Hong
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        cargo 1
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        hong3215@gmail.com
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        +1-134-345-5926
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        ENERGÍA
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        CLIENTE ACTUAL
                      </td>
                      <td
                        class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                      >
                          <button
                            class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            @click="stateStoreInstance.createNewModal"
                          >
                            <i class="flaticon-dots"></i>
                          </button>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                          >
                          Rola Pharmaceuticals
                          </div>
                        </div>
                      </th>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        K. Hong
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        cargo 1
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        hong3215@gmail.com
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        +1-134-345-5926
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        ENERGÍA
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        CLIENTE ACTUAL
                      </td>
                      <td
                        class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                      >
                          <button
                            class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            @click="stateStoreInstance.createNewModal"
                          >
                            <i class="flaticon-dots"></i>
                          </button>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                          >
                          Rola Pharmaceuticals
                          </div>
                        </div>
                      </th>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        K. Hong
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        cargo 1
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        hong3215@gmail.com
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        +1-134-345-5926
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        ENERGÍA
                      </td>
                      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                        CLIENTE ACTUAL
                      </td>
                      <td
                        class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                      >
                          <button
                            class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            @click="stateStoreInstance.createNewModal"
                          >
                            <i class="flaticon-dots"></i>
                          </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
              >
                <p class="mb-0 text-paragraph"></p>
                <nav class="mt-15 mt-md-0">
                  <ul class="pagination mb-0">
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Previous">
                        <i class="flaticon-chevron-1"></i>
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link active" href="#">1</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="flaticon-chevron"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
      </div>
    </div>
  </template>
  