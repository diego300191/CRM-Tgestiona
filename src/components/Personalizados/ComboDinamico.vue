<script setup lang="ts">
import { ref, watch, toRefs, defineProps, defineEmits, withDefaults } from "vue";
import api from "@/api/Api";
import type { AxiosResponse } from "axios";
import { useOportunidaStore } from "@/modules/Oportunidades/store/useOportunidadStore";

const storeOportunidad = useOportunidaStore();

interface MaestraItem {
  id: number;
  nombre: string;
}

interface Props {
  idMaestra: number;
  nombreMaestra?: string;
  seleccionado?: number;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  tieneIdPadre?:string;
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
  (event: "texto", value: string): void;
  (event: "cargado"): void;
}>();

const { idMaestra, nombreMaestra, disabled,tieneIdPadre } = toRefs(props);

const opciones = ref<MaestraItem[]>([]);
const seleccionActual = ref(props.seleccionado);
const cargando = ref(false);
const error = ref<string | null>(null);

// Watcher para cambios en la prop seleccionado
watch(() => props.seleccionado, (newVal) => {
  seleccionActual.value = newVal;
});

// Watcher para cambios internos
watch(seleccionActual, (newVal) => {
  const textoSeleccionado = opciones.value.find(opt => opt.id === newVal)?.nombre || '';
  emit('update:seleccionado', newVal);
  emit('texto', textoSeleccionado);

  if(tieneIdPadre.value === 'SI'){
    storeOportunidad.cargarSubTipos(7,newVal);
  }
  
});

const cargarMaestra = async () => {
  try {
    cargando.value = true;
    error.value = null;
    
    const { data }: AxiosResponse<{ body: MaestraItem[] }> = await api.get(
      `/Common/ObtenerMaestraDetalle/${idMaestra.value}`
    );
    
    opciones.value = data.body || [];
    emit('cargado');
    
    // Verificar si el valor seleccionado existe en las opciones
    if (props.seleccionado && !opciones.value.some(opt => opt.id === props.seleccionado)) {
      seleccionActual.value = 0;
      emit('update:seleccionado', 0);
    }
  } catch (err) {
    error.value = 'Error al cargar las opciones';
    console.error('Error cargando maestra:', err);
  } finally {
    cargando.value = false;
  }
};

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