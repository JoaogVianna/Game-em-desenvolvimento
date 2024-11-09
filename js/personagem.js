export class Personagem {
    constructor(nome, vida, dano, defesa) {
        this.nome = nome;
        this.vida = vida;
        this.dano = dano;
        this.defesa = defesa;
    }

    obterStatus() {
        console.log(this.nome + ' - vida: ' + this.vida + ', dano: ' + this.dano + ', defesa: ' + this.defesa);
    }

    ataque(alvo) {
        alvo.vida -= (this.dano - alvo.defesa);
        console.log(alvo.nome + ' foi atacado e agora tem ' + alvo.vida + ' de vida.');
    }
}
