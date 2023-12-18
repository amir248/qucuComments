const express = require('express');
const app = express(),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const fs =require('fs');
const path=require('path');
const mysql = require('mysql2');
const cors = require('cors');

app.use(express.static('public'));
app.use(express.static('public_old'));
console.log(__dirname);
app.set('views','public');
const jsonParser = express.json();
const port=3700;
const host = 'localhost';
app.set("view engine", "ejs");
// const multer  = require("multer");



const mysqlhost='localhost';
const mysqluser='user';
const mysqlpassword='password';
const mysqldatabase='mysql_database';



const connection = mysql.createConnection({
  host: mysqlhost,
  user: mysqluser,
  password: mysqlpassword,
  database:mysqldatabase
});

app.get('/blozhik/',  function (request,response) {
  response.render('temporaryPage',{
      title: 'Бложик, веб мастерской имени барона сайтоверстаузена.',
      description: 'настоящий божик, несущий в своих недрах благое дело',

      url: 'blozhik'

    })
    response.send('oK');
  });

connection.connect(err=>{
  if(err){
    return err;
    console.log('err');
  }else{
    console.log('database--- oK');
  }
});
const sql = `SELECT * FROM article`;

connection.query(sql, function(err, results) {
  // console.log(results[0]['title']);
  if(err) console.log(err);
  //     console.log(results[1]['title']);
  for(let oj=0;oj<results.length;oj++){
    // console.log("/blozhik/"+`${results[oj]['url']}`);
    // console.log("/blozhik/"+`${results[oj]['description']}`);
    app.use("/blozhik/"+`${results[oj]['url']}`, function(request, response){
      response.render('blozhik', {
        title: `${results[oj]['title']}`,
        description: `${results[oj]['description']}`,
        article: `${results[oj]['text']}`,
        autor: `${results[oj]['autor']}`,
        url: `${results[oj]['url']}`,
        json: `${results[oj]['JSON']}`,
        id: `${results[oj]['id']}`
      });
    });
  }//for
   app.use(function(request,response,next){
    response.status(404).send('<div style="object-fit:contain;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;min-height:calc(100vh - 20px);background: url(/images/nlo.png);margin:0;border:0;background-size:cover;background-position: center;">sorry cant find that! Return to home or main page <span style="font-size:7vh;">404</span> <a href="/blozhik">^_^ Click here to BLOZHIK</a><hr><a href="/">O_o Click here to HomePage</a></div>');
  });
});//connection



const UrlencodedParser = express.urlencoded({extended: false});
//------------------------------------------------------
//-------------ADD_POST---------------------------------
//------------------------------------------------------
app.get('/blozhik/add-news-post', UrlencodedParser, function (
request,
response
) {
response.render('add-news-post',{
title: 'add post',
text: 'add text for blozhik'
})
});

app.post('/blozhik/add-news-post', UrlencodedParser, function (
request,response
) {
const connection = mysql.createConnection({
  host: mysqlhost,
  user: mysqluser,
  password: mysqlpassword,
  database:mysqldatabase
});
connection.connect(err=>{
if(err){
return err;
console.log('err');
}else{ console.log('database POST ADD --- oK'); }
});

const sql_article = `INSERT INTO article(title, description, text, url, autor, JSON) VALUES('${request.body.title}', '${request.body.description}', '${request.body.text}', '${request.body.url}', '${request.body.autor}', ${request.body.JSON})`;

connection.query(sql_article, function(err, results) {
if(err) console.log(err);
console.log(results);
});
response.render('add-news-post0', {
title: `${request.body.title}`,
description: `${request.body.description}`,
text: `${request.body.text}`,
url: `${request.body.url}`,
autor: `${request.body.autor}`,
json: `${request.body.JSON}`
});
});
connection.end(err=>{
if(err){
return err;
console.log('err');
}else{
console.log('database ADD --- closed');
}
});//connection closed





















const putChik='public/json/message.json';

// const url = require('node:url');
const registerUrl=['http://localhost:3700','http://chikchicly.temp.swtest.ru/','https://amir248.github.io'];
app.use(cors({
  origin:registerUrl,
  method:'post',
  optionsSuccessStatus: 200
}));






for(let r=0;r<=registerUrl.length-1;r++){
  // console.log(registerUrl[r]);
  // console.log(importantBag.id);
}
const importantBag={}
const okFolder='public/json/allDiscus';
const ok='ok';
// app.post('/comments/object/allow-cors',jsonParser,cors(),(request,response)=>{
//   if (!request.body) return response.sendStatus(400);
//   // console.log(request);
//   // let scriptComments=fs.readFileSync('public/script/script.js',"utf8",
//   // console.log(request.body);
//   // if (!request.body) return response.sendStatus(400);
//   console.log(request.body+'---');
//   // console.log(importantBag);
//   // fs.writeFile(newFile,'oK',{encoding: "utf8",flag:"w+"});
//   // fs.writeFile('/public/'+`${reqquest.body}`, '[{"userName":"messages"},{"Message","hero"}]', function(err){
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     console.log("Файл создан");
//   //   }
//   // });
//   fs.stat(okFolder,(err,stats)=>{
//     if(err){
//       console.log('file non');
//         fs.mkdir('public/json/allDiscus/'+`${request.body.id}`, err => {
//          if(err) throw err; // не удалось создать папку
//          console.log('Папка успешно создана');
//        });
//        importantBag.id=request.body.id;
//     }else if(stats){
//       console.log('file EST');
//       fs.writeFileSync('public/json/allDiscus/'+`${request.body.id}`+'.json',JSON.stringify(request.body),{encoding: "utf8", flag: "w+"});
//       importantBag.id=request.body.id;
//       console.log(importantBag.id);
//     }else{
//       console.log('ELSE')
//     }
//   });
//   const importantBag=request.body;
//   // const newFile="public/"+JSON.stringify(request.body.site);
// //   fs.mkdir('public/'+request.body.id, err => {
// //    if(err) throw err; // не удалось создать папку
// //    console.log('Папка успешно создана');
// // });
//   (error,data)=>{
//     console.log("Async read file script");
//     if(error) throw error;
//     console.log(request.body);
//     // console.log(response);
//   };
//   response.send(request.body);
// });//post/object/allow-corse
// console.log(importantBag.id);
if(importantBag=={}){
  console.log('lool');
}else{
  console.log('oK');
  console.log(importantBag.id);
  console.log('empty');
}
// console.log(importantBag);
// console.log(importantBag.id);
// console.log(importantBag.site);
const id=['a000','a001','a002','a003','a004','a005','a777','git','nasoberu','test','blozhik','resume','sweb'];
// importantBag.id=id[0];
// console.log(importantBag.id);
for(let j=0;j<=id.length;j++){
}//for
  const myURL = new URL({
    toString: ()=>`https://lol.ru`,
  });
  for(let y=0;y<=registerUrl.length;y++){

  }
  // https://example.org/
  // console.log(registerUrl[3]);
  // console.log(url.host);
  // importantBag.oK=id[j];
// console.log(JSON.stringify(importantBag.site));
// console.log(importantBag.site);
// console.log(importantBag.site);
function finalFantasy(){
  if(request.body.idea.id=="nasoberu"){
    importantBag.id=request.body.idea.id;
    console.log(request.body.idea);
  }else if(request.body.idea.id=="a003"){
    console.log(request.body.idea);
    importantBag.id=request.body.idea.id;
  }else{
    console.log("LOL");
  }
}
//SCRIPT JS
app.post('/comments/scripts/allow-cors',jsonParser,cors(),(request,response)=>{
  if (!request.body) return response.sendStatus(400);
  let scriptCommentsTwo=fs.readFileSync('public/script/scripts.js',"utf8",
  (error,data)=>{
    console.log("Async read file script.js");
    if(error) throw error;
    console.log(data);
  });
  response.send(scriptCommentsTwo);
});// SCRIPT JS
  //SCRIPT JS
  app.post('/comments/script/allow-cors',jsonParser,cors(),(request,response)=>{
    if (!request.body) return response.sendStatus(400);
    let scriptComments=fs.readFileSync('public/script/script.js',"utf8",
    (error,data)=>{
      console.log("Async read file script.js");
      if(error) throw error;
      console.log(data);
    });
    response.send(scriptComments);
  });// SCRIPT JS
   //SCRIPT JS
  app.post('/comments/scriptsOld/allow-cors',jsonParser,cors(),(request,response)=>{
    if (!request.body) return response.sendStatus(400);
    let scriptComments=fs.readFileSync('public/script/scriptsOld.js',"utf8",
    (error,data)=>{
      console.log("Async read file script.js");
      if(error) throw error;
      console.log(data);
    });
    response.send(scriptComments);
  });// SCRIPT JS






//**********************************************************************
//----------------------------abracotabra-------------------------------
//**********************************************************************
// function comments(x){
//   app.post('/comments/'+`${id[x]}`+'.json/post', jsonParser,cors(), function (request, response) {
//     if (!request.body) return response.sendStatus(400);
//     console.log(request.body);
//     // finalFantasy();
//     importantBag.id=`${id[x]}`;
//     let gitJson=JSON.stringify(request.body)+'';
//     const putGit='public/json/'+`${importantBag.id}`+'.json';//puth for
//     fs.stat(`${putGit}`,(err,stats)=>{
//       if(err){
//         fs.writeFileSync(`${putGit}`,'['+`${gitJson}`+']');
//       }else if(stats){
//         function returnForever(){
//           let newFile=fs.readFileSync(`${putGit}`,"utf8",
//           function(error,data){
//             if(error) throw error;
//             console.log(data);
//           });
//           let un=+0;
//           let prov=JSON.stringify(newFile);
//           if(prov.endsWith(']"')){
//             un=-1;
//           }else if(prov.endsWith('\n')){
//             un=-2;
//           }else{
//             un=-2;
//           }
//           let str=newFile.slice(0,un);
//           fs.writeFileSync(`${putGit}`, `${str}`+","+`${gitJson}`+']','utf8');
//         }//returnForever
//         returnForever();
//       }else{console.log('ELSE')}
//     });
//     response.json(request.body); // отправляем пришедший ответ обратно
//   });//FOR and final
//   app.post('/comments/json/'+`${id[x]}`+'.json/allow-cors',jsonParser,cors(),(request,response)=>{
//     if (!request.body) return response.sendStatus(400);
//     importantBag.id=`${id[x]}`;
//     fs.stat('public/json/'+`${importantBag.id}`+'.json',(err,stats)=>{
//       if(err){
//         fs.writeFile('/public/json/'+`${importantBag.id}`+'.json', '[{"userName":"messages"},{"Message","hero"}]', function(err){
//           if (err) {console.log(err)} else {console.log("Файл создан")}});
//           console.log(err);
//         }else{
//           // console.log(stats); // ЭТО ВЫВОДИТСЯ В КОНСОЛЕ КАЖДУЮ СЕКУНДУ ИЛИ ПАРУ СЕКУНД
//           return ;
//         }
//       });
//       let script=fs.readFileSync('public/json/'+`${importantBag.id}`+'.json',"utf8", //wonderful /
//       (error,data)=>{
//         console.log("Async read file script.ts");
//         if(error) throw error;
//         // console.log(data);
//       });
//       response.send(script);
//     });//.json/allow-corse
// }
// let x = `${importantBag.id}`;
// comments(10);
// comments(6);
// comments(0);
// comments(7);
// comments(8);
// comments(3);
//*********************************************************************************************************************

// IP адрес: 95.191.47.58
// Имя вашего компьютера: 95.191.47.58
// Операционная система: Linux
// Ваш браузер: Firefox 118.0
// Ваше местоположение: Россия, Томск  Уточнить?
// Ваш провайдер: Ростелеком МРФ "Сибирь"
// © 2ip.io

//**********************************************************************
//----------------------------abracotabra-------------------------------
//**********************************************************************
function comments(x){
  app.post('/comments/'+`${id[x]}`+'.json/post', jsonParser,cors(), function (request, response) {

    importantBag.id=`${id[x]}`;
console.log(importantBag.id+"____IMOPRTANT BBAG id");

    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    // oK get
    // importantBag=request.body.idea;
    let gitJson=JSON.stringify(request.body)+'';
    const putGit='public/json/'+`${importantBag.id}`+'.json';//puth for

    if(request.body.idea.site.pathname!=='/'){
      fs.access("public/json/allDiscus", function(error){
          if (error) {
              console.log("Файл не найден");
              fs.mkdir('allDiscus', err => {
               if(err) throw err; // не удалось создать папку
               console.log('Папка успешно создана');
            });
          }else{
              console.log("Файл найден");
          }
      });//allDiscus


      let fileOnPath="public/json/allDiscus/"+`${importantBag.id}`;
      console.log(fileOnPath);
      // putGit=fileOnPath;
      fs.access(`${fileOnPath}`, function(error){
          if (error) {
              console.log("Файл не найден 424");
              fs.mkdir(`${fileOnPath}`, err => {
               if(err) throw err; // не удалось создать папку
               console.log('Папка успешно создана 427');
            });
          } else {
              console.log("Файл найден 430");
          }
      });//allDiscus/importantBag
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//------------------------------------------------------------------------------
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      function createPathOnMessage(){
        // console.log('y');
        function pathAbracatabruch(path){
          if(/\/$/.test(path)){
          //   (`${request.body.idea.site.pathname}`.slice(0,-1))+'.json'
          let newPath=path.slice(0,-1)+'.json';
          path = newPath;
          // console.log(path+ '999' +"oK");
          return path;
        }else if(/[html|ejs|php]$/.test(path)){
          console.log(path+ "00000000000000000000000000");
          let oKoKfilePath = 'firstPage';
          let oK='two.html.json';
          fs.access(`${oKoKfilePath}`, function(error){
              if (error) {
                  console.log("Файл не найден _"+ `${oKoKfilePath}`);
                  fs.mkdir('allDiscus', err => {
                   if(err) throw err; // не удалось создать папку
                   console.log('Папка успешно создана');
                });

                    fs.writeFile(`${oKoKfilePath}`, `${oK}`, function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Файл создан");
                        }
                    });
              }else{
                  console.log("Файл найден 493");
                  fs.readFile(`${fileOnPathTwo}`, "utf8",
                  function(error,data){
                    console.log("Асинхронное чтение файла 496");
                    if(error) throw error; // если возникла ошибка
                    console.log(data);  // выводим считанные данные
                  });
              }
          });

        }else{
            // console.log(path +"not 999");
          }
          // console.log(path+".json"+"_<- it's it");
          return path+".json"
        }//pathAbracatabruch

        //----------------------------------------------------------
        //--------------------REGEX---FIRST IMPORTANT---------------
        //---------------------------------------------------------
        console.log(`${request.body.idea.site.pathname}`+"77777777777777777777777");
          let fileOnPathTwo;
        if(`${request.body.idea.site.pathname}`.split("/").length - 1==2){
          console.log(`${request.body.idea.site.host}` +' < 452 !!!!');
          console.log(`${request.body.idea.id}` +' < 458 !!!!');

          console.log(`${request.body.idea.site.pathname}` +' < 491 !!!!');
          let githubPathName;
          if(`${request.body.idea.site.pathname}`=='/localhost/threePage.html'){
            githubPathName='/threePage.html';
          }else if(`${request.body.idea.site.pathname}`=='/localhost/twoPage.html'){
            githubPathName='/twoPage.html';
          }else if(`${importantBag.pathname}`=='/localhost/index.html'){
            githubPathName='/index.html';
          }else{
            console.log('FF');
          }

          if(`${request.body.idea.site.host}`=='amir248.github.io'){
            console.log("//// amir248.github.io 460 ////////");
            //`${importantBag.id}`+'/threePage.html'
            console.log(`${request.body.idea.id.pathname}`+'-------_________------------')
            fileOnPathTwo='public/json/allDiscus/'+pathAbracatabruch(`${request.body.idea.id}`+`${githubPathName}`);
          }else{

            console.log('465');
            console.log(`${importantBag.pathname}`.split("/").length - 1);
            fileOnPathTwo='public/json/allDiscus'+pathAbracatabruch(request.body.idea.site.pathname);
            // onGetPath='public/json/allDiscus'+(`${importantBag.pathname}`);
          }
        }else if(`${request.body.idea.site.pathname}`.split("/").length - 1==3){
            console.log(`${request.body.idea.site.host}` +' < 452 !!!!');
            console.log(`${request.body.idea.id}` +' < 458 !!!!');
            if(`${request.body.idea.site.host}`=='amir248.github.io'){
              console.log("//// amir248.github.io 460 ////////");
              //`${importantBag.id}`+'/threePage.html'
              fileOnPathTwo='public/json/allDiscus/'+pathAbracatabruch(`${request.body.idea.id}`+`${githubPathName}`);
            }else{

              console.log('465');
              console.log(`${importantBag.pathname}`.split("/").length - 1);
              fileOnPathTwo='public/json/allDiscus'+pathAbracatabruch(request.body.idea.site.pathname);
              // onGetPath='public/json/allDiscus'+(`${importantBag.pathname}`);
            }
          }else{
          console.log('471');
          fileOnPathTwo='public/json/allDiscus/'+`${importantBag.id}`+pathAbracatabruch(request.body.idea.site.pathname);
        }


console.log(fileOnPathTwo+" <---fileOnPathTwo 476");
        fs.access(`${fileOnPathTwo}`, function(error){
            if (error) {
                console.log("Файл не найден _"+ `${fileOnPathTwo}`);
                fs.mkdir('allDiscus', err => {
                 if(err) throw err; // не удалось создать папку
                 console.log('Папка успешно создана');
              });

                  fs.writeFile(`${fileOnPathTwo}`, `${gitJson}`, function(err){
                      if(err){
                          console.log(err);
                      }else{
                          console.log("Файл создан");
                      }
                  });
            }else{
                console.log("Файл найден 493");
                fs.readFile(`${fileOnPathTwo}`, "utf8",
                function(error,data){
                  console.log("Асинхронное чтение файла 496");
                  if(error) throw error; // если возникла ошибка
                  console.log(data);  // выводим считанные данные
                });
            }
        });

        fs.stat(`${fileOnPathTwo}`,(err,stats)=>{
          if(err){
            fs.writeFileSync(`${fileOnPathTwo}`,'['+`${gitJson}`+']');
          }else if(stats){
            function returnForever(){
              let newFile=fs.readFileSync(`${fileOnPathTwo}`,"utf8",
              function(error,data){
                if(error) throw error;
                console.log(data);
              });
              let un=+0;
              let prov=JSON.stringify(newFile);
              if(prov.endsWith(']"')){
                un=-1;
              }else if(prov.endsWith('\n')){
                un=-2;
              }else{
                un=-2;
              }
              let str=newFile.slice(0,un);
              fs.writeFileSync(`${fileOnPathTwo}`, `${str}`+","+`${gitJson}`+']','utf8');
            }//returnForever
            returnForever();
          }else{console.log('ELSE 526')}
        });
        //------------------------------------------------------------------
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        //------------------------------------------------------------------
        // const pathOnSitePathname='public/json/allDiscus/'+`${importantBag.id}`+'.json';
        // fs.access(`${pathOnSitePathname}`, function(error){
        //     if (error) {
        //         console.log("Файл не найден111 _"+`${pathOnSitePathname}`+"<XX");
        //         fs.mkdir('allDiscus', err => {
        //          if(err) throw err; // не удалось создать папку
        //          console.log('Папка успешно создана 111');
        //       });
        //
        //           fs.writeFile(`${pathOnSitePathname}`, `${gitJson}`, function(err){
        //               if (err) {
        //                   console.log(err);
        //               } else {
        //                   console.log("Файл создан111");
        //               }
        //           });
        //     } else {
        //         console.log("Файл найден XXX");
        //         fs.readFile(`${pathOnSitePathname}`, "utf8",
        //         function(error,data){
        //           console.log("Асинхронное чтение файла111");
        //           if(error) throw error; // если возникла ошибка
        //           console.log(data);  // выводим считанные данные
        //         });
        //     }
        // });
      }//createPathOnMessage
      console.log("7777777777777777777777777777777777777 558");

      createPathOnMessage();
      console.log('-------------XXX--------------------------------');
      console.log(request.body.idea.site.pathname+'___________562');
      console.log('-------------XXX--------------------------------');
    }else{
          console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!565');
      fs.stat(`${putGit}`,(err,stats)=>{
        if(err){
          fs.writeFileSync(`${putGit}`,'['+`${gitJson}`+']');
        }else if(stats){
          function returnForever(){
            let newFile=fs.readFileSync(`${putGit}`,"utf8",
            function(error,data){
              if(error) throw error;
              console.log(data);
            });
            let un=+0;
            let prov=JSON.stringify(newFile);
            if(prov.endsWith(']"')){
              un=-1;
            }else if(prov.endsWith('\n')){
              un=-2;
            }else{
              un=-2;
            }
            let str=newFile.slice(0,un);
            fs.writeFileSync(`${putGit}`, `${str}`+","+`${gitJson}`+']','utf8');
          }//returnForever
          returnForever();
        }else{console.log('ELSE')}
      });
    }//if request body idea pathname!==''; ELSE
    // finalFantasy();

    response.json(request.body); // send the received response back
  });//FOR and final
  // send to message on frontend
  app.post('/comments/json/'+`${id[x]}`+'.json/allow-cors',jsonParser,cors(),(request,response)=>{
    if (!request.body) return response.sendStatus(400);
    importantBag.id=`${id[x]}`;
    importantBag.pathname=request.body.site.pathname;
    importantBag.host=request.body.site.host;

    // importantBag=`${request.body.site}`;

    //if you specify the console.log('') prints messages every second

    // console.log(importantBag.id+'___BAG-ID');
    // console.log(request.body.site.hostname);
    // console.log(request.body.site.pathname);
    // console.log(importantBag.site+'___________7779');
      // console.log(request.body);
      //*********************************************************************
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      function createFolder(){
        fs.access(__dirname+"/public/json/allDiscus", function(error){
          if (error) {
            console.log("Файл не найден 618");
            fs.mkdir(__dirname+'/public/json/allDiscus', err => {
              console.log('====================> 620');
              if(err) throw err; // не удалось создать папку
            });
          }else{
            console.log("Файл найден");
          }
        });//allDiscus
      }//createFolder
      createFolder();


      console.log(`${importantBag.id}`+"-----631");
      let fileOnPath="public/json/allDiscus/"+`${importantBag.id}`;
      fs.access(`${fileOnPath}`, function(error){
        if (error) {
          console.log("Файл не найден 2");
          fs.mkdir(`${fileOnPath}`, err => {
            if(err) throw err; // не удалось создать папку
            console.log('Папка успешно создана 638');
          });
        }else{
          console.log("Файл найден in allDiscus! file 641 "+`${importantBag.id}`);
        }
      });//allDiscus/importantBag
      //*********************************************************************

      console.log(importantBag.id+" <important BAG 646");
        let puthScript;
      if(importantBag.pathname!=="/"){

        function pathAbracatabruch(path){
          if(/\/$/.test(path)){
          //   (`${request.body.idea.site.pathname}`.slice(0,-1))+'.json'
          let newPath=path.slice(0,-1)+'.json';
          path = newPath;
          // console.log(path+ '999' +"oK");
          return path;
          }else{
            // console.log(path +"not 999");
          }
          // console.log(path+".json"+"_<- it's it");
          return path+".json"
        }//pathAbracatabruch
        let onGetPath;
        //**************************************************
        // **********REGEX*****SECOND-IMPORTANT*************
        //**************************************************
        if(`${importantBag.pathname}`.split("/").length - 1==2){
          if(`${importantBag.host}`=='amir248.github.io'){

            let githubPathName;
            if(`${importantBag.pathname}`=='/localhost/threePage.html'){
              githubPathName='/threePage.html';
            }else if(`${importantBag.pathname}`=='/localhost/twoPage.html'){
              githubPathName='/twoPage.html';
            }else if(`${importantBag.pathname}`=='/localhost/index.html'){
              githubPathName='/index.html';
            }else{
              console.log('FF');
            }
            console.log(`${importantBag.id}`+`${importantBag.pathname}`+'/threePage.html'+'<------ 665');
              onGetPath='public/json/allDiscus/'+`${importantBag.id}`+`${`${githubPathName}`}`;
          }else{
            console.log('OOOOk str 686');
            console.log(`${importantBag.pathname}`.split("/").length - 1);
            onGetPath='public/json/allDiscus'+(`${importantBag.pathname}`);
            console.log(request.body.site.host+"<-------------------------XXXXXXXXXXXXX ID Two 675");

          }
        }else if(`${importantBag.pathname}`.split("/").length - 1==3){ // else / three <----------------
            if(`${importantBag.host}`=='amir248.github.io'){
              console.log(`${importantBag.id}`+'/threePage.html'+'<------ 665');
                onGetPath='public/json/allDiscus/'+`${importantBag.id}`+`${githubPathName}`;
            }else{
              console.log('OOOOk str 697');
              console.log(`${importantBag.pathname}`.split("/").length - 1);
              onGetPath='public/json/allDiscus'+(`${importantBag.pathname}`);
              console.log(request.body.site.host+"<-------------------------XXXXXXXXXXXXX ID Two 675");

            }
          }else if(`${importantBag.host}`=='amir248.github.io'){
          console.log(`${importantBag.id}`+"<-------------------------XXXXXXXXXX 679");
          onGetPath='public/json/allDiscus/'+`${importantBag.id}`+(`${importantBag.pathname}`);

        }else{
          console.log('oooooK');
          onGetPath='public/json/allDiscus/'+`${importantBag.id}`+(`${importantBag.pathname}`);
        }

        console.log(onGetPath+'_________________-<--------');


        console.log(onGetPath+'_________________-<--------');
        let dateFirst=new Date();
        fs.stat(pathAbracatabruch(`${onGetPath}`),(err,stats)=>{
          if(err){
            fs.writeFile(pathAbracatabruch(`${onGetPath}`), '[{"userName":"comments boot","message":"hi worD, it\'s first comment!","date":'+'"'+`${dateFirst}`+'"'+',"idea":{"id":"id","site":{"href":"localhostBot","origin":"test","protocol":"https:","host":"localhost","hostname":"localhost","port":"undefined","pathname":"oK","search":"","hash":""}}}]', function(err){
              if (err) {console.log(err)} else {console.log("Файл создан <---xxx")}});
              console.log(err);
            }else{
              // console.log(stats); // ЭТО ВЫВОДИТСЯ В КОНСОЛЕ КАЖДУЮ СЕКУНДУ ИЛИ ПАРУ СЕКУНД
              return ;
            }
          });//it's first comment!!
         puthScript=pathAbracatabruch(`${onGetPath}`);
         console.log(`${puthScript}`+'_oK');
      }else{
        fs.stat('public/json/'+`${importantBag.id}`+'.json',(err,stats)=>{
          if(err){
            fs.writeFile('/public/json/'+`${importantBag.id}`+'.json', '[{"userName":"user"},{"Message","message"},{"date","00:00:00"},{"idea":"oK"}]', function(err){
              if (err) {console.log(err)} else {console.log("Файл создан")}});
              console.log(err);
            }else{
              // console.log(stats); // ЭТО ВЫВОДИТСЯ В КОНСОЛЕ КАЖДУЮ СЕКУНДУ ИЛИ ПАРУ СЕКУНД
              return ;
            }
          });
           puthScript='public/json/'+`${importantBag.id}`+'.json';
           console.log(`${puthScript}`+'<-------777- st 713');
      }
      let script=fs.readFileSync(`${puthScript}`,"utf8", //wonderful /
      (error,data)=>{
        console.log("Async read file script.ts");
        if(error) throw error;
        // console.log(data);
      });
      response.send(script);
    });//.json/allow-corse
}
// console.log(importantBag.id);
let x = `${importantBag.id}`;
comments(0);
comments(1);
comments(2);
comments(3);
comments(4);
comments(5);
comments(6);
comments(7);
comments(8);
comments(9);
comments(10);
comments(11);
comments(12);
comments(13);
comments(14);


//O_o
app.post('/voting/allow-cors',jsonParser,cors(),(request,response)=>{
  if (!request.body) return response.sendStatus(400);
  console.log(request.body);
  let votingBox= JSON.stringify(request.body);
          fs.stat('public_old/generation-objects/voting.json',(err,stats)=>{
            if(err){
              fs.writeFileSync('public_old/generation-objects/voting.json','['+`${votingBox}`+']');
            }else if(stats){
              function returnForever(){
                let newFile=fs.readFileSync('public_old/generation-objects/voting.json',"utf8",
                function(error,data){
                  if(error) throw error;
                  console.log(data);
                });
                let un=+0;
                let prov=JSON.stringify(newFile);
                if(prov.endsWith(']"')){
                  un=-1;
                }else if(prov.endsWith('\n')){
                  un=-2;
                }else{
                  un=-2;
                }
                let str=newFile.slice(0,un);
                fs.writeFileSync('public_old/generation-objects/voting.json', `${str}`+","+`${votingBox}`+']','utf8');
              }//returnForever
              returnForever();
            }else{console.log('ELSE')}
          });
  let voting=fs.readFileSync('public_old/generation-objects/voting.json',"utf8",
  (error,data)=>{
    console.log("Async read file script.js");
    if(error) throw error;
    console.log(data);
  });
  response.send(voting);
});// voting JS


//******************************************************************************
// const nodemailer = require('nodemailer');
//
// let testEmailAccount = await nodemailer.createTestAccount();
//
// let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//         user: testEmailAccount.user,
//         pass: testEmailAccount.pass,
//     },
// });
//
// let result = await transporter.sendMail({
//     from: '"Node js" <nodejs@example.com>',
//     to: 'user@example.com, user@example.com',
//     subject: 'Message from Node js',
//     text: 'This message was sent from Node js server.',
//     html:
//         'This <i>message</i> was sent from <strong>Node js</strong> server.',
// });
//
// console.log(result);
//******************************************************************************
var person={};

let message='';







app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: "SuperHero",
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
 authUser = async (user, password, done) => {
    console.log(`User is ${user}`);
    console.log(`Password is ${password}`);
    function usPas(){
    console.log("^_^"+`${user}`);
    console.log("***"+`${password}`);
    }
    await usPas();
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    const pathUser='user';


    const connection = mysql.createConnection({
      host: `${mysqlhost}`,
      user: `${mysqluser}`,
      password: `${mysqlpassword}`,
      database: `${mysqldatabase}`
    });
      connection.connect(err=>{
        if(err){
          return err;
          console.log('err');
        }else{
          console.log('database--- oK');
        }
      });
      const sql = `SELECT * FROM barbarians`;
      connection.query(sql, function(err, results) {
        if(err) console.log(err);
        // console.log(results.length);
        // console.log(results);

  for(let y=0;y<results.length;y++){
    // console.log(results[y].login+"____"+results[y].password+"___"+'////'+`${user}`+"---"+`${password}`+'_FIRST-PUSH');
    if(results[y].login==`${user}`&&results[y].password==`${password}`){

    person={
        id:results[y].id,
        login:results[y].login,
        pwd:results[y].password,
        email:results[y].email,
        name:results[y].Name,
        lastname:results[y].Lastname,
        age:results[y].age,
        gender:results[y].gender,
        blod_type:results[y].blod_type,
        profession:results[y].profession,
        having_children:results[y].having_children,
        marital_status:results[y].marital_status,
        hobby:results[y].hobby,
        education:results[y].education,
        visit_date:results[y].visit_date,

      }
      // fs.writeFile('public/uploads/globalName.json',`${person.login}`,(err)=>{
      //   if(err) console.log(err);
      //   else console.log('oK');
      // });
      // // global.login=`${person.login}`;
      // function personLoginAndProfile(){
      //   // const globalName=fs.writeFileSync('public/uploads/globalName.json',`${person.login}`);
      //   global.login=`${person.login}`;
      //   const folderName='public/uploads/'+`${person.login}`;
      //   try{
      //     if(!fs.existsSync(folderName)){
      //       fs.mkdirSync(folderName);
      //     }
      //   }catch(err){
      //     console.log(err);
      //   }
      // }
      // personLoginAndProfile();// <- this function


      // console.log(person.login+'___<- if login');

    }else{
      // console.log('FALSE');
    }
    // var logins=results[y].login;
    // var password=results[y].password;

  }

        });//connection
        // console.log(`${logina}`+"<---------------------------");

      //******************************************************************************


      //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        connection.end(err=>{
          if(err){
            return err;
            console.log('err');
          }else{
            console.log('database ADD --- closed');
          }
        });//connection closed

      //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxx
      setTimeout(()=>{


        // console.log(`${person.login}`+"////"+ `${person.pwd}`+'<---------What?');
        // console.log(`${user}`+"////"+ `${password}`+'<---------What two?')
        //тут происходит главное чудо
        // function vsePush(){
          if (user == `${person.login}` && password == `${person.pwd}`) {
            return done(null, { id: `${person.id}`, name: `${person.login}` ,visit_date:`${person.visit_date}`});
          }else{
            // message='Неправильный логин или паролеь';
          }
          return done(null, false);

      },700);
      // }

}//authUser
// console.log(typeof(authUser));
passport.use(new LocalStrategy(authUser));
passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});

app.post("/login", passport.authenticate('local', {
    successRedirect: "/home",
    failureRedirect: "/login",
}));


app.get("/login", (request, response) => {
  //   const html = `
  // <form method="post" action="/login">
  // <input type="text" name="username"> <br />
  // <input type="password" name="password"> <br />
  // <input type="submit" value="Войти">
  // </form>
  // `;
    // response.send(html);
    response.render('login',{
      title:"authorization",
      text: "TEXT",
      description: "ddfs",
      info: "message"
    });
});

const auth = (request, response, next) => {
    if (request.user != undefined) next();
    response.redirect("/login");// ОШИБКА
    // message='неправильный логин или пароль';
}
// app.get("/home", auth, (req, res) => {
//     res.send("Admin panel");
// });
// ,auth,
app.post("/exit", auth, (request, response) => {
  request.logOut();
  response.redirect('/login');
});
//auth
app.get("/home", (request, response) => {
  response.render('home',{
    title:"authorization Success!",
    text: `${person.name}`,
    description: "ddfs",
    name: `${person.name}`

  });
});

//auth,
app.get("/script",  (request, response) => {
  console.log('lol');
  response.render('script',{

    title:"authorization Success!",
    text: "Excess!",
    description: "ddfs",
    name: `${person.name}`

  });
});
// database: vh2u23120_mysql
// host: localhost
// username: vh2u23120_mysql
// password: gfhjkm
//auth,
app.get("/cabin",  (request, response) => {
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
  // console.log(ruquerst.url);
});
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// global.uploadFile=`${person.login}`;
//
// function sendRes(url, contentType, res){
//   let file=path.join(__dirname+'/public/upload/321/')
//   fs.readFile(file,(err,content)=>{
//     if(err){
//       console.log(err);
//     }else{
//       res.writeHead(200,{'Content-Type': contentType});
//       res.write('file not found');
//       res.end();
//     }
//   })
// };
// console.log(`${person.name}`+'<---------------------------------***')
// function getRandomInt(max) {
  //
  //   console.log(person.login+'0000000000000000000000000000000000000000000000');
  //   return Math.floor(Math.random() * max);
  // }
  // // global.login=getRandomInt(999);
  // // global.login=`${person.getFullName}`;
  // console.log(`${global.login}`+"<---------------------------");
  // console.log(`${global.login}`+"---<- Two LOGIN");
  // app.use(express.static(__dirname+'/public'));
  //
  // // var uploadFile=`${person.name}`;
  // global.uploadFile=`${person.login}`;
  // app.use(multer({dest:"public/uploads/"+`${uploadFile}`}).single("filedata"));
  // //in this place the code does not work the file name is undefined
  //
  // app.post("/public/upload", function (req, res, next) {
  //
  //   console.log(req.url);
  //   let filedata = req.file;
  //   console.log(filedata);
  //   if(!filedata)
  //   res.send("Ошибка при загрузке файла");
  //   else
  //   res.send("Файл загружен");
  // });
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.post('/cabinUpdateEmail',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    email:`${person.email}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET email=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.email}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateName',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });


  //Добовление записи, сработало!!!
  //-------------------------------
  // const sql = `UPDATE barbarians SET (login, password, email, Name, Lastname, age, gender, blod_type, profession, having_children, marital_status, hobby, education) WHERE('${request.body.login}', '${request.body.password}', '${request.body.email}', '${request.body.Name}', '${request.body.Lastname}', ${request.body.age}, '${request.body.gender}', '${request.body.blod_type}', '${request.body.profession}', '${request.body.having_children}', '${request.body.marital_status}', '${request.body.hobby}', '${request.body.edycation}')`;
  // UPDATE `barbarians` SET `Name` = '7a0777' WHERE `barbarians`.`id` = 18;
  const sql = `UPDATE barbarians SET Name=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.Name}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateLastname',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    lastname:`${person.lastname}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET Lastname=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.Lastname}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateGender',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    lastname:`${person.gender}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET gender=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.gender}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateAge',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    lastname:`${person.age}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET age=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.age}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateBlodType',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    lastname:`${person.blod_type}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET blod_type=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.blod_type}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateProfession',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    lastname:`${person.blod_type}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET profession=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.profession}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateHavingChildren',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    lastname:`${person.having_children}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET having_children=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.having_children}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateMaritalStatus',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    lastname:`${person.marital_status}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET marital_status=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.marital_status}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateHobby',auth,(request,response)=>{
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    lastname:`${person.hobby}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET hobby=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.hobby}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabinUpdate', {
    name: `${person.name}`,
    login:`${person.login}`,
    email:`${person.email}`,
    name:`${person.name}`,
    lastname:`${person.lastname}`,
    gender:`${person.gender}`,
    age:`${person.age}`,
    blod_type:`${person.blod_type}`,
    profession:`${person.profession}`,
    having_children:`${person.having_children}`,
    marital_status:`${person.marital_status}`,
    hobby:`${person.hobby}`,
    education:`${person.education}`,
  });
});
app.post('/cabinUpdateEducation',auth,(request,response)=>{
  console.log(request.body);
  response.render('cabin',{
    title:"is this are cabins!",
    text: "This is actually real. Spacecraft control room!",
    description: "cabin user",

    lastname:`${person.education}`,

  });
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  const sql = `UPDATE barbarians SET education=? WHERE barbarians.id=${person.id}`;
const data = [`${request.body.education}`];
connection.query(sql,data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  response.render('cabin', {

  });
});




app.get("/registration", (request, response)=>{
  response.render('registration',{
    title:"is this registration!",
    text: "oK",
    description: "registration user",
    name: `${person.name}`

  });
});
//******************************************************************************
// UrlencodedParser,
app.get('/registration',  function (request,response){
  response.render('registration',{
    title: 'OK',
    text: 'text'
  })
});


app.post('/registration', function (
  request,response
) {
  // if (!request.body) return response.sendStatus(400)
  // console.log(request.body);
  // console.log('oK');
  // конфигурация
  const connection = mysql.createConnection({
    host: `${mysqlhost}`,
    user: `${mysqluser}`,
    password: `${mysqlpassword}`,
    database: `${mysqldatabase}`
  });
  connection.connect(err=>{
    if(err){
      return err;
      console.log('err');
    }else{
      console.log('database--- oK');
    }
  });

  let userList = "SELECT * FROM `barbarians`";

  if(request.body.Name===''){
    console.log('^_^');
    request.body.Name=''
  }else if(request.body.Lastname===''){
    request.body.Lastname='';
  }else if(request.body.age===''){
      request.body.age='';
  }else{
    console.log('Elser!!!');
  }
  //Добовление записи, сработало!!!
  //-------------------------------
  const sql = `INSERT INTO barbarians(login, password, email, Name, Lastname, age, gender, blod_type, profession, having_children, marital_status, hobby, education) VALUES('${request.body.login}', '${request.body.password}', '${request.body.email}', '${request.body.Name}', '${request.body.Lastname}', ${request.body.age}, '${request.body.gender}', '${request.body.blod_type}', '${request.body.profession}', '${request.body.having_children}', '${request.body.marital_status}', '${request.body.hobby}', '${request.body.edycation}')`;

  connection.query(sql, function(err, results) {
    if(err) console.log(err);
    console.log(results);
  });
  // connection.end(err=>{
  //   if(err){
  //     return err;
  //     console.log('err');
  //   }else{
  //     console.log('database--- closed');
  //   }
  // });
  response.render('registrationSuccess', {
    login: `${request.body.login}`,
    password: `${request.body.password}`,
    email: `${request.body.email}`,
    Name: `${request.body.Name}`,
    Lastname: `${request.body.Lastname}`,
    age: `${request.body.age}`,
    gender: `${request.body.gender}`,
    blod_type: `${request.body.blod_type}`,
    profession: `${request.body.profession}`,
    having_children: `${request.body.having_children}`,
    marital_status: `${request.body.marital_status}`,
    hobby: `${request.body.hobby}`,
    education: `${request.body.edycation}`
  });
});
//******************************************************************************




// const cors = require('cors');
app.use("/login",auth,(request,response)=>{
  response.render('login',{
    title:"title",
    text: "text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    description: "description"
  })
});



// app.set("view engine", "ejs");
// app.get('/comments', function (request, response) {
//   response.sendFile(__dirname + '/comments.html')
// });
app.use("/comments/index",(request,response)=>{
  response.render('commentsOld',{
    title:"Comments",
     text: "Самописная система комментариев. Эта система комментариев без записи в базу данных. Сообщения записываются массивом в документ json форматa. После чего отправляются с сервера обратно в документ. С использованием одного только javascript. Как говорится в пословице: \"все гениальное просто\". Рабочую систему комментариев можно скачать по ссылки с моего гитхаба https://github.com/amir248/comments Вот вам пожалуйста рабочая система комментариев в открытом доступе, это не то что условно бесплатная система комментариев как \"дискус\". Сначало она бесплатная, а потом загромаждает все поля видимости жесточайшими ракламными блоками. Пример работы системы комментариев: https://amir248.github.io/localhost/",
    warnings: "На сервере файлы кэшируются, поэтому иногда чтобы увидеть отправленное сообщение надо обновить страницу.",
    description: "Самописная система комментариев, для сайта."
  })
});
app.use("/comments",(request,response)=>{
  response.render("indexPage",{
    title:"Comments",
    text: "Самописная система комментариев. Эта система комментариев без записи в базу данных. Сообщения записываются массивом в документ json форматa. После чего отправляются с сервера обратно в документ. С использованием одного только javascript. Как говорится в пословице: \"все гениальное просто\". Рабочую систему комментариев можно скачать по ссылки с моего гитхаба https://github.com/amir248/comments Вот вам пожалуйста рабочая система комментариев в открытом доступе, это не то что условно бесплатная система комментариев как \"дискус\". Сначало она бесплатная, а потом загромаждает все поля видимости жесточайшими ракламными блоками. Пример работы системы комментариев: https://amir248.github.io/localhost/ ^_^",
    warnings: "На сервере файлы кэшируются, поэтому иногда чтобы увидеть отправленное сообщение надо обновить страницу.",
    description: "Самописная система комментариев, для сайта."
  });
});

app.get("/",(request,response)=>{
  response.render("main.ejs",{
  });
});

app.listen(port, host,()=> {
  console.log(
    'Сервер начал прослушивание запросов на порту '+ `${port}`
  )
});
c
