function toggle() {
    var room_description = document.getElementById('description');
    room_description.style.display = room_description.style.display === 'none' ? '' : 'none';
}

var request = new XMLHttpRequest();


request.open('GET', 'rest/rooms/first_room', true);
request.send();

request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);

    if (request.status >= 200 && request.status < 400) {
        const room_name = document.createElement('div');
        room_name.setAttribute('class', 'room_name');
        room_name.setAttribute('onclick', 'toggle();');

        const h1 = document.createElement('h1');
        h1.textContent = data.roomName;


        container.appendChild(room_name);
        room_name.appendChild(h1);


        const description = document.createElement('div');
        description.setAttribute('id', 'description');
        description.setAttribute('style', 'display: none');

        const p = document.createElement('p');
        p.textContent = data.description;

        container.appendChild(description);
        description.appendChild(p);
    } else {
        console.log('error');
    }
};

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);
