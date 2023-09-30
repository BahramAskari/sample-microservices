require('dotenv').config({path: './config/.env'})
import diff from 'microdiff'
import { Dialect, Sequelize   } from 'sequelize'
//import { Dialect, Sequelize   } from 'sequelize'
//const {Sequelize} = require("sequelize")
//require("sequelize-hierarchy-ts")(Sequelize)

//import localCache from '../lib/local-cache'

const isTest = process.env.NODE_ENV === 'test'

const dbName = isTest ? process.env.TEST_DB_NAME as string: process.env.DB_DATABASE as string
const dbUser = process.env.DB_USERNAME as string
const dbHost = process.env.DB_HOST
//const dbDriver = "mysql" as Dialect
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD



const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
    dialectOptions:{

    }
    //timezone: "+05:30",
  //define: {hooks}
})

export default sequelizeConnection
