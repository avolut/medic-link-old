import { apiContext } from "service-srv";
import { g } from "utils/global";
import { DBArg, execQuery } from "utils/query";

const session_map = {} as Record<string, number>;
export const _ = {
  url: "/_dbs/:dbName/:action",
  async api(dbName: any, action?: string) {
    const { req, res } = apiContext(this);

    const body = req.params as unknown as DBArg;

    if (!!body && body.action) {
      if (["create", "update", "deleteMany", "delete"].includes(body.action)) {
        let id_user = null;
        if (body.mlsid) {
          if (!session_map[body.mlsid]) {
            const u = await db.m_session.findFirst({
              where: { session_id: body.mlsid },
              select: { id_user: true },
            });
            if (u && u.id_user) {
              id_user = u.id_user;
              session_map[body.mlsid] = u.id_user;
            }
          } else {
            id_user = session_map[body.mlsid];
          }
        }

        setTimeout(async () => {
          await db.t_db_log.create({
            data: {
              data: body,
              ref: req.headers.get("referer") || "",
              ip: g.server.requestIP(req)?.address || "",
              mlsid: body.mlsid || null,
              id_user,
            },
          });
        });
      }

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
