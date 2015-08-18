console.log('-------starting-------------------------');
var express=require('express'),
http=require('http'),
app=express(),
path=require('path'),
router=express.Router(),
compress = require('compression'),
mongoose=require('mongoose'),
    methodOverride = require('method-override');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.set('port', server_port || 3000);
app.use(compress());
app.use(methodOverride());
console.log('-------about to listen-------------------------');

app.listen(app.get('port'),server_ip_address,function(){
	console.log('server listening in port '+app.get('port'));
});
//provide a sensible default for local development
var config=require('./config.json');
var db_name=config.DATABASE_NAME;

var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
var conn=mongoose.createConnection(mongodb_connection_string);
var ImageLog = require(path.join(__dirname, 'imagelog'))(conn);


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
	var log=new ImageLog({imageName:req.params.imageFileName,currentTime:Date()});
	log.save(function(err,lg){
		if(err){
			console.log('---ERROR-----');
			console.log(err);
		}
	});		 
});


router.get('/images/report/:imageFileName',function(req,res){
	ImageLog.find({imageName:req.params.imageFileName})
		.then(function(lst){
			res.json(lst);
		},function(err){
			console.log('----FIND ERROR----');
			console.log(err);
		})

});

app.use('/',router);

console.log('-------done-------------------------');