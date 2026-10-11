var MAPONTES_MAPAS = globalThis.MAPONTES_MAPAS || {};
globalThis.MAPONTES_MAPAS = MAPONTES_MAPAS;
MAPONTES_MAPAS.cidade = {
    classes: [0, 1, 2, 1, 0, 2, 1, 0],
    posicoesInimigos: [
            [-9, 0, 4], [-3, 0, 8], [3, 0, 9], [9, 0, 4], [0, 0, 10.5],
            [-8, 0, 10], [7, 0, 8], [0, 0, 5]
        ],
    posicoesPacotes: [[-11, 11.5], [0, 14.5], [11, 11.5]],
    criar({scene, material, BASE_ARQUIVOS}) {
    // Segunda fase: setor urbano abandonado, preparado oculto para a transicao.
    const meshesCidade214 = [];
    const matAsfalto214 = material("matAsfaltoCidade214", "#555653");
    matAsfalto214.specularColor = new BABYLON.Color3(0.025, 0.025, 0.02);
    const texturaAsfalto214 = new BABYLON.Texture(
        BASE_ARQUIVOS + "texturas/asfalto-cidade-abandonada-v1.jpg?v=215",
        scene, false, false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
        () => { matAsfalto214.diffuseColor = BABYLON.Color3.White();
            console.info("MAPONTES FPS ETAPA 215: textura de asfalto carregada"); },
        (erro215) => console.warn("MAPONTES FPS ETAPA 215: textura de asfalto indisponivel", erro215)
    );
    texturaAsfalto214.uScale = 5;
    texturaAsfalto214.vScale = 5;
    texturaAsfalto214.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
    texturaAsfalto214.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
    matAsfalto214.diffuseTexture = texturaAsfalto214;

    const matMuroCidade215 = material("matMuroCidade215", "#80796d");
    matMuroCidade215.specularColor = new BABYLON.Color3(0.025, 0.025, 0.025);
    const texturaMuroCidade215 = new BABYLON.Texture(
        BASE_ARQUIVOS + "texturas/muro-cidade-abandonada-v1.jpg?v=215",
        scene, false, false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
        () => { matMuroCidade215.diffuseColor = BABYLON.Color3.White();
            console.info("MAPONTES FPS ETAPA 215: textura de muro carregada"); },
        (erro215) => console.warn("MAPONTES FPS ETAPA 215: textura de muro indisponivel", erro215)
    );
    texturaMuroCidade215.uScale = 5;
    texturaMuroCidade215.vScale = 1;
    texturaMuroCidade215.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
    texturaMuroCidade215.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
    matMuroCidade215.diffuseTexture = texturaMuroCidade215;

    // ETAPA 218: textura dos predios. A textura cobre 3 m x 3 m e se repete conforme
    // o tamanho de cada face (faceUV). Cada predio mantem um tom proprio (diffuseColor
    // multiplica a textura). Se a imagem nao carregar, ficam as cores escuras antigas.
    const coresReservaPredios218 = ["#625d54", "#706a60", "#514f4b", "#777064"];
    const tonsPredios218 = ["#e6e0d4", "#f0e9db", "#cfc9be", "#f4ecd9"];
    const TAMANHO_TEXTURA_PREDIO218 = 6; // a imagem cobre 6 m x 6 m
    const matPrediosCidade214 = coresReservaPredios218.map((cor214, i214) => {
        const m214 = material("matPredioCidade214_" + i214, cor214);
        m214.specularColor = new BABYLON.Color3(0.025, 0.025, 0.025);
        return m214;
    });
    const texturaPredio218 = new BABYLON.Texture(
        BASE_ARQUIVOS + "texturas/predio-cidade-abandonada-v2.jpg?v=219",
        scene, false, false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
        () => {
            matPrediosCidade214.forEach((m218, i218) => {
                m218.diffuseColor = BABYLON.Color3.FromHexString(tonsPredios218[i218]);
            });
            console.info("MAPONTES FPS ETAPA 218: textura dos predios carregada");
        },
        (erro218) => {
            matPrediosCidade214.forEach(m218 => { m218.diffuseTexture = null; });
            console.warn("MAPONTES FPS ETAPA 218: textura dos predios indisponivel", erro218);
        }
    );
    texturaPredio218.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
    texturaPredio218.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
    matPrediosCidade214.forEach(m218 => { m218.diffuseTexture = texturaPredio218; });
    function faceUVPredio218(largura218, altura218, profundidade218, indice218 = 0) {
        const t218 = TAMANHO_TEXTURA_PREDIO218;
        const rx218 = largura218 / t218;
        const rz218 = profundidade218 / t218;
        const ry218 = altura218 / t218;
        // Deslocamento pseudo-aleatorio fixo por predio e por face.
        const desloc218 = (face218, eixo218) => {
            const v218 = Math.sin((indice218 + 1) * 12.9898 + face218 * 78.233 + eixo218 * 37.719) * 43758.5453;
            return v218 - Math.floor(v218);
        };
        const uv218 = (face218, repU218, repV218) => {
            const ou218 = desloc218(face218, 0), ov218 = desloc218(face218, 1);
            return new BABYLON.Vector4(ou218, ov218, ou218 + repU218, ov218 + repV218);
        };
        return [
            uv218(0, rx218, ry218), uv218(1, rx218, ry218),
            uv218(2, rz218, ry218), uv218(3, rz218, ry218),
            uv218(4, rx218, rz218), uv218(5, rx218, rz218)
        ];
    }
    const matJanelaCidade214 = material("matJanelaCidade214", "#252c2d");
    // ETAPA 219: atlas 1024x512 com duas janelas lado a lado (vidro | tabuas).
    const texturaJanelas219 = new BABYLON.Texture(
        BASE_ARQUIVOS + "texturas/janela-cidade-atlas-v1.png?v=219",
        scene, false, false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
        () => console.info("MAPONTES FPS ETAPA 219: atlas de janelas carregado"),
        (erro219) => {
            console.warn("MAPONTES FPS ETAPA 219: atlas de janelas indisponivel", erro219);
            matJanelaVidro219.diffuseTexture = null;
            matJanelaTabuas219.diffuseTexture = null;
            matJanelaVidro219.diffuseColor = BABYLON.Color3.FromHexString("#252c2d");
            matJanelaTabuas219.diffuseColor = BABYLON.Color3.FromHexString("#4a3a28");
        }
    );
    function materialJanela219(nome219) {
        const m219 = new BABYLON.StandardMaterial(nome219, scene);
        m219.diffuseColor = BABYLON.Color3.White();
        m219.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
        m219.emissiveColor = new BABYLON.Color3(0.10, 0.10, 0.10);
        m219.diffuseTexture = texturaJanelas219;
        return m219;
    }
    const matJanelaVidro219 = materialJanela219("matJanelaVidro219");
    const matJanelaTabuas219 = materialJanela219("matJanelaTabuas219");
    function faceUVJanela219(tapada219) {
        const uv219 = tapada219 ? new BABYLON.Vector4(0.5, 0, 1, 1) : new BABYLON.Vector4(0, 0, 0.5, 1);
        return [uv219, uv219, uv219, uv219, uv219, uv219];
    }
    const matBeiral219 = material("matBeiralCidade219", "#aaa397");
    matBeiral219.specularColor = new BABYLON.Color3(0.02, 0.02, 0.02);
    const matRodape219 = material("matRodapeCidade219", "#7d786d");
    matRodape219.specularColor = new BABYLON.Color3(0.02, 0.02, 0.02);
    const matEscombroCidade214 = material("matEscombroCidade214", "#716c62");
    function caixaCidade214(nome214, x214, y214, z214, largura214, altura214, profundidade214,
        mat214, colisao214 = true, faceUV218 = null) {
        const opcoes214 = {
            width: largura214, height: altura214, depth: profundidade214
        };
        if (faceUV218) opcoes214.faceUV = faceUV218;
        const m214 = BABYLON.MeshBuilder.CreateBox(nome214, opcoes214, scene);
        m214.position.set(x214, y214, z214);
        m214.material = mat214;
        m214.checkCollisions = colisao214;
        m214.isPickable = colisao214;
        m214.freezeWorldMatrix();
        meshesCidade214.push(m214);
        return m214;
    }
    const prediosCidade214 = [
        [-15.2, -12.2, 7.0, 6.2, 6.4], [-15.4, -1.5, 6.6, 8.0, 7.0],
        [-15.1, 10.2, 7.4, 5.6, 6.8], [15.0, -11.5, 7.3, 7.4, 6.6],
        [15.2, 0.0, 6.6, 5.9, 7.0], [15.0, 11.2, 7.5, 8.2, 6.8],
        [-6.8, 16.0, 5.2, 4.1, 7.0], [7.4, 16.0, 6.3, 4.1, 6.4],
        [-8.5, -16.0, 6.0, 4.0, 6.5], [8.2, -16.0, 5.5, 4.0, 7.2]
    ];
    prediosCidade214.forEach((p214, i214) => {
        const [x214, z214, largura214, profundidade214, altura214] = p214;
        caixaCidade214("predioAbandonado214_" + i214, x214, altura214 / 2, z214,
            largura214, altura214, profundidade214, matPrediosCidade214[i214 % matPrediosCidade214.length],
            true, faceUVPredio218(largura214, altura214, profundidade214, i214));
        // ETAPA 219: tres fileiras de janelas com moldura e soleira, voltadas para a rua central.
        // Algumas ficam tapadas com tabuas (padrao fixo por predio, sem sorteio).
        const tapada219 = (linha219, coluna219) => ((i214 * 5 + linha219 * 3 + coluna219 * 7) % 4 === 0);
        const faceZ214 = z214 > 0 ? z214 - profundidade214 / 2 - 0.035 : z214 + profundidade214 / 2 + 0.035;
        for (let linha214 = 0; linha214 < 3; linha214++) {
            for (let coluna214 = 0; coluna214 < 2; coluna214++) {
                const jx214 = x214 - largura214 * 0.23 + coluna214 * largura214 * 0.46;
                const jy214 = 1.55 + linha214 * 1.7;
                const tp219 = tapada219(linha214, coluna214);
                caixaCidade214("janelaPredio214_" + i214 + "_" + linha214 + "_" + coluna214,
                    jx214, jy214, faceZ214, 1.0, 1.15, 0.055,
                    tp219 ? matJanelaTabuas219 : matJanelaVidro219, false, faceUVJanela219(tp219));
            }
        }
        if (Math.abs(x214) > 13) {
            const faceX214 = x214 > 0 ? x214 - largura214 / 2 - 0.035 : x214 + largura214 / 2 + 0.035;
            for (let linha214 = 0; linha214 < 3; linha214++) {
                for (let coluna214 = 0; coluna214 < 2; coluna214++) {
                    const jz214 = z214 - profundidade214 * 0.23 + coluna214 * profundidade214 * 0.46;
                    const tp219 = tapada219(linha214 + 1, coluna214 + 1);
                    caixaCidade214("janelaLateral214_" + i214 + "_" + linha214 + "_" + coluna214,
                        faceX214, 1.55 + linha214 * 1.7, jz214, 0.055, 1.15, 1.0,
                        tp219 ? matJanelaTabuas219 : matJanelaVidro219, false, faceUVJanela219(tp219));
                }
            }
        }
        // Beiral no topo e rodape na base: so visuais (sem colisao), quebram o aspecto de caixa lisa.
        caixaCidade214("beiralPredio219_" + i214, x214, altura214 - 0.04, z214,
            largura214 + 0.36, 0.32, profundidade214 + 0.36, matBeiral219, false);
        caixaCidade214("rodapePredio219_" + i214, x214, 0.275, z214,
            largura214 + 0.14, 0.55, profundidade214 + 0.14, matRodape219, false);
        // Ruina baixa no pe de algumas fachadas para quebrar as linhas perfeitas.
        if (i214 % 2 === 0) {
            caixaCidade214("escombroFachada214_" + i214,
                x214 + (i214 % 3 - 1) * 1.35, 0.32, z214 + profundidade214 / 2 + 0.72,
                2.1, 0.64, 0.85, matEscombroCidade214);
        }
    });
    // Barreiras e entulho no corredor urbano deixam coberturas, mantendo ruas livres.
    [[-6.2, -5.4, 2.8, 1.0, 0.8], [6.0, 2.4, 2.6, 0.85, 0.75],
     [-7.0, 7.5, 2.3, 0.7, 0.7], [7.0, -9.3, 2.5, 0.9, 0.8]].forEach((p214, i214) => {
        caixaCidade214("entulhoUrbano214_" + i214, p214[0], p214[3] / 2, p214[1],
            p214[2], p214[3], p214[4], matEscombroCidade214);
    });
    // ETAPA 222: sinalizacao urbana gasta para dar escala e leitura a rua.
    // Os elementos sao visuais, sem colisao, e so ficam ativos na segunda fase.
    const matFaixaRua222 = material("matFaixaRua222", "#b2a982");
    matFaixaRua222.specularColor = new BABYLON.Color3(0.015, 0.015, 0.012);
    matFaixaRua222.emissiveColor = new BABYLON.Color3(0.035, 0.032, 0.022);
    const matMeioFio222 = material("matMeioFio222", "#77766d");
    matMeioFio222.specularColor = new BABYLON.Color3(0.015, 0.015, 0.015);
    // Linha central interrompida: desgaste e espacamento irregular evitam aspecto novo.
    for (let i222 = 0; i222 < 9; i222++) {
        const z222 = -16 + i222 * 3.8;
        const largura222 = i222 % 3 === 1 ? 0.07 : 0.10;
        caixaCidade214("faixaCentralCidade222_" + i222, 0, 0.018, z222,
            largura222, 0.012, i222 % 2 === 0 ? 1.15 : 0.82,
            matFaixaRua222, false);
    }
    // Meio-fio baixo acompanha os dois lados da via, sem bloquear a movimentacao.
    for (let lado222 of [-1, 1]) {
        for (let trecho222 = 0; trecho222 < 8; trecho222++) {
            const z222 = -15.5 + trecho222 * 4.4;
            caixaCidade214("meioFioCidade222_" + lado222 + "_" + trecho222,
                lado222 * 10.85, 0.065, z222, 0.22, 0.13, 3.9,
                matMeioFio222, false);
        }
    }

    // Muros externos texturizados e sólidos delimitam o mapa urbano.
    [
        [0, 1.5, -19.7, 39.4, 3, 0.6], [0, 1.5, 19.7, 39.4, 3, 0.6],
        [-19.7, 1.5, 0, 0.6, 3, 39.4], [19.7, 1.5, 0, 0.6, 3, 39.4]
    ].forEach((p214, i214) => {
        const limite214 = BABYLON.MeshBuilder.CreateBox("limiteCidade214_" + i214, {
            width: p214[3], height: p214[4], depth: p214[5]
        }, scene);
        limite214.position.set(p214[0], p214[1], p214[2]);
        limite214.material = matMuroCidade215;
        limite214.visibility = 1;
        limite214.isPickable = true;
        limite214.checkCollisions = true;
        limite214.freezeWorldMatrix();
        meshesCidade214.push(limite214);
    });
    meshesCidade214.forEach(m214 => m214.setEnabled(false));

        return {meshesCidade214, matAsfalto214, prediosCidade214};
    }
};
