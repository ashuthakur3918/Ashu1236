import { db, auth } from "hatchable";
export const access = "public";
export const methods = ["POST"];
export default async function(req,res){
  await auth.getUser(req);
  const b=req.body||{};
  const name=String(b.name||"").trim(), email=String(b.email||"").trim();
  if(!name||!email||!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ok:false,error:"Please provide a valid name and email."});
  await db.query("INSERT INTO leads (name,email,instagram,experience,message,source,host,page_path,user_agent,phone,start_date,end_date,group_size,starting_location,budget,travel_style,interests,trip_source,lead_type,company_name,agency_type,planning_stage,date_flexibility,accommodation,transport,contact_preference,priority_tags,promo_code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28)",[
    name,email,b.instagram||"",b.experience||"",b.message||"",b.source||"",b.host||"",b.page_path||"",req.headers["user-agent"]||"",
    b.phone||"",b.start_date||null,b.end_date||null,b.group_size||"",b.starting_location||"",b.budget||"",b.travel_style||"",b.interests||"",b.trip_source||"planner",
    b.lead_type||"",b.company_name||"",b.agency_type||"",b.planning_stage||"",b.date_flexibility||"",b.accommodation||"",b.transport||"",b.contact_preference||"",b.priority_tags||"",b.promo_code||""
  ]);
  await db.query("INSERT INTO funnel_events (event_name,host,page_path,source,metadata) VALUES ($1,$2,$3,$4,$5)",[
    "trip_planning_request",b.host||"",b.page_path||"",b.source||"",JSON.stringify({lead_type:b.lead_type||"",company_name:b.company_name||"",agency_type:b.agency_type||"",group_size:b.group_size||"",starting_location:b.starting_location||"",budget:b.budget||"",travel_style:b.travel_style||"",planning_stage:b.planning_stage||"",date_flexibility:b.date_flexibility||"",accommodation:b.accommodation||"",transport:b.transport||"",contact_preference:b.contact_preference||"",priority_tags:b.priority_tags||"",promo_code:b.promo_code||""})
  ]);
  res.json({ok:true});
}