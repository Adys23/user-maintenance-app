import express, {Express, Response, Request} from 'express'
import Database from './database';
import bodyParser from 'body-parser';
import cors from 'cors';
import HobbyController from './hobbies/controller';
import UserController from './users/controller';

const app: Express = express();
const port: number = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db: Database = new Database();
const hobbyController: HobbyController = new HobbyController(db.getHobbies());
const userController: UserController = new UserController(db.getUsers(), db.getHobbies())

app.get("/", (req: Request, res: Response): void => {
    res.send("Welcome to the users and hobbies api!");
});

app.get('/hobby', hobbyController.getHobbies.bind(hobbyController));

app.get('/user', userController.getUsers.bind(userController));
app.get('/user/:userId', userController.getUser.bind(userController));

app.delete('/user/:userId', userController.deleteUser.bind(userController));
app.delete('/user', userController.deleteUsers.bind(userController))

app.post('/user/restore/:userId', userController.restoreUser.bind(userController));
app.post('/user/restore', userController.restoreUsers.bind(userController))

app.post('/user/:userId', userController.editUser.bind(userController));


app.listen(port);
