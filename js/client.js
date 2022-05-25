const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById("send-container");
const messageinp = document.getElementById("messageinput");
const messagecontainer = document.querySelector(".container");
var audio = new Audio("ring.mp3");

const person = prompt("Please enter your name", "Harry Potter");
socket.emit("new-user-joined", person);

const append = (message, position) => {
  const msgelmt = document.createElement("div");
  msgelmt.innerText = message;
  msgelmt.classList.add("message");
  msgelmt.classList.add(position);
  messagecontainer.append(msgelmt);
  if (position == "left" || position==" ") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageinp.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageinp.value = "";
});

socket.on("user-joined", (name) => {
  append(`${name} joined the chat..`, "right");
});
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});
socket.on("disconnected", (name) => {
  append(`${name} left the chat`, "right");
});
