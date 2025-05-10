<template>
    <button @click="showModal = true">Abrir Modal</button>
  
    <VueFinalModal v-model="showModal" classes="modal">
      <div class="p-4 bg-white rounded shadow">
        <h2 class="text-lg font-bold">¡Hola!</h2>
        <p>Este es un modal.</p>
        <button @click="showModal = false">Cerrar</button>
      </div>
    </VueFinalModal>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { VueFinalModal } from 'vue-final-modal'
  
  const showModal = ref(false)
  </script>
  
  <style>
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  