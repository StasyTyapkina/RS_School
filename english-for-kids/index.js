
import cards from './cards.js'

let isTrainingInProgress = false;
let isWordSetSelected = false;

class PageContainer {
  constructor () {
    this.main = document.createElement('div')
    this.main.className = 'main'
    document.body.append(this.main)

    this.container = document.createElement('div')
    this.container.className = 'container'
    this.main.append(this.container)

    this.mainLink = document.querySelector('.list')
    this.mainPageLink = document.createElement('a')
    this.mainPageLink.className = 'list__link'
    this.mainLink.append(this.mainPageLink)
    this.mainPageLink.href = '#'
    this.mainPageLink.innerHTML = 'Main page'

    this.mainPageLink.addEventListener('click', () => {
      this.container.innerHTML = ''
      this.createThemeCards()
      document.querySelector('#menu__toggle').checked = false
    })

    this.themeCard = []
    this.wordCardButtons = []
    this.createMenu()
    this.createThemeCards()

    this.isReadyToClose = false
    document.addEventListener('click', () => {
      const toggleMenu = document.querySelector('#menu__toggle')
      if (toggleMenu.checked && this.isReadyToClose) {
        toggleMenu.checked = !toggleMenu.checked
        this.isReadyToClose = false
      }
    })

    this.menuList = document.querySelector('.list')
    this.menuList.addEventListener('mouseleave', () => {
      const toggleMenu = document.querySelector('#menu__toggle')
      if (toggleMenu.checked) { this.isReadyToClose = true }
    })
  } // end constructor

  createThemeCards () {
    isWordSetSelected = false
    const imgPathImport = []
    for (let i = 1; i < cards.length; i++) {
      imgPathImport.push(cards[i][0].image)
    }

    const cardTitleImport = []
    for (let i = 0; i < cards.length - 1; i++) {
      cardTitleImport.push(cards[0][i])
    }

    this.themeCard = []
    for (let i = 0; i < cardTitleImport.length; i++) {
      this.themeCard[i] = new ThemeCard(imgPathImport[i], 
                                        cardTitleImport[i], 
                                        this.container, 
                                        cards[i + 1], 
                                        this.wordCardButtons[i])
    }
  }

  createMenu () {
    for (let i = 0; i < cards.length - 1; i++) {
      const ul = document.querySelector('.list')

      const navLink = document.createElement('a')
      navLink.className = 'list__link'
      ul.append(navLink)
      navLink.href = '#'
      navLink.innerHTML = cards[0][i]
      this.wordCardButtons[i] = navLink
    }
  }
}// end class PageContainer

class ThemeCard {
  constructor (imgPath, title, container, wordsList, navLink) {
    this.imgPath = imgPath
    this.title = title
    this.wordsList = wordsList
    this.container = container

    this.wordLink = document.createElement('a')
    this.wordLink.className = 'figure_link'
    this.wordLink.href = '#'
    container.append(this.wordLink)

    this.figure = document.createElement('figure')
    this.figure.className = 'figure_content'
    this.wordLink.append(this.figure)

    this.img = document.createElement('img')
    this.img.className = 'img_content'
    this.figure.append(this.img)
    this.img.src = this.imgPath

    this.figcaption = document.createElement('figcaption')
    this.figcaption.className = 'figcaption_title'
    this.figure.append(this.figcaption)
    this.figcaption.innerHTML = this.title
    this.wordsObjList = []
    
    this.audioList = []

    this.wordLink.addEventListener('click', () => {
      this.container.innerHTML = ''
      this.createWordCards()
    })

    navLink.addEventListener('click', () => {
      this.container.innerHTML = ''
      this.createWordCards()
      document.querySelector('#menu__toggle').checked = false
    })

    document.getElementById('switcher').addEventListener('change', (event) => {
      for (let i = 0; i < this.wordsObjList.length; i++) {
        this.wordsObjList[i].changeVisibility()
      }
    })


    document.querySelector('.button').addEventListener('click', () => {
      this.playAudioList()
      document.querySelector('.button').innerHTML = 'Repeat'
    })


  } // end constructor

  createWordCards () {
    isWordSetSelected = true
    this.wordsObjList = []
    this.audioList = []
    for (let i = 0; i < this.wordsList.length; i++) {
      this.wordsObjList[i] = new WordCard(this.wordsList[i].image, 
                                          this.wordsList[i].word, 
                                          this.wordsList[i].audioSrc, 
                                          this.wordsList[i].translation, 
                                          this.container, 
                                          i, 
                                          this.checkUserAnswer)

      this.audioList.push({ index: i, audio: this.wordsList[i].audioSrc})
    }
    this.audioList.sort(() => Math.random() - 0.5)
  }

  checkUserAnswer = function fn(cardId) {
    let pair = this.audioList[0]
    let correctAudio = new Audio('./audio/correct.mp3')
    let incorrectAudio = new Audio('./audio/error.mp3')

    let result = document.querySelector('.results')
    let winStar = document.createElement('div')
    winStar.className = 'winStar';
    
    let loseStar = document.createElement('div')
    loseStar.className = 'loseStar';
    

    if (pair.index === cardId) {
      correctAudio.play();
      this.audioList.shift()

     this.wordsObjList[cardId].card.style = 'opacity:0.5'

     
      result.append(winStar)
      this.playAudioList()


    }
    else {
      incorrectAudio.play()
      result.append(loseStar)
    }
  }

  playAudioList(){
    let audioPlayList = this.audioList[0]
      
    if(audioPlayList != undefined || audioPlayList != null){
      let audio = new Audio(audioPlayList.audio)
      audio.play()
    } 
  }
  

} // end class ThemeCard

class WordCard {
  constructor (imgPath, word, audioSrc, translation, container, index, checkUserAnswer) {
    this.imgPath = imgPath
    this.word = word
    this.audioSrc = audioSrc
    this.translation = translation
    this.index = index
    this.checkUserAnswer = checkUserAnswer

    this.card = document.createElement('div')
    this.card.className = 'card'
    container.append(this.card)

    this.audio = document.createElement('audio')
    this.audio.src = this.audioSrc
    this.card.append(this.audio)

    this.img = document.createElement('img')
    this.img.className = 'img_word_content'
    this.card.append(this.img)
    this.img.src = this.imgPath

    this.frontSide = document.createElement('div')
    this.frontSide.className = 'front_side'
    this.card.append(this.frontSide)

    this.backSide = document.createElement('div')
    this.backSide.className = 'back_side'
    this.card.append(this.backSide)

    this.wordTitle = document.createElement('p')
    this.wordTitle.className = 'card_title'
    this.frontSide.append(this.wordTitle)
    this.wordTitle.innerHTML = this.word

    this.translationTitle = document.createElement('p')
    this.translationTitle.className = 'card_title'
    this.backSide.append(this.translationTitle)
    this.translationTitle.innerHTML = this.translation

    this.frontSide.addEventListener('click', () => {
      this.audio.play()
    })

    this.rotate = document.createElement('div')
    this.rotate.className = 'rotate'
    this.card.append(this.rotate)

    this.rotate.addEventListener('click', () => { 
        this.card.classList.toggle('flip') 
    })
    this.card.addEventListener('mouseleave', () => {
      if (this.card.classList.toggle('flip')) {
        this.card.classList.toggle('flip')
      }
    })

    this.card.addEventListener("click", () => {
      if (isTrainingInProgress) {
        this.checkUserAnswer(this.index);
      }
    })
    
  } //end constructor

  changeVisibility () {
    this.frontSide.hidden = !this.frontSide.hidden
    this.rotate.hidden = !this.rotate.hidden
  }
} // end class WordCard

const container = new PageContainer()

document.getElementById('switcher').addEventListener('change', (event) => {
  
  const bttn = document.querySelector('button')
  if (bttn.style.visibility === 'hidden' && isWordSetSelected === true) {
    isTrainingInProgress = true;
    bttn.style.visibility = 'visible'
  } else {
    isTrainingInProgress = false
    bttn.style.visibility = 'hidden'
  }
}) 