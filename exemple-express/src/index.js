import express from 'express';
import fs from "fs";
import  parse  from 'path';
import {postRouteur} from './ROUTES/post-route.js';
// import ServerResponse, { maxHeaderSize }  from 'http';
import  error from 'console';
import { captureRejectionSymbol } from 'events';
import { title } from 'process';



// instance de l'app express:
const server = express()
server.use(express.json())
server.use("/api/posts" , postRouteur)

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


// /api/todos/2
// /api/todos/3
// Exercice: Modifier une todo dans la liste
// 0. Ajouter un handler PUT qui recoit dans corps de la requete: title et date
// 1. Verifier si title et date est envoyé sinon retourner un erreur
// 2. récuperer toutes les taches
// 3. Mettre la tache à jour
// 4. Retourner la tache mise à jour ajoutée dans la réponse

server.put("/todos/:id", (req, res) =>{

    const id = Number(req.params.id);
    const data =  req.body;
    // on deverifier si le titre et le date sont dans le body
    if (!data.title || !data.date) {
        return res.status(400).json({error: "Envoyé le titre et la date"})  
    }

  const dataTodos = fs.readFileSync("./src/todo.json")

  const todosObject =JSON.parse(dataTodos.toString())

  // trouver la position de la tache a modifier
const indexId = todosObject.todos.findIndex((index) =>{
    return index.id == data.id
})

if(indexId == -1){
    return res.status(400).json({error: `l'identifiant est introuvable`})  
    }

  // assigné le nouveau titre et la nouvelle date

//   todos c'est le table qui contient les obj

  todosObject.todos[indexId].title = data.title
  todosObject.todos[indexId].date = data.date


//   stringidy transforme en chaine de caractere le fichier
  fs.writeFileSync("./src/todo.json", JSON.stringify(todosObject) )

  return res.json({
    error: "la tache est mise à jour"
  });
})




