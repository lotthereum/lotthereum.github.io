function Lotthereum(){this.contract=web3.eth.contract([{constant:!1,inputs:[{name:"gameId",type:"uint256"}],name:"openGame",outputs:[{name:"",type:"bool"}],payable:!1,type:"function"},{constant:!1,inputs:[{name:"gameId",type:"uint256"},{name:"bet",type:"uint8"}],name:"placeBet",outputs:[{name:"",type:"bool"}],payable:!0,type:"function"},{constant:!0,inputs:[],name:"getBalance",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!1,inputs:[{name:"gameId",type:"uint256"}],name:"closeGame",outputs:[{name:"",type:"bool"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"_a",type:"bytes32"}],name:"getNumber",outputs:[{name:"",type:"uint8"}],payable:!1,type:"function"},{constant:!1,inputs:[],name:"withdraw",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!1,inputs:[],name:"kill",outputs:[],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"}],name:"getGameRoundOpen",outputs:[{name:"",type:"bool"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"}],name:"getRoundPointer",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[],name:"numberOfClosedGames",outputs:[{name:"numberOfClosedGames",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getGameMinAmountByBet",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"}],name:"getRoundNumberOfBets",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"},{name:"betId",type:"uint256"}],name:"getRoundBetOrigin",outputs:[{name:"",type:"address"}],payable:!1,type:"function"},{constant:!1,inputs:[{name:"pointer",type:"uint256"},{name:"maxNumberOfBets",type:"uint256"},{name:"minAmountByBet",type:"uint256"},{name:"prize",type:"uint256"}],name:"createGame",outputs:[{name:"id",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[],name:"getGames",outputs:[{name:"ids",type:"uint256[]"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"}],name:"getRoundNumber",outputs:[{name:"",type:"uint8"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getGameCurrentRoundId",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"},{name:"betId",type:"uint256"}],name:"getRoundBetNumber",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getGameMaxNumberOfBets",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getPointer",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getGamePrize",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"i",type:"uint256"}],name:"getBlockHash",outputs:[{name:"blockHash",type:"bytes32"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"},{name:"betId",type:"uint256"}],name:"getRoundBetAmount",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{payable:!0,type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"},{indexed:!0,name:"roundId",type:"uint256"}],name:"RoundOpen",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"},{indexed:!0,name:"roundId",type:"uint256"},{indexed:!1,name:"number",type:"uint8"}],name:"RoundClose",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"maxNumberOfBets",type:"uint256"}],name:"MaxNumberOfBetsChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"minAmountByBet",type:"uint256"}],name:"MinAmountByBetChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"},{indexed:!0,name:"roundId",type:"uint256"},{indexed:!0,name:"origin",type:"address"},{indexed:!1,name:"betId",type:"uint256"}],name:"BetPlaced",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"},{indexed:!0,name:"roundId",type:"uint256"},{indexed:!0,name:"winnerAddress",type:"address"},{indexed:!1,name:"amount",type:"uint256"}],name:"RoundWinner",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"}],name:"GameOpened",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"}],name:"GameClosed",type:"event"}]),this.contractInstance=this.contract.at(window.contract_address),this.modalIntro=0,this.tabbed=0,this.selectedGame=0,this.eventsInitialized=!1,this.games=[];var e=this;this.init=function(){async.waterfall([function(n){e.contractInstance.getGames(function(t,a){for(var i=a.valueOf(),o=0;o<i.length;o++)e.games.push(new Game(e,o)),e.addGamePlaceHolder(o);n(t,e.games)})}],function(e){})},this.isInitialized=function(n,t){var a=!1;return e.games[n]&&e.games[n].rounds[t]&&++e.games[n].rounds[t].rendered>=e.games[n].rounds[t].numberOfBets&&(e.games[n].rounds[t].initialized=!0,a=!0),a&&(e.renderRound(n,t),e.eventsInitialized||(e.eventsInitialized=!0,this.initEvents(),e.games[n].rounds[t].payload&&e.games[n].rounds[t].payload.select&&$("ul.tabs").tabs("select_tab","#game_"+e.gameId+"_holder"))),a},this.areAllRoundsInitialed=function(){for(var n=!0,t=0;t<=e.currentRoundId;t++)0==e.rounds[t].initialized&&(n=!1);return n},this.placeBet=function(n,t){var a=1e18*e.games[n].minAmount;e.contractInstance.placeBet(n,t,{from:e.account,value:a,gas:5e5},function(e,n){e||($("#bet-btn").addClass("disabled"),Materialize.fadeInImage("#confirmations"))})},this.withdraw=function(){e.contractInstance.withdraw({from:e.account,gas:5e5},function(e,n){$("#withdraw-btn").addClass("disabled"),$("#withdraw-transaction-id").html(n),Materialize.fadeInImage("#withdraw-confirmations")})},this.initAccounts=function(){e.accounts=[],e.account=null,web3.eth.getAccounts(function(n,t){var a=null;t.forEach(function(e){null==a&&(a=e),$("#dropdown-nav").append('<li class="valign-wrapper"><a href="#!'+e+'" class="accounts_dropdown_item"><div class="eth-address square">'+e+"</div> "+e+"</a></li>")}),null!=a?(e.changeAccount(a),$("#avatar").css("display","block")):$("#alert1").modal("open"),$("select").material_select(),$(".accounts_dropdown_item").click(function(){var n=$(this).attr("href").replace("#!","");e.changeAccount(n)})})},this.changeAccount=function(n){e.account=n,e.renderAvatar(e.account),$("#current_account_number").html(e.account),e.getBalance()},this.getBalance=function(){e.contractInstance.getBalance({from:e.account},function(e,n){var t=web3.fromWei(n.valueOf(),"ether");$("#current_account_balance").html(t+" ETH"),t<=0?$("#withdraw-btn").addClass("disabled"):$("#withdraw-btn").removeClass("disabled")})},this.initEvents=function(){var n=0;web3.eth.getBlockNumber(function(e,t){e||(n=t)});var t={fromBlock:n,toBlock:"latest"};e.betPlacedEvent=e.contractInstance.BetPlaced(t),e.betPlacedEvent.watch(e.betPlaced),e.roundCloseEvent=e.contractInstance.RoundClose(t),e.roundCloseEvent.watch(e.roundClose),e.roundOpenEvent=e.contractInstance.RoundOpen(t),e.roundOpenEvent.watch(e.roundOpen),e.roundWinnerEvent=e.contractInstance.RoundWinner(t),e.roundWinnerEvent.watch(e.roundWinner)},this.roundClose=function(e,n){Materialize.toast("Game #"+n.args.gameId+"  Round #"+n.args.roundId+" closed!",5e3,"rounded")},this.roundOpen=function(n,t){Materialize.toast("Game #"+t.args.gameId+"  Round #"+t.args.roundId+" opened!",5e3,"rounded"),e.games[t.args.gameId].init()},this.betPlaced=function(n,t){n||(t.args.origin==e.account&&($("#bet-modal").modal("close"),$("#bet-btn").removeClass("disabled"),$("#confirmations").css("opacity",0)),Materialize.toast("New bet placed",5e3,"rounded"),e.games[t.args.gameId].rounds[t.args.roundId].init({select:!0}))},this.roundWinner=function(n,t){Materialize.toast("Round winner "+t.args.winnerAddress,5e3,"rounded"),e.getBalance()},this.renderRound=function(n,t){var a=e.games[n],i=e.games[n].rounds[t];$("#rounds_"+n+" #round_"+t+"_holder").html("");var o=$("#round_template").html();if(o=o.replace(/{round_id}/g,t),i.open){o=o.replace(">lock<",">lock_open<"),o=o.replace("{color}","blue");var u=$("#bet_button_template").html().replace("{game_id}",n);o=o.replace("{betButton}",u)}else o=o.replace("{color}","grey lighten-1");o=o.replace(/{prize}/g,a.prize),o=o.replace("{minAmount}",a.minAmount),o=o.replace("{minAmount}",a.minAmount),o=o.replace("{numberOfBets}",a.numberOfBets),o=o.replace("{remaining}",i.remaining),o=o.replace(/{progress}/g,i.progress);for(var s="",r=!1,c=i.bets.length-1;c>=0;c--){var d=$("#bet_template").html();i.open||i.bets[c].bet!=i.number?d=d.replace(" {win}",""):(d=d.replace(" {win}"," green lighten-3"),r=!0),d=d.replace(/{bet_id}/g,i.bets[c].id),d=d.replace(/{origin}/g,i.bets[c].origin),d=d.replace(/{amount}/g,i.bets[c].amount),s+=d}if(o=o.replace("{bets}",s),!i.open){var m=$("#bet_number_template").html().replace(/{number}/g,i.number);r?(m=m.replace("{color}","green"),o=o.replace("{betButton}",m)):(m=m.replace("{color}","red"),o=o.replace("{betButton}",m))}$("#rounds_"+n+" #round_"+t+"_holder").html(o),$("#rounds_"+n+" #round_"+t+"_progress").css("width",i.progress+"%"),e.areAllRoundsInitialed()&&(this.renderTabs(),e.stopLoading())},this.addGamePlaceHolder=function(e){var n=$("#game_placeholder_template").html();n=n.replace(/{game_id}/g,e),$("#games-container").append(n)},this.addRoundPlaceHolder=function(e,n){var t=$("#round_placeholder_template").html();t=t.replace(/{round_id}/g,n),$("#rounds_"+e).prepend(t)},this.stopLoading=function(){e.renderAllIdenticons(),$("#loading").hide(),$(".page-footer").css("display","block"),$(".main-container").css("display","block"),$(".navbar-fixed").css("display","block"),$(".nav-wrapper").css("background","#2196F3")},this.startLoading=function(){$("#loading").show(),$(".page-footer").css("display","none"),$(".main-container").css("display","none"),$(".navbar-fixed").css("display","none"),$(".nav-wrapper").css("background","white")},this.renderIdenticon=function(e){e.style.backgroundImage="url("+blockies.create({seed:e.innerHTML.toLowerCase(),size:8,scale:16}).toDataURL()+")"},this.renderAllIdenticons=function(){$(".eth-address").each(function(n,t){e.renderIdenticon(t)})},this.initUIElements=function(){$(document).ready(function(){$(".target").pushpin({top:0,bottom:1e3,offset:0}),$("#bet-btn").click(function(){var n=parseInt($("input[name=bet_pick]:checked").val());n<=9&&n>=0&&e.placeBet(e.selectedGame,$("input[name=bet_pick]:checked").val())}),$("#withdraw-btn").click(function(){e.withdraw()}),$("#close-intro-btn").click(function(){$("#intro").css("display","none")}),$("#close-intro-btn").click(function(){$("#intro").css("display","none")}),$("#logo-btn").click(function(){$("ul.tabs").tabs("select_tab","intro1")}),$("#place-your-bet").click(function(){$("ul.tabs").tabs("select_tab","game_4_holder")}),$(window).scroll(function(){var e=1-$(window).scrollTop()/70;e<0&&(e=0),$(".tabs").css("opacity",e)}),$(".modal").modal(),$(".tooltipped").tooltip({delay:60}),$(".main-container").css("display","block")})},this.renderAvatar=function(n){$("#avatar").html(n),$("#avatar").each(function(n,t){e.renderIdenticon(t)})},this.renderTabs=function(){if(++e.tabbed<=1){$("#tabs").html('<li class="tab col s2"><a class="active" href="#intro1">Lotthereum</a></li>');for(var n=this.games.length-1;n>=0;n--)$("#tabs").append('<li class="tab col s2"><a href="#game_'+this.games[n].id+'_holder">'+this.games[n].minAmount+" ETH</a></li>");$("#tabs").append('<li class="tab col s2"><a href="#withdraw"><span class="new badge balance" data-badge-caption="ETH"></span>Withdraw</a></li>'),$("#tabs").tabs({swipeable:!1,onShow:function(n){e.selectedGame=0;var t=parseInt(n.selector.replace("#game_","").replace("_holder",""));t>=0&&(e.selectedGame=t)}})}},this.init(),this.initAccounts(),this.initUIElements()}function Game(e,n){this.id=n,this.lotthereum=e,this.contractInstance=e.contractInstance,this.rounds=[],this.currentRoundId=0,this.minAmount=0,this.maxNumber=0,this.numberOfBets=0,this.prize=0,this.remaining=0,this.progress=0,this.number=-1,this.tabbed=0,this.rounds=[];var t=this;this.init=function(){t.rounds=[],$("#rounds_"+t.id).html(""),async.waterfall([function(e){t.contractInstance.getGameCurrentRoundId(t.id,function(n,a){t.currentRoundId=a.valueOf(),e(n,a.valueOf())})},function(e,n){t.contractInstance.getGamePrize(t.id,function(e,a){t.prize=web3.fromWei(a.valueOf(),"ether"),n(e,a.valueOf())})},function(e,n){t.contractInstance.getGameMinAmountByBet(t.id,function(e,a){t.minAmount=web3.fromWei(a.valueOf(),"ether"),n(e,t.minAmount)})},function(e,n){t.contractInstance.getGameMaxNumberOfBets(t.id,function(e,a){t.maxNumber=a.valueOf(),n(e,a.valueOf())})},function(e,n){for(var a=0;a<=t.currentRoundId;a++)t.rounds.push(new Round(t,a)),t.lotthereum.addRoundPlaceHolder(t.id,a);n(null,t.currentRoundId)}],function(e){})},this.init()}function Round(e,n){this.id=n,this.game=e,this.gameId=e.id,this.lotthereum=e.lotthereum,this.contractInstance=e.lotthereum.contractInstance,this.initialized=!1,this.rendered=0,this.tabbed=0;var t=this;this.init=function(e){t.payload=e,t.open=!1,t.remaining=0,t.progress=0,t.number=-1,t.bets=[],async.waterfall([function(e){t.contractInstance.getGameRoundOpen(t.game.id,t.id,function(n,a){t.open=a.valueOf(),e(n,a.valueOf())})},function(e,n){t.contractInstance.getRoundNumber(t.game.id,t.id,function(e,a){t.number=a.valueOf(),n(e,t.number)})},function(e,n){t.contractInstance.getRoundNumberOfBets(t.game.id,t.id,function(e,a){t.numberOfBets=a.valueOf(),t.remaining=parseInt(t.game.maxNumber)-parseInt(t.numberOfBets),t.progress=parseFloat(100*t.numberOfBets/t.game.maxNumber).toString();for(var i=t.numberOfBets-1;i>=0;i--)t.bets.push(new Bet(t,i));t.numberOfBets<1&&(t.initialized=!0,t.lotthereum.isInitialized(t.gameId,t.id)),n(e,a.valueOf())})}],function(e){})},this.init()}function Bet(e,n){this.id=n,this.roundId=e.id,this.round=e,this.contractInstance=e.contractInstance,this.lotthereum=e.lotthereum,this.origin="",this.amount=0,this.bet="",this.transactionId="",this.confirmations=0,this.initialized=!1;var t=this;this.init=function(){async.waterfall([function(e){t.contractInstance.getRoundBetOrigin(t.round.game.id,t.round.id,t.id,function(n,a){t.origin=a.valueOf(),e(n,t.origin)})},function(e,n){t.contractInstance.getRoundBetAmount(t.round.game.id,t.round.id,t.id,function(e,a){t.amount=web3.fromWei(a.valueOf(),"ether"),n(e,t.amount)})},function(e,n){t.contractInstance.getRoundBetNumber(t.round.game.id,t.round.id,t.id,function(e,a){t.bet=a.valueOf(),n(e,t.bet)})},function(e,n){t.initialized=!0,n(null,"done!")}],function(e){e||t.round.game.lotthereum.isInitialized(t.round.game.id,t.round.id)})},this.init()}!function(){function e(e){for(var n=0;n<u.length;n++)u[n]=0;for(var n=0;n<e.length;n++)u[n%4]=(u[n%4]<<5)-u[n%4]+e.charCodeAt(n)}function n(){var e=u[0]^u[0]<<11;return u[0]=u[1],u[1]=u[2],u[2]=u[3],u[3]=u[3]^u[3]>>19^e^e>>8,(u[3]>>>0)/(1<<31>>>0)}function t(){return"hsl("+Math.floor(360*n())+","+(60*n()+40)+"%,"+25*(n()+n()+n()+n())+"%)"}function a(e){for(var t=e,a=e,i=Math.ceil(t/2),o=t-i,u=[],s=0;s<a;s++){for(var r=[],c=0;c<i;c++)r[c]=Math.floor(2.3*n());var d=r.slice(0,o);d.reverse(),r=r.concat(d);for(var m=0;m<r.length;m++)u.push(r[m])}return u}function i(e,n,t,a,i){var o=document.createElement("canvas"),u=Math.sqrt(e.length);o.width=o.height=u*t;var s=o.getContext("2d");s.fillStyle=a,s.fillRect(0,0,o.width,o.height),s.fillStyle=n;for(var r=0;r<e.length;r++){var c=Math.floor(r/u),d=r%u;s.fillStyle=1==e[r]?n:i,e[r]&&s.fillRect(d*t,c*t,t,t)}return o}function o(n){n=n||{};var o=n.size||8,u=n.scale||4;e(n.seed||Math.floor(Math.random()*Math.pow(10,16)).toString(16));var s=n.color||t(),r=n.bgcolor||t(),c=n.spotcolor||t();return i(a(o),s,u,r,c)}var u=new Array(4);window.blockies={create:o}}();