var express=require('express'),
http=require('http'),
app=express(),
path=require('path'),
router=express.Router(),
compress = require('compression'),
    methodOverride = require('method-override');


app.set('port', process.env.PORT || 3000);
app.use(compress());
app.use(methodOverride());

app.listen(app.get('port'),function(){
	console.log('server listening in port '+app.get('port'));
});

router.get('/images/:imageFileName',function(req,res){
	var filePath=path.resolve('./images/'+req.params.imageFileName);
	//var imgBytes=fs.readFileSync(filePath);//Assets.getBinary('images/report.png');
	//var ext=path.extname(filePath);
	//ext=ext.replace('.','');
	 console.log('filePath = '+filePath);
	//res.writeHead(200,{'Content-Type': 'image/'+ext});
	//res.write(imgBytes);
	// res.end();
	res.sendFile(filePath);
			 
});

app.use('/',router);