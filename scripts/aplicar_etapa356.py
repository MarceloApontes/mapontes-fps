from pathlib import Path

arquivo = Path("jogo-principal.js")
js = arquivo.read_text(encoding="utf-8")

def substituir_unico(antes, depois):
    global js
    quantidade = js.count(antes)
    if quantidade != 1:
        raise RuntimeError(f"ETAPA 356 abortada: trecho esperado encontrado {quantidade} vezes: {antes[:95]!r}")
    js = js.replace(antes, depois, 1)

substituir_unico(
    "// ETAPA 355: 25% de chance de ampulheta ao eliminar inimigo no Mapa 1.\n        if (faseMapa214 === 1 &&\n            despertadoresMapa179.length < limiteAmpulhetasNoChao355 &&",
    "// ETAPA 356: mesmos drops de ampulhetas nos tres mapas (25% por eliminacao).\n        if (despertadoresMapa179.length < limiteAmpulhetasNoChao355 &&"
)
substituir_unico(
    "  function prepararCidadeAbandonada214() {\n    const seringaBonus305",
    """  function prepararCidadeAbandonada214() {
    // ETAPA 356: limpar apenas os drops no chao na troca de mapa.
    // Ampulhetas guardadas no inventario continuam disponiveis com a tecla T.
    for (const ampulheta356 of despertadoresMapa179) {
      ampulheta356.raiz.dispose(false, true);
    }
    despertadoresMapa179.length = 0;
    const seringaBonus305"""
)
if "intervaloSpawnDespertador200" in js or "proximoSpawnDespertador179" in js:
    raise RuntimeError("Spawn automatico detectado; abortando.")
if js.count("chanceDropAmpulheta355") < 2 or "function usarDespertador179()" not in js:
    raise RuntimeError("Mecanica de ampulheta nao preservada.")
arquivo.write_text(js, encoding="utf-8")
print("ETAPA 356 OK: drop habilitado nos mapas 1, 2 e 3; itens no chao limpos nas transicoes.")
