import { db, scheduler } from "hatchable";
export const access="admin"; export const methods=["POST"];
export default async function(req,res){
 const when=req.body?.scheduled_at;
 if(!when)return res.status(400).json({error:"scheduled_at required"});
 const t=new Date(when);
 if(Number.isNaN(t.getTime())||t.getTime()<=Date.now())return res.status(400).json({error:"scheduled_at must be a future date"});
 const {rows}=await db.query("SELECT id FROM cms_drafts WHERE content_key='frontier_data'");
 if(!rows.length)return res.status(404).json({error:"Save a draft before scheduling"});
 const task=await scheduler.at(t.toISOString(),"/api/cms/publish-scheduled",{name:"frontier-cms-publish",payload:{draft_id:rows[0].id}});
 await db.query("UPDATE cms_drafts SET status='scheduled',scheduled_at=$1,updated_at=now() WHERE content_key='frontier_data'",[t.toISOString()]);
 return res.json({ok:true,scheduled_at:t.toISOString(),task});
}