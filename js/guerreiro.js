import { Personagem } from './personagem.js';

export class Guerreiro extends Personagem {
    ataque(alvo1, alvo2) {
        super.ataque(alvo1);
        super.ataque(alvo2);
    }
}
