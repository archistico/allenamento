const DURATA_PREPARAZIONE = 1;
const DURATA_CAMBIO = 1;

let esercizi = new Allenamento();
esercizi.aggiungi(new Esercizio("Bicipite femorale", 2, 4, "./img/gamba_retro.png"));
esercizi.aggiungi(new Esercizio("Polpaccio", 2, 2, "./img/polpaccio_1.png"));
esercizi.aggiungi(new Esercizio("Gamba retto", 2, 2, "./img/gamba_retto.png"));
esercizi.aggiungi(new Esercizio("Gluteo", 2, 2, "./img/gluteo.png"));
esercizi.aggiungi(new Esercizio("Ileo psoas", 2, 4, "./img/ileopsoas.png"));
esercizi.aggiungi(new Esercizio("Polpaccio in piedi", 2, 2, "./img/polpaccio_2.png"));
esercizi.aggiungi(new Esercizio("Farfalla", 2, 1, "./img/farfalla.png"));
esercizi.aggiungi(new Esercizio("Gamba retto prono", 2, 2, "./img/gamba_retto_prono.png"));
esercizi.aggiungi(new Esercizio("Spaccata", 2, 2, "./img/spaccata.png"));
esercizi.aggiungi(new Esercizio("Addominali", 2, 2, "./img/addominali.png"));
esercizi.aggiungi(new Esercizio("Laterali", 2, 2, "./img/laterali.png"));
esercizi.aggiungi(new Esercizio("Pettorali", 2, 1, "./img/pettorali.png"));
esercizi.aggiungi(new Esercizio("Spalla", 2, 2, "./img/spalla.png"));
esercizi.aggiungi(new Esercizio("Tricipiti", 2, 2, "./img/tricipiti.png"));

esercizi.lista.forEach(function(e) {
  document.getElementById('tbl_esercizi').innerHTML += '<tr><td class="border border-gray-400 px-4 py-2">'+e.nome+'</td><td  class="border border-gray-400 px-4 py-2">'+e.durata+'s</td><td class="border border-gray-400 px-4 py-2">'+e.ripetizioni+'x</td></tr>';
})

document.getElementById("durata").innerHTML = "Durata: "+esercizi.calcolaDurata();

// -------------------------------
//         CLICK SU AVVIA
// -------------------------------

function avvia() {
  function timer(count, messaggio, audio, img) {
      document.getElementById('nome_esercizio').innerHTML = messaggio
      document.getElementById('cronometro').innerHTML = count+"s"
      document.getElementById('immagine_esercizio').src = img
      
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
        var snd = new Audio("./mp3/applause-01.mp3");  
        snd.play();
        return;
      }

      var newPromise = Promise.resolve(t(arr[i].durata, arr[i].nome, arr[i].audio, arr[i].immagine));
      i++;
      
      return newPromise.then(nextPromise);
    };
  
    return Promise.resolve().then(nextPromise);
  };

  document.getElementById("titolo").style.display = "none";
  document.getElementById("btn_avvia").style.display = "none";
  document.getElementById("tabella").style.display = "none";
  document.getElementById("durata").style.display = "none";

  promiseForEach(esercizi.allenamento, timer);
}