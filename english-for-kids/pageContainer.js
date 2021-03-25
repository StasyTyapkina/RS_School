import cards from './cards.js'
import ThemeCard from './themeCard'
import Global from './global'

class PageContainer {
  constructor (global) {
    this.main = document.createElement('div')
    this.main.className = 'main'
    document.body.append(this.main)
    this.global = global

    this.container = document.createElement('div')
    this.container.className = 'container'
    this.main.append(this.container)

    this.mainLink = document.querySelector('.list')
    this.mainPageLink = document.createElement('a')
    this.mainPageLink.className = 'list__link'
    this.mainPageLink.classList.add('link_active')
    this.mainLink.append(this.mainPageLink)
    this.mainPageLink.href = '#'
    this.mainPageLink.innerHTML = 'Main page'

    this.mainPageLink.addEventListener('click', () => {
      let a = document.querySelectorAll('.list__link')
      for(let i = 0; i < a.length; i++){
        a[i].classList.remove('link_active')
      }
      
      this.container.innerHTML = ''
      this.createThemeCards()
      document.querySelector('#menu__toggle').checked = false
      
      this.mainPageLink.classList.add('link_active')
      document.querySelector('.switch-checkbox').checked = true
      document.querySelector('.button').style.visibility = 'hidden'
      document.querySelector('.button').innerHTML = 'Start game'
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
    this.global.isWordSetSelected = false
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
        this.wordCardButtons[i],
        this.global,
        i)
    }
    document.querySelector('.results').innerHTML = ''
    
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

const global = new Global()

const container = new PageContainer(global)

document.getElementById('switcher').addEventListener('change', (event) => {
  const bttn = document.querySelector('button')
  global.isUserGaveIncorrectAnswer = false
 
  if (bttn.style.visibility === 'hidden' && global.isWordSetSelected === true) {
    global.isTrainingInProgress = true
    bttn.style.visibility = 'visible'
    
  } else {
    global.isTrainingInProgress = false
    bttn.style.visibility = 'hidden'
    document.querySelector('.results').innerHTML = ''
    document.querySelector('.button').innerHTML = 'Start game'
  }
})

export default PageContainer
