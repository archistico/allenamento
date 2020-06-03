class Evento {
  constructor(nome, durata, audio) {
    this.nome = nome;
    this.durata = durata;
    this.audio = audio;
  }
}

class Esercizio {
  constructor(nome, durata, ripetizioni) {
    this.nome = nome;
    this.durata = durata;
    this.ripetizioni = ripetizioni;
  }
}

class Allenamento {
  constructor() {
    this.lista = [];
    this.durata = 0;
    this.allenamento = [];
  }

  aggiungi(esercizio) {
      this.lista.push(esercizio);

      this.allenamento.push(new Evento("Preparati all'esercizio: "+esercizio.nome, 5, "../mp3/bulb-horn-02.mp3"));
      for(let c=0; c<esercizio.ripetizioni; c++) {
        let rip = c+1;
        this.allenamento.push(new Evento(esercizio.nome+" | ripetizione "+rip, esercizio.durata, "../mp3/button-16.mp3"));
        // aggiungi il cambio se non è l'ultima ripetizione
        if(c<(esercizio.ripetizioni-1)) {
          this.allenamento.push(new Evento("Cambia lato", 3, "../mp3/button-30.mp3"));
        }        
      }
  }
}

let esercizi = new Allenamento();
esercizi.aggiungi(new Esercizio("Gamba retro", 10, 6));
esercizi.aggiungi(new Esercizio("Polpaccio", 60, 2));
esercizi.aggiungi(new Esercizio("Retto gamba", 30, 2));
esercizi.aggiungi(new Esercizio("Gluteo", 30, 2));
esercizi.aggiungi(new Esercizio("Ileopsoas", 30, 4));

esercizi.lista.forEach(function(e) {
  document.getElementById('tbl_esercizi').innerHTML += '<tr><td class="border border-gray-400 px-4 py-2">'+e.nome+'</td><td  class="border border-gray-400 px-4 py-2">'+e.durata+'s</td><td class="border border-gray-400 px-4 py-2">'+e.ripetizioni+'x</td></tr>';
})

var stop = true;

function avvia() {
  function timer(count, messaggio, audio) {
      document.getElementById('nome_esercizio').innerHTML = messaggio
      document.getElementById('cronometro').innerHTML = count+"s"
      
      var snd = new Audio(audio);  
      snd.play();

      return new Promise(resolve => { 
      let counter = setInterval(() => {
          count = count - 1;
          if (count < 0) {
              clearInterval(counter);
              resolve(); 
              return;
          }
          document.getElementById('cronometro').innerHTML = count+"s"
          }, 1000);
      });
  }

  function promiseForEach(arr, t) {
    var i = 0;
    console.log("Inizio allenamento");

    var nextPromise = function () {
      if (i >= arr.length) {
        // eseguito alla fine di tutto l'array
        console.log("Fine allenamento");
        var snd = new Audio("../mp3/applause-01.mp3");  
        snd.play();
        return;
      }

      var newPromise = Promise.resolve(t(arr[i].durata, arr[i].nome, arr[i].audio));
      i++;
      
      return newPromise.then(nextPromise);
    };
  
    return Promise.resolve().then(nextPromise);
  };

  promiseForEach(esercizi.allenamento, timer);
}