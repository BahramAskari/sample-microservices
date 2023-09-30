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
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyCountAssociationsMixin, HasManyCreateAssociationMixin,
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
import Province , {Province__Output} from "./Province";

export interface Country__Attributes {
    id: number;
    name: string;
    slug: string;
    phoneCode: number;

    CreatorId?: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}



export interface Country__Input extends Optional<Country__Attributes, 'id'> {
    provinces?: number[]
}

export interface Country__Output extends Required<Country__Attributes> {
    Creator?: User__Output
    Provinces?: Province__Output[] // States?: Province__Output[]
}

class Country extends Model<Country__Attributes, Country__Input> implements Country__Attributes {
    public id!: number
    public name!: string
    public slug!: string
    public phoneCode!: number

    public CreatorId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    getCreator: BelongsToGetAssociationMixin<User>;
    setCreator: BelongsToSetAssociationMixin<User, User["id"]>;
    createCreator: BelongsToCreateAssociationMixin<User>;

    // Country -> Provinces
    declare getProvinces: HasManyGetAssociationsMixin<Province>; // Note the null assertions!
    declare countProvinces: HasManyCountAssociationsMixin;
    declare addProvince: HasManyAddAssociationMixin<Province, Province["id"]>;
    declare addProvinces: HasManyAddAssociationsMixin<Province, Province["id"]>;
    declare removeProvince: HasManyRemoveAssociationMixin<Province, Province["id"]>;
    declare removeProvinces: HasManyRemoveAssociationsMixin<Province, Province["id"]>;
    declare setProvinces: HasManySetAssociationsMixin<Province, Province["id"]>;


    /**
     * Static methods
     */
    async findIran() {

    }
}

Country.init({
    id: {
        type: DataTypes.TINYINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }, slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneCode:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    /** Virtual field (not fillable by Countries. Just to retrieve) **/
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


/*      User Creator    */
User.hasMany(Country, {
    hooks: true,
    foreignKey: 'CreatorId',
    as: "CreatedCountries",
})
Country.belongsTo(User, {
    foreignKey: {
        //field: "",
        allowNull: false,    // maybe we need to set the creator inside a transaction. Not at the creation time
        name: "CreatorId"
    },
    targetKey: "id",
    as: "Creator",
})


export default Country