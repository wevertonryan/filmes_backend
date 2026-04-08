import Movie from "../models/movie.class.js";


export async function getMovieByID(req, res){
    const movieID = req.params.id;
    try {
        const movie = await Movie.findById(movieID)
        
        res.status(200).json({message: "Requisição executada com sucesso!", status: "sucess", result: movie});
    } catch(error) {
        res.status(500).json({message: "Requisição falhou!", status: "failed", result: error});
    }
}

export async function getAllMovies(req, res){
    try {
        const movies = await Movie.find()
        .sort({titulo: 1})

        res.status(200).json({message: "Requisição executada com sucesso!", status: "sucess", result: movies });
    } catch(error) {
        res.status(500).json({message: "Requisição falhou!", status: "failed", result: error});
    }
}

export async function getAllMoviesAvaliacao10(req, res){
    try {
        const movies = await Movie.find({avaliacao: 10})
        .sort({titulo: 1})

        res.status(200).json({message: "Requisição executada com sucesso!", status: "sucess", result: movies });
    } catch(error) {
        res.status(500).json({message: "Requisição falhou!", status: "failed", result: error});
    }
}

function _montagemDeMensagem(itensFaltantes){
    let message = itensFaltantes[0];

    let i = 1;
    while(i < itensFaltantes.length){
        message += ", ";
        message += itensFaltantes[i];
        i += 1;
    }

    if(i > 1){
        message += " são itens obrigatórios!";
    } else {
        message += " é um item obrigatório!";
    }

    return message;
}

function _validacaoInteiro(inteiro, valorNome, valorMax, valorMin = 0){
    let inteiro_valido = parseInt(inteiro);
    const resposta = { inteiro_valido, mensagem: "", valido: true};

    if(isNaN(inteiro_valido)){
        resposta.mensagem = `${valorNome} é invalido!`;
        resposta.valido = false;
    } 
    else if(inteiro_valido > valorMax){
        resposta.mensagem = `${valorNome} não pode ser maior que ${valorMax}!`;
        resposta.valido = false;
    }
    else if(inteiro_valido < valorMin){
        resposta.mensagem = `${valorNome} não pode ser menor que ${valorMin}!`;
        resposta.valido = false;
    }
    
    return resposta;
}

export async function createMovie(req, res){
    if(!req.body){
        res.status(422).json({message: "Não foi enviado nenhuma informação", status: "failed"});
        return;
    }

    const {titulo, diretor, ano_lancamento, genero, avaliacao} = req.body;
    
    const itensFaltantes = [];
    if(!titulo) itensFaltantes.push("Titulo");
    if(!diretor) itensFaltantes.push("Diretor");
    if(!ano_lancamento) itensFaltantes.push("Ano de Lançamento");
    if(!genero) itensFaltantes.push("Gênero");
    if(!avaliacao) itensFaltantes.push("Avaliação");

    if(itensFaltantes.length > 0) {
        const message = _montagemDeMensagem(itensFaltantes)

        res.status(422).json({message, status: "failed"}); 
        return;
    }


    // Validação de ano_lançamento
    const anoAtual = new Date().getFullYear();
    const respostaAnoLancamento = _validacaoInteiro(ano_lancamento, "Ano de Lançamento", anoAtual)
    if(!respostaAnoLancamento.valido) {
        res.status(422).json({message: respostaAnoLancamento.mensagem, status: "failed"}); 
        return;
    }
    const ano_lancamento_valida = respostaAnoLancamento.inteiro_valido;


    // Validação de avaliacao
    const respostaAvaliacao = _validacaoInteiro(avaliacao, "Avaliação", 10);
    if(!respostaAvaliacao.valido) {
        res.status(422).json({message: respostaAvaliacao.mensagem, status: "failed"}); 
        return;
    }
    const avaliacao_valida = respostaAvaliacao.inteiro_valido;

    // Criando Filme
    const newMovie = new Movie({
        titulo,
        diretor,
        ano_lancamento: ano_lancamento_valida,
        genero,
        avaliacao: avaliacao_valida
    })

    // Armazenando no Banco e retorno de resposta
    try {
        const savedMovie = await newMovie.save();
        res.status(200).json({message: "Filme cadastrado com sucesso!", status: "sucess", result: savedMovie});
    } catch( error ) {
        res.status(500).json({message: "Problema ao cadastrar filme!", status: "failed", result: error});
    }
}