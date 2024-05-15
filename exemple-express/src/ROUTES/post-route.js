import express from 'express';

export const postRouteur = express.Router();

const post = [
    {
        id: 'a',
        title: 'tritre a'
    }
    ,
    {
        id: 'a',
        title: 'tritre a'
    }
,
    {
        id: 'a',
        title: 'tritre a'
    }
]



postRouteur.get("/", (req, res) => {
    res.end("bonjour");
})

// Exercice: 
// Ajouter une todo a la liste 
// Ajouter un handler POST qui recoit dans corps de la requete: title et date
// 1. Verifier si title et date est envoyé sinon retourner un erreur
// 2. Generer un id aleatoire
// 3. Ajouter la nouvelle tache dans le fichier todos.json
// 4. Retourner la nouvelle tache ajoutée dans la réponse


postRouteur.post("/api/todos", (req, rep) => {
  const data = req.body;

  if (!data.title || !data.date) {
    return rep
      .status(400)
      .json({ error: "Titre et date obligatoire" });
  }

  const dataTodos = fs.readFileSync("./src/data/todos.json");
  const todosObject = JSON.parse(dataTodos.toString());
  todosObject.todos.push({
    // id: Math.floor(Math.random() * 1000),
    // id: crypto.randomUUID()
    title: req.body.title,
    date: req.body.date,
  });

  fs.writeFileSync(
    "./src/data/todos.json",
    JSON.stringify(todosObject)
  );

  return rep.json({
    message:"Tache ajouté"
  });
});