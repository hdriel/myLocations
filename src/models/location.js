export class Location{
    constructor({id, name, address, coordinates, category}) {
        this._id = id;
        this.name = name;
        this.prevName = '';
        this.address = address;
        this.coordinates = coordinates;
        this.category = category;
    }

    get id(){
        return this._id;
    }

    updateLocation(location){
        const {id, name, address, coordinates, category} = location;
        this._id = id;
        this.name = name;
        this.prevName = '';
        this.address = address;
        this.coordinates = coordinates;
        this.category = category;
    }
}
