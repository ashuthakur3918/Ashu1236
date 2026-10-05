import { db } from "hatchable";
import { defaultContent } from "lib/cms-default.js";
export const access="public"; export const methods=["GET"];
export default async function(req,res){
 const {rows}=await db.query("SELECT payload FROM cms_content WHERE content_key='frontier_data'");
 const content=rows.length?rows[0].payload:defaultContent;
 if(!rows.length)await db.query("INSERT INTO cms_content(content_key,payload) VALUES('frontier_data',$1)",[JSON.stringify(defaultContent)]);
 const {rows:settings}=await db.query("SELECT payload FROM cms_settings WHERE setting_key='site'");
 const defaults={siteName:"Frontier World",tagline:"Travel news, destination stories, local guides & better ways to go.",navigation:["Home","Destinations","Things to do","Stays","Plan your trip","Travel inspiration","Live","My Frontier"],footer:{copyright:"© Frontier World",text:"Travel stories, practical guides and trip planning."}};
 return res.json({...content,_settings:{...defaults,...(settings[0]?.payload||{})}});
}