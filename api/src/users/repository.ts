import {User} from '../types';

export class UserRepository {

    private collection: Collection<User>;

    constructor(collection: Collection<User>) {
        this.collection = collection;
    }

    public getUsers(): (User & LokiObj)[] {
        return this.collection.find({ deleted: false});
    }

    public deleteUser(id: string): void {
        this.collection.findAndUpdate((user: User) => user.id === id, (user: User & LokiObj) => user.deleted = true)
    }

    public restoreUser(id: string): void {
        this.collection.findAndUpdate((user: User) => user.id === id, (user: User & LokiObj) => user.deleted = false)
    }
}
