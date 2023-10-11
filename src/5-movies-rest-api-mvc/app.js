import { MovieModel } from "./models/mysql/movies.js";
import {serverStart} from './server.js'

serverStart({movieModel: MovieModel})