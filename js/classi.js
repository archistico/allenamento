function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

class Evento {
  constructor(nome, durata, audio, immagine) {
    this.nome = nome;
    this.durata = durata;
    this.audio = audio;
    this.immagine = immagine;
  }
}

class Esercizio {
  constructor(nome, durata, ripetizioni, immagine) {
    this.nome = nome;
    this.durata = durata;
    this.ripetizioni = ripetizioni;
    this.immagine = immagine;
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

      this.allenamento.push(new Evento("Preparati: "+esercizio.nome, DURATA_PREPARAZIONE, "./mp3/bulb-horn-02.mp3", esercizio.immagine));
      for(let c=0; c<esercizio.ripetizioni; c++) {
        let rip = c+1;
        this.allenamento.push(new Evento(esercizio.nome+" "+rip+"/"+esercizio.ripetizioni, esercizio.durata, "./mp3/button-16.mp3", esercizio.immagine));
        // aggiungi il cambio se non è l'ultima ripetizione
        if(c<(esercizio.ripetizioni-1)) {
          this.allenamento.push(new Evento("Cambia/pausa", DURATA_CAMBIO, "./mp3/button-30.mp3", esercizio.immagine));
        }        
      }
  }

  calcolaDurata() {
    let totale = 0;
    this.allenamento.forEach(function(e) {
      totale+=e.durata;
    });

    let minuti = Math.floor(totale / 60);
    let secondi = totale - minuti * 60;

    return str_pad_left(minuti,'0',2)+":"+str_pad_left(secondi,'0',2);  
  }
}

