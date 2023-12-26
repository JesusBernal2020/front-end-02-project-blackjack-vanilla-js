//patron modulo adaptador
const miModulo = (() => {
  ('use strick');

  /**
   * 2C = Two of Clubs (Treboles)
   * 2D = Two of Diamonds (Diamantes)
   * 2H = Two of Heards (Corazones)
   * 2S = Two of Spades (Espadas)
   */
  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'];
  const especiales = ['A', 'J', 'Q', 'K'];
  // let puntosJugador = 0;
  // let puntosComputadora = 0;
  let puntosJugadores = [];

  //*Referencias del HTML
  const btnNuevoJuego = document.querySelector('#btnNuevoJuego');
  const btnPedir = document.querySelector('#btnPedir');
  const btnDetener = document.querySelector('#btnDetener');
  const divCartasJugadores = document.querySelectorAll('.divCartas');
  const puntosHTML = document.querySelectorAll('small');

  //*esta funcion inicializa el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach((elem) => (elem.innerHTML = 0));
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ''));

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  //*esta funcion crea un nuevo deck
  const crearDeck = () => {
    deck = [];

    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }

    return _.shuffle(deck);
  };

  //*Esta funcion me permite tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw 'No hay cartas en el deck';
    }

    return deck.pop();
  };

  //*esta funcion sirve para obtener el valor de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
  };

  //*Turno: 0 = primer jugador y el ultimo sera la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerHTML = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  //*esta funcion crea la carta en el documento
  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosMinimos === 21 || puntosComputadora > 21) {
        alert('Jugador Gana');
      } else if (puntosMinimos === puntosComputadora) {
        alert('Nadie Gana');
      } else if (puntosComputadora <= 21) {
        alert('Computadora Gana');
      }
    }, 40);
  };

  //*turno de la compudatora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();

      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

      // if (puntosMinimos > 21) {
      //   break;
      // }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  //*Eventos
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn('Lo siento mucho, perdiste');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn('21, genial');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevoJuego.addEventListener('click', () => {
    inicializarJuego();
  });

  return {
    nuevoJuego: inicializarJuego,
  };
})();
