import { db } from "hatchable";

export const access = "admin";
export const methods = ["GET", "POST"];

export default async function (req, res) {
  if (req.method === "GET") {
    const { rows } = await db.query("SELECT id, created_at, name, email, phone, lead_type, source, status, start_date, end_date, group_size, starting_location, budget, travel_style, interests, message FROM leads ORDER BY created_at DESC LIMIT 200");
    return res.json({leads:rows});
  }
  const id = req.body && req.body.id;
  const status = req.body && req.body.status;
  if (!id || !status) return res.status(400).json({ok:false,error:"id and status required"});
  const allowed = ["new","contacted","qualified","closed","archived"];
  if (!allowed.includes(status)) return res.status(400).json({ok:false,error:"invalid status"});
  await db.query("UPDATE leads SET status = $1 WHERE id = $2", [status, id]);
  return res.json({ok:true});
}