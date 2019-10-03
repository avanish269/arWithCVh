var express=require('express');
var router=express.Router();
var path=require('path');
var reqPath=path.join(__dirname, '../');

router.get('/', home);

function home(req, res){
  res.sendFile(path.join(reqPath+'views/index.html'));
}

module.exports=router;
