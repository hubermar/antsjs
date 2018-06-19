export const CLICK = 'event_click';
export const CREATED = 'event_created';
export const MOVE = 'event_move';
export const GONE = 'event_gone';
export const ACTIVE = 'event_active';
export const COLLISION = 'event_collision';

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

    static get CLICK() {
        return CLICK;
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

    static get COLLISION() {
        return COLLISION;
    }

    static newClick(mode, pos) {
        let payload = {'mode' : mode, 'pos' : pos};
        return new Event(CLICK, payload);
    }

    static newCreated(id, type, pos, color, properties) {
        let payload = {'id': id, 'type': type, 'pos': pos, 'color': color, 'properties': properties};
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

    static newCollision(active, passive) {
        let payload = {'active': active, 'passive': passive};
        return new Event(COLLISION, payload);
    }

    toString() {
        return 'Event[type=' + this._type + ' payload=' + this._payload + ']';
    }
}