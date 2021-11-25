import {UserRepository} from './repository';
import HobbyService from '../hobbies/service';
import {Hobby, User, UserDTO} from '../types';


export default class UserService {

    private userRepository: UserRepository;
    private hobbyService: HobbyService;

    constructor(userCollection: Collection<User>, hobbyCollection: Collection<Hobby>) {
        this.userRepository = new UserRepository(userCollection);
        this.hobbyService = new HobbyService(hobbyCollection);
    }

    public getUsers(): UserDTO[] {
        const hobbiesMap: Record<string, string> = this.hobbyService.getHobbiesMap();
        return this.userRepository.getUsers().map<UserDTO>((user: User & LokiObj): UserDTO => {
            const hobbies: Hobby[] = user.hobbies.map((hobbyId: string) => ({ id: hobbyId, name: hobbiesMap[hobbyId] }))
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
            }
        });
    }

    public deleteUser(id: string): void {
        this.userRepository.deleteUser(id);
    }

    public restoreUser(id: string): void {
        this.userRepository.restoreUser(id);
    }
}
