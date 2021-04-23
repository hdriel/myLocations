export class Category{
    constructor({id, name, doc}) {
        if(doc){
            this._updateCategoryFromObj(doc);
        }
        else{
            this._id = id;
            this.name = name;
        }
    }

    get id(){
        return this._id;
    }

    _updateCategoryFromObj(category){
        const { _id, name } = category;
        this._id = _id;
        this.name = name;
    }

    toString(){
        return JSON.stringify({
            id: this._id,
            name: this.name,
        })
    }
}
