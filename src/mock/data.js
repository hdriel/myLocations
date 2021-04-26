import {uid} from "uid";
import faker from 'faker';
import { Category } from '../models/category';
import { Location } from '../models/location';

export function generateMockData() {
    const categoryList = [];

    const categoryLen = faker.random.number(10);
    new Array(categoryLen).fill('').forEach(item => {
        categoryList.push(new Category({id: uid(), name: faker.random.word(2)}));
    });

    console.log(categoryList);

    const locationList = [];
    categoryList.forEach(category => {
        const locationLen = faker.random.number(20);
        new Array(locationLen).fill('').forEach(item => {
            locationList.push(
                new Location({
                    id: uid(),
                    name: faker.random.word(2),
                    categoryId: category.id,
                    address: faker.address.streetAddress(),
                    coordinates: {
                        latitude: faker.address.latitude(),
                        longitude: faker.address.longitude(),
                    }
                })
            );
        });
    })

    console.log(locationList);
    return { categoryList, locationList }
}
