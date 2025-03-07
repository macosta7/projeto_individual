//classe da fase de natação
class SwimmingScene extends Phaser.Scene {
    //Construtor da cena de natação
    constructor() {
        super({ key: 'swimmingScene' }); // Chave única para identificar a cena
    }

    //Carrega os assets necessários para a cena de natação
    preload() {
        // Carregar imagens do fundo e dos elementos da fase
        this.load.image('marFrente', 'assets/marFrente.png');
        this.load.image('largada', 'assets/largada.png');
        this.load.image('botaoE', 'assets/botaoE.png');
        this.load.image('mar', 'assets/mar.png');
        this.load.image('boiaLateral', 'assets/boiaLateral.png');
        this.load.image('boiaCentro', 'assets/boiaCentro.png');
        this.load.image('largadaTitulo', 'assets/largadaTitulo.png');
        this.load.image('chegadaTitulo', 'assets/chegadaTitulo.png');
        this.load.image('estrela', 'assets/estrela.png');

        // Carregar a sprite sheet do nadador      
        this.load.spritesheet('nadadorPe', 'assets/nadadorPe_sprite.png', { frameWidth: 16, frameHeight: 24 }); 
        this.load.spritesheet('nadador', 'assets/nadadornadando.png', { frameWidth: 24, frameHeight: 23 });
    }

    //Criar os elementos visuais da cena de natação
    create() {

        this.frontMar(); // Inicia a cena inicial

        // Configurar teclas de controle
        this.keys = this.input.keyboard.addKeys('W,A,S,D,E');

        // Criar a animação do nadador (só será usada em upMar)
        this.anims.create({
            key: 'swimming',
            frames: [
                { key: 'nadador', frame: 7 },
                { key: 'nadador', frame: 15 },
                { key: 'nadador', frame: 23 },
                { key: 'nadador', frame: 31 }
            ],
            frameRate: 8,
            repeat: -1
        });
        
        // Criar a animação do nadador na terra (só será usada em frontMar)
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

        // Criar variáveis para armazenar tempos de cada fase
        tempoFrontMar = 0;
        tempoUpMar = 0;
        tempoInicio = this.time.now; // Iniciar tempo da fase frontMar

        // Criar contador de estrelas
        estrelasSwimming = 0;
        this.estrelaContador = this.add.text(20, 20, `Estrelas: ${estrelasSwimming}`, {
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

         // Variável de controle para saber se o nadador pode pressionar "E"
         this.podePressionarE = false;
    }

    //Atualiza a cena de natação
    update() {
        // Atualizar tempo decorrido na fase atual
        let tempoDecorrido = Math.floor((this.time.now - this.tempoInicio) / 1000);
        this.tempoTexto.setText(`Tempo: ${tempoDecorrido}s`);

        // Movimentação do nadador em terra
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

        // Se o nadador está sobre o botaoE, permitir a transição ao pressionar E
        if (this.podePressionarE && Phaser.Input.Keyboard.JustDown(this.keys.E)) {
            tempoFrontMar = tempoDecorrido; // Armazenar tempo gasto em frontMar
            this.upMar();
        }

        // Movimentação do nadador na água (depois que upMar() for chamado)
        if (this.nadador) {
            let moving = false;

            if (this.keys.W.isDown) {
                this.nadador.setVelocityY(-150);
                this.nadador.setAngle(0);
                moving = true;
            } else if (this.keys.S.isDown) {
                this.nadador.setVelocityY(150);
                this.nadador.setAngle(180);
                moving = true;
            } else {
                this.nadador.setVelocityY(0);
            }

            if (this.keys.A.isDown) {
                this.nadador.setVelocityX(-150);
                this.nadador.setAngle(-90);
                moving = true;
            } else if (this.keys.D.isDown) {
                this.nadador.setVelocityX(150);
                this.nadador.setAngle(90);
                moving = true;
            } else {
                this.nadador.setVelocityX(0);
            }

            if (moving) {
                this.nadador.anims.play('swimming', true);
            } else {
                this.nadador.anims.stop();
            }
        }
    }

    // Método para criar a fase inicial da natação
    frontMar() {
        // Criar a imagem de fundo primeiro
        this.marFrenteImage = this.add.image(larguraJogo / 2, alturaJogo / 2, 'marFrente');
        this.largada = this.add.image(larguraJogo - 300, alturaJogo - 200, 'largada');

        // Criar o botão E como objeto de física
        this.botaoE = this.physics.add.image(larguraJogo - 300, alturaJogo - 200, 'botaoE')
            .setScale(0.8)
            .setImmovable(true);

        // Criar o nadador como um sprite de física
        this.nadadorPe = this.physics.add.sprite(larguraJogo - 1200, alturaJogo, 'nadadorPe');
        this.nadadorPe.setCollideWorldBounds(true);
        this.nadadorPe.setScale(10);
        this.nadadorPe.setDepth(1);

        // Iniciar contador de tempo para frontMar()
        this.tempoInicio = this.time.now;

        // Verificar colisão entre o nadador e o botão E
        this.physics.add.collider(this.nadadorPe, this.botaoE, () => {
            this.podePressionarE = true;
        });
    }

    // Método para criar a fase de natação no mar
    upMar() {
        // Remover elementos da fase anterior
        this.marFrenteImage.destroy();
        if (this.nadadorPe) {
            this.nadadorPe.destroy();
            this.nadadorPe = null;
        }
    
        // Adicionar nova imagem de fundo
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'mar');
    
        this.largadaTitulo = this.physics.add.image(larguraJogo - 420, alturaJogo - 100, 'largadaTitulo').setScale(0.8).setImmovable(true);
        this.chegadaTitulo = this.physics.add.image(larguraJogo - 1110, alturaJogo - 100, 'chegadaTitulo').setScale(0.8).setImmovable(true);
        
        // Criar as boias antes do nadador
        this.boiaLateral1 = this.physics.add.image(larguraJogo - 1220, alturaJogo / 2, 'boiaLateral').setScale(0.8).setImmovable(true);
        this.boiaLateral2 = this.physics.add.image(larguraJogo - 300, alturaJogo / 2, 'boiaLateral').setScale(0.8).setImmovable(true);
        this.boiaCentro = this.physics.add.image(larguraJogo / 2, alturaJogo / 2, 'boiaCentro').setScale(0.8).setImmovable(true);
    
        // Criar o nadador na nova fase
        this.nadador = this.physics.add.sprite(larguraJogo - 420, alturaJogo - 200, 'nadador');
        this.nadador.setCollideWorldBounds(true);
        this.nadador.setScale(1.7);
    
        // Adicionar colisões
        this.physics.add.collider(this.nadador, this.boiaLateral1);
        this.physics.add.collider(this.nadador, this.boiaLateral2);
        this.physics.add.collider(this.nadador, this.boiaCentro);
        this.physics.add.collider(this.nadador, this.largadaTitulo);
        this.physics.add.collider(this.nadador, this.chegadaTitulo, this.changeScene, null, this); // Transição de cena
    
        // Adicionar estrelas APÓS o nadador ser criado
        this.addStars();
    
        // Reiniciar o temporizador para upMar
        this.tempoInicio = this.time.now;
    
        // Atualizar contador de tempo na interface
        this.tempoTexto.setText(`Tempo: 0s`);
    }

    // Método para adicionar estrelas ao jogo
    addStars() {
        // Criar um array para armazenar as estrelas
        this.estrelas = [];
    
        // Posições das estrelas
        let posicoes = [
            [larguraJogo - 420, alturaJogo - 400],
            [larguraJogo - 420, alturaJogo - 650],
            [larguraJogo / 2, alturaJogo - 650],
            [larguraJogo - 1110, alturaJogo - 650],
            [larguraJogo - 1110, alturaJogo - 400]
        ];
    
        // Criar as estrelas e adicionar colisão com o nadador
        posicoes.forEach(pos => {
            let estrela = this.physics.add.image(pos[0], pos[1], 'estrela'); // Adiciona a estrela na posição
            this.estrelas.push(estrela); // Adiciona a estrela ao array
            
            // Adiciona a colisão entre o nadador e a estrela
            this.physics.add.overlap(this.nadador, estrela, (nadador, estrelaColetada) => {
                if (estrelaColetada.active) { // Garante que só conta se a estrela ainda estiver ativa
                    estrelaColetada.destroy(); // Remove a estrela
                    estrelasSwimming++; // Incrementa o contador de estrelas
                    this.estrelaContador.setText(`Estrelas: ${estrelasSwimming}`); // Atualiza o texto na tela
                }
            });
        });
    }   
    
    // Método para mudar para a próxima cena quando o nadador colidir com chegadaTitulo
    changeScene() {
        tempoUpMar = Math.floor((this.time.now - this.tempoInicio) / 1000); // Armazena tempo gasto em upMar
        this.scene.start('cycleScene'); // Transição para cycleScene.js
    }
}
