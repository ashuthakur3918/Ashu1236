import { auth, db } from "hatchable";

export const access = "public";
export const methods = ["GET","POST","DELETE"];

export default async function(req,res){
  const user = await auth.requireUser(req,res);
  if(!user) return;
  if(req.method==="GET"){
    const {rows}=await db.query("SELECT id,item_type,item_id,title,subtitle,image_url,created_at FROM saved_items WHERE user_id = $1 ORDER BY created_at DESC",[user.id]);
    return res.json({items:rows});
  }
  const body=req.body||{};
  if(req.method==="POST"){
    if(!body.item_type||!body.item_id||!body.title) return res.status(400).json({error:"item_type, item_id and title are required"});
    const {rows}=await db.query("INSERT INTO saved_items (user_id,item_type,item_id,title,subtitle,image_url) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (user_id,item_type,item_id) DO NOTHING RETURNING id,item_type,item_id,title,subtitle,image_url,created_at",[user.id,body.item_type,body.item_id,body.title,body.subtitle||"",body.image_url||""]);
    return res.json({saved:true,item:rows[0]||null});
  }
  if(!body.id) return res.status(400).json({error:"id is required"});
  await db.query("DELETE FROM saved_items WHERE id = $1 AND user_id = $2",[body.id,user.id]);
  return res.json({saved:false});
}