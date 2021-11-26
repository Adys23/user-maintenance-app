import {UserEntity, User} from '../types';

export class UserRepository {

    private collection: Collection<UserEntity>;

    constructor(collection: Collection<UserEntity>) {
        this.collection = collection;
    }

    public getUsers(): (UserEntity & LokiObj)[] {
        return this.collection.find({ deleted: false});
    }

    public getUser(id: string): UserEntity & LokiObj {
        return this.collection.findOne({id});
    }

    public deleteUser(id: string): void {
        this.collection.findAndUpdate((user: UserEntity) => user.id === id, this.deleteFunc)
    }

    public deleteUsers(indices: string[]): void {
        this.collection.findAndUpdate({'id': {'$in': indices}}, this.deleteFunc);
    }

    public restoreUser(id: string): void {
        this.collection.findAndUpdate((user: UserEntity) => user.id === id, this.restore);
    }

    public restoreUsers(indices: string[]): void {
        this.collection.findAndUpdate({'id': {'$in': indices}}, this.restore);
    }

    public editUser(editedUser: User): void {
        this.collection.findAndUpdate((user: UserEntity) => user.id === editedUser.id, (user: UserEntity & LokiObj) => {
            user.dateOfBirth = editedUser.dateOfBirth;
            user.address = editedUser.address;
            user.phoneNumber = editedUser.phoneNumber;
            user.gender = editedUser.gender;
            user.age = editedUser.age;
            user.email = editedUser.email;
            user.name = editedUser.name;
            user.lastName = editedUser.lastName;
            user.hobbies = editedUser.hobbies;
        });
    }

    public userExists(id: string): boolean {
        const user: UserEntity & LokiObj = this.collection.findOne({ id, deleted: false});
        return !!user.id;
    }

    private restore(user: UserEntity & LokiObj): void {
        user.deleted = false
    }

    private deleteFunc(user: UserEntity & LokiObj): void {
        user.deleted = true
    }
}
