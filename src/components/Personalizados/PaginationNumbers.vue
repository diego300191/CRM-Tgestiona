<script setup lang="ts">
import { toRef, computed, type Ref, defineProps, defineEmits } from "vue";

interface Props {
  totalPages: number;
  currentPages: number;
  totalRegister: number; 
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'pageChanged', page: number): void;
  (event: 'page', page: number): void;
}>();

const totalPages = toRef(props, "totalPages");
const currentPages = toRef(props, "currentPages");
const totalRegister = toRef(props, "totalRegister");

const registrosPorPagina = 10;

// Cálculo de páginas para navegación (correcto)
const totalPagesNumber = computed<number[]>(() => {
  let desde = Math.max(1, currentPages.value - 2);
  let hasta = Math.min(totalPages.value, currentPages.value + 2);
  
  if (hasta - desde < 4) {
    if (desde === 1) {
      hasta = Math.min(totalPages.value, desde + 4);
    } else {
      desde = Math.max(1, hasta - 4);
    }
  }
  
  const pages: number[] = [];
  for (let i = desde; i <= hasta; i++) {
    pages.push(i);
  }
  return pages;
});

// Elimina esto si no tienes los datos reales
/*
const registrosPaginados = computed<any[]>(() => {
  const indiceInicial = (currentPages.value - 1) * registrosPorPagina;
  const indiceFinal = indiceInicial + registrosPorPagina;
  // Esto solo funciona si props.items existe
  return props.items?.slice(indiceInicial, indiceFinal) || [];
});
*/
</script>

<template>
  <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
    <!-- Corregido: usar totalRegister directamente (no .length) -->
    <!-- <p class="mb-0 text-paragraph">
      Mostrando registros del {{ (currentPages - 1) * registrosPorPagina + 1 }} al 
      {{ Math.min(currentPages * registrosPorPagina, totalRegister) }} de 
      {{ totalRegister }} totales
    </p> -->
    
    <nav class="mt-15 mt-md-0">
      <ul class="pagination mb-0">
        <!-- Botón Primera Página -->
        <!-- <li class="page-item" :class="{ disabled: currentPages === 1 }">
          <a 
            class="page-link" 
            href="#" 
            aria-label="Previous"
            @click.prevent="emits('pageChanged', 1)"
          >
          <span aria-hidden="true">&laquo;</span>
            
          </a>
        </li> -->
        
        <!-- Botón Página Anterior -->
        <li class="page-item" :class="{ disabled: currentPages === 1 }">
          <a 
            class="page-link" 
            href="#"
            @click.prevent="emits('pageChanged', currentPages - 1)"
          >
            <i class="flaticon-chevron-1"></i>
          </a>
        </li>
        
        <!-- Separador inicial -->
        <li v-if="currentPages > 3" class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        
        <!-- Números de página -->
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
        
        <!-- Separador final -->
        <li v-if="currentPages < totalPages - 2" class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        
        <!-- Botón Página Siguiente -->
        <li class="page-item" :class="{ disabled: currentPages === totalPages }">
          <a 
            class="page-link" 
            href="#"
            @click.prevent="emits('pageChanged', currentPages + 1)"
          >
            <i class="flaticon-chevron"></i>
          </a>
        </li>
        
        <!-- Botón Última Página -->
        <!-- <li class="page-item" :class="{ disabled: currentPages === totalPages }">
          <a 
            class="page-link" 
            href="#" 
            aria-label="Next"
            @click.prevent="emits('pageChanged', totalPages)"
          >
            
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li> -->
      </ul>
    </nav>
  </div>
</template>