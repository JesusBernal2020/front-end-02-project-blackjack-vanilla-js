const miModulo = (() => {
  let e = [],
    t = ['C', 'D', 'H', 'S'],
    r = ['A', 'J', 'Q', 'K'],
    l = [],
    a = document.querySelector('#btnNuevoJuego'),
    n = document.querySelector('#btnPedir'),
    d = document.querySelector('#btnDetener'),
    o = document.querySelectorAll('.divCartas'),
    s = document.querySelectorAll('small'),
    i = (t = 2) => {
      (e = c()), (l = []);
      for (let r = 0; r < t; r++) l.push(0);
      s.forEach((e) => (e.innerHTML = 0)),
        o.forEach((e) => (e.innerHTML = '')),
        (n.disabled = !1),
        (d.disabled = !1);
    },
    c = () => {
      e = [];
      for (let l = 2; l <= 10; l++) for (let a of t) e.push(l + a);
      for (let n of t) for (let d of r) e.push(d + n);
      return _.shuffle(e);
    },
    u = () => {
      if (0 === e.length) throw 'No hay cartas en el deck';
      return e.pop();
    },
    $ = (e) => {
      let t = e.substring(0, e.length - 1);
      return isNaN(t) ? ('A' === t ? 11 : 10) : 1 * t;
    },
    h = (e, t) => ((l[t] += $(e)), (s[t].innerHTML = l[t]), l[t]),
    f = (e, t) => {
      let r = document.createElement('img');
      (r.src = `assets/cartas/${e}.png`),
        r.classList.add('carta'),
        o[t].append(r);
    },
    b = () => {
      let [e, t] = l;
      setTimeout(() => {
        21 === e || t > 21
          ? alert('Jugador Gana')
          : e === t
          ? alert('Nadie Gana')
          : t <= 21 && alert('Computadora Gana');
      }, 40);
    },
    g = (e) => {
      let t = 0;
      do {
        let r = u();
        (t = h(r, l.length - 1)), f(r, l.length - 1);
      } while (t < e && e <= 21);
      b();
    };
  return (
    n.addEventListener('click', () => {
      let e = u(),
        t = h(e, 0);
      f(e, 0),
        t > 21
          ? (console.warn('Lo siento mucho, perdiste'),
            (n.disabled = !0),
            (d.disabled = !0),
            g(t))
          : 21 === t &&
            (console.warn('21, genial'),
            (n.disabled = !0),
            (d.disabled = !0),
            g(t));
    }),
    d.addEventListener('click', () => {
      (n.disabled = !0), (d.disabled = !0), g(l[0]);
    }),
    a.addEventListener('click', () => {
      i();
    }),
    { nuevoJuego: i }
  );
})();
