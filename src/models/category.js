export class Category{
    constructor({id, name, doc}) {
        if(doc){
            this.updateCategoryFromObj(doc);
        }
        else{
            this.id = id;
            this.name = name;
        }
    }

    updateCategoryFromObj(category){
        const { id, name } = category;
        this.id = id;
        this.name = name;
    }

    toString(){
        return JSON.stringify({
            id: this.id,
            name: this.name,
        })
    }
}
