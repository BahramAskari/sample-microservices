import {
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    Op,
    Optional
} from 'sequelize'
import sequelizeConnection from '../config';
import User, {User__Output} from "./User";

export interface Tag__Attributes {
    id: number;
    name: string;
    slug?: string;
    description?: string;

    //CoverId?: number
    CreatorId?: number

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface Tag__Input extends Optional<Tag__Attributes, 'id' | 'slug'> {
    songs?: number[]
}

export interface Tag__Output extends Required<Tag__Attributes> {
    Creator?: User__Output        //  Creator
}

class Tag extends Model<Tag__Attributes, Tag__Input> implements Tag__Attributes {
    public id!: number;
    public name!: string;
    public slug!: string;
    public description!: string;

    //public CoverId!: number;
    public CreatorId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;



    declare getCreator: BelongsToGetAssociationMixin<User>;
    declare setCreator: BelongsToSetAssociationMixin<User, User["id"]>;
    declare createCreator: BelongsToCreateAssociationMixin<User>;

}

Tag.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
  sequelize: sequelizeConnection,
  paranoid: true
})

Tag.addScope('not1', {
    where: {
        id: {[Op.gt]:1}
    }
});


/*      User Creator    */
User.hasMany(Tag, {
    foreignKey: 'CreatorId',
    as: "CreatedTags",
})
Tag.belongsTo(User, {
    foreignKey: {
        //field: "",
        allowNull: false,    // maybe we need to set the creator inside a transaction. Not at the creation time
        name: "CreatorId"
    },
    targetKey: "id",
    as: "Creator",
})

export default Tag