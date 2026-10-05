import { storage, db } from "hatchable";
export const access="admin"; export const methods=["POST"];
export default async function(req,res){
 const file=req.files?.[0];
 if(!file)return res.status(400).json({error:"file required"});
 if(!/^image\//.test(file.contentType||""))return res.status(400).json({error:"Only image uploads are supported"});
 const safe=(file.filename||"image").replace(/[^a-zA-Z0-9._-]/g,"-");
 const url=await storage.put("cms/"+Date.now()+"-"+safe,file.buffer,file.contentType);
 const {rows}=await db.query("INSERT INTO cms_media(name,url,alt_text,folder) VALUES($1,$2,$3,$4) RETURNING *",[file.filename||safe,url,"","Uploads"]);
 return res.json({ok:true,media:rows[0]});
}