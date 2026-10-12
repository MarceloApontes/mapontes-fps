from pathlib import Path
import json, re
p = Path("index.html")
html = p.read_text(encoding="utf-8")
match = re.search(r'    const code = (".*");', html)
if not match:
    raise RuntimeError("Bundle esperado nao encontrado; sem alteracoes")
js = json.loads(match.group(1))
def trocar(antigo, novo):
    global js
    if js.count(antigo) != 1:
        raise RuntimeError("Trecho inesperado: " + antigo[:75])
    js = js.replace(antigo, novo, 1)
trocar("  const intervaloSpawnDespertador200 = 12;\n  let proximoSpawnDespertador179 = intervaloSpawnDespertador200;", "  const chanceDropAmpulheta355 = 0.25;\n  const maximoAmpulhetasNoChao355 = 6;")
trocar("function criarDespertadorMapa179() {\n    const ponto179 = sortearPosicaoDespertador179();", "function criarDespertadorMapa179(posicaoDrop355) {\n    const ponto179 = posicaoDrop355 || sortearPosicaoDespertador179();")
trocar("    while (tempo >= proximoSpawnDespertador179) {\n      criarDespertadorMapa179();\n      proximoSpawnDespertador179 += intervaloSpawnDespertador200;\n    }\n", "")
trocar("        eliminacoes++;\n        alvo.morrendo = true;", """        eliminacoes++;
        if (faseMapa214 === 1 && despertadoresMapa179.length < maximoAmpulhetasNoChao355 && Math.random() < chanceDropAmpulheta355) {
          const p355 = alvo.raiz.getAbsolutePosition();
          const ponto355 = { x: Math.max(-18.5, Math.min(18.5, p355.x)), z: Math.max(-18.5, Math.min(18.5, p355.z)) };
          criarDespertadorMapa179(ponto355);
        }
        alvo.morrendo = true;""")
Path("jogo-principal.js").write_text(js, encoding="utf-8")
html = html[:match.start()] + "    // ETAPA 355: JavaScript externo\n    const code = await (await fetch('./jogo-principal.js?v=355', {cache:'no-store'})).text();" + html[match.end():]
p.write_text(html, encoding="utf-8")
print("ETAPA 355 aplicada: HTML", len(html), "JS", len(js))
