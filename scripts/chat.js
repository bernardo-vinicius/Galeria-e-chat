const main = document.querySelector('main')
const input = document.querySelector('input')
const button = document.querySelector('button')

let currentNick = null

function addMessage(conteudo, nick, hora) {
  main.innerHTML += `
        <div class="msg ${currentNick == nick ? 'dono' : ''}">
           <div class="nick">${nick}</div>
           <div class="conteudo">${conteudo}</div>
           <div class="hora">${hora}</div>
        </div>
    `
}

const ws = new WebSocket('ws://localhost:4000')

ws.addEventListener("open", () => console.log('Conectando'))
ws.addEventListener("close", () => console.log('Desconectando'))

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data)
  addMessage(data.message, data.nick, data.timestamp)
  window.scrollTo(0, document.body.scrollHeight)
})

button.addEventListener('click', () => {
  const message = input.value
  if (message.startsWith("/nick ")) {
    currentNick = message.split(' ')[1]
    document.querySelector('h1').innerText = `Usuário ${currentNick}`
  }
  ws.send(message)
  input.value = ''
})

document.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const btEnviar = document.querySelector('.bt-send')
    btEnviar.click()
  }
})