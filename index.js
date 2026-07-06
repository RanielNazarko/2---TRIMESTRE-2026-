
/*     npm init                                      */
/*     npm i express                                 */
/*     extensao RapidAPI client                      */
/*     GET    - http://localhost:3000/musicas        */
/*     POST   - http://localhost:3000/musicas        */
/*     DELETE - http://localhost:3000/musicas/21     */

const express = require("express")
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')

/*    Adiciona Musica                 */
app.post("/musicas", (req,res) => {
    const musica = req.body
    try {
        /*     Abrir o arquivo         */
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
        /*     adicionar musica     */
        bd.push(musica)
        /*     salvar o arquivo        */
        fs.writeFileSync("bd.json", JSON.stringify(bd), "utf8")
        /*     Resposta                */
        res.status(201).json({ resposta: "Musica adicionada com sucesso!" })
    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
})

/*    Mostra a lista de musicas       */
app.get("/musicas", (req,res) => {
    try {
        /*     Abrir o arquivo         */
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
        res.status(200).json({resposta: bd})
    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
})

/*    Deleta uma musica da lista      */
app.delete("/musicas/:id", (req,res) => {

    /*     Pegar a musica da rota            */
    const id = req.params.id
try{
    /*     Abrir o arquivo               */
    const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
    /*     Encontra o indece da musica a ser excluida */
    const indiceMusica = bd.findIndex((musica) => musica.id == id)
    /*     Remove o indice da lista      */
    if(indiceMusica == -1){
        return res.status(404).json({erro: "A musica não existe"})
    }
    bd.splice(indiceMusica, 1)
    /*     Atualizar o arquivo           */
    fs.writeFileSync("bd.json", JSON.stringify(bd), "utf8")
    /*     Dar uma resposta   */
        res.status(200).json({resposta: "Musica excluida com sucesso!"})
    }catch(erro){
        res.status(500).json({ erro: erro.message })
    }
})

// Execução da API:
app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})