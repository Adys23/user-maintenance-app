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

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

app.get('/hobby', hobbyController.getHobbies.bind(hobbyController));

app.get('/user', userController.getUsers.bind(userController));
app.delete('/user/:userId', userController.deleteUser.bind(userController));
app.post('/user/restore/:userId', userController.restoreUser.bind(userController))


// start the Express api
app.listen(port, () => {
    // console.log( `api started at http://localhost:${ port }` );
});
