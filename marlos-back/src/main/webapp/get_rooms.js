var request = new XMLHttpRequest();


request.open('GET', 'rest/rooms', true);
request.send();

request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);

    if (request.status >= 200 && request.status < 400) {
        for (var i=0; i < data.length; i++) {

            const room_name = document.createElement('div');
            room_name.setAttribute('class', 'room_name');

            const h1 = document.createElement('h1');
            h1.textContent = data[i].roomName;


            container.appendChild(room_name);
            room_name.appendChild(h1);
        }
    } else {
        console.log('error');
    }
};

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);
