import { db } from "hatchable";
import { defaultContent } from "lib/cms-default.js";
export const access="admin"; export const methods=["GET","POST"];
export default async function(req,res){
 if(req.method==="GET"){
  const {rows}=await db.query("SELECT payload,updated_at FROM cms_content WHERE content_key='frontier_data'");
  let published=rows.length?rows[0].payload:defaultContent;
  if(!rows.length)await db.query("INSERT INTO cms_content(content_key,payload) VALUES('frontier_data',$1)",[JSON.stringify(defaultContent)]);
  const {rows:d}=await db.query("SELECT id,payload,status,updated_at,scheduled_at,published_at FROM cms_drafts WHERE content_key='frontier_data'");
  if(!d.length)await db.query("INSERT INTO cms_drafts(content_key,payload,status,updated_at) VALUES('frontier_data',$1,'draft',now())",[JSON.stringify(published)]);
  const draft=d.length?d[0]:{payload:published,status:"draft"};
  return res.json({content:published,draft:draft.payload,draft_id:draft.id||null,draft_status:draft.status||"draft",draft_updated_at:draft.updated_at||null,scheduled_at:draft.scheduled_at||null,published_at:draft.published_at||null,updated_at:rows[0]?.updated_at||null});
 }
 const content=req.body?.content;
 if(!content||typeof content!=="object")return res.status(400).json({error:"content object required"});
 await db.query("INSERT INTO cms_drafts(content_key,payload,status,updated_at,scheduled_at) VALUES('frontier_data',$1,'draft',now(),NULL) ON CONFLICT(content_key) DO UPDATE SET payload=EXCLUDED.payload,status='draft',updated_at=now(),scheduled_at=NULL",[JSON.stringify(content)]);
 return res.json({ok:true,draft:content,status:"draft"});
}