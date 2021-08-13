
const socket = io('http://localhost:3000');

function getEl(id) {
  return document.getElementById(id)
};

const editor = getEl("editor");
const editando = getEl("editando");

editor.addEventListener("keyup", () => {
  const text = editor.value
  socket.send({ text });
});

editando.addEventListener("click", (e) => {
  socket.emit('editing',{ editing: true });
  editor.disabled = false;
  return false;
});

socket.on('message', (data) => {
  editor.value = data.text;
});

socket.on('editing', (data) => {
  editor.disabled = data.editing;
});
