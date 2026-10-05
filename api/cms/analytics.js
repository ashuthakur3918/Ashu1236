import { db } from "hatchable";
export const access="admin"; export const methods=["GET"];
export default async function(req,res){
 const [{rows:totals},{rows:events},{rows:pages},{rows:sources}]=await Promise.all([
  db.query("SELECT count(*)::int AS events, count(DISTINCT metadata->>'session_id')::int AS sessions FROM funnel_events"),
  db.query("SELECT event_name,count(*)::int AS count FROM funnel_events GROUP BY event_name ORDER BY count DESC LIMIT 12"),
  db.query("SELECT page_path,count(*)::int AS count FROM funnel_events WHERE event_name='page_view' GROUP BY page_path ORDER BY count DESC LIMIT 10"),
  db.query("SELECT source,count(*)::int AS count FROM funnel_events GROUP BY source ORDER BY count DESC LIMIT 10")
 ]);
 return res.json({totals:totals[0]||{events:0,sessions:0},events,pages,sources});
}