import { UserRepository } from './repository';
import HobbyService from '../hobbies/service';
import { Hobby, UserEntity, UserDTO, User } from '../types';

export default class UserService {
	private userRepository: UserRepository;
	private hobbyService: HobbyService;

	constructor(
		userCollection: Collection<UserEntity>,
		hobbyCollection: Collection<Hobby>
	) {
		this.userRepository = new UserRepository(userCollection);
		this.hobbyService = new HobbyService(hobbyCollection);
	}

	public getUsers(): UserDTO[] {
		const hobbiesMap: Record<string, string> =
			this.hobbyService.getHobbiesMap();
		return this.userRepository
			.getUsers()
			.map<UserDTO>(
				(user: UserEntity & LokiObj): UserDTO =>
					this.userEntityToUserDTO(user, hobbiesMap)
			);
	}

	public getUser(id: string): UserDTO {
		const user: UserEntity & LokiObj = this.userRepository.getUser(id);
		const hobbiesMap: Record<string, string> =
			this.hobbyService.getHobbiesMap();

		return this.userEntityToUserDTO(user, hobbiesMap);
	}

	public editUser(editedUser: UserDTO): void {
		if (this.userRepository.userExists(editedUser.id)) {
			const user: User = {
				...editedUser,
				hobbies: editedUser.hobbies.map<string>((hobby: Hobby) => hobby.id),
			};
			this.userRepository.editUser(user);
		} else {
			throw new Error(`User with given id does not exist`);
		}
	}

	public deleteUser(id: string): void {
		if (this.userRepository.userExists(id)) {
			this.userRepository.deleteUser(id);
		} else {
			throw new Error(`User with given id does not exist`);
		}
	}

	public deleteUsers(indices: string[]): void {
		this.userRepository.deleteUsers(indices);
	}

	public restoreUsers(indices: string[]): void {
		this.userRepository.restoreUsers(indices);
	}

	private userEntityToUserDTO(
		user: UserEntity & LokiObj,
		hobbiesMap: Record<string, string>
	): UserDTO {
		const hobbies: Hobby[] = user.hobbies.map((hobbyId: string) => ({
			id: hobbyId,
			name: hobbiesMap[hobbyId],
		}));
		return {
			id: user.id,
			name: user.name,
			lastName: user.lastName,
			email: user.email,
			age: user.age,
			gender: user.gender,
			phoneNumber: user.phoneNumber,
			address: user.address,
			dateOfBirth: user.dateOfBirth,
			hobbies,
		};
	}
}
