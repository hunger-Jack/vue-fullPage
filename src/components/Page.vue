<template>
  <div id="page">
    <span v-html="code" v-for="(code,index) in codes" :key="index"></span>
    <span v-show="show">|</span>
  </div>
</template>

<script>
  export default {
    name: 'Page',
    props: ['curIndex', 'slotIndex'],
    data() {
      return {
        msg: 'AVueProject'.split('').concat(['<br>', '{', '<br>'], 'return "Jack"'.split(''), ['<br>', '}']),
        msgIndex: 0,
        codes: [],
        timerCode: null,
        timerCursor: null,
        show: true
      }
    },
    methods: {
      addCodes() {
        this.codes.push(this.msg[this.msgIndex])
        this.msgIndex++;
      },
      change() {
        this.show = !this.show
        if (this.msgIndex === this.msg.length) {
          this.clear()
        }
      },
      clear() {
        clearInterval(this.timerCode)
        this.timerCode = null
        clearInterval(this.timerCursor)
        this.timerCursor = null

      }
    },
    created() {
      if (this.curIndex === 0) {
        this.timerCode = setInterval(this.addCodes, 100)
        this.timerCursor = setInterval(this.change, 100)
      }
    },
    watch: {
      curIndex() {
        if (this.curIndex === this.slotIndex - 1) {
          this.timerCode = setInterval(this.addCodes, 100)
          this.timerCursor = setInterval(this.change, 100)
        }
        if (this.curIndex !== this.slotIndex - 1) {
          this.clear()
          this.msgIndex = 0
          this.codes = []
        }
      }

    }
  }

</script>

<style scoped>
  #page {
    position: absolute;
    bottom: 24px;
    left: 24px;
    font-size: 24px;
    font-weight: 900;
  }

</style>
