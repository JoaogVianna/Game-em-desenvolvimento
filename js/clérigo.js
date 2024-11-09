import { Personagem } from './personagem.js';

export class Clerigo extends Personagem {
    constructor(nome, vida, dano, defesa, poderCura) {
        super(nome, vida, dano, defesa);
        this.poderCura = poderCura;
    }

    curar(alvo) {
        alvo.vida += this.poderCura;
        console.log(alvo.nome + ' foi curado! Vida agora: ' + alvo.vida);
    }
}
