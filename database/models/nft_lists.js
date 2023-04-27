const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class NftLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NftLists.belongsTo(models.user_artworks, {
        foreignKey: 'artwork_id',
        targetKey: 'id',
      });
      models.user_artworks.hasOne(NftLists, {
        foreignKey: 'artwork_id',
        sourceKey: 'id',
      });

      NftLists.belongsTo(models.platform_users, {
        foreignKey: 'creator_id',
        targetKey: 'id',
        as: 'creator',
      });
      models.platform_users.hasOne(NftLists, {
        foreignKey: 'creator_id',
        sourceKey: 'id',
      });

      NftLists.belongsTo(models.master_types, {
        foreignKey: 'type_id',
        targetKey: 'id',
      });
      models.master_types.hasMany(NftLists, {
        foreignKey: 'type_id',
        sourceKey: 'id',
      });

      NftLists.belongsTo(models.platform_users, {
        foreignKey: 'current_owner_id',
        targetKey: 'id',
        as: 'current_owner',
      });
      models.platform_users.hasOne(NftLists, {
        foreignKey: 'current_owner_id',
        sourceKey: 'id',
      });
      NftLists.belongsTo(models.user_collections, {
        foreignKey: 'collection_id',
        targetKey: 'id',
      });
    }
  }
  NftLists.init(
    {
      artwork_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_artworks',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      file_url: {
        type: DataTypes.STRING,
      },
      thumbnail_url: {
        type: DataTypes.STRING,
      },
      content_type: {
        type: DataTypes.STRING,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'master_types',
          key: 'id',
        },
      },
      collection_id: {
        type: DataTypes.INTEGER,
      },
      external_link: {
        type: DataTypes.STRING,
      },
      creator_id: {
        type: DataTypes.UUID,
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      creator_public_address: {
        type: DataTypes.STRING,
      },
      smart_contract_address: {
        type: DataTypes.STRING,
      },
      ipfs_hash: {
        type: DataTypes.STRING,
      },
      is_enabled: {
        type: DataTypes.BOOLEAN,
      },
      token_id: {
        type: DataTypes.STRING,
      },
      blockchain_txn_hash: {
        type: DataTypes.STRING,
      },
      mint_status: {
        type: DataTypes.STRING,
      },
      minted_datetime: {
        type: DataTypes.DATE,
      },
      current_owner_public_key: {
        type: DataTypes.STRING,
      },
      current_owner_id: {
        type: DataTypes.UUID,
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      network_type: {
        type: DataTypes.STRING,
      },
      network_id: {
        type: DataTypes.STRING,
      },
      blockchain_networks_id: {
        type: DataTypes.STRING,
      },
      network_name: {
        type: DataTypes.STRING,
      },
      no_of_likes: {
        type: DataTypes.INTEGER,
      },
      no_of_wishlist: {
        type: DataTypes.INTEGER,
      },
      smart_contract_type: {
        type: DataTypes.STRING,
      },
      nft_type: {
        type: DataTypes.STRING,
      },
      creator_royalty: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'nft_lists',
    }
  );
  NftLists.addHook('beforeSave', async (nftLists) => (nftLists.id = uuid()));
  return NftLists;
};
