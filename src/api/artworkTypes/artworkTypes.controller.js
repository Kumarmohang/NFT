import ArtworkTypesService from './artworkTypes.service';
import { handleResponse } from '../../helpers';

class ArtworkTypesController {
  constructor(service) {
    this.service = service;
    this.getTypes = this.getTypes.bind(this);
  }

  async getTypes(req, res, next) {
    try {
      const result = await this.service.getTypes();
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ArtworkTypesController(ArtworkTypesService);

// exports.getTypes = (req, res) => {
//   ArtworkTypes.findAll().then((data) => {
//     if (data) {
//       console.log(data);
//       return handleResponse.success(res, data);
//     }
//     res.status(404).send({
//       message: `Cannot find `,
//     });
//   });
// };
