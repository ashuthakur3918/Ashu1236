import { db } from "hatchable";
export const access="admin";
export const methods=["GET","POST"];
const defaults={version:1,blocks:[],forms:[],redirects:[]};
export default async function(req,res){
 const {rows}=await db.query("SELECT payload,updated_at FROM cms_settings WHERE setting_key='platform'");
 if(req.method==="GET"){
  if(!rows.length){
   await db.query("INSERT INTO cms_settings(setting_key,payload,updated_at) VALUES('platform',$1,now())",[JSON.stringify(defaults)]);
   return res.json({platform:defaults});
  }
  return res.json({platform:{...defaults,...rows[0].payload},updated_at:rows[0].updated_at});
 }
 const p=req.body?.platform;
 if(!p||typeof p!=="object")return res.status(400).json({error:"platform object required"});
 const platform={version:1,blocks:Array.isArray(p.blocks)?p.blocks:[],forms:Array.isArray(p.forms)?p.forms:[],redirects:Array.isArray(p.redirects)?p.redirects:[]};
 await db.query("INSERT INTO cms_settings(setting_key,payload,updated_at) VALUES('platform',$1,now()) ON CONFLICT(setting_key) DO UPDATE SET payload=EXCLUDED.payload,updated_at=now()",[JSON.stringify(platform)]);
 return res.json({ok:true,platform});
}