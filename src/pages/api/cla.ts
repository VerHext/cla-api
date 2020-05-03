
import { NextApiRequest, NextApiResponse } from "next";
const fs = require('fs');

const code = "hjuzdsklfusewizhtwert9843whpw3qvü4acuö8o935hi0z"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get file name
  const { file, ext } = req.query;



  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')


 //wrong methode ;return
  if (req.method == "GET"){
    let content = JSON.parse(fs.readFileSync('./cla.json', 'utf8'));

    res.json({
      success: true,
      contributors: content.contributors,
    });
    return;
  }

try{
  const data = req.body
console.log(data)
  if (code != data.code){
    res.json({
      success: false,
      error: "Not auth!",
    });
    return;
  }


  let content = JSON.parse(fs.readFileSync('./cla.json', 'utf8'));
  content.contributors.push(data.username.toString())
  fs.writeFileSync('./cla.json', JSON.stringify(content));


  console.log(JSON.stringify(content))

  res.json({
    success: true
  });
    
}catch(e){
  console.log(e)
}


};

export default handler;
