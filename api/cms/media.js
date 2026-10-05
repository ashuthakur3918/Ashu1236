import { db } from "hatchable";
export const access="admin"; export const methods=["GET","POST","PUT","DELETE"];
export default async function(req,res){
 if(req.method==="GET"){const {rows}=await db.query("SELECT * FROM cms_media ORDER BY created_at DESC");return res.json({media:rows});}
 if(req.method==="DELETE"){await db.query("DELETE FROM cms_media WHERE id=$1",[req.body?.id]);return res.json({ok:true});}
 if(req.method==="PUT"){const x=req.body||{}; if(!x.id)return res.status(400).json({error:"id required"}); const allowed=["name","url","alt_text","caption","folder","tags","width","height"]; const sets=[]; const vals=[]; for(const k of allowed){if(Object.prototype.hasOwnProperty.call(x,k)){vals.push(x[k]);sets.push(k+"=$"+vals.length)}} if(!sets.length)return res.status(400).json({error:"No fields to update"}); vals.push(x.id); const {rows}=await db.query("UPDATE cms_media SET "+sets.join(", ")+" WHERE id=$"+vals.length+" RETURNING *",vals); return res.json({ok:true,media:rows[0]});}
 const x=req.body||{}; if(!x.name||!x.url)return res.status(400).json({error:"name and url required"});
 const {rows}=await db.query("INSERT INTO cms_media (name,url,alt_text,caption,folder,tags,width,height) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[x.name,x.url,x.alt_text||"",x.caption||"",x.folder||"General",x.tags||"",x.width||null,x.height||null]);
 return res.json({ok:true,media:rows[0]});
}