import { db, auth } from "hatchable";
export const access = "public";
export const methods = ["POST"];
export default async function(req,res){
 await auth.getUser(req);
 const b=req.body||{};
 const event=String(b.event_name||"").slice(0,80);
 if(!event) return res.status(400).json({ok:false});
 await db.query("INSERT INTO funnel_events (event_name,host,page_path,source,metadata) VALUES ($1,$2,$3,$4,$5)",[event,b.host||"",b.page_path||"",b.source||"",JSON.stringify(b.metadata||{})]);
 res.json({ok:true});
}