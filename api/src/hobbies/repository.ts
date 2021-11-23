import {Hobby} from '../types';

export class HobbyRepository {

    private collection: Collection<Hobby>;

    constructor(collection: Collection<Hobby>) {
        this.collection = collection;
    }

    public getHobbies(): Hobby[] {
        return this.collection
                .find()
                .map((value: Hobby & LokiObj): Hobby => ({id: value.id, name: value.name}));
    }
}
