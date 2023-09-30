import {
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin, BelongsToSetAssociationMixin,
    CreateOptions,
    DataTypes,
    FindOptions,
    Model,
    ModelScopeOptions,
    ModelStatic,
    Optional,
    ScopeOptions
} from 'sequelize'
import sequelizeConnection from '../config'
import {HookReturn} from "sequelize/types/hooks";
import User, {User__Output} from "./User";

export interface LoginSession__Attributes {
    id?: number;
    accessToken: string;
    refreshToken: string;

    blocked?: boolean;
   // UserId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}



export interface LoginSession__Input extends Optional<LoginSession__Attributes, 'id'> {
    UserId?: number
}

export interface LoginSession__Output extends Required<LoginSession__Attributes> {
    User?: User__Output
}
//export interface LoginSession__Output extends Required<Omit<LoginSessionAttributes,'deletedAt'>> {}

class LoginSession extends Model<LoginSession__Attributes, LoginSession__Input> implements LoginSession__Attributes {
    public id!: number

    public accessToken: string;
    public refreshToken: string;

    public blocked!: boolean

    public UserId!: number


    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;


    getUser: BelongsToGetAssociationMixin<User>;
    setUser: BelongsToSetAssociationMixin<User, User["id"]>;    // User check required
    createUser: BelongsToCreateAssociationMixin<User>;


}

LoginSession.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true
    }, refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true
    },
    blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    /** Virtual field (not fillable by LoginSessions. Just to retrieve) **/
    /***  Begin Sample Column ***/

}, {
    /***  Default Scope  ***/
    defaultScope:{
    },
    scopes:{
      isBlocked:{
          where:{
              blocked: false,
              //createdAt: Date.now() + 120 seconds
          }
      }
    },
    /** Begin Hooks **/
    hooks:{
      beforeFind(options: FindOptions<LoginSession__Attributes>): HookReturn {
            const {transaction} = options
      },
        afterFind: async (instancesOrInstance: readonly LoginSession[] | LoginSession | null, options: FindOptions<LoginSession__Attributes>) => {
        },
        afterCreate: (attributes: LoginSession, options: CreateOptions<LoginSession__Attributes>) => {

        },
        beforeCreate(attributes: LoginSession, options: CreateOptions<LoginSession__Attributes>): HookReturn {
        }
    },

  sequelize: sequelizeConnection,
  paranoid: true
})


/**     Begin   Associations    **/
User.hasMany(LoginSession, {
    hooks: true,
   // foreignKey: "UserId"
    //as: "Logins",
})
LoginSession.belongsTo(User, {
    foreignKey: {
       // allowNull: false,        // ممکن است بخواهیم به صورت بارگذاری تنبل به کاربری نسبت داده شود در چرخه یک ترنس اکشن
        //field: "",
        //name: "authorID"
    },
    targetKey: "id",
    //as: "User",
})

export default LoginSession