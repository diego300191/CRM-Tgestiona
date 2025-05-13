<script setup lang="ts">
import { toRef, computed, type Ref, defineProps, defineEmits } from "vue";

interface Props {
  totalPages: number;
  currentPages: number;
  totalRegister: any[]; // O especifica un tipo más concreto si es posible
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'pageChanged', page: number): void;
  (event: 'page', page: number): void;
}>();

const totalPages: Ref<number> = toRef(props, "totalPages");
const currentPages: Ref<number> = toRef(props, "currentPages");
const totalRegister: Ref<any[]> = toRef(props, "totalRegister"); // Ajusta el tipo según corresponda

const registrosPorPagina = 10;

// Calculamos las páginas que se mostrarán en la barra de navegación
const totalPagesNumber = computed<number[]>(() => {
  let desde: number = Math.max(1, currentPages.value - 2);
  let hasta: number = Math.min(totalPages.value, currentPages.value + 2);
  
  if (hasta - desde < 4) {
    if (desde === 1) {
      hasta = Math.min(totalPages.value, desde + 4);
    } else {
      desde = Math.max(1, hasta - 4);
    }
  }
  
  const totalPagesNumber: number[] = [];

  for (let i = desde; i <= hasta; i++) {
    totalPagesNumber.push(i);
  }

  return totalPagesNumber;
});

const registrosPaginados = computed<any[]>(() => { // Ajusta el tipo de retorno según corresponda
  const indiceInicial: number = (currentPages.value - 1) * registrosPorPagina;
  const indiceFinal: number = indiceInicial + registrosPorPagina;
  return totalRegister.value.slice(indiceInicial, indiceFinal);
});
</script>

<template>
  <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
    <p class="mb-0 text-paragraph">
      Mostrando registros del {{ (currentPages - 1) * registrosPorPagina + 1 }} al 
      {{ Math.min(currentPages * registrosPorPagina, totalRegister.length) }} de 
      {{ totalRegister.length }} totales
    </p>
    <nav class="mt-15 mt-md-0">
      <ul class="pagination mb-0">
        <li class="page-item" :class="{ disabled: currentPages === 1 }">
          <a 
            class="page-link" 
            href="#" 
            aria-label="Previous"
            @click.prevent="emits('pageChanged', 1)"
          >
            <i class="flaticon-chevron-1"></i>
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPages === 1 }">
          <a 
            class="page-link" 
            href="#"
            @click.prevent="emits('pageChanged', currentPages - 1)"
          >
            <i class="flaticon-chevron-left"></i>
          </a>
        </li>
        
        <li v-if="currentPages > 3" class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        
        <li 
          v-for="number of totalPagesNumber" 
          :key="number"
          class="page-item"
          :class="{ active: currentPages === number }"
        >
          <a 
            class="page-link" 
            href="#"
            @click.prevent="emits('pageChanged', number)"
          >
            {{ number }}
          </a>
        </li>
        
        <li v-if="currentPages < totalPages - 2" class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        
        <li class="page-item" :class="{ disabled: currentPages === totalPages }">
          <a 
            class="page-link" 
            href="#"
            @click.prevent="emits('pageChanged', currentPages + 1)"
          >
            <i class="flaticon-chevron-right"></i>
          </a>
        </li>
        
        <li class="page-item" :class="{ disabled: currentPages === totalPages }">
          <a 
            class="page-link" 
            href="#" 
            aria-label="Next"
            @click.prevent="emits('pageChanged', totalPages)"
          >
            <i class="flaticon-chevron"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.pagination-area {
  width: 100%;
}

.page-link {
  color: var(--color-text);
  border: 1px solid var(--color-border);
  margin: 0 2px;
  border-radius: 5px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  transition: all 0.3s ease;
}

.page-link:hover {
  background-color: hsla(65, 6%, 70%, 0.2);
  color: var(--color-text);
}

.page-item.active .page-link {
  background-color: hsla(65, 6%, 70%, 0.2);
  font-weight: bold;
  border-color: var(--color-border);
}

.page-item.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: transparent;
}

.text-paragraph {
  color: var(--color-text);
  font-size: 14px;
}
</style>