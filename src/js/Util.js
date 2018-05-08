

export default class Util {
    constructor() {

    }
    
    static sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
}