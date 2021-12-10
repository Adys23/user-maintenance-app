import { Request, Response } from 'express';
import { Hobby, UserDTO, UserEntity } from '../types';
import UserService from './service';

export default class UserController {
	private service: UserService;

	constructor(
		userCollection: Collection<UserEntity>,
		hobbyCollection: Collection<Hobby>
	) {
		this.service = new UserService(userCollection, hobbyCollection);
	}

	public getUsers(request: Request, response: Response): void {
		response.json(this.service.getUsers());
	}

	public getUser(request: Request, response: Response): void {
		const id: string = request.params.userId;
		response.json(this.service.getUser(id));
	}

	public deleteUser(request: Request, response: Response): void {
		try {
			const id: string = request.params.userId;
			this.service.deleteUser(id);
			this.sendResponse(response, 200, 'User deleted successfully');
		} catch (e) {
			this.sendResponse(response, 500, 'Failed to delete the user');
		}
	}

	public deleteUsers(request: Request, response: Response): void {
		try {
			const indices: string[] = request.body;
			this.service.deleteUsers(indices);
			this.sendResponse(response, 200, 'Users deleted successfully');
		} catch (e) {
			this.sendResponse(response, 500, 'Failed to delete users');
		}
	}

	public restoreUsers(request: Request, response: Response): void {
		try {
			const indices: string[] = request.body;
			this.service.restoreUsers(indices);
			this.sendResponse(response, 200, 'Users restored successfully');
		} catch (e) {
			this.sendResponse(response, 500, 'Failed to restore users');
		}
	}

	public editUser(request: Request, response: Response): void {
		try {
			const id: string = request.params.userId;
			if (id.length) {
				const editedUser: UserDTO = request.body;
				this.service.editUser({ id, ...editedUser });
				this.sendResponse(response, 200, 'User edited successfully');
			}
		} catch (e) {
			this.sendResponse(response, 500, 'Failed to edit the user');
		}
	}

	private sendResponse(
		response: Response,
		code: number,
		message: string
	): void {
		response.status(code);
		response.send(message);
	}
}
