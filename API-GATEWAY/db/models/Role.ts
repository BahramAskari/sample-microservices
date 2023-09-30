import {
    Association,
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManySetAssociationsMixin, BelongsToSetAssociationMixin, BulkCreateOptions, CreateOptions,
    DataTypes, DestroyOptions, InstanceDestroyOptions, InstanceRestoreOptions, InstanceUpdateOptions,
    Model,
    ModelStatic,
    Optional, RestoreOptions, UpdateOptions
} from 'sequelize'
import sequelizeConnection from '../config'
import User, {User__Output} from "./User";

export interface Role__Attributes {
    id: number;
    name: string;
    description?: string;

    CreatorId?: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}



export interface Role__Input extends Optional<Role__Attributes, 'id'> {
    users?: number[]
}

export interface Role__Output extends Required<Role__Attributes> {
    Creator?: User__Output
    Users?: User__Output[]
}

class Role extends Model<Role__Attributes, Role__Input> implements Role__Attributes {
    public id!: number
    public name: string
    public description!: string

    public CreatorId!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    declare getCreator: BelongsToGetAssociationMixin<User>;
    declare setCreator: BelongsToSetAssociationMixin<User, User["id"]>;
    declare createCreator: BelongsToCreateAssociationMixin<User>;

    declare getUsers: BelongsToManyGetAssociationsMixin<User>; // Note the null assertions!
    declare addUser: BelongsToManyAddAssociationMixin<User, User["id"]>;
    declare addUsers: BelongsToManyAddAssociationsMixin<User, User["id"]>;
    declare removeUser: BelongsToManyRemoveAssociationMixin<User, User["id"]>;
    declare removeUsers: BelongsToManyRemoveAssociationsMixin<User, User["id"]>;
    declare setUsers: BelongsToManySetAssociationsMixin<User, User["id"]>;

    declare static associations: {
        Creator: Association<Role, User>;
        Users: Association<Role, User>;
    };
}

Role.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    /*
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
     */
    description: {
        type: DataTypes.TEXT
    },

    /** Virtual field (not fillable by Roles. Just to retrieve) **/
    /***  Begin Sample Column ***/

}, {
    /***  Default Scope  ***/
    defaultScope:{
      attributes:{
          exclude: ["deletedAt"],
      }
    },
    /** Begin Custom Scopes **/
    scopes:{
    },
    /** End Custom Scopes **/
    hooks: {
    },

  sequelize: sequelizeConnection,
  paranoid: true
})


/*      User Creator    */
User.hasMany(Role, {
    hooks: true,
    foreignKey: 'CreatorId',
    as: "CreatedRoles",
})
Role.belongsTo(User, {
    foreignKey: {
        //field: "",
        allowNull: true,
        name: "CreatorId"
    },
    targetKey: "id",
    as: "Creator",
})



export default Role