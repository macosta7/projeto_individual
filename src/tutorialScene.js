//classe da cena de tutorial
class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorialScene'}) // Define a chave da cena como 'tutorialScene'
    }

    // Carrega os assets necessários para a cena de tutorial
    preload() {
        this.load.image('fundoControles', 'assets/fundoControles.png'); // Carrega a imagem de fundo da cena de tutorial
        this.load.image('movimentacao', 'assets/movimentacao.png'); // Carrega a imagem dos controles
        this.load.image('botaoVoltar', 'assets/botaoVoltar.png'); // Carrega a imagem do botão de voltar
    }

    // Cria os elementos visuais da cena de tutorial
    create() {
        this.add.image(larguraJogo/2, alturaJogo/2, 'fundoControles'); // Adiciona a imagem de fundo na posição central da tela
        this.add.image(larguraJogo/2, alturaJogo/2, 'movimentacao').setScale(0.8); // Adiciona a imagem dos controles na posição central da tela e redimensiona
    }

    // Atualiza a cena de tutorial
    update() {
        this.botaoVoltar = this.add.image(larguraJogo - 1290, alturaJogo/10, 'botaoVoltar').setScale(0.8).setInteractive(); // Adiciona a imagem do botão de voltar com interatividade
        this.botaoVoltar.on('pointerdown', () => { // Adiciona um evento de clique ao botão de voltar
            this.scene.start('initialScene'); // Inicia a cena inicial ao clicar no botão de voltar
        });
    }
}