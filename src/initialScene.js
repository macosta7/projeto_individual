//Classe da cena inicial do jogo
class InitialScene extends Phaser.Scene {
    //Construtor da cena inicial.
    constructor() {
        super({
            key: 'initialScene', // Chave única para identificar a cena
        });
    }
    
    //Carrega os assets necessários para a cena inicial.
    preload() {
        this.load.image('fundo', 'assets/fundo.png'); // Carrega a imagem de fundo
        this.load.image('titulo', '../assets/titulo.png'); // Carrega a imagem do título
        this.load.image('botaoJogar', '../assets/botaoJogar.png'); // Carrega a imagem do botão de jogar
        this.load.image('botaoCreditos', '../assets/botaoCreditos.png'); // Carrega a imagem do botão de créditos
        this.load.image('botaoControles', '../assets/botaoControles.png'); // Carrega a imagem do botão de controles
    }

    
    //Cria os elementos visuais da cena inicial.
    create() {
        this.add.image(larguraJogo/2, alturaJogo/2, 'fundo'); // Adiciona a imagem de fundo ao centro da tela
        this.add.image(larguraJogo/2, alturaJogo/2 -300, 'titulo').setScale(0.8); // Adiciona a imagem do título acima do centro da tela e redimensiona

        this.botaoJogar = this.add.image(larguraJogo/2, alturaJogo/2 +200, 'botaoJogar').setScale(0.8).setInteractive(); // Adiciona a imagem do botão de jogar com interatividade
        this.botaoJogar.on('pointerdown', () => {
            this.scene.start('swimmingScene'); // Inicia a cena de natação ao clicar no botão de jogar
        });

        this.botaoCreditos = this.add.image(larguraJogo/2, alturaJogo/2 +255, 'botaoCreditos').setScale(0.8).setInteractive(); // Adiciona a imagem do botão de créditos com interatividade
        this.botaoCreditos.on('pointerdown', () => {
            this.scene.start('creditosScene'); // Inicia a cena de créditos ao clicar no botão de créditos
        });

        this.botaoControles = this.add.image(larguraJogo - 750, alturaJogo/2 + 305, 'botaoControles').setScale(0.8).setInteractive(); // Adiciona a imagem do botão de controles com interatividade
        this.botaoControles.on('pointerdown', () => {
            this.scene.start('tutorialScene'); // Inicia a cena de controles ao clicar no botão de controles
        });  
    }
}