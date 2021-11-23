import {HobbyRepository} from './repository';
import {Hobby} from '../types';


export default class HobbyService {

    private repository: HobbyRepository;

    constructor(collection: Collection<Hobby>) {
        this.repository = new HobbyRepository(collection);
    }

    public getHobbies(): Hobby[] {
        return this.repository.getHobbies();
    }

    public getHobbiesMap(): Record<string, string> {
        return this.repository.getHobbies().reduce<Record<string, string>>((acc: Record<string, string>, value: Hobby) => {
            acc[value.id] = value.name;
            return acc;
        }, {})
    }
}
