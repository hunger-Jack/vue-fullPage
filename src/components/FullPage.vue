<template>
  <transition-group tag="div" :name="name" mode="in-out" type="transition" @enter="enter" @leave="leave">
    <div class="page"  v-for="(list,index) in pages" :style="{'background-color':bgColor && bgColor[index] ? bgColor[index] : baseBgc}" :key="index" @wheel="wheelScroll($event)"
      v-show="index === curIndex" @transitionend="end">
      {{list}}
      <slot v-if="index+1 === slotIndex" :curIndex="curIndex" :name="'slot'+slotIndex" v-for="slotIndex in pages" :slotIndex="slotIndex"></slot>
    </div>
  </transition-group>
</template>

<script>
  export default {
    name: 'FullPage',
    data() {
      return {
        curIndex: 0,
        name: '',
        canWheel: true,
        count: 0,
        timer: null,
        status: ''
      }
    },
    props: {
        bgColor: {
            type: Array
        },
        baseBgc: {
            default: 'gray'
        },
        pages: {
            type: Number,
            required: true
        }
    },
    methods: {
      wheelScroll(e) {
          if (!this.canWheel) {return}
          this.canWheel = false
          if (e.deltaY > 0) {
            this.name = 'down'
            if (this.curIndex === this.pages - 1) {
              this.canWheel = true
              this.count = 0
              return
            }
            this.curIndex++;
          }
          if (e.deltaY < 0) {
            this.name = 'up'
            if (this.curIndex === 0) {
              this.canWheel = true
              this.count = 0
              return
            }
            this.curIndex--;
          }
      },
      end() {
        this.count++;
        if (this.count%2 === 0) {//解决有时候滚动时页面卡死现象,好像还是没有解决问题
          this.canWheel = true
           this.status = 'transitioned'
        }
      },
      enter(el,done) {
        this.status = 'enter'
      },
      leave(el,done) {
        this.status = 'leave'
      }
    }
  }

</script>

<style scoped>
  .page {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: red;
  }

  .down-enter-active {
    transform: translateY(0);
    transition: all 0.5s;
  }

  .down-leave-active {
    transform: translateY(-100%);
    transition: all 0.5s;
  }

  .down-enter {
    transform: translateY(100%);
  }

  .down-leave {
    transform: translateY(0);
  }

  .up-enter-active {
    transform: translateY(0);
    transition: all 0.5s ease;
  }

  .up-leave-active {
    transform: translateY(100%);
    transition: all 0.5s ease;
  }

  .up-enter {
    transform: translateY(-100%);
  }

  .up-leave {
    transform: translateY(50%);
  }

</style>
