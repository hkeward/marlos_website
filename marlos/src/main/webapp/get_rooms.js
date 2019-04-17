var request = new XMLHttpRequest();
console.log('test');


request.open('GET', 'rest/rooms/first_room', true);
request.send();

request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);

    if (request.status >= 200 && request.status < 400) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = data.roomName;

        container.appendChild(card);
        card.appendChild(h1)
    } else {
        console.log('error')
    }
};

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);
