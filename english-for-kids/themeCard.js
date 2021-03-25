import WordCard from './worldCard'

class ThemeCard {
  constructor (imgPath, title, container, wordsList, navLink, global, index) {
    this.imgPath = imgPath
    this.title = title
    this.wordsList = wordsList
    this.container = container
    this.global = global
    this.index = index

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

      document.querySelector('.results').innerHTML = ''

      document.querySelector('.switch-checkbox').checked = true
      document.querySelector('.button').style.visibility = 'hidden'
      this.global.selectedWordSetIndex = this.index
    })

    navLink.addEventListener('click', () => {
      
      let a = document.querySelectorAll('.list__link')
      for(let i = 0; i < a.length; i++){
        a[i].classList.remove('link_active')
      }
      
      this.container.innerHTML = ''
      document.querySelector('.results').innerHTML = ''
      document.querySelector('.button').innerHTML = 'Start game'

      this.createWordCards()
      document.querySelector('#menu__toggle').checked = false

      navLink.classList.add('link_active')

      document.querySelector('.switch-checkbox').checked = true
      document.querySelector('.button').style.visibility = 'hidden'
      this.global.selectedWordSetIndex = this.index
    })

    document.getElementById('switcher').addEventListener('change', (event) => {
      for (let i = 0; i < this.wordsObjList.length; i++) {
        this.wordsObjList[i].changeVisibility()
      }
    })

    document.querySelector('.button').addEventListener('click', () => {
      if(this.index !== this.global.selectedWordSetIndex)
      {
        return
      }

      this.playAudioList()
      document.querySelector('.button').innerHTML = 'Repeat'
    })


  } // end constructor

  createWordCards () {
    this.wordsObjList = []
    this.audioList = []
    for (let i = 0; i < this.wordsList.length; i++) {
      this.wordsObjList[i] = new WordCard(this.wordsList[i].image, 
                                          this.wordsList[i].word, 
                                          this.wordsList[i].audioSrc, 
                                          this.wordsList[i].translation, 
                                          this.container, 
                                          i, 
                                          this.checkUserAnswer, this.global)

      this.audioList.push({ index: i, audio: this.wordsList[i].audioSrc})
      this.global.isWordSetSelected = true
    }
    this.audioList.sort(() => Math.random() - 0.5)
    document.querySelector('.results').innerHTML = ''
  }

    checkUserAnswer = (cardId) => {
    let pair = this.audioList[0]
    let correctAudio = new Audio('./audio/correct.mp3')
    let incorrectAudio = new Audio('./audio/error.mp3')

    let result = document.querySelector('.results')
    let winStar = document.createElement('div')
    winStar.className = 'winStar';
    
    let loseStar = document.createElement('div')
    loseStar.className = 'loseStar';
    
    if(this.global.isTrainingInProgress === false){
      return
    }

    if (pair.index === cardId) {
      correctAudio.play();
      this.audioList.shift()

      this.wordsObjList[cardId].card.style = 'opacity:0.5'
      this.wordsObjList[cardId].card.style.pointerEvents='none'

      result.append(winStar)
      this.playAudioList()

    }
    else {
      incorrectAudio.play()
      result.append(loseStar)
      this.global.isUserGaveIncorrectAnswer = true
    }
   
    this.notifyGameOver()

    setTimeout(() => {
      document.querySelector('.congrat').remove()
      document.querySelector('.game_over').remove()
      document.querySelector('.results').remove()
      
    }, 15000)
    
  }

  playAudioList(){
    let audioPlayList = this.audioList[0]
      
    if(audioPlayList != undefined || audioPlayList != null){
      let audio = new Audio(audioPlayList.audio)
      audio.play()
    } 
  }

  notifyGameOver(){
    if (this.audioList.length === 0){

      let win = new Audio('./audio/success.mp3')
      let fail = new Audio('./audio/failure.mp3')

      let img = document.createElement('img')
      img.className = 'game_over'
      document.body.append(img)

      let congrat = document.createElement('p')
      congrat.className = 'congrat'
      document.body.append(congrat)

      if(this.global.isUserGaveIncorrectAnswer == true){
        fail.play()
        img.src = './img/failure.jpg'
        congrat.innerHTML = "OOPS....Try again and find all correct words"
      } else {
        win.play()
        img.src = './img/success.jpg'
        congrat.innerHTML = "You find all correct words!!! Try another cards!!! "
      }
    }
  }

} // end class ThemeCard

export default ThemeCard
