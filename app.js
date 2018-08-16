new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
      this.turns = []
    },
    logTurn: function (text, isPlayer = true) {
      this.turns.unshift({
        isPlayer,
        text
      })
    },
    attack: function () {
      // player attack
      var damage = this.calculateDamage(3, 10)
      this.monsterHealth -= damage
      this.logTurn(`Player hits Monster for ${damage}`)
      if (this.checkWin()) {
        return
      }
      this.monsterAttacks()
    },
    specialAttack: function () {
      // player attack
      var damage = this.calculateDamage(10, 20)
      this.monsterHealth -= damage
      this.logTurn(`Player hits Monster hard for ${damage}`)
      if (this.checkWin()) {
        return
      }
      this.monsterAttacks()
    },
    monsterAttacks: function () {
      var damage = this.calculateDamage(5, 12)
      this.playerHealth -= damage
      this.logTurn(`Monster hits Player for ${damage}`, false)
      this.checkWin()
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10
      } else {
        this.playerHealth = 100
      }
      this.logTurn(`Player heals for 10`)
      this.monsterAttacks()
    },
    giveUp: function () {
      this.gameIsRunning = false
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! Start new game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! Start new game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      }
      return false
    }
  }
})
