console.log('-------starting-------------------------');
var express=require('express'),
http=require('http'),
app=express(),
path=require('path'),
router=express.Router(),
compress = require('compression'),
    methodOverride = require('method-override');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.set('port', server_port || 3000);
app.use(compress());
app.use(methodOverride());
console.log('-------about to listen-------------------------');

app.listen(app.get('port'),server_ip_address,function(){
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

console.log('-------done-------------------------');