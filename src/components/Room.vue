<template>
  <div id="room">
    <section id="scenario" :class="getBackgroundColor()">
      <div id="roomName">
        <h1>{{ this.room.hints[this.room.hint] }}</h1>
      </div>
      <div id="game">
        <template v-for="letter in word">
          <div class="letters">
            <h2>{{letter}}</h2>
          </div>
        </template>
      </div>
    </section>
    <section id="keyboard" :class="getBackgroundColor()">
      <template v-for="keys in keyboard">
        <div class="keyLine">
          <template v-for="key in keys">
            <button v-shortkey.once="[key]" @shortkey="pushLetter(key)" @click="pushLetter(key)" :disabled="isUnavailable(key) || room.finished">{{ key }}</button>
          </template>
        </div>
      </template>
    </section>
    <audio ref="heartbeat" src="/static/332808_loudernoises_heartbeat-100bpm.wav" autostart="false" loop="true" hidden></audio>
    <audio ref="victory" src="/static/325805_wagna_collect.wav" autostart="false" hidden></audio>
    <audio ref="gameover" src="/static/382310_myfox14_game-over-arcade.wav" autostart="false" hidden></audio>
    <audio ref="correct" src="/static/336934_shnur_coin7.wav" autostart="false" hidden></audio>
    <audio ref="fail" src="/static/173958_fins_failure.wav" autostart="false" hidden></audio>
  </div>
</template>

<script>
export default {
  name: 'Room',
  data () {
    return {
      dictionary: null,
      score: 0,
      room: {
        category: '',
        hint: 0,
        hints: [],
        changeHintAt: 1,
        word: '',
        found: '',
        unavailable: 'qwertyuiopasdfghjklzxcvbnm',
        fails: 0,
        finished: false
      },
      word: [],
      keyboard: ['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')]
    }
  },
  created () {
    this.fetchRoom()
  },
  methods: {
    getBackgroundColor () {
      return {
        victory: this.room.fails === -1,
        fails0: this.room.fails === 0,
        fails1: this.room.fails === 1,
        fails2: this.room.fails === 2,
        fails3: this.room.fails === 3,
        fails4: this.room.fails === 4,
        fails5: this.room.fails === 5,
        fails6: this.room.fails === 6
      }
    },
    isUnavailable (letter) {
      return this.room.unavailable.indexOf(letter) !== -1
    },
    fetchRoom () {
      if (this.dictionary === null) {
        this.$http.get(`/static/dictionary/${this.$router.currentRoute.params.dictionary}.json`).then((response) => {
          this.dictionary = response.data
          this.setupRoom()
        }).catch(() => {
          alert('Dictionary not found!')
          this.$router.push('/')
        })
      } else {
        this.setupRoom(this.dictionary)
      }
    },
    setupRoom () {
      let game = this.dictionary.splice(Math.floor(Math.random() * this.dictionary.length), 1)[0]
      this.room.category = game.category
      this.room.hint = 0
      this.room.hints = game.hints
      let hintsLength = game.hints.length
      this.room.changeHintAt = hintsLength > 1 ? (6 / hintsLength) : 0
      this.room.word = game.word.toLowerCase()
      this.room.found = ''
      this.room.unavailable = ''
      this.room.fails = 0
      this.room.finished = false
      this.updateWord()
    },
    updateWord () {
      let arr = this.room.word.split('')
      let tmp = []
      for (let letter of arr) tmp.push(letter === '-' ? letter : (this.room.found.indexOf(letter) === -1 ? '' : letter))
      this.word = tmp
    },
    pushLetter (letter) {
      if (this.isUnavailable(letter)) return
      this.room.unavailable += letter
      if (this.room.word.indexOf(letter) === -1) {
        this.$refs.fail.play()
        if (++this.room.fails % this.room.changeHintAt === 0) ++this.room.hint
      } else {
        this.$refs.correct.play()
        this.room.found += letter
        this.updateWord()
      }
      this.checkGameStatus()
    },
    checkGameStatus () {
      if (this.room.fails === 5) {
        this.$refs.heartbeat.play()
      } else if (this.room.fails === 6) {
        this.$refs.heartbeat.pause()
        this.$refs.gameover.play()
        this.word = this.room.word.split('')
        this.room.hints[this.room.hint] = 'You got hanged.'
        this.room.finished = true
        setTimeout(() => {
          this.$router.push('/')
        }, 3000)
        return
      }
      if ((this.word.join('') === this.room.word) && !this.room.finished) {
        this.$refs.heartbeat.pause()
        this.$refs.victory.play()
        this.room.hints[this.room.hint] = 'Correct!'
        this.score += 6 - this.room.fails
        this.room.fails = -1
        this.room.finished = true
        if (this.dictionary.length === 0) {
          this.room.hints[this.room.hint] = `Game over! Score: ${this.score}`
        } else {
          setTimeout(() => {
            this.fetchRoom()
          }, 1500)
        }
      }
    }
  }
}
</script>
