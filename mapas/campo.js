var MAPONTES_MAPAS = globalThis.MAPONTES_MAPAS || {};
globalThis.MAPONTES_MAPAS = MAPONTES_MAPAS;
MAPONTES_MAPAS.campo = {
    quantidadeInimigos: 5,
    criar({scene, matCaixa, matBarreira, matMuro, matMuroPlataforma, matMuroLateralNovo}) {
    const mapaBaseMeshes214 = [];
    function bloco(nome, x, z, l, a, p, mat) {
        const ehConteiner = mat === matCaixa;
        const alturaFinal = ehConteiner ? 2.2 : a;
        const larguraFinal = ehConteiner ? 2.2 : l;
        const comprimentoFinal = ehConteiner ? 4.4 : p;
        const mesh = BABYLON.MeshBuilder.CreateBox(
            nome,
            {
                width: ehConteiner ? comprimentoFinal : larguraFinal,
                height: alturaFinal,
                depth: ehConteiner ? larguraFinal : comprimentoFinal
            },
            scene
        );
        mesh.position.set(x, alturaFinal / 2, z);
        mesh.material = mat;
        mesh.checkCollisions = true;
        mapaBaseMeshes214.push(mesh);
        if (ehConteiner) {
            mesh.metadata = Object.assign({}, mesh.metadata, {
                ehConteiner: true, temBarreiraSolida: true
            });
            mesh.subMeshes = [];
            for (let face = 0; face < 6; face++) {
                new BABYLON.SubMesh(face, face * 4, 4, face * 6, 6, mesh);
            }
            // Colisor independente e um pouco maior que a malha texturizada:
            // mantém os contêineres sólidos mesmo se a textura tiver faces finas.
            const barreiraSolida = BABYLON.MeshBuilder.CreateBox(
                nome + "_barreiraSolida",
                {
                    width: comprimentoFinal + 0.12,
                    height: alturaFinal + 0.04,
                    depth: larguraFinal + 0.12
                },
                scene
            );
            barreiraSolida.position.copyFrom(mesh.position);
            barreiraSolida.checkCollisions = true;
            barreiraSolida.isPickable = false;
            barreiraSolida.visibility = 0;
            barreiraSolida.metadata = { ehConteiner: true, colisorSolidoConteiner: true };
            barreiraSolida.freezeWorldMatrix();
            mapaBaseMeshes214.push(barreiraSolida);
        }
        mesh.freezeWorldMatrix();
        return mesh;
    }

    bloco("caixa1", -4, 0, 2, 2, 2, matCaixa);
    bloco("caixa2", 4, 3, 2, 3, 2, matCaixa);
    bloco("caixa3", 0, 8, 3, 2, 2, matCaixa);
    bloco("coberturaE", -3, -7, 2.5, 2.2, 1.3, matCaixa);
    bloco("coberturaD", 3, -7, 2.5, 2.2, 1.3, matCaixa);

    bloco("barreiraBaixa", 0, -6, 2.8, 1.35, 0.6, matBarreira);

    const ALTURA_MURO_169 = 1.2; // libera a vista externa sem remover a barreira
    function muroTexturizado(nome, x, z, largura, altura, profundidade) {
        const repeticoesX = Math.max(1, largura / 6);
        const repeticoesZ = Math.max(1, profundidade / 6);
        const repeticoesY = Math.max(1, altura / 3);
        const faceUV = [
            new BABYLON.Vector4(0, 0, repeticoesX, repeticoesY),
            new BABYLON.Vector4(0, 0, repeticoesX, repeticoesY),
            new BABYLON.Vector4(0, 0, repeticoesZ, repeticoesY),
            new BABYLON.Vector4(0, 0, repeticoesZ, repeticoesY),
            new BABYLON.Vector4(0, 0, repeticoesX, repeticoesZ),
            new BABYLON.Vector4(0, 0, repeticoesX, repeticoesZ)
        ];
        const mesh = BABYLON.MeshBuilder.CreateBox(nome, {
            width: largura, height: altura, depth: profundidade, faceUV
        }, scene);
        mesh.position.set(x, altura / 2, z);
        mesh.material = matMuro;
        mesh.checkCollisions = true;
        mesh.freezeWorldMatrix();
        mapaBaseMeshes214.push(mesh);
        return mesh;
    }
    muroTexturizado("muroFundo", 0, 20, 40, ALTURA_MURO_169, 1);
    muroTexturizado("muroFrente", 0, -20, 40, ALTURA_MURO_169, 1);
    muroTexturizado("muroEsquerdo", -20, 0, 1, ALTURA_MURO_169, 40);
    muroTexturizado("muroDireito", 20, 0, 1, ALTURA_MURO_169, 40);
    function revestirMuro(nome, px, pz, anguloY, materialMuro) {
        const plano = BABYLON.MeshBuilder.CreatePlane(nome, {
            width: 40, height: ALTURA_MURO_169,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, scene);
        plano.position.set(px, ALTURA_MURO_169 / 2, pz);
        plano.rotation.y = anguloY;
        plano.material = materialMuro;
        plano.isPickable = false;
        plano.checkCollisions = false;
        plano.freezeWorldMatrix();
        mapaBaseMeshes214.push(plano);
        return plano;
    }
    revestirMuro("revestimentoFrente", 0, -19.485, 0, matMuroLateralNovo);
    revestirMuro("revestimentoFundo", 0, 19.485, Math.PI, matMuroLateralNovo);
    revestirMuro("revestimentoEsquerdo", -19.485, 0, Math.PI / 2, matMuroLateralNovo);
    revestirMuro("revestimentoDireito", 19.485, 0, -Math.PI / 2, matMuroLateralNovo);
    if (matMuroLateralNovo.diffuseTexture) {
        matMuroLateralNovo.diffuseTexture.uScale = 5;
        matMuroLateralNovo.diffuseTexture.vScale = 1;
    }
    bloco("plataforma", 0, 15, 5, 1.5, 3, matMuroPlataforma);

        return {mapaBaseMeshes214};
    }
};
