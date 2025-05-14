<template>
  <div class="w-screen h-screen grid grid-cols-[auto_1fr]">
    <div class="h-full">
      <img src="./assets/main-bg-2.avif" alt="background image" class="h-full object-cover">
    </div>

    <div class="bg-white flex flex-col p-12 space-y-8 overflow-y-auto">
      <h2 class="text-center">DAOA Asistente Digital para el Adulto Mayor</h2>

      <main class="flex-grow flex flex-col items-center justify-center space-y-6">
        <p class="text-gray-800 text-lg text-left leading-relaxed">
          Hola! Soy tu asistente personal, estoy aquí para ayudarte a agendar tus citas médicas. <br>
          Presiona el botón para comenzar a hablarme, una vez que termines de hablar, presiona el botón nuevamente para dejar de hablarme. <br>
          Te escucharé y te responderé con la información que necesites.
        </p>

        <h3 class="text-lg font-semibold text-gray-700 text-center">
          {{ isListening ? "Presiona el botón para dejar de hablarle al asistente" : "Presiona el botón para hablarle al asistente" }}
        </h3>

        <div class="flex flex-row">
          <button @click="toggleListening" :class="['record-btn', isListening ? 'recording' : '']">
          <p v-if="!isListening">Comenzar a Hablar</p>
          <p v-else>Dejar de Hablar</p>
        </button>
        <button @click="sendData" className="send-data-btn">
          <p>Agendar Cita</p>
        </button>
        </div>
      </main>

      <footer class="pt-6 border-t">
        <p class="text-gray-600 font-medium mb-2">Tu petición:</p>
        <p class="text-lg text-gray-800 italic underline break-words">{{ transcript }}</p>
      </footer>

      <Loading :active="isLoading" :is-full-page="true" />
      <AssistantModal :visible="showModal" @close="showModal = false" :textInput="modelResponse" />
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import requestModel from '../services/requestModel'
import AssistantModal from './components/AssistantModal.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

// estado reactivo
const isListening = ref(false)
const transcript = ref('')
const recognition = ref(null)
const showModal = ref(false)
const isLoading = ref(false)
const modelResponse = ref('')

// funciones
const toggleListening = () => {
  if (!recognition.value) return

  isListening.value = !isListening.value

  if (isListening.value) {
    transcript.value = ''
    recognition.value.start()
  } else {
    recognition.value.stop()
  }
}

const sendData = async () => {
  if (transcript.value.trim() === '') {
    console.log('No hay datos para enviar.')
    return
  }

  try {
    isLoading.value = true
    const response = await requestModel(transcript.value)

    modelResponse.value = response || 'No se recibió respuesta del modelo.'

    console.log('Respuesta del modelo:', response)
  } catch (error) {
    console.error('Error al enviar los datos:', error)
    modelResponse.value = 'Lo siento, ocurrió un error al procesar tu solicitud.'
  } finally {
    isLoading.value = false
    showModal.value = true
  }
}

const setupRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    alert('Tu navegador no soporta reconocimiento de voz.')
    return
  }

  recognition.value = new SpeechRecognition()
  recognition.value.lang = 'es-ES'
  recognition.value.continuous = true
  recognition.value.interimResults = false

  recognition.value.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        transcript.value += ' ' + event.results[i][0].transcript
      }
    }
  }

  recognition.value.onerror = (e) => {
    console.error('Error de reconocimiento de voz:', e)
  }

  recognition.value.onend = () => {
    if (isListening.value) {
      recognition.value.start()
    }
  }
}

onMounted(() => {
  setupRecognition()
})
</script>

<style>
body {
  margin: 0;
  overflow-x: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.record-btn {
  width: 16rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #4CAF50;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-right: 1rem;
}

.record-btn:hover {
  cursor: pointer;
  background-color: #45a049;
}

.send-data-btn {
  width: 16rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #b5bbb5;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
}

.send-data-btn:hover {
  cursor: pointer;
  background-color: #a0a0a0;
}

.recording {
  background-color: #f44336;
}
</style>