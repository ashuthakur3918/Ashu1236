import { db } from "hatchable";
export const access="admin"; export const methods=["GET","POST"];
export default async function(req,res){
 if(req.method==="GET"){const {rows}=await db.query("SELECT id,created_at,content_key,note FROM cms_revisions ORDER BY created_at DESC LIMIT 50");return res.json({revisions:rows});}
 const {rows}=await db.query("SELECT payload FROM cms_content WHERE content_key='frontier_data'");if(!rows.length)return res.status(404).json({error:"No content to snapshot"});
 await db.query("INSERT INTO cms_revisions(content_key,payload,note) VALUES('frontier_data',$1,$2)",[rows[0].payload,req.body?.note||"Manual snapshot"]);return res.json({ok:true});
}