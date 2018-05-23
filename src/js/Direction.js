
export const NORTH = 'n';
export const EAST = 'e';
export const SOUTH = 's';
export const WEST = 'w';

const directions = [NORTH, EAST, SOUTH, WEST];

export default class Direction {

    static get NORTH() {
        return NORTH;
    }

    static get EAST() {
        return EAST;
    }

    static get SOUTH() {
        return SOUTH;
    }

    static get WEST() {
        return WEST;
    }

    // -1 left, 0 straight, 1 right
    static turn(oldDirection, turn) {
        let ndx = directions.indexOf(oldDirection);
        ndx += turn;
        if (ndx >= directions.length) {
            ndx = 0;
        }
        if (ndx < 0) {
            ndx = directions.length - 1;
        }
        return directions[ndx];
    }
}