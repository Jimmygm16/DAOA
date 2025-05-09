<template>
  <div class="w-screen h-screen flex flex-col justify-between bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-center p-8">
    <header class="pt-8">
      <h1 class="text-5xl font-extrabold text-gray-800">
        DAOA <span class="text-xl font-medium text-gray-600">(Digital Assistant for Older Adults)</span>
      </h1>
    </header>

    <main class="flex-grow flex items-center justify-center flex-col">
      <h3 v-if="!isListening">Presiona el botón para hablarle al asistente</h3>
      <h3 v-else>Presiona el botón para dejar de hablarle al asistente</h3>
      <button
        @click="toggleListening"
        class="w-40 h-40 flex items-center justify-center rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
      >
        <img v-if="!isListening" src="./assets/play.png" alt="">
        <img v-else src="./assets/stop.png" alt="">
      </button>
    </main>

    <footer class="pb-10">
      <p>Usuario</p>
      <p class="mt-4 text-lg text-gray-700 italic px-4 max-w-xl mx-auto underline">{{ transcript }}</p>
    </footer>
  </div>

  <ResponseModal
    :isVisible="showModal"
    :response="transcript"
    @close="showModal = false"
  />
</template>

<script>
import ResponseModal from './components/ResponseModal.vue';

export default {
  components: {
    ResponseModal
  },
  data() {
    return {
      isListening: false,
      transcript: '',
      recognition: null,
      showModal: true,
    };
  },
  methods: {
    toggleListening() {
      if (!this.recognition) return;
      this.isListening = !this.isListening;

      if (this.isListening) {
        this.recognition.start();
      } else {
        this.recognition.stop();
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
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        this.transcript = event.results[0][0].transcript;
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    }
  },
  mounted() {
    this.setupRecognition();
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
