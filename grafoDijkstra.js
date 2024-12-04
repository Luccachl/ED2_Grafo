const grafo = {
    A: { B: 4, C: 2, D: 7 },
    B: { A: 4, C: 1, E: 1 },
    C: { A: 2, B: 1, D: 3, E: 3 },
    D: { A: 7, C: 3, E: 2 },
    E: { B: 1, C: 3, D: 2 }
  };
  
  function dijkstra(grafo, origem) {
    const distancias = {};
    const caminho = {};
    const visitados = new Set();
    const fila = [];
  
    for (let cidade in grafo) {
      distancias[cidade] = Infinity;
      caminho[cidade] = null;
    }
    distancias[origem] = 0;
    fila.push({ cidade: origem, distancia: 0 });
  
    while (fila.length > 0) {
      fila.sort((a, b) => a.distancia - b.distancia);
      const { cidade: cidadeAtual, distancia: distanciaAtual } = fila.shift();
  
      if (visitados.has(cidadeAtual)) continue;
      visitados.add(cidadeAtual);
  
      for (let vizinho in grafo[cidadeAtual]) {
        const peso = grafo[cidadeAtual][vizinho];
        const novaDistancia = distanciaAtual + peso;
        if (novaDistancia < distancias[vizinho]) {
          distancias[vizinho] = novaDistancia;
          caminho[vizinho] = cidadeAtual;
          fila.push({ cidade: vizinho, distancia: novaDistancia });
        }
      }
    }
  
    return { distancias, caminho };
  }
  
  function reconstruirCaminho(caminho, destino) {
    const caminhoCompleto = [];
    while (destino) {
      caminhoCompleto.push(destino);
      destino = caminho[destino];
    }
    return caminhoCompleto.reverse();
  }
  
  const { distancias, caminho } = dijkstra(grafo, "A");
  
  const tempoAteE = distancias["E"];
  const caminhoAteE = reconstruirCaminho(caminho, "E");
  
  const tempoAteD = distancias["D"];
  const caminhoAteD = reconstruirCaminho(caminho, "D");
  
  console.log(`Menor tempo de A ate E: ${tempoAteE}`);
  console.log(`Caminho: ${caminhoAteE.join(" -> ")}`);
  
  console.log(`Menor tempo de A ate D: ${tempoAteD}`);
  console.log(`Caminho: ${caminhoAteD.join(" -> ")}`);
  