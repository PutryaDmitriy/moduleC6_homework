//задание 6-3
const wsUrl = "wss://echo-ws-service.herokuapp.com";

const output = document.querySelector('.output');
const btnSend = document.querySelector('.send');
const inpMessage = document.querySelector(".message");
const geolocation = document.querySelector('.location');

function writeToScreen(message, type) {
  let element = document.createElement("p");
  element.classList.add('msg');
  element.innerHTML = message;

  if (type === 'incoming') {
    element.classList.add('incoming');
  }else if (type === 'link') {
    let link = document.createElement('a');
    link.href = message;
    link.textContent = 'Геолокация';
    element.textContent = '';
    element.appendChild(link);
  }
  output.appendChild(element);
  inpMessage.value = '';
};

let websocket = new WebSocket(wsUrl);
websocket.onopen = function(evt) {
  console.log("Connected");
};

btnSend.addEventListener('click', () => {
  const msg = inpMessage.value;
  writeToScreen(msg);
  websocket.send(msg);
  websocket.onmessage = function(evt) {
    writeToScreen(msg, 'incoming');
  };    
});

const error = () => {
  writeToScreen('Невозможно получить ваше местоположение');
};

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    writeToScreen('https://www.openstreetmap.org/#map=18/${latitude}/${longitude}', 'link');
}

geolocation.addEventListener('click', () =>{
  if (!navigator.geolocation) {
    msg = 'Geolocation не поддерживается вашим браузером';
    writeToScreen(msg);
} else {
    navigator.geolocation.getCurrentPosition(success, error);
}
});
