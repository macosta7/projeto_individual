//Classe da fase de ciclismo
class CycleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'cycleScene' }); // Define a chave da cena
    }

    preload() {
        // Carrega todas as imagens e spritesheets necessárias para a cena
        this.load.image('fundoT1', 'assets/fundoT1.png');
        this.load.image('bicicleta', 'assets/bicicleta.png');
        this.load.image('botaoE', 'assets/botaoE.png');
        this.load.image('fundoCiclismo', 'assets/fundoCiclismo.png');
        this.load.image('linhaChegada', 'assets/linhaChegada.png');
        this.load.image('barreiraLinhaChegada', 'assets/barreiraLinhaChegada.png');
        this.load.image('estrela', 'assets/estrela.png');
        this.load.image('barreiraDentro', 'assets/barreiraDentro.png');
        this.load.image('barreiraFora', 'assets/barreiraFora.png');
        this.load.image('barreiraCentro', 'assets/barreiraCentro.png');
        this.load.image('barreiraCimaDireita', 'assets/barreiraCimaDireita.png');
        this.load.image('barreiraCimaEsquerda', 'assets/barreiraCimaEsquerda.png');
        this.load.image('barreiraBaixoDireita', 'assets/barreiraBaixoEsquerda.png');
        this.load.image('barreiraBaixoEsquerda', 'assets/barreiraBaixoEsquerda.png');
        this.load.image('barreiraBaixoCentroDireitaFora', 'assets/barreiraBaixoCentroDireitaFora.png');  
        this.load.image('barreiraBaixoCentroDoEsquerdaFora', 'assets/barreiraCimaCentroEsquerdaFora.png');    
        this.load.image('barreiraBaixoCentroEsquerdaFora', 'assets/barreiraBaixoCentroEsquerdaFora.png');    
        this.load.image('barreiraBaixoCentroMeioFora', 'assets/barreiraBaixoCentroMeioFora.png');
        this.load.image('barreiraBaixoDireitaFora', 'assets/barreiraBaixoDireitaFora.png');
        this.load.image('barreiraBaixoEsquerdaFora', 'assets/barreiraBaixoEsquerdaFora.png');
        this.load.image('barreiraCentroDireitaFora', 'assets/barreiraCentroDireitaFora.png');
        this.load.image('barreiraCimaCentroDireitaFora', 'assets/barreiraCimaCentroDireitaFora.png');
        this.load.image('barreiraCimaCentroEsquerdaFora', 'assets/barreiraCimaCentroEsquerdaFora.png');
        this.load.image('barreiraCimaDireitaFora', 'assets/barreiraCimaDireitaFora.png');
        this.load.image('barreiraCimaEsquerdaFora', 'assets/barreiraCimaEsquerdaFora.png');

        // Carrega a spritesheet do ciclista e do nadador
        this.load.spritesheet('ciclista', 'assets/spritesheet_ciclista.png', { frameWidth: 68, frameHeight: 72 });
        this.load.spritesheet('nadadorPe', 'assets/nadadorPe_sprite.png', { frameWidth: 16, frameHeight: 24 }); 
    }

    // Função que cria os elementos visuais da cena
    create() {
        // Inicia a transição 1
        this.transicao1();

        // Adiciona teclas de controle
        this.keys = this.input.keyboard.addKeys('W,A,S,D,E');

        // Cria animação de caminhada do nadador
        this.anims.create({
            key: 'walking',
            frames: [
                { key: 'nadadorPe', frame: 5 },
                { key: 'nadadorPe', frame: 13 },
                { key: 'nadadorPe', frame: 21 },
            ],
            frameRate: 8,
            repeat: -1
        });

        // Cria animações do ciclista
        this.anims.create({
            key: 'pedalar_frente',
            frames: this.anims.generateFrameNumbers('ciclista', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

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
            key: 'pedalar_tras',
            frames: this.anims.generateFrameNumbers('ciclista', { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        // Inicializa variáveis de tempo e contador de estrelas
        tempoTransicao1 = 0;
        tempoCycling = 0;
        tempoInicio = this.time.now; // Inicia o tempo da fase

        // Cria contador de estrelas
        estrelasCycling = 0;
        this.estrelaContador = this.add.text(20, 20, `Estrelas: ${estrelasCycling}`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Cria contador de tempo
        this.tempoTexto = this.add.text(20, 50, `Tempo: 0s`, {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setDepth(10);

        // Inicializa variáveis do ciclista e controle de botão
        this.ciclista = null;
        this.podePressionarE = false;
    }

    // Função que atualiza a cena
    update() {
        // Atualiza o tempo decorrido na fase atual
        let tempoDecorrido = Math.floor((this.time.now - tempoInicio) / 1000);
        this.tempoTexto.setText(`Tempo: ${tempoDecorrido}s`);

        // Movimentação do nadador na transição
        if (this.nadadorPe) {
            if (this.keys.A.isDown) {
                this.nadadorPe.setVelocityX(-250);
                this.nadadorPe.anims.play('walking', true);
                this.nadadorPe.setFlipX(true);
            } else if (this.keys.D.isDown) {
                this.nadadorPe.setVelocityX(250);
                this.nadadorPe.anims.play('walking', true);
                this.nadadorPe.setFlipX(false);
            } else {
                this.nadadorPe.setVelocityX(0);
                this.nadadorPe.anims.stop();
            }
        }

        // Verifica se o botão E foi pressionado para iniciar a fase de ciclismo
        if (this.podePressionarE && Phaser.Input.Keyboard.JustDown(this.keys.E)) {
            tempoTransicao1 = tempoDecorrido; // Armazena o tempo gasto na transição
            this.cycling();
        }
        
        // Movimentação do ciclista
        if (this.ciclista) {
            let moving = false;
        
            if (this.keys.W.isDown) {
                this.ciclista.setVelocityY(-200);
                this.ciclista.anims.play('pedalar_tras', true);
                moving = true;
            } else if (this.keys.S.isDown) {
                this.ciclista.setVelocityY(200);
                this.ciclista.anims.play('pedalar_frente', true);
                moving = true;
            } else {
                this.ciclista.setVelocityY(0);
            }
        
            if (this.keys.A.isDown) {
                this.ciclista.setVelocityX(-200);
                this.ciclista.anims.play('pedalar_esquerda', true);
                moving = true;
            } else if (this.keys.D.isDown) {
                this.ciclista.setVelocityX(200);
                this.ciclista.anims.play('pedalar_direita', true);
                moving = true;
            } else {
                this.ciclista.setVelocityX(0);
            }
        
            if (!moving) {
                this.ciclista.anims.stop();
            }
        }
    }       
    
    // Função que cria a transição 1
    transicao1() {
        // Adicionar elementos visuais da transição 1
        this.fundoT1 = this.add.image(larguraJogo / 2, alturaJogo / 2, 'fundoT1');
        this.botaoE = this.add.image(larguraJogo - 300, alturaJogo - 300, 'botaoE').setScale(0.8);
        this.bicicleta = this.physics.add.image(larguraJogo - 300, alturaJogo - 150, 'bicicleta').setScale(0.8).setImmovable(true);

        // Criar nadador com física
        this.nadadorPe = this.physics.add.sprite(larguraJogo - 1200, alturaJogo - 150, 'nadadorPe').setScale(1.2);
        this.nadadorPe.setCollideWorldBounds(true);
        this.nadadorPe.setScale(10);
        this.nadadorPe.setDepth(1);

        // Iniciar contador de tempo para transicao1()
        tempoInicio = this.time.now;

        // Adicionar colisão entre o nadador e a bicicleta
        this.physics.add.collider(this.nadadorPe, this.bicicleta, () => {
            this.podePressionarE = true;
        });
    }

    // Função que cria a fase de ciclismo
    cycling() {
        // Remover elementos da fase anterior
        this.fundoT1.destroy();
        this.botaoE.destroy();
        this.bicicleta.destroy();
        if (this.nadadorPe) {
            this.nadadorPe.destroy();
            this.nadadorPe = null;
        }
    
        // Adicionar fundo da fase de ciclismo
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'fundoCiclismo').setScale(0.8);
    
        // Criar linha de chegada como um objeto de física
        this.linhaChegada = this.physics.add.staticImage(larguraJogo - 900, alturaJogo - 645, 'linhaChegada');
        this.barreiraLinhaChegada = this.physics.add.staticImage(larguraJogo - 980, alturaJogo - 645, 'barreiraLinhaChegada').setImmovable(true).setVisible(false);

        //Criar barreiras de dentro da pista
        this.barreiraCentro = this.physics.add.image(larguraJogo - 820, alturaJogo - 400, 'barreiraCentro').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraCimaDireita = this.physics.add.image(larguraJogo - 650, alturaJogo - 600, 'barreiraCimaDireita').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraCimaEsquerda = this.physics.add.image(larguraJogo - 1000, alturaJogo - 550, 'barreiraCimaEsquerda').setImmovable(true).setScale(0.5).setVisible(false);
        this.barreiraBaixoDireita = this.physics.add.image(larguraJogo - 620, alturaJogo - 240, 'barreiraBaixoDireita').setImmovable(true).setScale(0.4).setVisible(false);
        this.barreiraBaixoEsquerda = this.physics.add.image(larguraJogo - 960, alturaJogo - 220, 'barreiraBaixoEsquerda').setImmovable(true).setScale(0.8).setVisible(false);

        //Criar barreiras de fora da pista
        this.barreiraBaixoCentroDireitaFora = this.physics.add.image(larguraJogo - 400, alturaJogo - 270, 'barreiraBaixoCentroDireitaFora').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraBaixoCentroDoEsquerdaFora = this.physics.add.image(larguraJogo - 1175, alturaJogo - 280, 'barreiraBaixoCentroDoEsquerdaFora').setImmovable(true).setScale(1).setVisible(false);
        this.barreiraBaixoCentroEsquerdaFora = this.physics.add.image(larguraJogo - 770, alturaJogo - 70, 'barreiraCimaCentroEsquerdaFora').setImmovable(true).setScale(0.6).setVisible(false);
        this.barreiraBaixoCentroMeioFora = this.physics.add.image(larguraJogo/2, alturaJogo - 120, 'barreiraBaixoCentroMeioFora').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraBaixoDireitaFora = this.physics.add.image(larguraJogo - 550, alturaJogo - 50, 'barreiraBaixoDireitaFora').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraBaixoEsquerdaFora = this.physics.add.image(larguraJogo - 1100, alturaJogo - 30, 'barreiraCimaEsquerdaFora').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraCentroDireitaFora = this.physics.add.image(larguraJogo - 530, alturaJogo - 420, 'barreiraCentroDireitaFora').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraCimaCentroDireitaFora = this.physics.add.image(larguraJogo - 340, alturaJogo - 600, 'barreiraCimaCentroDireitaFora').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraCimaCentroEsquerdaFora = this.physics.add.image(larguraJogo - 1220, alturaJogo - 580, 'barreiraCimaCentroEsquerdaFora').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraCimaDireitaFora = this.physics.add.image(larguraJogo - 630, alturaJogo - 750, 'barreiraCimaDireitaFora').setImmovable(true).setScale(0.8).setVisible(false);
        this.barreiraCimaEsquerdaFora = this.physics.add.image(larguraJogo - 1080, alturaJogo - 720, 'barreiraCimaEsquerdaFora').setImmovable(true).setScale(0.8).setVisible(false);
    
        // Criar ciclista com física
        this.ciclista = this.physics.add.sprite(larguraJogo - 1040, alturaJogo - 650, 'ciclista'); 
        this.ciclista.setCollideWorldBounds(true);
        this.ciclista.setScale(1.2);
    
        // Adicionar colisão com barreiras
        this.physics.add.collider(this.ciclista, this.barreiraCentro);
        this.physics.add.collider(this.ciclista, this.barreiraCimaDireita);
        this.physics.add.collider(this.ciclista, this.barreiraCimaEsquerda);
        this.physics.add.collider(this.ciclista, this.barreiraBaixoDireita);
        this.physics.add.collider(this.ciclista, this.barreiraBaixoEsquerda);
        this.physics.add.collider(this.ciclista, this.barreiraBaixoCentroDireitaFora);
        this.physics.add.collider(this.ciclista, this.barreiraBaixoCentroDoEsquerdaFora);
        this.physics.add.collider(this.ciclista, this.barreiraBaixoCentroEsquerdaFora);
        this.physics.add.collider(this.ciclista, this.barreiraBaixoCentroMeioFora);
        this.physics.add.collider(this.ciclista, this.barreiraBaixoDireitaFora);
        this.physics.add.collider(this.ciclista, this.barreiraBaixoEsquerdaFora);
        this.physics.add.collider(this.ciclista, this.barreiraCentroDireitaFora);
        this.physics.add.collider(this.ciclista, this.barreiraCimaCentroDireitaFora);
        this.physics.add.collider(this.ciclista, this.barreiraCimaCentroEsquerdaFora);
        this.physics.add.collider(this.ciclista, this.barreiraCimaDireitaFora);
        this.physics.add.collider(this.ciclista, this.barreiraCimaEsquerdaFora);
        this.physics.add.collider(this.ciclista, this.barreiraLinhaChegada);
        this.physics.add.collider(this.ciclista, this.linhaChegada, this.changeScene, null, this);
        
        // Adicionar estrelas
        this.addStars();

        // Reiniciar o temporizador para cycling()
        this.tempoInicio = this.time.now;

        // Atualizar contador de tempo na interface
        this.tempoTexto.setText(`Tempo: 0s`);
    }    

    // Função que adiciona estrelas na fase de ciclismo
    addStars() {
        // Adiciona estrelas em posições específicas
        this.estrelas = [];
    
        // Posições das estrelas
        let posicoes = [
            [larguraJogo - 540, alturaJogo - 510],
            [larguraJogo - 510, alturaJogo - 250],
            [larguraJogo / 2, alturaJogo - 690],
            [larguraJogo - 1050, alturaJogo - 330],
            [larguraJogo - 900, alturaJogo - 70]
        ];
        
        // Adiciona as estrelas e verifica colisão com o ciclista
        posicoes.forEach(pos => {
            let estrela = this.physics.add.image(pos[0], pos[1], 'estrela'); // Adiciona a estrela na posição
            this.estrelas.push(estrela); // Adiciona a estrela ao array de estrelas
    
            // Verifica colisão com o ciclista
            this.physics.add.overlap(this.ciclista, estrela, (ciclista, estrelaColetada) => {
                if (estrelaColetada.active) { // Garante que só conta se a estrela ainda estiver ativa
                    estrelaColetada.destroy(); // Remove a estrela
                    estrelasCycling++; // Incrementa o contador de estrelas
                    this.estrelaContador.setText(`Estrelas: ${estrelasCycling}`); // Atualiza o texto na interface
                }
            });
        });
    }
    
    // Função que muda a cena para a próxima fase
    changeScene() {
        tempoCycling = Math.floor((this.time.now - this.tempoInicio) / 1000); // Armazena tempo gasto em cycling
        this.scene.start('runningScene'); // Transição para runningScene.js
    }
    
}
