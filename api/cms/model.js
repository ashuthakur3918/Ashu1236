import { db } from "hatchable";
export const access="admin";
export const methods=["GET","POST"];

const defaults={
  version:1,
  business:{name:"Frontier World",industry:"Travel",description:"Travel, destination stories and trip planning."},
  collections:[
    {key:"destinations",label:"Destinations",singular:"Destination",icon:"◉",fields:[
      {key:"name",label:"Name",type:"text",required:true},
      {key:"slug",label:"Slug",type:"slug"},
      {key:"description",label:"Description",type:"textarea"},
      {key:"image",label:"Image",type:"image"}
    ]},
    {key:"stories",label:"Stories",singular:"Story",icon:"▰",fields:[
      {key:"title",label:"Title",type:"text",required:true},
      {key:"slug",label:"Slug",type:"slug"},
      {key:"body",label:"Body",type:"richtext"},
      {key:"cover",label:"Cover image",type:"image"},
      {key:"published",label:"Published",type:"boolean"}
    ]}
  ],
  records:{}
};

function clean(m){
  const x=JSON.parse(JSON.stringify(m||defaults));
  x.version=1;
  x.business=x.business||defaults.business;
  x.collections=Array.isArray(x.collections)?x.collections:[];
  x.records=x.records&&typeof x.records==="object"?x.records:{};
  x.collections=x.collections.map((c,i)=>({
    key:String(c.key||("collection_"+(i+1))).toLowerCase().replace(/[^a-z0-9_]+/g,"_"),
    label:String(c.label||("Collection "+(i+1))),
    singular:String(c.singular||c.label||("Item "+(i+1))),
    icon:String(c.icon||"▦"),
    fields:Array.isArray(c.fields)?c.fields.map((f,j)=>({
      key:String(f.key||("field_"+(j+1))).toLowerCase().replace(/[^a-z0-9_]+/g,"_"),
      label:String(f.label||("Field "+(j+1))),
      type:String(f.type||"text"),
      required:!!f.required,
      options:Array.isArray(f.options)?f.options:[]
    })):[]
  }));
  return x;
}
export default async function(req,res){
  const {rows}=await db.query("SELECT payload,updated_at FROM cms_settings WHERE setting_key='model'");
  if(req.method==="GET"){
    if(!rows.length){
      await db.query("INSERT INTO cms_settings(setting_key,payload,updated_at) VALUES('model',$1,now())",[JSON.stringify(defaults)]);
      return res.json({model:defaults});
    }
    return res.json({model:clean(rows[0].payload),updated_at:rows[0].updated_at});
  }
  const model=clean(req.body?.model);
  if(!model||!model.business) return res.status(400).json({error:"model required"});
  await db.query("INSERT INTO cms_settings(setting_key,payload,updated_at) VALUES('model',$1,now()) ON CONFLICT(setting_key) DO UPDATE SET payload=EXCLUDED.payload,updated_at=now()",[JSON.stringify(model)]);
  return res.json({ok:true,model});
}