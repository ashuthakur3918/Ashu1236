import { db } from "hatchable";
export const access="admin"; export const methods=["POST"];
export default async function(req,res){
 const {rows}=await db.query("SELECT payload FROM cms_revisions WHERE id=$1",[req.body?.id]);if(!rows.length)return res.status(404).json({error:"Revision not found"});
 await db.query("INSERT INTO cms_content(content_key,payload,updated_at) VALUES('frontier_data',$1,now()) ON CONFLICT(content_key) DO UPDATE SET payload=EXCLUDED.payload,updated_at=now()",[rows[0].payload]);
 await db.query("INSERT INTO cms_drafts(content_key,payload,status,updated_at,scheduled_at) VALUES('frontier_data',$1,'draft',now(),NULL) ON CONFLICT(content_key) DO UPDATE SET payload=EXCLUDED.payload,status='draft',updated_at=now(),scheduled_at=NULL",[rows[0].payload]);
 return res.json({ok:true});
}