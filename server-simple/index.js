// const fs = require("fs");

// readFileSync <- lire le contenu d'un fichier
// writeFileSync <- écrire un fichier avec un contenu

// fs.writeFileSync("text.txt" , "mon seconde fichier");
// console.log("le fichier text.txt a été créee");

// const fileContent = fs.readFileSync("text.txt", "utf-8")
// utf_8 designe l'ancondigne qu'on a utilise 
// console.log(fileContent);
import http from "http";
import  url  from "url";
import querystring from "querystring"


const server = http.createServer((req,res) =>{
    // tranforme la chaine de caarctere url en un obejt js 
    const monUrl = url.parse(req, url);
    
    // transforme la chaine de caractere des parametre d'url en un objet js 
   const dataUrl = querystring.parse(monUrl.query);
   console.log(dataUrl);
    res.end ("bonsoir");
 });


server.listen(8000);
