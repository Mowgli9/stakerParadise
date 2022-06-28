"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[651],{42651:function(n,e,t){t.r(e),t.d(e,{OpenloginAdapter:function(){return w},getOpenloginDefaultOptions:function(){return N}});var i=t(74165),r=t(15861),o=t(15671),a=t(43144),s=t(97326),c=t(11752),h=t(61120),u=t(60136),l=t(29388),p=t(84339),g=t(87485),f=t(4942),d=t(79305),v=t.n(d),y=t(62649),C=t.n(y),N=function(n,e){return{adapterSettings:{network:p.dr.MAINNET,clientId:"",uxMode:p.$e.POPUP},chainConfig:n?(0,g.h2)(n,e):void 0,loginSettings:{relogin:!0}}};function P(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}function O(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?P(Object(t),!0).forEach((function(e){(0,f.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):P(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var w=function(n){(0,u.Z)(d,n);var e=(0,l.Z)(d);function d(n){var t,i,r,a;(0,o.Z)(this,d),t=e.call(this),(0,f.Z)((0,s.Z)(t),"name",g.rW.OPENLOGIN),(0,f.Z)((0,s.Z)(t),"adapterNamespace",g.yk.MULTICHAIN),(0,f.Z)((0,s.Z)(t),"type",g.hN.IN_APP),(0,f.Z)((0,s.Z)(t),"openloginInstance",null),(0,f.Z)((0,s.Z)(t),"status",g.MP.NOT_READY),(0,f.Z)((0,s.Z)(t),"currentChainNamespace",g.EN.EIP155),(0,f.Z)((0,s.Z)(t),"openloginOptions",void 0),(0,f.Z)((0,s.Z)(t),"loginSettings",{}),(0,f.Z)((0,s.Z)(t),"privKeyProvider",null),C().debug("const openlogin adapter",n);var c=N(null===(i=n.chainConfig)||void 0===i?void 0:i.chainNamespace,null===(r=n.chainConfig)||void 0===r?void 0:r.chainId);if(t.openloginOptions=O(O({clientId:"",network:p.dr.MAINNET},c.adapterSettings),n.adapterSettings||{}),t.loginSettings=O(O({},c.loginSettings),n.loginSettings),null!==(a=n.chainConfig)&&void 0!==a&&a.chainNamespace){var h;t.currentChainNamespace=null===(h=n.chainConfig)||void 0===h?void 0:h.chainNamespace;var u=c.chainConfig?c.chainConfig:{};if(t.chainConfig=O(O({},u),null===n||void 0===n?void 0:n.chainConfig),C().debug("const openlogin chainConfig",t.chainConfig),!t.chainConfig.rpcTarget)throw g.Ty.invalidParams("rpcTarget is required in chainConfig")}return t}return(0,a.Z)(d,[{key:"chainConfigProxy",get:function(){return this.chainConfig?O({},this.chainConfig):null}},{key:"provider",get:function(){var n;return(null===(n=this.privKeyProvider)||void 0===n?void 0:n.provider)||null},set:function(n){throw new Error("Not implemented")}},{key:"init",value:function(){var n=(0,r.Z)((0,i.Z)().mark((function n(e){var t,r,o;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if((0,c.Z)((0,h.Z)(d.prototype),"checkInitializationRequirements",this).call(this),null!==(t=this.openloginOptions)&&void 0!==t&&t.clientId){n.next=3;break}throw g.Ty.invalidParams("clientId is required before openlogin's initialization");case 3:if(this.chainConfig){n.next=5;break}throw g.Ty.invalidParams("chainConfig is required before initialization");case 5:return this.openloginInstance=new p.ZP(this.openloginOptions),r=(0,p.Gv)(),o=!0,Object.keys(r).length>0&&r.result&&(o=!0),n.next=11,this.openloginInstance.init();case 11:if(this.status=g.MP.READY,this.emit(g.n2.READY,g.rW.OPENLOGIN),n.prev=13,!this.openloginInstance.privKey||!e.autoConnect&&!o){n.next=17;break}return n.next=17,this.connect();case 17:n.next=23;break;case 19:n.prev=19,n.t0=n.catch(13),C().error("Failed to connect with cached openlogin provider",n.t0),this.emit("ERRORED",n.t0);case 23:case"end":return n.stop()}}),n,this,[[13,19]])})));return function(e){return n.apply(this,arguments)}}()},{key:"connect",value:function(){var n=(0,r.Z)((0,i.Z)().mark((function n(e){return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(0,c.Z)((0,h.Z)(d.prototype),"checkConnectionRequirements",this).call(this),this.status=g.MP.CONNECTING,this.emit(g.n2.CONNECTING,O(O({},e),{},{adapter:g.rW.OPENLOGIN})),n.prev=3,n.next=6,this.connectWithProvider(e);case 6:return n.abrupt("return",this.provider);case 9:if(n.prev=9,n.t0=n.catch(3),C().error("Failed to connect with openlogin provider",n.t0),this.status=g.MP.READY,this.emit(g.n2.ERRORED,n.t0),null===n.t0||void 0===n.t0||!n.t0.message.includes("user closed popup")){n.next=16;break}throw g.RM.popupClosed();case 16:throw g.RM.connectionError("Failed to login with openlogin");case 17:case"end":return n.stop()}}),n,this,[[3,9]])})));return function(e){return n.apply(this,arguments)}}()},{key:"disconnect",value:function(){var n=(0,r.Z)((0,i.Z)().mark((function n(){var e,t=arguments;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e=t.length>0&&void 0!==t[0]?t[0]:{cleanup:!1},this.status===g.MP.CONNECTED){n.next=3;break}throw g.RM.notConnectedError("Not connected with wallet");case 3:if(this.openloginInstance){n.next=5;break}throw g.Ty.notReady("openloginInstance is not ready");case 5:return n.next=7,this.openloginInstance.logout();case 7:e.cleanup?(this.status=g.MP.NOT_READY,this.openloginInstance=null,this.privKeyProvider=null):this.status=g.MP.READY,this.emit(g.n2.DISCONNECTED);case 9:case"end":return n.stop()}}),n,this)})));return function(){return n.apply(this,arguments)}}()},{key:"getUserInfo",value:function(){var n=(0,r.Z)((0,i.Z)().mark((function n(){var e;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(this.status===g.MP.CONNECTED){n.next=2;break}throw g.RM.notConnectedError("Not connected with wallet");case 2:if(this.openloginInstance){n.next=4;break}throw g.Ty.notReady("openloginInstance is not ready");case 4:return n.next=6,this.openloginInstance.getUserInfo();case 6:return e=n.sent,n.abrupt("return",e);case 8:case"end":return n.stop()}}),n,this)})));return function(){return n.apply(this,arguments)}}()},{key:"setAdapterSettings",value:function(n){if(this.status!==g.MP.READY){var e=N();this.openloginOptions=O(O(O({},e.adapterSettings),this.openloginOptions||{}),n)}}},{key:"setChainConfig",value:function(n){(0,c.Z)((0,h.Z)(d.prototype),"setChainConfig",this).call(this,n),this.currentChainNamespace=n.chainNamespace}},{key:"connectWithProvider",value:function(){var n=(0,r.Z)((0,i.Z)().mark((function n(e){var r,o,a,s,c,h,u;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(this.chainConfig){n.next=2;break}throw g.Ty.invalidParams("chainConfig is required before initialization");case 2:if(this.openloginInstance){n.next=4;break}throw g.Ty.notReady("openloginInstance is not ready");case 4:if(this.currentChainNamespace!==g.EN.SOLANA){n.next=12;break}return n.next=7,Promise.all([t.e(480),t.e(889),t.e(550),t.e(23)]).then(t.bind(t,15550));case 7:r=n.sent,o=r.SolanaPrivateKeyProvider,this.privKeyProvider=new o({config:{chainConfig:this.chainConfig}}),n.next=21;break;case 12:if(this.currentChainNamespace!==g.EN.EIP155){n.next=20;break}return n.next=15,Promise.all([t.e(480),t.e(562),t.e(643)]).then(t.bind(t,27562));case 15:a=n.sent,s=a.EthereumPrivateKeyProvider,this.privKeyProvider=new s({config:{chainConfig:this.chainConfig}}),n.next=21;break;case 20:throw new Error("Invalid chainNamespace: ".concat(this.currentChainNamespace," found while connecting to wallet"));case 21:if(this.openloginInstance.privKey||!e){n.next=24;break}return n.next=24,this.openloginInstance.login(v()(this.loginSettings,{loginProvider:e.loginProvider},{extraLoginOptions:{login_hint:null===e||void 0===e?void 0:e.login_hint}}));case 24:if(!(c=this.openloginInstance.privKey)){n.next=36;break}if(this.currentChainNamespace!==g.EN.SOLANA){n.next=32;break}return n.next=29,Promise.all([t.e(889),t.e(508)]).then(t.bind(t,80834));case 29:h=n.sent,u=h.getED25519Key,c=u(c).sk.toString("hex");case 32:return n.next=34,this.privKeyProvider.setupProvider(c);case 34:this.status=g.MP.CONNECTED,this.emit(g.n2.CONNECTED,{adapter:g.rW.OPENLOGIN,reconnected:!e});case 36:case"end":return n.stop()}}),n,this)})));return function(e){return n.apply(this,arguments)}}()}]),d}(g.J5)}}]);