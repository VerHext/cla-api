
import { NextApiRequest, NextApiResponse } from "next";
const fs = require('fs');
const code = "hjuzdsklfusewizhtwert9843whpw3qvü4acuö8o935hi0z"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get file name
  const { file, ext } = req.query;

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

 //wrong methode ;return
  if (req.method != "GET"){
    res.json({
      success: false,
      error: "GET methode required",
    });
    return;
  }

  try{
    const name = req.query["checkContributor"]
    if (typeof name == "undefined"){
      res.json({
        success: false,
        error: "Wrong query!"
      });
      return;    
    }


   
    let content = JSON.parse(fs.readFileSync('./cla.json', 'utf8'));
    console.log(content)
    content.contributors.map(user =>{
      if (user == name){
        res.json({
          success: true,
          isContributor: true
        })
        return;
      }else{
        res.json({
          success: true,
          isContributor: false
        })
        return;
      }
    });

  }catch(e){}
  

};

export default handler;
