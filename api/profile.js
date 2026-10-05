import { auth, db } from "hatchable";

export const access = "public";
export const methods = ["GET","POST"];

export default async function(req,res){
  const user=await auth.requireUser(req,res);
  if(!user) return;
  if(req.method==="GET"){
    const {rows}=await db.query("SELECT user_id,display_name,home_city,travel_style,interests FROM traveler_profiles WHERE user_id = $1",[user.id]);
    return res.json({profile:rows[0]||{user_id:user.id,display_name:user.name||"",home_city:"",travel_style:"",interests:""}});
  }
  const b=req.body||{};
  const {rows}=await db.query("INSERT INTO traveler_profiles (user_id,display_name,home_city,travel_style,interests) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (user_id) DO UPDATE SET display_name=EXCLUDED.display_name,home_city=EXCLUDED.home_city,travel_style=EXCLUDED.travel_style,interests=EXCLUDED.interests,updated_at=NOW() RETURNING user_id,display_name,home_city,travel_style,interests",[user.id,b.display_name||"",b.home_city||"",b.travel_style||"",b.interests||""]);
  return res.json({profile:rows[0]});
}