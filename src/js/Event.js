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

    static newCreate(model) {
        let payload = {'type' : model.constructor.name, 'pos' : model.pos};
        return new Event('event_create', model.id, payload);
    }

    static newDestroy(model) {
        let payload = {};
        return new Event('event_destroy', model.id, payload);
    }

    static newMove(model) {
        let payload = {'pos': model.pos};
        return new Event('event_move', model.id, payload);
    }

}