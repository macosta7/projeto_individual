///Classe da fase de parabens
class CongratulationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'congratulationScene'}) // Define a chave da cena como 'congratulationScene'
    }

    // Carrega os assets necessários para a cena de parabens
    preload() {
        this.load.image('fundoCongratulation', 'assets/fundoCongratulation.png'); // Carrega a imagem de fundo da cena de congratulação
        this.load.image('botaoJogarNovamente', 'assets/botaoJogarNovamente.png'); // Carrega a imagem do botão de jogar novamente
    }

    // Cria os elementos visuais da cena de parabens
    create() {
        this.add.image(larguraJogo/2, alturaJogo/2, 'fundoCongratulation'); // Adiciona a imagem de fundo na posição central da tela

        // Adiciona o texto que mostra a quantidade de estrelas coletadas
        this.estrelaContador = this.add.text(larguraJogo - 880, alturaJogo - 250, `Estrelas Coletadas: ${estrelasSwimming + estrelasCycling + estrelasRunning}`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Adiciona o texto que mostra o tempo da largada
        this.tempoTextoLargada = this.add.text(larguraJogo - 1020, alturaJogo - 200, `Tempo largada: ${tempoFrontMar}s`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Adiciona o texto que mostra o tempo da natação
        this.tempoTextoSwimming = this.add.text(larguraJogo - 1020, alturaJogo - 170, `Tempo natação: ${tempoUpMar}s`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Adiciona o texto que mostra o tempo da primeira transição
        this.tempoTextoTransicao1 = this.add.text(larguraJogo - 1020, alturaJogo - 140, `Tempo transição1: ${tempoTransicao1}s`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Adiciona o texto que mostra o tempo do ciclismo
        this.tempoTextoCycling = this.add.text(larguraJogo - 730, alturaJogo - 200, `Tempo pedal: ${tempoCycling}s`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Adiciona o texto que mostra o tempo da segunda transição
        this.tempoTextoTransicao2 = this.add.text(larguraJogo - 730, alturaJogo - 170, `Tempo transição2: ${tempoTransicao2}s`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Adiciona o texto que mostra o tempo da corrida
        this.tempoTextoRunning = this.add.text(larguraJogo - 730, alturaJogo - 140, `Tempo corrida: ${tempoRunning}s`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Adiciona o texto que mostra o tempo total
        this.tempoTextoTotal = this.add.text(larguraJogo - 840, alturaJogo - 90, `Tempo final: ${tempoFrontMar + tempoUpMar + tempoTransicao1 + tempoCycling + tempoTransicao2 + tempoRunning}s`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);
    }

    // Atualiza a cena de parabens
    update() {
        // Adiciona o botão de jogar novamente e define a interação de clique
        this.botaoJogarNovamente = this.add.image(larguraJogo/2, alturaJogo - 300, 'botaoJogarNovamente').setInteractive();
        this.botaoJogarNovamente.on('pointerdown', () => {
            this.scene.start('initialScene'); // Reinicia a cena inicial ao clicar no botão
        });
    }
}