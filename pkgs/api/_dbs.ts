import { apiContext } from "service-srv";
import { execQuery } from "utils/query";

export const _ = {
  url: "/_dbs/:dbName/:action",
  async api(dbName: any, action?: string) {
    const { req, res } = apiContext(this);

    const body = req.params;

    console.log('coba',body);
    
    try {
      const result = await execQuery(body, db);
      console.log(result);
      res.send(result);
    } catch (e: any) {
      res.sendStatus(500);
      res.send(e.message);
      console.error(e);
    }
  },
};
