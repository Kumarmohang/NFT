./node_modules/.bin/sequelize model:generate --name platform_users --attributes public_address:string

./node_modules/.bin/sequelize model:generate --name user_session --attributes user_id:string

./node_modules/.bin/sequelize model:generate --name artwork_types --attributes name:string

./node_modules/.bin/sequelize model:generate --name master_themes --attributes title:string

./node_modules/.bin/sequelize model:generate --name user_collections --attributes name:string

./node_modules/.bin/sequelize model:generate --name user_artworks --attributes name:string

./node_modules/.bin/sequelize model:generate --name artwork_themes --attributes artwork_id:string

./node_modules/.bin/sequelize model:generate --name nft_lists --attributes artwork_id:string

./node_modules/.bin/sequelize model:generate --name marketplace_sell_orders --attributes nft_id:string

./node_modules/.bin/sequelize model:generate --name marketplace_transactions --attributes nft_id:string

./node_modules/.bin/sequelize model:generate --name admin_users --attributes username:string

./node_modules/.bin/sequelize model:generate --name config_store --attributes artwork_type_id:string

./node_modules/.bin/sequelize model:generate --name master_countries --attributes name:string

./node_modules/.bin/sequelize model:generate --name wallet_extensions --attributes name:string

./node_modules/.bin/sequelize model:generate --name crypto_config --attributes name:string

./node_modules/.bin/sequelize model:generate --name youtube --attributes artworkId:string

./node_modules/.bin/sequelize model:generate --name instagram --attributes artworkId:string

./node_modules/.bin/sequelize model:generate --name user_wishlist --attributes artworkId:string

./node_modules/.bin/sequelize model:generate --name user_likes --attributes artworkId:string

./node_modules/.bin/sequelize model:generate --name landing_page_stats --attributes artworks_count:string

./node_modules/.bin/sequelize model:generate --name collection_likes --attributes user_public_key:string