<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <div className="modal-header">
        <h1>Respuesta del Asistente</h1>
      </div>
      <p className="model-response-text">{{ response || defaultResponse }}</p>
      <div class="modal-footer">
        <p class="text-gray-500">¿Quieres agendar la cita?</p>
        <div className="buttons-container">
          <button @click="$emit('close')" class="modal-btn modal-btn-send">
            Agendar
          </button>
          <button @click="$emit('close')" class="modal-btn modal-btn-not-send">
            No agendar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResponseModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      defaultResponse:
        "Hola, soy un asistente virtual. He revisado tu horario y me he dado cuenta que si puedes agendar la cita para mañana a las 10:00 am. ¿Te gustaría que lo hiciera? o prefieres que lo haga para el viernes a las 10:00 am?",
    };
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.modal-header {
  background-color: #379ae1;
  text-align: center;
  color: white;
  padding: 10px 20px;
  border-bottom: 1px solid #888;
}
.model-response-text {
  font-size: 1.4em;
  color: #333;
  margin-top: 20px;
}
.modal-footer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
.modal-btn {
  color: white;
  width: 100px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-btn-send {
  background-color: #38b000;
}

.modal-btn-not-send {
  background-color: #e63946;
}

.modal-btn-send:hover {
  background-color: #2d9100;
}

.modal-btn-not-send:hover {
  background-color: #c12737;
}

.buttons-container {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}
</style>
