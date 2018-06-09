export const CREATE = 'event_create';
export const CREATED = 'event_created';
export const MOVE = 'event_move';
export const GONE = 'event_gone';
export const ACTIVE = 'event_active';

export default class Event {

    constructor(type, payload) {
        this._type = type;
        this._payload = payload;
    };

    get type() {
        return this._type;
    }

    get payload() {
        return this._payload;
    }

    static get CREATE() {
        return CREATE;
    }

    static get CREATED() {
        return CREATED;
    }

    static get MOVE() {
        return MOVE;
    }

    static get GONE() {
        return GONE;
    }

    static get ACTIVE() {
        return ACTIVE;
    }

    static newCreate(name, pos) {
        let payload = {'name' : name, 'pos' : pos};
        return new Event(CREATE, payload);
    }

    static newCreated(id, type, pos, color) {
        let payload = {'id': id, 'type': type, 'pos': pos, 'color': color};
        return new Event(CREATED, payload);
    }

    static newGone(id) {
        let payload = {'id': id};
        return new Event(GONE, payload);
    }

    static newMove(id, pos) {
        let payload = {'id': id, 'pos': pos};
        return new Event(MOVE, payload);
    }

    static newActive(id, active) {
        let payload = {'id': id, 'active': active};
        return new Event(ACTIVE, payload);
    }

    toString() {
        return 'Event[type=' + this._type + ' payload=' + this._payload + ']';
    }
}