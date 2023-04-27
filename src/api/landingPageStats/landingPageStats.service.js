const LandingPageStats = require('../../../database/models').landing_page_stats;

class LandingPageStatsService {
  constructor(model) {
    this._model = model;
    this.getTopStats = this.getTopStats.bind(this);
  }

  async getTopStats() {
    // const artworksCount = await NftLists.count();
    // const collectionCount = await ArtworkCollection.count();
    // const userCount = await PlatformUsers.count();
    // const transactionsCount = await MarketplaceTransactions.count();

    // const results = {
    //   artworks_count: artworksCount || 0,
    //   collections_count: collectionCount || 0,
    //   artist_count: userCount || 0,
    //   total_transactions_count: transactionsCount || 0,
    // };

    // return results;
    return this._model.findOne();
  }
}

export default new LandingPageStatsService(LandingPageStats);
