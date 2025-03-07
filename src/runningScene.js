//Classe fase de corrida
class RunningScene extends Phaser.Scene {
    //Construtor da cena de corrida
    constructor() {
        super({ key: 'runningScene'})
    }

    //Carrega os assets necessários para a cena de corrida
    preload() {
        // Carregar imagens
        this.load.image('fundoT2', 'assets/fundoTransicao2.png');
        this.load.image('botaoE', 'assets/botaoE.png');
        this.load.image('tenis', 'assets/tenis.png');
        this.load.image('estrela', 'assets/estrela.png');
        this.load.image('linhaChegadaCorrida', 'assets/linhaChegadaCorrida.png');
        this.load.image('fundoCorrida', 'assets/fundoCorrida.png');
        this.load.image('barreiraCima', 'assets/barreiraCima.png');
        this.load.image('barreiraBaixo', 'assets/barreiraBaixo.png');
        this.load.image('barreiraEsquerda', 'assets/barreiraEsquerda.png');
        this.load.image('barreiraDireita', 'assets/barreiraDireita.png');
        this.load.image('barreiraSuperiorEsquerda', 'assets/barreiraSuperiorEsquerda.png');
        this.load.image('barreiraSuperiorDireita', 'assets/barreiraSuperiorDireita.png');
        this.load.image('barreiraInferiorDireita', 'assets/barreiraInferiorDireita.png');
        this.load.image('barreiraInicio', 'assets/barreiraInicio.png');
        this.load.image('barreiraBaixoCentro', 'assets/barreiraBaixoCentro.png');
        this.load.image('barreiraCimaCentro', 'assets/barreiraCimaCentro.png');
        this.load.image('barreiraEsquerdaCentro', 'assets/barreiraEsquerdaCentro.png');
        this.load.image('barreiraDireitaCentro', 'assets/barreiraDireitaCentro.png');

        // Carregar spritesheets dos personagens
        this.load.spritesheet('ciclista', 'assets/spritesheet_ciclista.png', { frameWidth: 68, frameHeight: 72 });
        this.load.spritesheet('corredor', 'assets/spritesheet_corredor.png', { frameWidth: 77, frameHeight: 70 });
    }

    //Cria os elementos visuais da cena de corrida
    create() {
        // Adicionar elementos visuais da fase de transição2()
        this.transicao2();

        // Criar teclas de controle
        this.keys = this.input.keyboard.addKeys('W,A,S,D,E');

        // Criar animações do ciclista
        this.anims.create({
            key: 'pedalar_esquerda',
            frames: this.anims.generateFrameNumbers('ciclista', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'pedalar_direita',
            frames: this.anims.generateFrameNumbers('ciclista', { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'correr_tras',
            frames: this.anims.generateFrameNumbers('corredor', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'correr_frente',
            frames: this.anims.generateFrameNumbers('corredor', { start: 20, end: 29 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'correr_esquerda',
            frames: this.anims.generateFrameNumbers('corredor', { start: 10, end: 19 }),
            frameRate: 8,
            repeat: -1
        });


        // Criar variáveis para armazenar tempos de cada fase
        tempoTransicao2 = 0;
        tempoRunning = 0;
        tempoInicio = this.time.now; // Iniciar tempo da fase transicao2()

        // Criar contador de estrelas
        estrelasRunning = 0;
        this.estrelaContador = this.add.text(20, 20, `Estrelas: ${estrelasRunning}`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Criar contador de tempo
        this.tempoTexto = this.add.text(20, 50, `Tempo: 0s`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Criar variáveis para armazenar os elementos da fase
        this.corredor = null;
        this.podePressionarE = false;
    }

    //Atualiza a cena de corrida
    update() {
        // Atualizar tempo decorrido na fase atual
        let tempoDecorrido = Math.floor((this.time.now - tempoInicio) / 1000);
        this.tempoTexto.setText(`Tempo: ${tempoDecorrido}s`); // Atualizar contador de tempo na interface

        // Verificar se o jogador pode pressionar a tecla E
        if (this.podePressionarE && Phaser.Input.Keyboard.JustDown(this.keys.E)) {
            tempoTransicao2 = tempoDecorrido; // Armazenar tempo gasto em transicao2()
            this.running(); // Transição para running()
        }

        // Controle do ciclista
        if (this.ciclista) {
            let moving = false;
        
            if (this.keys.A.isDown) {
                this.ciclista.setVelocityX(-250);
                this.ciclista.anims.play('pedalar_esquerda', true);
                moving = true;
            } else if (this.keys.D.isDown) {
                this.ciclista.setVelocityX(250);
                this.ciclista.anims.play('pedalar_direita', true);
                moving = true;
            } else {
                this.ciclista.setVelocityX(0);
            }
        
            if (!moving) {
                this.ciclista.anims.stop();
            }
        }

        // Controle do corredor
        if (this.corredor) {
            let moving = false;

            if (this.keys.W.isDown) {
                this.corredor.setVelocityY(-200);
                this.corredor.anims.play('correr_tras', true);
                moving = true;
            } else if (this.keys.S.isDown) {
                this.corredor.setVelocityY(200);
                this.corredor.anims.play('correr_frente', true);
                moving = true;
            } else {
                this.corredor.setVelocityY(0);
            }    
            
            if (this.keys.A.isDown) {
                this.corredor.setVelocityX(-200);
                this.corredor.anims.play('correr_esquerda', true);
                this.corredor.setFlipX(false);
                moving = true;
            } else if (this.keys.D.isDown) {
                this.corredor.setVelocityX(200);
                this.corredor.anims.play('correr_esquerda', true);
                this.corredor.setFlipX(true);
                moving = true;
            } else {
                this.corredor.setVelocityX(0);
            }    

            if (!moving) {
                this.corredor.anims.stop();
            }
        }
    }

    // Adiciona elementos visuais da fase de transição2()
    transicao2() {
        // Adicionar elementos visuais da fase de transição2()
        this.fundoT2 = this.add.image(larguraJogo / 2, alturaJogo / 2, 'fundoT2');
        this.botaoE = this.add.image(larguraJogo - 300, alturaJogo - 300, 'botaoE').setScale(0.8);
        this.tenis = this.physics.add.image(larguraJogo - 300, alturaJogo - 150, 'tenis').setScale(0.5).setImmovable(true);

        // Criar ciclista com física
        this.ciclista = this.physics.add.sprite(larguraJogo - 1200, alturaJogo - 150, 'ciclista'); 
        this.ciclista.setCollideWorldBounds(true);
        this.ciclista.setScale(2.5);

        // Iniciar contador de tempo para transicao1()
        tempoInicio = this.time.now;

        // Colisão entre o ciclista e o tênis
        this.physics.add.collider(this.ciclista, this.tenis, () => {
            this.podePressionarE = true;
        });
    }

    // Adiciona elementos visuais da fase de corrida
    running() {
        // Remover elementos da fase anterior
        this.fundoT2.destroy();
        this.botaoE.destroy();
        this.tenis.destroy();
        if (this.ciclista) {
            this.ciclista.destroy();
            this.ciclista = null;
        }

        // Adicionar fundo da fase de corrida
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'fundoCorrida').setScale(0.8);

        // Criar linha de chegada como um objeto de física
        this.linhaChegada = this.physics.add.staticImage(larguraJogo - 1110, alturaJogo /2, 'linhaChegadaCorrida').setScale(0.8).setImmovable(true).setVisible(true);
        this.barreiraInicio = this.physics.add.staticImage(larguraJogo - 1220, alturaJogo - 150, 'barreiraInicio').setImmovable(true).setVisible(false);

        // Adicionar barreiras
        this.barreiraCima = this.physics.add.staticImage(larguraJogo /2, alturaJogo - 660, 'barreiraCima').setImmovable(true).setVisible(false);
        this.barreiraBaixo = this.physics.add.staticImage(larguraJogo /2, alturaJogo - 70, 'barreiraBaixo').setImmovable(true).setVisible(false);
        this.barreiraEsquerda = this.physics.add.staticImage(larguraJogo - 1200, alturaJogo - 500, 'barreiraEsquerda').setImmovable(true).setVisible(false);
        this.barreiraDireita = this.physics.add.staticImage(larguraJogo - 300, alturaJogo - 450, 'barreiraDireita').setImmovable(true).setVisible(false);
        this.barreiraSuperiorEsquerda = this.physics.add.staticImage(larguraJogo - 1150, alturaJogo - 620, 'barreiraSuperiorEsquerda').setImmovable(true).setVisible(false);
        this.barreiraSuperiorDireita = this.physics.add.staticImage(larguraJogo - 340, alturaJogo - 620, 'barreiraSuperiorDireita').setImmovable(true).setVisible(false);
        this.barreiraInferiorDireita = this.physics.add.staticImage(larguraJogo - 340, alturaJogo - 120, 'barreiraInferiorDireita').setImmovable(true).setVisible(false);
        this.barreiraBaixoCentro = this.physics.add.staticImage(larguraJogo /2, alturaJogo - 240, 'barreiraBaixoCentro').setScale(0.5).setImmovable(true).setVisible(false);
        this.barreiraCimaCentro = this.physics.add.staticImage(larguraJogo /2, alturaJogo - 510, 'barreiraCimaCentro').setScale(0.8).setImmovable(true).setVisible(false);
        this.barreiraEsquerdaCentro = this.physics.add.staticImage(larguraJogo - 1000, alturaJogo - 380, 'barreiraEsquerdaCentro').setScale(0.8).setImmovable(true).setVisible(false);
        this.barreiraDireitaCentro = this.physics.add.staticImage(larguraJogo - 500, alturaJogo - 380, 'barreiraDireitaCentro').setScale(0.8).setImmovable(true).setVisible(false);

        // Criar corredor com física
        this.corredor = this.physics.add.sprite(larguraJogo - 1040, alturaJogo - 150, 'corredor'); 
        this.corredor.setCollideWorldBounds(true);
        this.corredor.setScale(0.8);

        // Adicionar colisões
        this.physics.add.collider(this.corredor, this.barreiraCima);
        this.physics.add.collider(this.corredor, this.barreiraBaixo);
        this.physics.add.collider(this.corredor, this.barreiraEsquerda);
        this.physics.add.collider(this.corredor, this.barreiraDireita);
        this.physics.add.collider(this.corredor, this.barreiraSuperiorEsquerda);
        this.physics.add.collider(this.corredor, this.barreiraSuperiorDireita);
        this.physics.add.collider(this.corredor, this.barreiraInferiorDireita);
        this.physics.add.collider(this.corredor, this.barreiraInicio);
        this.physics.add.collider(this.corredor, this.barreiraBaixoCentro);
        this.physics.add.collider(this.corredor, this.barreiraCimaCentro);
        this.physics.add.collider(this.corredor, this.barreiraEsquerdaCentro);
        this.physics.add.collider(this.corredor, this.barreiraDireitaCentro);
        this.physics.add.collider(this.corredor, this.linhaChegada, this.changeScene, null, this);
        
        // Adicionar estrelas
        this.addStars();

        // Reiniciar o temporizador para running()
        this.tempoInicio = this.time.now;

        // Atualizar contador de tempo na interface
        this.tempoTexto.setText(`Tempo: 0s`);
    }

    // Adiciona estrelas na fase de corrida
    addStars() {
        // Adicionar estrelas
        this.estrelas = [];
    
        // Posições das estrelas
        let posicoes = [
            [larguraJogo - 430, alturaJogo - 530],
            [larguraJogo - 430, alturaJogo - 200],
            [larguraJogo / 2, alturaJogo - 600],
            [larguraJogo - 1100, alturaJogo - 480],
            [larguraJogo - 900, alturaJogo - 170]
        ];
    
        // Criar estrelas
        posicoes.forEach(pos => {
            let estrela = this.physics.add.image(pos[0], pos[1], 'estrela'); // Adiciona estrela na posição
            this.estrelas.push(estrela); // Adiciona estrela ao array de estrelas
    
            this.physics.add.overlap(this.corredor, estrela, (corredor, estrelaColetada) => { // Verifica colisão entre corredor e estrela
                if (estrelaColetada.active) { // Garante que só conta se a estrela ainda estiver ativa
                    estrelaColetada.destroy(); // Remove a estrela
                    estrelasRunning++; // Incrementa o contador de estrelas
                    this.estrelaContador.setText(`Estrelas: ${estrelasRunning}`); // Atualiza o contador de estrelas na interface
                }
            });
        });
    } 
    
    // Transição para a cena de parabens
    changeScene() {
        tempoRunning = Math.floor((this.time.now - this.tempoInicio) / 1000); // Armazena tempo gasto em cycling
        this.scene.start('congratulationScene'); // Transição para runningScene.js
    }
}