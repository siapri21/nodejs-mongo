import express from 'express';
import fs from "fs";
import { parse } from 'path';
import { postRouteur } from '../../ROUTES/post-route';

server.use("/api/posts" , postRouteur)


// instance de l'app express:
const server = express()

server.get('/api/posts', (req, res)=> {
    console.log(req);
    res.end("bonjour")
})

// function handler


// Exercice:
// Ajouter un handler pour l'url "/api/users" avec la methode POST
//et retourne "bonjour utilisateur"
// Tester si elle fonctionne avec Postman

function handler(req, res) {
    console.log(req.method);
    res.end("bonjour utilisateur")
}    

server.post('/api/users', handler)


// l'ecoute sur un server

server.listen(3005, function () {
    console.log("server lance sur le port 3005");
    
})    

// Exercice:
// Ajouter un handler pour l'url /api/todos avec method GET.
// 1. Lire le conténu du fichier todos.json
// 2. Retourner les contenu Json dans réponse
// 3. Tester la route avec Postman


server.get('/api/todo', (req, res)=> {
    console.log(req);
    fs.readFile('./src/todo.json' , (err, data) =>{
        if (err) {
            return res.json({err: "un probleme est survenu"})
        }

        const dataString = data.toString();
        const dataObject = JSON.parse(dataString);
        res.json(dataObject);
    
    })
    
});




// * Pour collecter les informations à partir de l'URL :
// * ex: /api/user?firstname=Doe&lastname=John
server.get("/api/user", (req, res) => {
    // Récupère les données de la requête GET
    const data = req.query;
    console.log(data); // Les données sont ensuite un objet contenant firstname et lastname comme clés et leurs valeurs
  
    // Vérifie si les champs firstname et lastname sont présents
    if (!data.firstname || !data.lastname) {
      // Retourne une réponse d'erreur si les informations obligatoires sont manquantes
      return res.status(400).json({ error: "informations obligatoires" });
    }
  
    // Renvoie les données sous forme d'objet JSON
    res.json(data);
});



// Exercice:
// Ajouter un handler pour l'url "/api/todo":
// /api/todo?id=2
// /api/todo?id=4
// Récuperer la liste des todos
// Si la todo n'existe pas , retourner un 404
// Sinon Retourner en JSON la todo avec l'id fournit
  server.get("/api/todo", (req, res) => {
    const dataUrl = req.query;
    if (!dataUrl.id) {
      res.status(400).json({ err: "il y a une erreur" });
      return;
    }
  
    fs.readFile("../src/data/todos.json", (err, data) => {
      if(err){
          return res.status(404).json({ err: "il y a une erreur" });
      }
      const elem = JSON.parse(data.toString());
      const result = elem.todos.filter((obj)=>{
  
         return obj.id == dataUrl.id 
      });
      console.log(result);
      if(result.length == 0){
        res.status(404).json({ err: "il y a une erreur" });
        return;
      }
      else{
          res.json(result[0])
      }
    });
  });

  // Exercice:
// Ajouter un handler pour l'url "/api/todo" avec la method DELETE:
// /api/todo?id=2
// /api/todo?id=4
// Récuperer la liste des todos
// Si la todo n'existe pas , retourner un 404
// Sinon SUpprimer la todo du tableau
// Ecrire dans le ficher la nouvelle liste
// Retourner un message: Tache supprimée

server.get('api/todo' , (req, res) =>{
    const taskUrl = req.query;

    if (!taskUrl.id) {
        res.status(400).json({erro: `il y'a une erreur`});
        return
    }
    fs.readFile( "../src/data/todo.json" , (err, data)=>{
        if (err) {
            return res.status(500).json({err: 'problème 500'})
        }

        if(!data.id){
            return res.status(400).json({err: 'erreur 404'})
        }else{
           
        }

        const dataStrings = data.toString()
        const dataObjects = JSON.data(dataStrings)

        const dataFilter = dataObjects.todos.filter((task)=>{
            return task.id == taskUrl.id;
        })

       
    })
})

