<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2 class="text-lg font-bold">RESPUESTA</h2>
      <p>{{ textInput }}</p>
      <div class="btn-container">
        <button class="btn-book" @click="bookDate">Agendar Cita</button>
        <button @click="emit('close')" class="btn-close">No Agendar</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { toast } from 'vue3-toastify'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  textInput: {
    type: String,
    default: '...'
  }
})

const emit = defineEmits(['close'])

const bookDate = () => {
  toast.success('Cita Agendada', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined
  })

  emit('close')
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro y semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  min-height: 20rem;
  max-width: 45%;
  max-height: 75%;
  background-color: aliceblue;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.modal-content h2 {
  text-align: center;
}

.btn-container {
  display: flex;
  justify-content: space-around;
  margin-top: auto;
}

.btn-book {
  margin-top: auto;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  width: 15rem;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-book:hover {
  background-color: #45a049;
}

.btn-close {
  margin-top: auto;
  padding: 0.5rem 1rem;
  background-color: #f44336;
  width: 15rem;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-close:hover {
  background-color: #d32f2f;
}
</style>
