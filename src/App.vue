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
    </div>
  </div>
</template>



<script>
import requestModel from '../services/requestModel';

export default {
  data() {
    return {
      isListening: false,
      transcript: '',
      recognition: null
    };
  },
  methods: {
    toggleListening() {
      if (!this.recognition) return;

      this.isListening = !this.isListening;

      if (this.isListening) {
        this.transcript = '';
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
    },
    async sendData() {
      if (this.transcript.trim() === '') {
        console.log('No hay datos para enviar.');
        return;
      }

      try {
        const response = await requestModel(this.transcript);
        console.log('Respuesta del modelo:', response);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    },
    setupRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Tu navegador no soporta reconocimiento de voz.");
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'es-ES';
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            this.transcript += ' ' + event.results[i][0].transcript;
          }
        }
      };

      this.recognition.onerror = (e) => {
        console.error('Error de reconocimiento de voz:', e);
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          this.recognition.start();
        }
      };
    }
  },
  mounted() {
    this.setupRecognition();
  }
};
</script>

<style scoped>
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

.recording {
  background-color: #f44336;
}
</style>