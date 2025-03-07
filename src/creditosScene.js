//Classe fase de créditos
class CreditosScene extends Phaser.Scene {
    //Construtor da cena de créditos
    constructor() {
        super({ key: 'creditosScene'})
    }

    //Carrega os assets necessários para a cena de créditos
    preload() {
        this.load.image('creditos', 'assets/creditos.png');
        this.load.image('botaoVoltar', 'assets/botaoVoltar.png');
    }

    //Cria os elementos visuais da cena de créditos
    create() {
        this.add.image(larguraJogo/2, alturaJogo/2, 'creditos').setScale(0.8);
    }

    //Atualiza a cena de créditos
    update() {
        this.botaoVoltar = this.add.image(larguraJogo - 1290, alturaJogo/10, 'botaoVoltar').setScale(0.8).setInteractive(); // Adiciona a imagem do botão de voltar com interatividade
        this.botaoVoltar.on('pointerdown', () => { // Adiciona um evento de clique ao botão de voltar
            this.scene.start('initialScene'); // Inicia a cena inicial ao clicar no botão de voltar
        });
    }
}