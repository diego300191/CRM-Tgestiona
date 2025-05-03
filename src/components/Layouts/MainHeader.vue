<template>
  <header
    :class="[
      'header-area bg-black text-center text-md-start pt-15 pb-15 ps-15 pe-15 ps-md-20 pe-md-20 pe-lg-30 transition mb-25 position-fixed',
      { sticky: isSticky },
    ]"
    id="header"
  >
    <div class="row align-items-center">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <div
          class="header-left-side justify-content-center justify-content-md-start d-flex align-items-center"
        >
          <button
            class="header-burger-menu transition position-relative lh-1 bg-transparent p-0 border-0"
            id="header-burger-menu"
            @click="stateStoreInstance.onChange"
          >
            <i class="flaticon-menu-3" style="color: white;"></i>
          </button>
        </div>
      </div>
      <div class="col-xl-8 col-lg-7 col-md-6">
        <div
          class="header-right-side d-flex align-items-center justify-content-center justify-content-md-end"
        >
          <div class="dropdown">
            <button
              class="btn dropdown-toggle text-start fs-14 text-black-emphasis d-flex align-items-center p-0 position-relative bg-transparent border-0 transition lh-1"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="../../assets/images/admin.jpg"
                class="rounded"
                width="44"
                height="44"
                alt="admin"
              />
              <span class="title d-none d-lg-block ms-10 ms-lg-15">
                <span class="d-block fw-bold mb-5 mb-md-8" style="color: white;">Victor James</span>
                <span class="text-body-emphasis fw-semibold fs-13" style="color: white;">Admin</span>
              </span>
            </button>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <router-link class="dropdown-item text-body-secondary fw-semibold" to="/login">
                  <i class="flaticon-logout me-2"></i>Logout
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import stateStore from "../../utils/store";

export default defineComponent({
  name: "MainHeader",
  setup() {
    const stateStoreInstance = stateStore;
    const isSticky = ref(false);

    onMounted(() => {
      window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;
        isSticky.value = scrollPos >= 100;
      });
    });

    return {
      isSticky,
      stateStoreInstance,
    };
  },
});
</script>