const DURATA_PREPARAZIONE = 10;
const DURATA_CAMBIO = 5;

let esercizi = new Allenamento();
esercizi.aggiungi(new Esercizio("Bicipite femorale", 30, 4, "./img/stretching/gamba_retro.png"));
esercizi.aggiungi(new Esercizio("Polpaccio", 30, 2, "./img/stretching/polpaccio_1.png"));
esercizi.aggiungi(new Esercizio("Gamba retto", 30, 2, "./img/stretching/gamba_retto.png"));
esercizi.aggiungi(new Esercizio("Gluteo", 30, 2, "./img/stretching/gluteo.png"));
esercizi.aggiungi(new Esercizio("Ileo psoas", 20, 4, "./img/stretching/ileopsoas.png"));
esercizi.aggiungi(new Esercizio("Polpaccio in piedi", 20, 4, "./img/stretching/polpaccio_2.png"));
esercizi.aggiungi(new Esercizio("Farfalla", 20, 2, "./img/stretching/farfalla.png"));
esercizi.aggiungi(new Esercizio("Gamba retto prono", 30, 1, "./img/stretching/gamba_retto_prono.png"));
esercizi.aggiungi(new Esercizio("Spaccata", 20, 2, "./img/stretching/spaccata.png"));
esercizi.aggiungi(new Esercizio("Addominali", 20, 1, "./img/stretching/addominali.png"));
esercizi.aggiungi(new Esercizio("Laterali", 30, 2, "./img/stretching/laterali.png"));
esercizi.aggiungi(new Esercizio("Pettorali", 20, 1, "./img/stretching/pettorali.png"));
esercizi.aggiungi(new Esercizio("Spalla", 15, 2, "./img/stretching/spalla.png"));
esercizi.aggiungi(new Esercizio("Tricipiti", 15, 2, "./img/stretching/tricipiti.png"));

document.getElementById("durata").innerHTML = "Durata "+esercizi.calcolaDurata();

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
  document.getElementById("durata").style.display = "none";
  document.getElementById("btn_avvia").style.display = "none";

  promiseForEach(esercizi.allenamento, timer);
}