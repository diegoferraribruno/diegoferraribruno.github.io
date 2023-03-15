var posts = [
	{
	id:1,
	titulo:"Começando um  novo projeto de blog",
	data:"15/03/2023 10:00",
	conteudo:"Começando um novo blog aqui"
	},
		{
	id:2,
	titulo:"Atualização dos apps",
	data:"15/03/2023 11:00",
	conteudo:"hoje houve uma grande atualização"+
	" para a versão 0.9.9, ou seja, falta apenas um tiquinho"+
	" pra oficializar a versao 1.0 do noss APP de arte"
	},
			{
	id:3,
	titulo:"Upload do blog",
	data:"15/03/2023 12:00",
	conteudo:"ainda é off-line"+
	" mas por hora, ta bom demais."
	}

]

function createBlog(){
	let quantos = posts.length
	let blog = document.getElementById("blog")
	for (i = quantos-1; i >= 0  ; i--){
		let post = document.createElement("div")

		let titulo = document.createElement("div")
		titulo.id = "titulo"+ posts[i]["id"]
		titulo.innerHTML ="<h2>" +posts[i]["titulo"]+"</h2>"
		post.appendChild(titulo)
	let data = document.createElement("div")
		data.id = posts[i]["id"]+"_data"
		data.innerHTML += "<h6>"+posts[i]["data"]+"</h6>"
		titulo.appendChild(data)
let conteudo = document.createElement("div")
		conteudo.innerHTML += posts[i]["conteudo"]
		blog.appendChild(titulo)
		blog.appendChild(conteudo)
		}
}
createBlog()

