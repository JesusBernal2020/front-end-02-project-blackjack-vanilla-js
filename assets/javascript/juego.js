/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Heards (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

//*esta funcion crea un nuevo deck
const crearDeck = () => {
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

  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

//*Esta funcion me permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }

  const carta = deck.pop();

  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
};

console.log(valorCarta(pedirCarta()));
