

const es = new EventSource('/api/quote');

function listener(event) {
    if (event.type === 'wait'){
        let li = document.createElement('li');
        li.setAttribute('style','display: inline;');
        li.innerText = event.data + ' ';
        document.getElementById('progress').appendChild(li)
    }

    else if (event.type === 'message'){
        const data = JSON.parse(event.data);
        document.getElementById('quote').innerText = data.content;
        document.getElementById('author').innerText = data.author;
    }
    else if (event.type === 'result')
        es.close();
}

es.addEventListener('open',listener);
es.addEventListener('message', listener);
es.addEventListener('error', listener);
es.addEventListener('result', listener);
es.addEventListener('wait', listener);