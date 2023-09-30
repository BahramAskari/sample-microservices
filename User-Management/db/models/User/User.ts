import {
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyGetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin,

    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManySetAssociationsMixin,

    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    HasOneCreateAssociationMixin,

    DataTypes,
    Model,
    Op,
    ModelStatic,
    Optional,
    FindOptions,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    InstanceDestroyOptions,
    Association,
    BelongsToManyCreateAssociationMixin
} from 'sequelize'
import sequelizeConnection from '../../config'
import {
    Role,
} from "../index";
import bcrypt from "bcryptjs";
import {HookReturn} from "sequelize/types/hooks";
import {Role__Attributes, Role__Output} from "./Role";
import {isEmpty, isNil} from "lodash";

export interface User__Attributes {
    id: number;
    username: string;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    readonly fullName?: string;
    sign?: string;
    refreshToken?: string;

    CreatorId?: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}



export interface User__Input extends Optional<User__Attributes, 'id'> {
    roles?: number[]
}

export interface User__Output extends Required<User__Attributes> {
    Creator?: User__Output
    Roles?: Role__Output[]
    CreatedRoles?: Role__Output[]
}

class User extends Model<User__Attributes, User__Input> implements User__Attributes {
    public id!: number
    public username: string;
    public firstName: string;
    public lastName!: string;
    public sign!: string;
    public refreshToken!: string;
    public fullName!: string;
    public email: string;
    public password: string;

    public CreatorId!: number;
    public DefaultAvatarId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;


    declare getRoles: BelongsToManyGetAssociationsMixin<Role>; // Note the null assertions!
    declare addRole: BelongsToManyAddAssociationMixin<Role, Role["id"]>;
    declare addRoles: BelongsToManyAddAssociationsMixin<Role, Role["id"]>;
    declare removeRole: BelongsToManyRemoveAssociationMixin<Role, Role["id"]>;
    declare removeRoles: BelongsToManyRemoveAssociationsMixin<Role, Role["id"]>;
    declare setRoles: BelongsToManySetAssociationsMixin<Role, Role["id"]>;
    declare createRole: BelongsToManyCreateAssociationMixin<Role>;

    declare getCreator: BelongsToGetAssociationMixin<User>;
    declare setCreator: BelongsToSetAssociationMixin<User, User["id"]>;
    declare createCreator: BelongsToCreateAssociationMixin<User>;

    declare static associations: {
        Creator: Association<User, User>;
        Roles: Association<User, Role>;
    };

}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sign: {
        type: DataTypes.TEXT
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
           // len: [3, 180],
        },
        set(value: string) {
                this.setDataValue('email', value.toLowerCase());
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 60],
        },

        set(value) {
            if (typeof value === "string") {
                console.log(`Password Hash salt: ${process.env.PASSWORD_HASH_SALT}`)
                        // Store hash in the database
                        this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
                //  this.setDataValue('password', bcrypt.hashSync(value, process.env.PASSWORD_HASH_SALT));
            }
        }
    },

    /** Virtual field (not fillable by users. Just to retrieve) **/
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            const firstName = this.firstName
            const lastName = this.lastName
            return `${(firstName ? firstName: "") + (lastName ? (firstName? ` ${this.lastName}`: `${this.lastName}`): "")}`;
        },
        set(value) {
            console.log(`Trying to set something new? `, value)
            //throw new Error('Do not try to set the `fullName` value!');
        }
    },
    /***  Begin Sample Column ***/

}, {
    /***  Default Scope  ***/
    defaultScope:{
      attributes:{
          exclude: ["password", /*"refreshToken",*/ "deletedAt"],
      }
    },
    /** Begin Custom Scopes **/
    scopes:{
        withPassword: {
          attributes: {
              include: ["password"]
          }
        },
    },
    /** End Custom Scopes **/
    hooks:{
        beforeFind(options: FindOptions<User__Attributes>): HookReturn {
        },
        afterDestroy: async (instance: User, options: InstanceDestroyOptions) => {
            console.log(`Hook: Delete User`)
        }
    },

    timestamps: true,
    paranoid: true,
    //  freezeTableName: true,
    sequelize: sequelizeConnection,
})


    User.belongsTo(User, {
        foreignKey: {
            name: "CreatorId"
        },
        targetKey: "id",
        as: "Creator",
    })

export default User