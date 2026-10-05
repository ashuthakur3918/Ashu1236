import { db } from "hatchable";
export const access="admin"; export const methods=["GET"];
export default async function(req,res){
 const {rows}=await db.query("SELECT payload,status,updated_at,scheduled_at FROM cms_drafts WHERE content_key='frontier_data'");
 if(!rows.length)return res.status(404).json({error:"No draft"});
 return res.json({content:rows[0].payload,status:rows[0].status,updated_at:rows[0].updated_at,scheduled_at:rows[0].scheduled_at});
}