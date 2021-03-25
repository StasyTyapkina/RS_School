class WordCard {
  constructor (imgPath, word, audioSrc, translation, container, index, checkUserAnswer, global) {
    this.imgPath = imgPath
    this.word = word
    this.audioSrc = audioSrc
    this.translation = translation
    this.index = index
    this.checkUserAnswer = checkUserAnswer
    this.global = global

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

    this.card.addEventListener('click', () => {
      if (this.global.isTrainingInProgress) {
        this.checkUserAnswer(this.index)
      }
    })
  } // end constructor

  changeVisibility () {
    this.frontSide.hidden = !this.frontSide.hidden
    this.rotate.hidden = !this.rotate.hidden
  }
} // end class WordCard

export default WordCard
