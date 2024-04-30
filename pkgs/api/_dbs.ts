import { apiContext } from "service-srv";
import { g } from "utils/global";
import { DBArg, execQuery } from "utils/query";

export const _ = {
  url: "/_dbs/:dbName/:action",
  async api(dbName: any, action?: string) {
    const { req, res } = apiContext(this);

    const body = req.params as unknown as DBArg;

    if (!!body && body.action) {
      if (body.action.toLowerCase().includes("delete")) {
        if (Array.isArray(body.params) && body.params[0]?.where) {
          if (
            body.table === "t_logbook_status" ||
            body.table === "t_logbook_emr"
          ) {
            if (!body.params[0]?.where?.id_logbook) {
              res.send([]);
              return;
            }
          }
        }
      }

      if (
        ["create", "update", "deleteMany", "delete"].includes(body.action) &&
        body.table !== "t_audit_trails"
      ) {
        setTimeout(async () => {
          await db.t_db_log.create({
            data: {
              data: body,
              ref: req.headers.get("referer") || "",
              ip: g.server.requestIP(req)?.address || "",
              mlsid: body.mlsid || null,
            },
          });
        });
      }
    }

    try {
      const result = await execQuery(body, db);
      res.send(result);
    } catch (e: any) {
      res.sendStatus(500);
      res.send(e.message);
      console.error(e);
    }
  },
};
