// 🔥 CONFIG FIREBASE (YA ES TUYA)
const firebaseConfig = {
  apiKey: "AIzaSyBqwwF4B9kfGqRozy3otl8MNlDysHlPa_o",
  authDomain: "encuesta-salida.firebaseapp.com",
  projectId: "encuesta-salida",
  storageBucket: "encuesta-salida.firebasestorage.app",
  messagingSenderId: "178347957730",
  appId: "1:178347957730:web:f69e96507528fd12802dbb",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 📋 PREGUNTAS
const preguntas = [
 "El programa ha mejorado su calidad de vida",
 "El apoyo recibido ha sido útil",
 "Su situación ha mejorado",
 "Ha beneficiado a su familia",
 "Fue fácil acceder al programa",
 "Recibió la atención clara y amable",
 "El apoyo llegó a tiempo",
 "Está contenta con el programa",
 "Cómo valora a nuestro actual Secretario Félix Arratia de Igualdad e Inclusión",
 "Qué calificación le otorga a nuestro actual Gobernador Samuel Garcìa"
];

// 🎯 GENERAR PREGUNTAS
const contenedor = document.getElementById("questions");

preguntas.forEach((texto, i) => {
  const div = document.createElement("div");
  div.classList.add("question");

  div.innerHTML = `
    <label>${i+1}. ${texto}</label>
    <div class="options">
      ${[1,2,3,4,5].map(v => `
        <label>
          <input type="radio" name="q${i}" value="${v}" required>
          <span>${v}</span>
        </label>
      `).join("")}
    </div>
  `;

  contenedor.appendChild(div);
});

// 🚀 GUARDAR
document.getElementById("surveyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value,
    municipio: document.getElementById("municipio").value,
    fecha: document.getElementById("fecha").value,
    empleado: document.getElementById("empleado").value,
    comentario: document.getElementById("comentario").value,
    createdAt: new Date(),
    respuestas: {}
  };

  preguntas.forEach((_, i) => {
    const val = document.querySelector(`input[name="q${i}"]:checked`).value;
    data.respuestas[`p${i+1}`] = parseInt(val);
  });

  try {

    await db.collection("encuestas_ayudemos").add(data);

    alert("La Secretaría de Igualdad e Inclusión , agradece mucho el espacio para contestar la encuesta, gracias");

    document.getElementById("surveyForm").reset();

    document.getElementById("fecha").valueAsDate = new Date();

  } catch (error) {

    console.error(error);

    alert("Error al guardar");

  }
});