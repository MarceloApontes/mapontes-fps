# MAPONTES FPS — Reestruturação pós-apocalíptica

## Objetivo
Substituir progressivamente os soldados/inimigos existentes por quatro classes com identidade visual e comportamentos próprios, usando modelos criados no Tripo3D. **Não excluir assets ou lógica existentes sem migração e testes.**

## Mapas, em ordem
| Nº | Novo nome | Classes previstas |
|---|---|---|
| 1 | Cidade Urbana — Condomínio | Civis / pessoas normais |
| 2 | Cidade Industrial | Civis e gangues |
| 3 | Aeroporto | Algumas gangues e militares |
| 4 | Floresta — Portal Interplanetário | Criaturas de outros mundos e militares |

O mapa 4 representa o trajeto da floresta até o portal interplanetário; ainda é necessário implementar/validar a geometria e a transição reais.

## Classes e armas
- **Civil:** taco e bastão, combate corpo a corpo.
- **Gangue:** faca (corpo a corpo) e revólver (distância).
- **Militar:** pistola e arma automática.
- **Extraterrestre:** habilidades e armamento a definir conforme os modelos criados.

## Estado técnico confirmado
- Entrada atual: `index.html`, que carrega `jogo-principal.js` usando Babylon.js.
- Código principal: `jogo-principal.js` (~1,89 MB).
- Modelos antigos existentes incluem `players/player_bot1.glb`, `players/player_bot2.glb`, `players/player_bot3.glb`, `soldado_tatico.glb` e `low_poly_soldier_free.glb`.
- Existem `mapas/cidade.js` e `mapas/campo.js`; os quatro nomes novos ainda não implicam quatro cenas independentes implementadas.
- Scripts de evolução `scripts/aplicar_etapa355.py` a `358.py` existem e não devem ser perdidos.

## Plano de migração segura
1. **Catálogo (esta etapa):** especificar mapas, classes e equipamento no arquivo `config/campanha.js`. Sem alterar o jogo rodando.
2. **Auditoria:** mapear referências atuais a `faseMapa214`, controles de UI, criação de inimigos, patrulha, dano, drops, progressão, salvamento e troca de mapa.
3. **Mapas:** separar nome exibido, ID interno e carregador da cena; manter compatibilidade com IDs e mecanismos existentes; criar a quarta fase somente quando o fluxo anterior estiver estável.
4. **Entidades:** criar registros por classe, controlador de IA por estado (patrulhar, procurar, perseguir, atacar, recuar/morrer) e adaptadores para corpo a corpo/arma de fogo.
5. **Tripo3D:** importar modelos GLB/GLTF por classe; validar escala, orientação, hierarquia, animações, mãos/arma, colisões e desempenho.
6. **Troca gradual:** implementar um inimigo de teste por classe em ambiente de desenvolvimento, habilitar por mapa e somente então retirar modelos antigos.
7. **Regressão:** testar ondas/spawn, HUD, munição, cura/seringa, lanterna, drops (incluindo ampulhetas), colisões, progressão e performance nos quatro mapas.

## Observações
Este é um documento de projeto e o catálogo ainda **não está importado** em `jogo-principal.js`. Nenhum inimigo antigo foi excluído; não foram modificadas as rotinas do jogo nem seus nomes exibidos em tela. Esses passos exigem inspeção do código principal completo e teste em navegador.
