import { auth, db } from "hatchable";

export const access = "public";
export const methods = ["GET","POST","DELETE"];

export default async function(req,res){
  const user = await auth.requireUser(req,res);
  if(!user) return;
  if(req.method==="GET"){
    const {rows}=await db.query("SELECT id,title,destination,start_date,end_date,style,budget,interests,plan_json,status,created_at,updated_at FROM trip_plans WHERE user_id = $1 ORDER BY updated_at DESC",[user.id]);
    return res.json({trips:rows});
  }
  const body=req.body||{};
  if(req.method==="POST"){
    if(!body.title) return res.status(400).json({error:"title is required"});
    const {rows}=await db.query("INSERT INTO trip_plans (user_id,title,destination,start_date,end_date,style,budget,interests,plan_json,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id,title,destination,start_date,end_date,style,budget,interests,plan_json,status,created_at,updated_at",[user.id,body.title,body.destination||"",body.start_date||null,body.end_date||null,body.style||"",body.budget||"",body.interests||"",body.plan_json||"{}",body.status||"draft"]);
    return res.json({trip:rows[0]});
  }
  if(!body.id) return res.status(400).json({error:"id is required"});
  await db.query("DELETE FROM trip_plans WHERE id = $1 AND user_id = $2",[body.id,user.id]);
  return res.json({deleted:true});
}