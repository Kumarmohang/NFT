// https://github.com/cryptlex/rest-api-response-format
export default class Response {
  static success(res, data, status = 200) {
    res?.status?.(status);
    if (data && data.rows) {
      // console.log(data);
      return res.json({
        data: {
          status: 'success',
          results: data.rows,
          total: data.count,
          limit: data.limit,
          nextOffset: data.offset + data.limit,
        },
      });
    }
    return res.json({
      status: 'success',
      data,
    });
  }

  static error(res, error, status = 400) {
    const response = {
      // success: 'failed',
      message: error.message,
      errorCode: error.code,
    };
    if (status === 400) {
      response.field = error.errors;
    }
    res.status(status);
    return res.json(response);
  }
}
