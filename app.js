const firebaseConfig = {
  apiKey: "AIzaSyBi3bPyZ-060mXmRy5-9nYu9NL2AOQV3pU",
  authDomain: "encuestas-46af1.firebaseapp.com",
  projectId: "encuestas-46af1",
  storageBucket: "encuestas-46af1.firebasestorage.app",
  messagingSenderId: "944030376540",
  appId: "1:944030376540:web:acc23c8789e943ae6fbc99",
  measurementId: "G-B9QWR2XL9D"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const preguntas = [
"El programa ha mejorado su calidad de vida",
"El apoyo recibido ha sido útil",
"Su situación ha mejorado",
"Ha beneficiado a su familia",
"Fue fácil acceder al programa",
"Recibió atención clara y amable",
"El apoyo llegó a tiempo",
"Está contenta con el programa",
"¿Cómo valora a nuestro actual Secretario Félix Arratia de Igualdad e Inclusión?",
"¿Qué calificación le otorga al Gobernador Samuel García?"
];



const emojis = [
{
valor:5,
emoji:"🥰",
texto:"Muy Satisfecho"
},
{
valor:4,
emoji:"😊",
texto:"Satisfecho"
},
{
valor:3,
emoji:"😐",
texto:"Neutral"
},
{
valor:2,
emoji:"😕",
texto:"Insatisfecho"
},
{
valor:1,
emoji:"😭",
texto:"Muy Insatisfecho"
}
];

const contenedor =
document.getElementById("questions");

preguntas.forEach((texto,i)=>{

const div =
document.createElement("div");

div.classList.add("question");

div.innerHTML = `

<div class="question-title">
${i+1}. ${texto}
</div>

<div class="options">

${emojis.map(e=>`

<label>

<input
type="radio"
name="q${i}"
value="${e.valor}"
required>

<div class="rating">

<span class="emoji">
${e.emoji}
</span>

<span class="text">
${e.texto}
</span>

</div>

</label>

`).join("")}

</div>
`;

contenedor.appendChild(div);

});

document.addEventListener("change",()=>{

const contestadas =
document.querySelectorAll(
'input[type="radio"]:checked'
).length;

const porcentaje =
(contestadas/preguntas.length)*100;

document.getElementById("progressBar")
.style.width = porcentaje+"%";

});

document
.getElementById("surveyForm")
.addEventListener("submit",async(e)=>{

e.preventDefault();

const data = {

nombre:
document.getElementById("nombre").value,

municipio:
document.getElementById("municipio").value,

fecha:
document.getElementById("fecha").value,

empleado:
document.getElementById("empleado").value,

comentario:
document.getElementById("comentario").value,

createdAt:new Date(),

respuestas:{}

};

preguntas.forEach((_,i)=>{

const valor =
document.querySelector(
`input[name="q${i}"]:checked`
).value;

data.respuestas[`p${i+1}`] =
parseInt(valor);

});

try{

await db
.collection("encuestas_ayudemos")
.add(data);

alert("✅ Encuesta guardada correctamente");

document
.getElementById("successMsg")
.style.display="block";

document
.getElementById("surveyForm")
.reset();

document
.getElementById("fecha")
.valueAsDate = new Date();

document
.getElementById("progressBar")
.style.width="0%";

window.scrollTo({
top:0,
behavior:"smooth"
});

}catch(error){

console.error(error);

alert("Error al guardar la encuesta");

}

});