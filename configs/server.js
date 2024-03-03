'use strict'

import  express  from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import userRoutes from "../src/users/user.routes.js";
import authRoutes from "../src/auth/auth.routes.js";
import companyRoutes from "../src/company/company.routes.js";

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/companyG/v1/users';
        this.authRoutes = '/companyG/v1/auth';
        this.empresaPath = '/companyG/v1/newCompany'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authRoutes, authRoutes);
        this.app.use(this.empresaPath, companyRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server runnig on port', this.port);
        });
    }
}

export default Server;