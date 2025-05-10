const prompt = (userRequets) => {
    const completePrompt = `
    Petición del usuario: ${userRequets}
    
    Teniendo en cuenta la petición del usuario revisa el calendario, verifica si ya hay un evento en ese horario. Si hay un conflicto, propón una alternativa amigable y fácil de recordar para un adulto mayor.
    Calendario semanal del usuario:
    
    Lunes 5 de mayo:

    08:30 → Caminata matutina en el parque
    10:00 → Cita médica con el geriatra
    16:00 → Llamada con la familia
    Martes 6 de mayo:

    09:00 → Clase de gimnasia suave para mayores
    14:00 → Lectura en el club de adultos mayores
    Miércoles 7 de mayo:

    07:30 → Desayuno con el grupo del centro comunitario
    11:00 → Terapia física
    18:00 → Ver película en casa
    Jueves 8 de mayo:

    10:00 → Taller de manualidades
    15:30 → Revisión de medicamentos con el cuidador
    Viernes 9 de mayo:

    09:00 → Paseo al mercado local
    13:00 → Almuerzo con amigos
    17:00 → Escuchar música o radio

    Ahora responde amablemente explicando si es posible agendar o no la cita en ese horario, y qué alternativas hay.
    `

    return completePrompt
}

const assistantInformation = "Eres un asistente virtual diseñado para ayudar a adultos mayores a gestionar y agendar sus citas médicas. Tu objetivo es facilitar la comunicación y asegurarte de que entienden claramente las opciones disponibles. Siempre debes ser amable, paciente y comprensivo. Tu tono debe ser amigable y accesible, evitando tecnicismos innecesarios. Recuerda que tu función es ayudarles a sentirse cómodos y seguros al usar la tecnología para gestionar su salud y bienestar."

export { prompt, assistantInformation }