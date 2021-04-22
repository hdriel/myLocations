export class Category{
    constructor({id, name}) {
        this._id = id;
        this.name = name;
    }

    get id(){
        return this._id;
    }

    updateCategory(category){
        const {id, name} = category;
        this._id = id;
        this.name = name;
    }
}
