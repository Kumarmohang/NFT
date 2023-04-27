import _ from 'lodash';
import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config';

const AuctionSchema = new Schema({
  originalAuctionRecordUrl: {
    type: String,
  },
  recordId: {
    type: String,
  },
  rawSourceId: {
    type: String,
  },
  auctionEventName: {
    type: String,
  },
  auctionEventUrl: {
    type: String,
  },
  auctionHouseName: {
    type: String,
  },
  auctionHouseId: {
    type: String,
  },
  auctionLocation: {
    type: String,
  },
  auctionStartDate: {
    type: Date,
  },
  auctionEndDate: {
    type: Date,
  },
  lotNum: {
    type: String,
    alias: 'lot',
  },
  isSold: {
    type: Boolean,
  },
  saleDate: {
    type: Date,
  },
  price: {
    type: Schema.Types.Mixed,
  },
  literature: {
    type: [String],
  },
  provenance: {
    type: [String],
  },
  exhibitions: {
    type: [String],
  },
  condition: {
    type: [String],
  },
  catalogue: {
    type: [String],
  },
  markings: {
    type: [String],
  },
  lotDetails: {
    type: [String],
  },
  images: {
    type: [Schema.Types.Mixed],
  },
  guaranteedLot: {
    type: Schema.Types.Mixed,
  },
  premiumLot: {
    type: Schema.Types.Mixed,
  },
  sourceName: {
    type: String,
  },
  sourceId: {
    type: String,
  },
  sourceType: {
    type: String,
  },
});

const ArtworkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creationYear: {
    type: Number,
  },
  creationDate: {
    type: Date,
  },
  description: {
    type: [String],
  },
  additionalInfo: {
    type: [String],
  },
  category: {
    type: String,
  },
  categoryId: {
    type: String,
  },
  artistId: {
    type: String,
  },
  artistName: {
    type: String,
  },
  dimensions: {
    type: [Schema.Types.Mixed],
  },
  medium: {
    type: String,
  },
  images: {
    type: [Schema.Types.Mixed],
  },
  literature: {
    type: [String],
  },
  provenance: {
    type: [String],
  },
  exhibitions: {
    type: [String],
  },
  auctionRecords: [AuctionSchema],
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
  artworkId: {
    type: String,
  },
  referenceId: {
    type: String,
  },
  literature_ref: {
    type: [Schema.Types.Mixed],
    alias: 'literatureRef',
  },
  synonyms: {
    type: [String],
  },
  lastPriceSold: {
    type: Number,
  },
  editionNumber: {
    type: Schema.Types.Mixed,
  },
});

// ArtworkSchema.index( { title: "text", synonyms: "text", artistName:"text" } )
ArtworkSchema.plugin(mongoosePaginate);

const Artwork = mongoose.model(
  'Artwork',
  ArtworkSchema,
  config.mongodb.artworksCollection || 'final_collection'
);

export default Artwork;

AuctionSchema.set('toJSON', {
  transform(doc, ret) {
    return _.omit(ret, ['sourceName', 'sourceId', 'sourceType']);
  },
});
