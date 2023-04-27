const LandingPageStats = require('../../../database/models').landing_page_stats;

class LandingPageStatsService {
  constructor(model) {
    this._model = model;
    this.getNotifications = this.getNotifications.bind(this);
    this.createNotifications = this.createNotifications.bind(this);
  }

  getNotifications({ userId }) {
    return this._model.findOne({
      where: {
        user_id: userId,
      },
    });
  }

  createNotifications({ userId, notificationText, category, status }) {
    return this._model.create({
      user_id: userId,
      notification_text: notificationText,
      createdAt: new Date(),
      category,
      status,
    });
  }
}

export default new LandingPageStatsService(LandingPageStats);
