<script setup lang="ts">
import { ref, watch, toRefs, defineProps, defineEmits,withDefaults  } from "vue";
import api from "@/api/Api";
import type { AxiosResponse } from "axios";

// Interface para los items de la maestra
interface MaestraItem {
  id: number;
  nombre: string;
  // Puedes añadir más propiedades si la API las devuelve
}

// Props con tipado más completo y valores por defecto
interface Props {
  idMaestra: number;
  nombreMaestra?: string;
  seleccionado?: number;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  nombreMaestra: '',
  seleccionado: 0,
  disabled: false,
  placeholder: 'Seleccionar...',
  required: true
});

const emit = defineEmits<{
  (event: "update:seleccionado", value: number): void;
  (event: "update:texto", value: string): void;
  (event: "cargado"): void;
}>();

// Usamos toRefs para todas las props
const { idMaestra, nombreMaestra, seleccionado, disabled } = toRefs(props);

const opciones = ref<MaestraItem[]>([]);
const seleccionActual = ref(seleccionado.value);
const cargando = ref(false);
const error = ref<string | null>(null);

// Watcher para cambios en la prop seleccionado
watch(seleccionado, (newVal) => {
  seleccionActual.value = newVal;
});

// Watcher para cambios en la selección
watch(seleccionActual, (newVal) => {
  const textoSeleccionado = opciones.value.find(opt => opt.id === newVal)?.nombre || '';
  emit('update:seleccionado', newVal);
  emit('update:texto', textoSeleccionado);
});

// Cargar datos de la maestra
const cargarMaestra = async () => {
  try {
    cargando.value = true;
    error.value = null;
    
    const { data }: AxiosResponse<{ body: MaestraItem[] }> = await api.get(
      `/Common/ObtenerMaestraDetalle/${idMaestra.value}`
    );
    
    opciones.value = data.body || [];
    emit('cargado');
    
    // Si hay un valor seleccionado pero no está en las opciones
    if (seleccionado.value && !opciones.value.some(opt => opt.id === seleccionado.value)) {
      seleccionActual.value = 0;
    }
  } catch (err) {
    error.value = 'Error al cargar las opciones';
    console.error('Error cargando maestra:', err);
  } finally {
    cargando.value = false;
  }
};

// Cargar al montar y cuando cambia idMaestra
watch(idMaestra, cargarMaestra, { immediate: true });
</script>

<template>
  <div class="mb-3">
    <label 
      v-if="nombreMaestra" 
      :for="`select-maestra-${idMaestra}`" 
      class="form-label fw-medium"
    >
      {{ nombreMaestra }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    
    <select
      :id="`select-maestra-${idMaestra}`"
      class="form-select shadow-none fs-md-15"
      :class="{
        'is-invalid': error,
        'text-muted': seleccionActual === 0
      }"
      v-model="seleccionActual"
      :disabled="disabled || cargando"
      :required="required"
    >
      <option 
        :value="0" 
        disabled
        class="text-muted"
      >
        {{ cargando ? 'Cargando...' : placeholder }}
      </option>
      
      <option 
        v-for="opcion in opciones" 
        :key="`option-${opcion.id}`"
        :value="opcion.id"
      >
        {{ opcion.nombre }}
      </option>
    </select>
    
    <div v-if="error" class="invalid-feedback d-block">
      {{ error }}
    </div>
    
    <div v-if="required" class="invalid-feedback">
      Por favor selecciona una opción válida.
    </div>
  </div>
</template>

<style scoped>
.form-select:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.invalid-feedback {
  display: none;
}

.is-invalid ~ .invalid-feedback,
.is-invalid ~ div > .invalid-feedback {
  display: block;
}
</style>