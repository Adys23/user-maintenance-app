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
}


