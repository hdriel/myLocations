export class Category{
    constructor({id, name, doc}) {
        if(doc){
            this.updateFromObj(doc);
        }
        else{
            this.id = id;
            this.name = name;
        }
    }

    updateFromObj(category){
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
