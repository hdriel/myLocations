export class Location{
    constructor({id, name, address, coordinates: { latitude, longitude } = {}, categoryId, doc}) {
        if(doc){
            this.updateFromObj(doc);
        }
        else{
            this.id = id;
            this.categoryId = categoryId;
            this.name = name || '';
            this.address = address || '';
            this.coordinates = {
                latitude: latitude || 0,
                longitude: longitude || 0,
            };
        }
    }

    updateFromObj(location){
        const {id, name, address, coordinates, categoryId} = location;
        this.id = id;
        this.name = name;
        this.address = address;
        this.coordinates = coordinates;
        this.categoryId = categoryId;
    }

    toString(){
        return JSON.stringify({
            id: this.id,
            name: this.name,
            address: this.address,
            coordinates: JSON.stringify(this.coordinates),
            categoryId: this.categoryId,
        })
    }
}
