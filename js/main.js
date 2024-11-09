let status = { vida: 100, vidaUndyne: 50, vidaRomeo: 75 }; // Inicialização de status

let blocosTextos = [
    {
        id: 0,
        texto: "você cai no subsolo e sente aquele silêncio esquisito no ar. parece que não tem ninguém por perto...",
        opcoes: [
            { text: "dar uma olhada ao redor", nextText: 1 }
        ]
    },
    {
        id: 1,
        texto: "logo à frente, tem duas passagens: uma bem iluminada à direita e outra mais sombria à esquerda.",
        opcoes: [
            { text: "ir pela passagem iluminada", nextText: 2 },
            { text: "ir pela passagem sombria", nextText: 3 }
        ]
    },
    {
        id: 2,
        texto: "toriel aparece e parece disposta a te ajudar com um sorriso suave.",
        opcoes: [
            { text: "falar com toriel", nextText: 4, setState: { encontrouToriel: true } },
            { text: "ignorar e seguir sozinho", nextText: 3 }
        ]
    },
    {
        id: 3,
        texto: "você anda pela área sombria e sente como se tivesse algo ou alguém te observando...",
        opcoes: [
            { text: "ficar em posição de combate", nextText: 5 },
            { text: "voltar para a luz", nextText: 2 }
        ]
    },
    {
        id: 4,
        texto: "toriel te dá uma ajuda e você sente sua energia aumentar.",
        opcoes: [
            { text: "agradecer", setState: { vida: 100 }, nextText: 6 }
        ]
    },
    {
        id: 5,
        texto: "um som alto interrompe o silêncio. você se vira e dá de cara com undyne, pronta pra lutar.",
        opcoes: [
            { text: "enfrentar undyne (id: batalhaUndyne)", nextText: iniciarCombate("Undyne") },
            { text: "voltar correndo", nextText: 3 }
        ]
    },
    {
        id: 6,
        texto: "com a ajuda de toriel, você segue adiante e chega em um corredor longo.",
        opcoes: [
            { text: "explorar o corredor", nextText: 8 },
            { text: "voltar para o início", nextText: 1 }
        ]
    },
    {
        id: 7,
        texto: "você sobreviveu ao combate com undyne, e sente uma sensação de vitória.",
        opcoes: [
            { text: "continuar", setState: { venceuUndyne: true }, nextText: 8 }
        ]
    },
    {
        id: 8,
        texto: "seguindo pelo corredor, você encontra Romeo, que te observa com um olhar curioso.",
        opcoes: [
            { text: "bater um papo com Romeo", nextText: 9 },
            { text: "passar direto", nextText: 10 }
        ]
    },
    {
        id: 9,
        texto: "Romeo dá um sorriso e diz que parece que ele vai ter um trabalhinho com você.",
        opcoes: [
            { text: "aceitar o desafio de Romeo", nextText: 11 },
            { text: "dar uma desculpa e seguir em frente", nextText: 10 }
        ]
    },
    {
        id: 10,
        texto: "você continua pelas ruínas e encontra uma porta enorme, que parece levar a algo importante.",
        opcoes: [
            { text: "entrar pela porta", nextText: 12 },
            { text: "voltar e explorar mais", nextText: 1 }
        ]
    },
    {
        id: 11,
        texto: "Romeo está pronto pra te enfrentar. você sente que essa luta não será fácil.",
        opcoes: [
            { text: "enfrentar Romeo", nextText: iniciarCombate("Romeo") },
            { text: "mudar de ideia e voltar", nextText: 8 }
        ]
    },
    {
        id: 12,
        texto: "a porta leva a um salão imenso. algo te diz que está perto do fim.",
        opcoes: [
            {
                text: "entrar e enfrentar o destino",
                estadoNecessario: (estadoAtual) => estadoAtual.venceuUndyne && estadoAtual.venceuRomeo && estadoAtual.encontrouToriel,
                nextText: 14
            },
            { text: "voltar para explorar mais", nextText: 1 }
        ]
    },
    {
        id: 13,
        texto: "após a batalha intensa com Romeo, você sente que sua jornada está chegando ao fim.",
        opcoes: [
            { text: "seguir adiante", setState: { venceuRomeo: true }, nextText: 12 }
        ]
    },
    {
        id: 14,
        texto: "com a ajuda dos amigos que você fez, você consegue chegar à saída do subsolo. parabéns! você venceu de forma pacífica.",
        opcoes: [
            { text: "recomeçar", nextText: 0 }
        ]
    },
    {
        id: 999,
        texto: "você foi derrotado... mas ainda pode tentar de novo.",
        opcoes: [
            { text: "recomeçar", nextText: 1 }
        ]
    }
];

// Função de combate para lidar com ataques
function iniciarCombate(inimigo) {
    if (inimigo === "Undyne") {
        while (status.vida > 0 && status.vidaUndyne > 0) {
            status.vidaUndyne -= 20;
            if (status.vidaUndyne > 0) {
                status.vida -= 15;
            }
        }
        return status.vida > 0 ? 7 : 999;
    } else if (inimigo === "Romeo") {
        while (status.vida > 0 && status.vidaRomeo > 0) {
            status.vidaRomeo -= 25;
            if (status.vidaRomeo > 0) {
                status.vida -= 20;
            }
        }
        return status.vida > 0 ? 13 : 999;
    }
}

// Função para exibir o texto
function mostrarTexto(indexBlocoTexto) {
    let blocoTexto = blocosTextos.find(blocoTexto => blocoTexto.id === indexBlocoTexto);
    document.getElementById('text').innerText = blocoTexto.texto;

    const botoesOpcoes = document.getElementById('option-buttons');
    while (botoesOpcoes.firstChild) {
        botoesOpcoes.removeChild(botoesOpcoes.firstChild);
    }

    blocoTexto.opcoes.forEach(opcao => {
        if (mostarOpcao(opcao)) {
            const botao = document.createElement('button');
            botao.innerText = opcao.text;
            botao.classList.add('btn');
            botao.addEventListener('click', () => selecionarOpcao(opcao));
            botoesOpcoes.appendChild(botao);
        }
    });
}

function mostarOpcao(opcao) {
    return opcao.estadoNecessario == null || opcao.estadoNecessario(status);
}

function selecionarOpcao(opcao) {
    let proximoIdTexto = opcao.nextText;
    if (proximoIdTexto == 0) {
        return iniciarJogo();
    }
    status = Object.assign(status, opcao.setState);
    mostrarTexto(proximoIdTexto);
}

function iniciarJogo() {
    status = { vida: 100, vidaUndyne: 50, vidaRomeo: 75 };
    mostrarTexto(0);
}

iniciarJogo();
