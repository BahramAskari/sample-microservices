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
import sequelizeConnection from '../../config'
import {City} from "../index";
import Country, {Country__Output} from "./Country";
import {City__Output} from "./City";
import User, {User__Output} from "../User/User";

export interface Province__Attributes {
    id: number;
    name: string;
    slug: string;

    CreatorId?: number;
    CountryId?: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}



export interface Province__Input extends Optional<Province__Attributes, 'id'> {
    cities?: number[]
}

export interface Province__Output extends Required<Province__Attributes> {
    Creator?: User__Output
    Country?: Country__Output
    Cities?: City__Output[]
}
//export interface Province__Output extends Required<Omit<Province__Attributes,'deletedAt'>> {}

class Province extends Model<Province__Attributes, Province__Input> implements Province__Attributes {
    public id!: number
    public name!: string
    public slug!: string

    public CreatorId!: number;
    public CountryId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    getCreator: BelongsToGetAssociationMixin<User>;
    setCreator: BelongsToSetAssociationMixin<User, User["id"]>;
    createCreator: BelongsToCreateAssociationMixin<User>;

    getCountry: BelongsToGetAssociationMixin<Country>;
    setCountry: BelongsToSetAssociationMixin<Country, Country["id"]>;
    createCountry: BelongsToCreateAssociationMixin<Country>;

    declare getCities: HasManyGetAssociationsMixin<City>; // Note the null assertions!
    declare addCity: HasManyAddAssociationMixin<City, City["id"]>;
    declare addCities: HasManyAddAssociationsMixin<City, City["id"]>;
    declare removeCity: HasManyRemoveAssociationMixin<City, City["id"]>;
    declare removeCities: HasManyRemoveAssociationsMixin<City, City["id"]>;
    declare setCities: HasManySetAssociationsMixin<City, City["id"]>;
}

Province.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    /** Virtual field (not fillable by Provinces. Just to retrieve) **/
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
User.hasMany(Province, {
    hooks: true,
    foreignKey: 'CreatorId',
    as: "CreatedProvinces",
})
Province.belongsTo(User, {
    foreignKey: {
        //field: "",
        allowNull: true,    // maybe we need to set the creator inside a transaction. Not at the creation time
        name: "CreatorId"
    },
    targetKey: "id",
    as: "Creator",
})
/*  Begin Associations  */
Country.hasMany(Province, {
    //onDelete: 'CASCADE',
    hooks: true,
    //as: "Cities",
})

Province.belongsTo(Country,{
    foreignKey: {
        // allowNull: false,
    },
    targetKey: "id",
    //as: "User",
})

export default Province