const sql = require("mssql");

function request(pool, query, params) {
  function getType(type) {
    switch (type) {
      case "int":
        return sql.Int;
      case "varchar":
        return sql.VarChar;
      case "decimal":
        return sql.Decimal(10, 2);
      case "date":
        return sql.Date;
    }
  }
  return new Promise(async (resolve, reject) => {
    const ps = new sql.PreparedStatement(pool);
    const paramsValues = {};
    params.forEach((param, i) => {
      paramsValues[param.name] = param.value;
      ps.input(param.name, getType(param.type));
    });
    ps.prepare(query, (err) => {
      ps.execute(paramsValues, (err, result) => {
        if (err) reject(err);
        else resolve(result.recordset);

        ps.unprepare((err) => {
          if (err) reject(err);
        });
      });
    });
  });
}

module.exports = request;
