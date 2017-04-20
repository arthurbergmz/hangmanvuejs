webpackJsonp([1],{25:function(t,o,e){"use strict";var i=e(15),r=e(70),s=e(65),a=e.n(s),n=e(66),h=e.n(n);i.a.use(r.a),o.a=new r.a({routes:[{path:"/",name:"Home",component:a.a},{path:"/:dictionary",name:"Room",component:h.a}]})},26:function(t,o,e){e(64);var i=e(14)(e(30),e(69),null,null);t.exports=i.exports},29:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var i=e(15),r=e(27),s=e.n(r),a=e(28),n=e.n(a),h=e(26),c=e.n(h),u=e(25);i.a.config.productionTip=!1,i.a.use(s.a),i.a.use(n.a),new i.a({el:"#app",router:u.a,template:"<App/>",components:{App:c.a}})},30:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={name:"app"}},31:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={name:"Home",mounted:function(){this.fetchRoom()},methods:{fetchRoom:function(){var t=this;setTimeout(function(){t.$router.push("play")},Math.floor(1e3*Math.random())+500)}}}},32:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var i=e(33),r=e.n(i);o.default={name:"Room",data:function(){return{dictionary:null,score:0,room:{category:"",hint:0,hints:[],changeHintAt:1,word:"",found:"",unavailable:"qwertyuiopasdfghjklzxcvbnm",fails:0,finished:!1},word:[],keyboard:["qwertyuiop".split(""),"asdfghjkl".split(""),"zxcvbnm".split("")]}},created:function(){this.fetchRoom()},methods:{getBackgroundColor:function(){return{victory:this.room.fails===-1,fails0:0===this.room.fails,fails1:1===this.room.fails,fails2:2===this.room.fails,fails3:3===this.room.fails,fails4:4===this.room.fails,fails5:5===this.room.fails,fails6:6===this.room.fails}},isUnavailable:function(t){return this.room.unavailable.indexOf(t)!==-1},fetchRoom:function(){var t=this;null===this.dictionary?this.$http.get("/hangmanvuejs/static/dictionary/"+this.$router.currentRoute.params.dictionary+".json").then(function(o){t.dictionary=o.data,t.setupRoom()}).catch(function(){alert("Dictionary not found!"),t.$router.push("/")}):this.setupRoom(this.dictionary)},setupRoom:function(){var t=this.dictionary.splice(Math.floor(Math.random()*this.dictionary.length),1)[0];this.room.category=t.category,this.room.hint=0,this.room.hints=t.hints;var o=t.hints.length;this.room.changeHintAt=o>1?6/o:0,this.room.word=t.word.toLowerCase(),this.room.found="",this.room.unavailable="",this.room.fails=0,this.room.finished=!1,this.updateWord()},updateWord:function(){var t=this.room.word.split(""),o=[],e=!0,i=!1,s=void 0;try{for(var a,n=r()(t);!(e=(a=n.next()).done);e=!0){var h=a.value;o.push("-"===h||" "===h?h:this.room.found.indexOf(h)===-1?"":h)}}catch(t){i=!0,s=t}finally{try{!e&&n.return&&n.return()}finally{if(i)throw s}}this.word=o},pushLetter:function(t){this.isUnavailable(t)||(this.room.unavailable+=t,this.hasLetter(t)?(this.$refs.correct.play(),this.room.found+=this.getLetters(t),this.updateWord()):(this.$refs.fail.play(),++this.room.fails%this.room.changeHintAt==0&&++this.room.hint),this.checkGameStatus())},checkGameStatus:function(){var t=this;if(5===this.room.fails)this.$refs.heartbeat.play();else if(6===this.room.fails)return this.$refs.heartbeat.pause(),this.$refs.gameover.play(),this.word=this.room.word.split(""),this.room.hints[this.room.hint]="You got hanged.",this.room.finished=!0,void this.resetGame();this.word.join("")!==this.room.word||this.room.finished||(this.$refs.heartbeat.pause(),this.$refs.victory.play(),this.room.hints[this.room.hint]="Correct!",this.score+=6-this.room.fails,this.room.fails=-1,this.room.finished=!0,0===this.dictionary.length?(this.room.hints[this.room.hint]="Game over! Score: "+this.score,this.resetGame()):setTimeout(function(){t.fetchRoom()},1500))},resetGame:function(){var t=this;setTimeout(function(){confirm("Do you want to start a new game?")&&setTimeout(function(){t.fetchRoom()},250)},1500)},getLetters:function(t){switch(t){case"a":return"aàáâãä";case"e":return"eèéêë";case"i":return"iìíîï";case"o":return"oòóôõö";case"u":return"uùúûü";default:return t}},hasLetter:function(t){for(var o=this.getLetters(t),e=o.length,i=0;i<e;++i)if(this.room.word.indexOf(o[i])!==-1)return!0;return!1}}}},63:function(t,o){},64:function(t,o){},65:function(t,o,e){e(63);var i=e(14)(e(31),e(67),null,null);t.exports=i.exports},66:function(t,o,e){var i=e(14)(e(32),e(68),null,null);t.exports=i.exports},67:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{attrs:{id:"loading-screen"}},[e("p",{staticClass:"lazy-load"}),t._v(" "),e("span",[t._v("Loading...")])])}]}},68:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{attrs:{id:"room"}},[e("section",{class:t.getBackgroundColor(),attrs:{id:"scenario"}},[e("div",{attrs:{id:"roomHint"}},[e("h1",[t._v(t._s(this.room.hints[this.room.hint]))]),t._v(" "),e("h2",{directives:[{name:"show",rawName:"v-show",value:t.room.fails>=0&&t.room.fails<6,expression:"room.fails >= 0 && room.fails < 6"}]},[t._v("You have "+t._s(6-t.room.fails)+" chances left.")])]),t._v(" "),e("div",{attrs:{id:"game"}},[t._l(t.word,function(o){return[e("div",{class:{letters:!0,blankspace:" "===o}},[e("h2",[t._v(t._s(o))])])]})],2)]),t._v(" "),e("section",{class:t.getBackgroundColor(),attrs:{id:"keyboard"}},[t._l(t.keyboard,function(o){return[e("div",{staticClass:"keyLine"},[t._l(o,function(o){return[e("button",{directives:[{name:"shortkey",rawName:"v-shortkey.once",value:[o],expression:"[key]",modifiers:{once:!0}}],attrs:{disabled:t.isUnavailable(o)||t.room.finished},on:{shortkey:function(e){t.pushLetter(o)},click:function(e){t.pushLetter(o)}}},[t._v(t._s(o))])]})],2)]})],2),t._v(" "),e("audio",{ref:"heartbeat",attrs:{src:"/hangmanvuejs/static/332808_loudernoises_heartbeat-100bpm.wav",autostart:"false",loop:"true",hidden:""}}),t._v(" "),e("audio",{ref:"victory",attrs:{src:"/hangmanvuejs/static/325805_wagna_collect.wav",autostart:"false",hidden:""}}),t._v(" "),e("audio",{ref:"gameover",attrs:{src:"/hangmanvuejs/static/382310_myfox14_game-over-arcade.wav",autostart:"false",hidden:""}}),t._v(" "),e("audio",{ref:"correct",attrs:{src:"/hangmanvuejs/static/336934_shnur_coin7.wav",autostart:"false",hidden:""}}),t._v(" "),e("audio",{ref:"fail",attrs:{src:"/hangmanvuejs/static/173958_fins_failure.wav",autostart:"false",hidden:""}})])},staticRenderFns:[]}},69:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("transition",{attrs:{name:"fade",mode:"out-in"}},[e("router-view")],1)},staticRenderFns:[]}},73:function(t,o){}},[29]);
//# sourceMappingURL=app.5873b8196609b0fcce99.js.map