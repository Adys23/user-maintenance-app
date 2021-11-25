import {Request, Response} from 'express';
import {Hobby, User} from '../types';
import UserService from './service';

export default class UserController {
    private service: UserService;

    constructor(userCollection: Collection<User>, hobbyCollection: Collection<Hobby>) {
        this.service = new UserService(userCollection, hobbyCollection);
    }

    public getUsers(request: Request, response: Response) {
        response.json(this.service.getUsers());
    }

    public deleteUser(request: Request, response: Response) {
        try {
            const id: string = request.params.userId;
            this.service.deleteUser(id);
            response.status(200);
            response.send("User deleted successfully");
        } catch (e) {
            response.status(500);
            response.send('Failed to delete the user')
        }
    }

    public restoreUser(request: Request, response: Response) {
        try {
            const id: string = request.params.userId;
            this.service.restoreUser(id);
            response.status(200);
            response.send("User restored successfully");
        } catch (e) {
            response.status(500);
            response.send('Failed to restore the user')
        }
    }
}


