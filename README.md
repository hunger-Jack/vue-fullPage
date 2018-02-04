# 使用vue做一个全屏轮播的demo，使用鼠标滑轮触发轮播，监听wheel事件，通过deltaY判断往上滑动还是往下滑动。
# 容易出错的地方
+ transition-group使用v-for的时候必须写上key
+ 滑动到第一个或者最后一个再往下或者往上滑动会出现空白，这时候要分别对向上或者向下做判断，如果是是最后一个或者第一个直接return
+ 官方给了transitionend监听事件，监听是否一个过渡已完成，一进一出算一个过渡，所以如果在监听事件内部log,每个过渡会输入两次。
通过一个变量canWheel控制是否一个过渡已完成。
+ 然后会发现，滑动到第一个或者最后一个突然不能滑动了。我们要在第一个和最后一次判断的时候把canWheel设为true。但是之后还是会出现卡死现象，我使用小trick解决了，测试中没有发现卡顿现象。

# 设计的概念知识点
+ transition-group: tag name
+ transition js hook
+ transitioned事件监听
+ 组件封装
+ slot
+ 组件通讯
	1. 父子通讯：父 ==> 子 用props     子 ==> 父 用event
	2. 兄弟通讯：简单用bus，负责用vuex
	3. vuex
	4. slot


