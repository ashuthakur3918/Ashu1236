import { db } from "hatchable";

export const access="admin";
export const methods=["GET","PUT"];

export default async function(req,res){
  const member=req.member;
  if(!member?.id)return res.status(401).json({error:"unauthorized"});
  if(req.method==="GET"){
    const {rows}=await db.query("SELECT member_id,display_name,avatar_url,bio,timezone,email_notifications,theme,updated_at FROM cms_profiles WHERE member_id=$1",[member.id]);
    const profile=rows[0]||{
      member_id:member.id,
      display_name:member.display_name||"",
      avatar_url:member.avatar_url||"",
      bio:"",
      timezone:"Asia/Kolkata",
      email_notifications:true,
      theme:"frontier"
    };
    return res.json({profile,email:member.email||"",role:member.role||"owner"});
  }
  const b=req.body||{};
  await db.query(
    "INSERT INTO cms_profiles(member_id,display_name,avatar_url,bio,timezone,email_notifications,theme,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,now()) ON CONFLICT(member_id) DO UPDATE SET display_name=EXCLUDED.display_name,avatar_url=EXCLUDED.avatar_url,bio=EXCLUDED.bio,timezone=EXCLUDED.timezone,email_notifications=EXCLUDED.email_notifications,theme=EXCLUDED.theme,updated_at=now()",
    [member.id,String(b.display_name||""),String(b.avatar_url||""),String(b.bio||""),String(b.timezone||"Asia/Kolkata"),Boolean(b.email_notifications),String(b.theme||"frontier")]
  );
  return res.json({ok:true});
}