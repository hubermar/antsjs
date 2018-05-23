export const CREATE = 'event_create';
export const MOVE = 'event_move';
export const GONE = 'event_gone';

export default class Event {

    constructor(eventType, id, payload) {
        this._eventType = eventType;
        this._id = id;
        this._payload = payload;
    };

    get id() {
        return this._id;
    };

    get type() {
        return this._eventType;
    }

    get payload() {
        return this._payload;
    }

    static get CREATE() {
        return CREATE;
    }

    static get MOVE() {
        return MOVE;
    }

    static get GONE() {
        return GONE;
    }

    static newCreate(id, type, pos) {
        let payload = {'type' : type, 'pos' : pos};
        return new Event(CREATE, id, payload);
    }

    static newGone(id) {
        let payload = {};
        return new Event(GONE, id, payload);
    }

    static newMove(id, pos) {
        let payload = {'pos': pos};
        return new Event(MOVE, id, payload);
    }
}