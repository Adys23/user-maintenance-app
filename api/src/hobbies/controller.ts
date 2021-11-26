import {Request, Response} from 'express';
import {Hobby} from '../types';
import HobbyService from './service';

export default class HobbyController {
    private service: HobbyService;

    constructor(collection: Collection<Hobby>) {
        this.service = new HobbyService(collection);
    }

    public getHobbies(request: Request, response: Response): void {
        response.json(this.service.getHobbies());
    }
}


