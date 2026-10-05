import { db } from "hatchable";
export const access="scheduler"; export const methods=["POST"];
export default async function(req,res){
 const {rows}=await db.query("SELECT payload,status FROM cms_drafts WHERE id=$1 AND content_key='frontier_data'",[req.body?.draft_id]);
 if(!rows.length)return res.status(404).json({error:"Draft not found"});
 if(rows[0].status!=="scheduled")return res.json({ok:true,skipped:true});
 const {rows:current}=await db.query("SELECT payload FROM cms_content WHERE content_key='frontier_data'");
 if(current.length)await db.query("INSERT INTO cms_revisions(content_key,payload,note) VALUES('frontier_data',$1,$2)",[current[0].payload,"Before scheduled publish"]);
 await db.query("INSERT INTO cms_content(content_key,payload,updated_at) VALUES('frontier_data',$1,now()) ON CONFLICT(content_key) DO UPDATE SET payload=EXCLUDED.payload,updated_at=now()",[rows[0].payload]);
 await db.query("UPDATE cms_drafts SET status='published',published_at=now(),scheduled_at=NULL,updated_at=now() WHERE id=$1",[req.body.draft_id]);
 return res.json({ok:true});
}