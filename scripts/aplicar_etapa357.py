from pathlib import Path
p=Path("jogo-principal.js")
s=p.read_text(encoding="utf-8")
antigo='''        // ETAPA 356: mesmos drops de ampulhetas nos tres mapas (25% por eliminacao).
        if (despertadoresMapa179.length < limiteAmpulhetasNoChao355 &&
            Math.random() < chanceDropAmpulheta355) {'''
novo='''        // ETAPA 357: diagnostico do sorteio de drop em cada eliminacao.
        const sorteioAmpulheta357 = Math.random();
        const haEspacoAmpulheta357 = despertadoresMapa179.length < limiteAmpulhetasNoChao355;
        const ganhouAmpulheta357 = haEspacoAmpulheta357 && sorteioAmpulheta357 < chanceDropAmpulheta355;
        console.info("[MAPONTES ETAPA 357] DROP", {
          mapa: faseMapa214, sorteio: Number(sorteioAmpulheta357.toFixed(3)),
          chance: chanceDropAmpulheta355, itensNoChao: despertadoresMapa179.length,
          resultado: ganhouAmpulheta357 ? "GERAR AMPULHETA" : haEspacoAmpulheta357 ? "SEM DROP" : "LIMITE NO CHAO"
        });
        if (ganhouAmpulheta357) {'''
if s.count(antigo)!=1: raise RuntimeError("Nao foi encontrado exatamente um bloco de drop ETAPA 356; abortado")
s=s.replace(antigo,novo,1)
if s.count("criarDespertadorMapa179({ x: posicaoMorte355.x, z: posicaoMorte355.z });")!=1: raise RuntimeError("Chamada de drop nao identificada")
if 'proximoSpawnDespertador179' in s: raise RuntimeError("Spawn automatico inesperado")
p.write_text(s,encoding="utf-8")
print("ETAPA 357 OK - diagnostico de cada eliminacao, mantendo chance 25%")
