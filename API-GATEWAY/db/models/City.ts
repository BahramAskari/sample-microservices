import {
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin, BelongsToSetAssociationMixin,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyGetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin,
    Model,
    ModelStatic,
    Optional
} from 'sequelize'
import sequelizeConnection from '../config'
import User, {User__Output} from "./User";
import Province, {Province__Output} from "./Province";

export interface City__Attributes {
    id: number;
    name: string;
    slug: string;

    CreatorId?: number;
    ProvinceId?: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}



export interface City__Input extends Optional<City__Attributes, 'id'> {
}

export interface City__Output extends Required<City__Attributes> {
    Creator?: User__Output
    Province?: Province__Output
}
//export interface City__Output extends Required<Omit<City__Attributes,'deletedAt'>> {}

class City extends Model<City__Attributes, City__Input> implements City__Attributes {
    public id!: number
    public name!: string
    public slug!: string

    public CreatorId!: number;
    public ProvinceId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    getCreator: BelongsToGetAssociationMixin<User>;
    setCreator: BelongsToSetAssociationMixin<User, User["id"]>;
    createCreator: BelongsToCreateAssociationMixin<User>;

    getProvince: BelongsToGetAssociationMixin<Province>;
    setProvince: BelongsToSetAssociationMixin<Province, Province["id"]>;
    createProvince: BelongsToCreateAssociationMixin<Province>;


}

City.init({
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
        unique: true,
    },

    /** Virtual field (not fillable by Cities. Just to retrieve) **/
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
    //hooks{},
  sequelize: sequelizeConnection,
  paranoid: true
})


/**     Begin   Associations    **/
/*      User Creator    */
User.hasMany(City, {
    hooks: true,
    foreignKey: 'CreatorId',
    as: "CreatedCities",
})
City.belongsTo(User, {
    foreignKey: {
        //field: "",
        allowNull: true,    // maybe we need to set the creator inside a transaction. Not at the creation time
        name: "CreatorId"
    },
    targetKey: "id",
    as: "Creator",
})
Province.hasMany(City, {
    hooks: true,
    //onDelete: ""
    //as: "Cities",
})

City.belongsTo(Province,{
    foreignKey: {
       // allowNull: false,
    },
    targetKey: "id",
    //as: "User",
})


export default City