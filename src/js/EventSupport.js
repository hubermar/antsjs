import Event from './Event.js';

export default class EventSupport {
    constructor(callback) {
        this._events = new Array();
        this._callback = callback;
    }

    addEvent(event) {
        this._events.push(event);
    }

    removeAll() {
        let out = new Array(this._events);
        this._events = new Array();
        return out;
    }
}