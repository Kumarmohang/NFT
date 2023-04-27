// https://github.com/cryptlex/rest-api-response-format
export default class Response {
  static success(res, data, status = 200) {
    res.status(status);
    if (data && data.docs) {
      return res.json({
        status: 'success',
        results: data.totalDocs,
        limit: data.limit,
        page: data.page,
        pages: data.pages,
      });
    }
    return res.json({
      status: 'success',
      data,
    });
  }

  static error(res, error, status = 400) {
    res.status(status);
    return res.json({
      message: 'Bad request',
      // "field":  error.errors,
      errorCode: 400,
    });
  }
}
