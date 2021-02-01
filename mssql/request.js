function request(pool, query) {
  return new Promise(async (resolve, reject) => {
    try {
      const request = pool.request();
      const { recordset } = await request.query(query);
      resolve(recordset);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = request;
