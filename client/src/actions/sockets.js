import io from 'socket.io-client';


const socket = io('http://localhost:5000');

const messageTypes = [
    'pullRequest'
];

const init = (store) => {
    messageTypes
        .forEach(type => socket.on(type, (payload) => store.dispatch({ type, payload })));
}

const emit = (type, payload) => socket.emit(type, payload);

export {
    init,
    emit
};