<template>
  <transition-group tag="div" :name="name" mode="in-out" type="transition">
    <div class="page"  v-for="(list,index) in pages" :style="{'background-color':bgColor && bgColor[index] ? bgColor[index] : baseBgc}" :key="index" @wheel="wheelScroll($event)"
      v-show="index === curIndex" @transitionend="end">{{list}}</div>
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
        timer: null
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
        console.log(1111)
        this.count++;
        if (this.count%2 === 0) {//解决有时候滚动时页面卡死现象
          this.canWheel = true
        }
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
