import { db } from "hatchable";
export const access="admin"; export const methods=["POST"];
export default async function(req,res){
 const {rows}=await db.query("SELECT payload FROM cms_drafts WHERE content_key='frontier_data'");
 if(!rows.length)return res.status(404).json({error:"No draft to publish"});
 const {rows:current}=await db.query("SELECT payload FROM cms_content WHERE content_key='frontier_data'");
 if(current.length)await db.query("INSERT INTO cms_revisions(content_key,payload,note) VALUES('frontier_data',$1,$2)",[current[0].payload,"Before publish"]);
 await db.query("INSERT INTO cms_content(content_key,payload,updated_at) VALUES('frontier_data',$1,now()) ON CONFLICT(content_key) DO UPDATE SET payload=EXCLUDED.payload,updated_at=now()",[rows[0].payload]);
 await db.query("UPDATE cms_drafts SET status='published',published_at=now(),scheduled_at=NULL,updated_at=now() WHERE content_key='frontier_data'");
 return res.json({ok:true,published_at:new Date().toISOString()});
}