import {
    BulkCreateOptions,
    CreateOptions,
    DataTypes,
    DestroyOptions,
    InstanceDestroyOptions,
    Model,
    Optional
} from 'sequelize'
import sequelizeConnection from '../config'

import {User, Role} from './index'
import {isArray, isEmpty} from "lodash";

interface User_Role__Attributes  {
    id: number;
    UserId: number;
    RoleId: number;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface User_Role__Input extends Optional<User_Role__Attributes , 'id'> {}

export interface User_Role__Output extends Required<User_Role__Input> {}

class User_Role extends Model<User_Role__Attributes , User_Role__Input> implements User_Role__Attributes  {
    public id!: number;
    public UserId!: number;
    public RoleId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User_Role.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    RoleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    }
}, {
    hooks: {
    },

    tableName: "user_role",
    sequelize: sequelizeConnection
})


User.belongsToMany(Role, {
    through: User_Role,
})
Role.belongsToMany(User, {
    through: User_Role,
})

export default User_Role