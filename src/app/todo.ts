export class Todo {
    id: String;
    title: string = '';
    complete: boolean = false;
    owner: Owner = {name: '', id: '', time: null};  

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

class Owner {
    name: String;
    id: String;
    time: Date;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}


