let input = document.querySelector('.use-keyboard-input');

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    language: true,
    start: 0,
    end: 0,
    direction: 'none',
    sound: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {

      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });

      element.addEventListener('click', () => {
        this.properties.direction = 'none';
        this.properties.start = input.selectionStart;
        this.properties.end = input.selectionEnd;
      });

      element.addEventListener('keydown', key => {

        let keydown = function(color) {
          color.animate({background: 'yellow', opacity : '0.5'}, 150);
          }
        
      
        for (let color of this.elements.keys) {
          if (key.key.toLowerCase() === color.textContent.toLowerCase()) keydown(color);
        }
        
        
        if (key.which === 20) keydown(document.querySelector('.caps'));
        if (key.which === 13) keydown(document.querySelector('.enter'));
        if (key.which === 32) keydown(document.querySelector('.space'));
        if (key.which === 37) keydown(document.querySelector('.backward'));
        if (key.which === 39) keydown(document.querySelector('.forward'));
        

        if (key.which === 37) {
          this.properties.start--;
          this.properties.end--;
          if (this.properties.start < 0) this.properties.start = 0;
          if (this.properties.end < 0) this.properties.end = 0;
        }
        if (key.which === 39) {
          this.properties.start++;
          this.properties.end++;
          if (this.properties.start > this.properties.value.length) this.properties.start = this.properties.value.length;
          if (this.properties.end > this.properties.value.length) this.properties.end = this.properties.value.length;
        }

      });

    });
  },
  

  _createKeys() {
    const fragment = document.createDocumentFragment();
    
    const keyLayoutEng = [
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", 
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";","'","enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",",  "/",".",
      "done","eng", "space","<=", "=>", "sound"];
   

    const keyLayoutRus = [
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
      "done","rus","space", "<=", "=>", "sound"];

      let keyLayoutEngBeforeShift =  ["`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=","backspace"];
      let keyLayoutEngAfterShift =  ["~","!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+","backspace"];
      
      let keyLayoutRusBeforeShift =  ["ё",  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=","backspace",]
      let keyLayoutRusAfterShift =  ["Ё","!", "'", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+","backspace"]
    

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    let keyLayout;
    if (this.properties.language ) { 
      keyLayout = keyLayoutEngBeforeShift.concat(keyLayoutEng)  
      if (this.properties.shift) {keyLayout = keyLayoutEngAfterShift.concat(keyLayoutEng);;
    }
  } else  {  keyLayout = keyLayoutRusBeforeShift.concat(keyLayoutRus)  ;
      if (this.properties.shift ) {
        keyLayout =  keyLayoutRusAfterShift.concat(keyLayoutRus);
      };
    }


    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "]", "ъ", "enter",  "."].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerText = 'shift';
          keyElement.classList.toggle("keyboard__key--active", this.properties.shift);

          keyElement.addEventListener("click", () => {
            
            while (this.elements.keysContainer.children.length>0) this.elements.keysContainer.children[0].remove();
            this.properties.shift = !this.properties.shift;
            this.elements.keysContainer.appendChild(this._createKeys());
            this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
            
            

            this._toggleShift();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);

            if (this.properties.sound) {
              let audio = document.querySelector('audio[data-key="3"]');
              audio.play();
            }
          });

        break;   
        
        case "backspace":
          keyElement.classList.add("keyboard__key--wide", 'backspace');
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            
            this.properties.value = this.properties.value.substring(0, this.properties.start-1) 
                + this.properties.value.substring(this.properties.end, this.properties.value.length);
            
            this.properties.start--;
            this.properties.end--;
            this._triggerEvent("oninput");
            input.focus();

            let range = this.properties.end - this.properties.start;
            if (range > 0) {
              this.properties.end-=range;
            }
            input.setSelectionRange(this.properties.start, this.properties.end);
            
            if (this.properties.sound) {
              let audio = document.querySelector('audio[data-key="3"]');
              audio.play();
            }

           
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", 'caps');
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);

          keyElement.addEventListener("click", () => {
            
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);

            if (this.properties.sound) {
              let audio = document.querySelector('audio[data-key="3"]');
              audio.play();
            }
          });

          break;

          

        case "enter":
          keyElement.classList.add("keyboard__key--wide", 'enter');
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) {
              let audio = document.querySelector('audio[data-key="3"]');
              audio.play();
            }

            this.properties.value = this.properties.value.substring(0, this.properties.start) + "\n" + this.properties.value.substring(this.properties.end, this.properties.value.length);
            
            this.properties.start++;
            this.properties.end++;
            this._triggerEvent("oninput");
            input.focus();

            let range = this.properties.end - this.properties.start;

            if (range > 0) {
              this.properties.end-=range;
            }
            input.setSelectionRange(this.properties.start, this.properties.end);
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide", 'space');
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {

            
            this.properties.value = this.properties.value.substring(0, this.properties.start) + " " + this.properties.value.substring(this.properties.end, this.properties.value.length);
            
            this.properties.start++;
            this.properties.end++;
            this._triggerEvent("oninput");
            input.focus();

            let range = this.properties.end - this.properties.start;
            if (range > 0) {
              this.properties.end-=range;
            }
            input.setSelectionRange(this.properties.start, this.properties.end);

            if (this.properties.sound) {
              let audio = document.querySelector('audio[data-key="3"]');
              audio.play();
            }
            
          });

          break;
        
          case "eng":
            keyElement.innerText = 'eng';
            keyElement.classList.add("lang");
            keyElement.addEventListener('click', () => {
              
              this.properties.language = !this.properties.language;
              while (this.elements.keysContainer.children.length>0) this.elements.keysContainer.children[0].remove();
              this.elements.keysContainer.appendChild(this._createKeys());
              this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
            
              if (this.properties.sound) {
                let audio = document.querySelector('audio[data-key="3"]');
                audio.play();
              }
            });
            break;
  
          case "rus":
            keyElement.innerText = 'rus';
            keyElement.classList.add("lang");
            keyElement.addEventListener('click', () => {
              
              this.properties.language = !this.properties.language;
              while (this.elements.keysContainer.children.length>0) this.elements.keysContainer.children[0].remove();
              this.elements.keysContainer.appendChild(this._createKeys());
              this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
            
              if (this.properties.sound) {
                let audio = document.querySelector('audio[data-key="3"]');
                audio.play();
              }
            });
            break;


            case "sound":
              keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable"); 
              keyElement.innerHTML = createIconHTML("volume_down");
              keyElement.classList.toggle("keyboard__key--active", this.properties.sound);
          
              keyElement.addEventListener('click', () => {
           
            /*this.properties.sound = !this.properties.sound;*/

            this._toggleSound();
            keyElement.classList.toggle("keyboard__key--active", this.properties.sound );
           
            if (this.properties.sound) {
              let audio = document.querySelector('audio[data-key="3"]');
              audio.play();
            }
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;


          case "<=": 
          keyElement.innerText = '<=';
          keyElement.classList.add('backward');
          keyElement.addEventListener('click', () => {
            if (this.properties.sound) {
              let audio = document.querySelector('audio[data-key="3"]');
              audio.play();
            }
            //для выделения текста с шифтом//  
            if (!this.properties.shift) {
                  this.properties.direction = 'none';
                  this.properties.start--;
                  this.properties.end--;
    
                  if (this.properties.start < 0) this.properties.start = 0;
                  if (this.properties.end < 0) this.properties.end = 0;
                  this.properties.start = this.properties.end;
                  input.setSelectionRange(this.properties.start, this.properties.end);
              }
              //для движения по символам как ползунком//  
              else {
                if (this.properties.direction === 'none') this.properties.direction = 'backward';
                if (this.properties.start <= this.properties.end && this.properties.direction === 'backward') {
                  this.properties.start--;
                  if (this.properties.start < 0) this.properties.start = 0;
                }
                else this.properties.end--;
                if (this.properties.start === this.properties.end) this.properties.direction = 'none';
                input.setSelectionRange(this.properties.start, this.properties.end);
              }
              input.focus();
    
          });
          break;

          case "=>": 
          keyElement.innerText = '=>';
          keyElement.classList.add('forward');
          keyElement.addEventListener('click', () => {
            if (this.properties.sound) {
              let audio = document.querySelector('audio[data-key="3"]');
              audio.play();
            }
            
              if (!this.properties.shift) {
                this.properties.direction = 'none';
                this.properties.start++;
                this.properties.end++;

                if (this.properties.start > this.properties.value.length) this.properties.start = this.properties.value.length;
                if (this.properties.end > this.properties.value.length) this.properties.end = this.properties.value.length;
                this.properties.start = this.properties.end;
                input.setSelectionRange(this.properties.start, this.properties.end);
              }
              else {
                
                if (this.properties.direction === 'none') this.properties.direction = 'forward';
                if (this.properties.start <= this.properties.end && this.properties.direction === 'forward') {
                  this.properties.end++;
                  if (this.properties.end > this.properties.value.length) this.properties.end = this.properties.value.length;
                }
                else this.properties.start++;
                if (this.properties.start === this.properties.end) this.properties.direction = 'none';
                input.setSelectionRange(this.properties.start, this.properties.end);
              }
              input.focus();
          });
          break;
 

          default:
          
          keyElement.textContent = key.toLowerCase();



          keyElement.addEventListener("click", () => {
            if (this.properties.sound) {
              let audio = document.querySelector('audio[data-key="1"]');
              audio.currentTime = 0;
              audio.play();
            }
            
            let symbol = key;

            if (!this.properties.capsLock && !this.properties.shift) symbol=symbol.toLowerCase(); 
            if (!this.properties.capsLock && this.properties.shift) symbol=symbol.toUpperCase(); 
            if (this.properties.capsLock && !this.properties.shift) symbol=symbol.toUpperCase(); 
            if (this.properties.capsLock && this.properties.shift) symbol=symbol.toLowerCase(); 
          
            this.properties.value = this.properties.value.substring(0, this.properties.start) + symbol
               + this.properties.value.substring(this.properties.end, this.properties.value.length);

            let range = this.properties.end - this.properties.start;
            if (range > 0) {
              this.properties.end-=range;
            }
            
            this.properties.start++;
            this.properties.end++;
            this._triggerEvent("oninput");
            
            input.focus();
           
            input.setSelectionRange(this.properties.start, this.properties.end);
          });

           break;
      }

          fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {    
              if (!this.properties.capsLock && !this.properties.shift) key.textContent=key.textContent.toLowerCase(); 
              if (!this.properties.capsLock && this.properties.shift) key.textContent=key.textContent.toUpperCase(); 
              if (this.properties.capsLock && !this.properties.shift) key.textContent=key.textContent.toUpperCase(); 
              if (this.properties.capsLock && this.properties.shift) key.textContent=key.textContent.toLowerCase(); 
            }
        }
    },

    _toggleShift() {
      for (const key of this.elements.keys) {
          if (key.childElementCount === 0) {
            if (!this.properties.capsLock && !this.properties.shift) key.textContent=key.textContent.toLowerCase(); 
            if (!this.properties.capsLock && this.properties.shift) key.textContent=key.textContent.toUpperCase(); 
            if (this.properties.capsLock && !this.properties.shift) key.textContent=key.textContent.toUpperCase(); 
            if (this.properties.capsLock && this.properties.shift) key.textContent=key.textContent.toLowerCase(); 
          }
      }
  },

  _toggleSound() {
    this.properties.sound = !this.properties.sound;
  },


    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
