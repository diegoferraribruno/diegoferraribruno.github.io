var posts = [
	{
		id: 1,
		titulo: "Começando um  novo blog",
		data: "15/03/2023 10:00",
		conteudo: "só para fazer o primeiro post."
	},
	{
		id: 2,
		titulo: "Atualização dos apps",
		data: "15/03/2023 11:00",
		conteudo: "hoje houve uma grande atualização" +
			" para a versão 0.9.9, ou seja, falta apenas um tiquinho" +
			" pra oficializar a versao 1.0 do noss APP de arte"
	},
	{
		id: 3,
		titulo: "Upload do blog",
		data: "15/03/2023 12:00",
		conteudo: "ainda é off-line" +
			" mas por hora, ta bom demais."
	},
	{
		id: 4,
		titulo: "novos pincéis",
		data: "16/03/2023 08:40",
		conteudo: "Passei um dia inteiro para" +
			" fazer um novo tipo de pincel agora mais um dia trabalhando nisso e a noite a gente vê o resultado<br>" +
			"update: são quase 16h da tarde e acho q terminei minahs gabia.. adaptações técnicas! hora do upload."
	},
	{
		id: 5,
		titulo: "Finalizado histórico com novos pincéis",
		data: "19/03/2023 10:00",
		conteudo: "Foram 4 dias exaustivos pensando, mudando códigos " +
			"e cuidando do filho doente, com direito a madrugada no hospital e dia de ressaca com dor de cabeça.<br>" +
			"Bem, apesar das gambiarras, nosso app de Desenho está funcionando aparentemente bem com a nova mudança de pinceis no histórico.<br>"
	},
	{
		id: 6,
		titulo: "Muita animação",
		data: "26/03/2023 23:50",
		conteudo: "Depois de consertar muita coisa por conta da mudança do modo de entrada, " +
			"achei que o app estava usável o suficiente para implemplementar a função de animação<br>" +
			"Foi um surto criativo, o código simplesmente fluiu em 1 dia já estava animando e exportando, dois dias depois, " +
			"seu menu de ajustes, completo com velocidade, clonagem e remoção de quadros de" +
			" animação.<br> Só falta importar os quadros de animação de volta. <br>" +
			"(update das 02:00 - Importação de animações) <br> Espero que esteja intuitivo.<br> Ah e o filho já ta bem!"
	},
	{
		id: 7,
		titulo: "Novos recursos",
		data: "12/04/2023 16:20",
		conteudo: "Foi um longo caminho até aqui, muita treta, para gerar gif animados, para recortar automaticamente todos os quadros. " +
			"mas finalmente posso dizer que este app de  está perfeitamente usavel na versão 1.7.4!<br>" +
			"existem alguns recursos muito bons que precisam de uns videos tutoriais ainda.<br>" +
			"como o 🔴 Botao de gravaçao automática de quadros por tempo ⏱️<br>" +
			"E a função de carregar uma sequencia de quadros como fundo ou como sobreposição " +
			"para que se possa fazer a colorização dos quadros sem tocar no desenho. " +
			"Ainda preciso elaborar algo mais intuitivo para esta função." +
			"Pode dar algum problem?  precisa de mais testes? certamente!<br>" +
			"Gostaria de refazer todo seu código para a versão 2.0<br>" +
			"e já estou no processo de separar grupos de funções em arquivos .js separados<br><br>" +
			"Vamo que vamo!"

	},
	{
		id: 8,
		titulo: "Desenho 2.0.4",
		data: "29/04/2023 16:20",
		conteudo: " Ta ficando bom mas algumas partes precisam realmete de uma reforma para resolver problemas como o" +
			" desfazer que por vezes nao funciona e salvar quadros brancos quando  🔴 a gravaçao automática ta rolando.<br><br>" +
			"No mais, gostei das mudanças dos menus e layouts e novas funções como o recorte automatico com quadro verde,<br>" +
			'o novo icone de adicionar pincel personalizado ficou bonitinho <span class="icon pintaricon"></span>➕.<br><br>"' +
			"Gostaria de refazer todo seu código para a versão 3.0 rs rs..<br>" +
			"mas Vamo que vamo!"

	},
	{
		id: 9,
		titulo: "Diego 4.0",
		data: "25/05/2023 16:20",
		conteudo: "mudei de casa neste mês. tenho muita tralha de artesanato a qual devo alguma atenção" +
			"penso se devo dar mais asas ao meu lado artístico no mundo fisico ou aqui no mundo do html do javascript," +
			"desenvolvendo soluções para problemas que nem existem." +
			"criando universos virtuais onde pessoas possam se conectar e fazer arte juntas?!" +
			"neste período também estudei (em 2x) o curso basico de Javascript da Udemy e aprendi 3 ou 4 coisas uteis.<br>" +
			"Agora estou estudando o curso complete Web Developer 2023 do ZTM passando por html do basico, formulários, CSS, Bootstrap, Javascript, e frameworks.." +
			"preciso deixar este site aqui um pouco mais simples e funcional pois comecei a criar uma fábrica assombrada" +
			"que antes só tinha um jardim e um monstro, mas ai fui adicionar colisoes, escadas, e quando adicionei quartos (praticamente uma 3- dimensao)" +
			", Resumindo: está tudo meio quebrado e vou lá arrumar esse edifício (que era pra ter um elevador a principio rs...)" +
			"<br>Bora trabalhar"

	}, {
		id: 10,
		titulo: "Smart Zumbis",
		data: "25/05/2023 16:20",
		conteudo: "Este Smart Zumbi andando por aí é obra derivada do personagem de <a href='http://bettodamasceno.art' target='blank'> Betto Damasceno </a><br>Quer saber mais? Aguarde!"

	}, {
		id: 11,
		titulo: "Mandalas, Pinceis, Arco-íris e muito mais",
		data: "14/08/2023 00h00",
		conteudo: 'Muita coisa mudou no app de arte nestes quase 3 meses que nao escrevo e ja estamos na versão 7.5 do "Yoga art".<br>'+
		'Desenhei todos os ícones que antes eram emojis, reorganizei diversos menus, criei os modos mandala, espelho, pincel arco-íris, pincel de luz'+
		'pincel cor A->B com as duas ultimas cores, copiar recortar e colar com redimensionar e rotacionar (ou espelhar) a imagem a ser colada,'+
		'mudança na pressao/velocidade que altera o tamanho do pincel dinamico (com valor máximo), nas funções de histórico. '+
		'Pinceis customizados do quadro ou do clipboard e com opção de cor própria.<br> e por falar em cores, novas opções para configurar suas cores: HSLA, RGBA e HEXA (#RRGGBBAA) '+
		`Agora é possível adicionar uma imagem de fundo para aplicativo (ou para quadro de pintura) do clipboard ou do arquivo inclusive diretamente de uma URL. Atalhos do teclado, menu "?" e muito mais.<br>`+ 
		`<br>`+
		`Para conhecer mais, <a href="http://diegoferraribruno.github.io/desenho.html">click aqui</a> `
	}

]

function createBlog() {
	let quantos = posts.length
	let blog = iD("blog")
	for (i = quantos - 1; i >= 0; i--) {
		let post = document.createElement("div")
		let titulo = document.createElement("div")
		titulo.id = "titulo" + posts[i]["id"]
		titulo.innerHTML = "<h2>" + posts[i]["titulo"] + "</h2>"
		post.appendChild(titulo)
		let data = document.createElement("div")
		data.id = posts[i]["id"] + "_data"
		data.innerHTML += "<h6>" + posts[i]["data"] + "</h6>"
		titulo.appendChild(data)
		let conteudo = document.createElement("div")
		conteudo.innerHTML += posts[i]["conteudo"]
		blog.appendChild(titulo)
		blog.appendChild(conteudo)
	}
}
createBlog()

