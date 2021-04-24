export class Location{
    constructor({id, name, address, coordinates, category}) {
        this.id = id;
        this.name = name;
        this.prevName = '';
        this.address = address;
        this.coordinates = coordinates;
        this.category = category;
    }

    updateLocation(location){
        const {id, name, address, coordinates, category} = location;
        this.id = id;
        this.name = name;
        this.prevName = '';
        this.address = address;
        this.coordinates = coordinates;
        this.category = category;
    }
}
