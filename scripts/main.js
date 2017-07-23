function Lotthereum(){this.contract=web3.eth.contract([{constant:!1,inputs:[{name:"gameId",type:"uint256"},{name:"bet",type:"uint8"}],name:"placeBet",outputs:[{name:"",type:"bool"}],payable:!0,type:"function"},{constant:!0,inputs:[],name:"getBalance",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"_a",type:"bytes32"}],name:"getNumber",outputs:[{name:"",type:"uint8"}],payable:!1,type:"function"},{constant:!1,inputs:[],name:"withdraw",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!1,inputs:[],name:"kill",outputs:[],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"}],name:"getGameRoundOpen",outputs:[{name:"",type:"bool"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"}],name:"getRoundPointer",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getGameMinAmountByBet",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"}],name:"getRoundNumberOfBets",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"},{name:"betId",type:"uint256"}],name:"getRoundBetOrigin",outputs:[{name:"",type:"address"}],payable:!1,type:"function"},{constant:!1,inputs:[{name:"pointer",type:"uint256"},{name:"maxNumberOfBets",type:"uint256"},{name:"minAmountByBet",type:"uint256"},{name:"prize",type:"uint256"}],name:"createGame",outputs:[{name:"id",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[],name:"getGames",outputs:[{name:"ids",type:"uint256[]"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"}],name:"getRoundNumber",outputs:[{name:"",type:"uint8"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getGameCurrentRoundId",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"},{name:"betId",type:"uint256"}],name:"getRoundBetNumber",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getGameMaxNumberOfBets",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getPointer",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"}],name:"getGamePrize",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"i",type:"uint256"}],name:"getBlockHash",outputs:[{name:"blockHash",type:"bytes32"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"gameId",type:"uint256"},{name:"roundId",type:"uint256"},{name:"betId",type:"uint256"}],name:"getRoundBetAmount",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{payable:!0,type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"},{indexed:!0,name:"roundId",type:"uint256"}],name:"RoundOpen",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"},{indexed:!0,name:"roundId",type:"uint256"},{indexed:!1,name:"number",type:"uint8"}],name:"RoundClose",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"maxNumberOfBets",type:"uint256"}],name:"MaxNumberOfBetsChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"minAmountByBet",type:"uint256"}],name:"MinAmountByBetChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"},{indexed:!0,name:"roundId",type:"uint256"},{indexed:!0,name:"origin",type:"address"},{indexed:!1,name:"betId",type:"uint256"}],name:"BetPlaced",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"gameId",type:"uint256"},{indexed:!0,name:"roundId",type:"uint256"},{indexed:!0,name:"winnerAddress",type:"address"},{indexed:!1,name:"amount",type:"uint256"}],name:"RoundWinner",type:"event"}]),this.contractInstance=this.contract.at(window.contract_address),this.modalIntro=0,this.tabbed=0,this.selectedGame=0,this.eventsInitialized=!1,this.games=[];var e=this;this.init=function(){async.waterfall([function(t){e.contractInstance.getGames(function(n,a){for(var i=a.valueOf(),o=0;o<i.length;o++)e.games.push(new Game(e,o)),e.addGamePlaceHolder(o);t(n,e.games)})}],function(e){})},this.isInitialized=function(t,n){var a=!1;return e.games[t]&&e.games[t].rounds[n]&&++e.games[t].rounds[n].rendered>=e.games[t].rounds[n].numberOfBets&&(e.games[t].rounds[n].initialized=!0,a=!0),a&&(e.renderRound(t,n),e.eventsInitialized||(e.eventsInitialized=!0,this.initEvents(),e.games[t].rounds[n].payload&&e.games[t].rounds[n].payload.select&&$("ul.tabs").tabs("select_tab","#game_"+e.gameId+"_holder"))),a},this.areAllRoundsInitialed=function(){for(var t=!0,n=0;n<=e.currentRoundId;n++)0==e.rounds[n].initialized&&(t=!1);return t},this.placeBet=function(t,n){var a=1e18*e.games[t].minAmount;e.contractInstance.placeBet(t,n,{from:e.account,value:a,gas:5e5},function(e,t){e||($("#bet-btn").addClass("disabled"),Materialize.fadeInImage("#confirmations"))})},this.withdraw=function(){e.contractInstance.withdraw({from:e.account,gas:5e5},function(e,t){$("#withdraw-btn").addClass("disabled"),$("#withdraw-transaction-id").html(t),Materialize.fadeInImage("#withdraw-confirmations")})},this.initAccounts=function(){e.accounts=[],e.account=null,web3.eth.getAccounts(function(t,n){var a=null;n.forEach(function(e){null==a&&(a=e),$("#dropdown-nav").append('<li class="valign-wrapper"><a href="#!'+e+'" class="accounts_dropdown_item"><div class="eth-address square">'+e+"</div> "+e+"</a></li>")}),null!=a?(e.changeAccount(a),$("#avatar").css("display","block")):$("#alert1").modal("open"),$("select").material_select(),$(".accounts_dropdown_item").click(function(){var t=$(this).attr("href").replace("#!","");e.changeAccount(t)})})},this.changeAccount=function(t){e.account=t,e.renderAvatar(e.account),e.contractInstance.getBalance({from:e.account},function(e,t){var n=web3.fromWei(t.valueOf(),"ether");$("#current_account_balance").html(n+" ETH")}),$("#current_account_number").html(e.account)},this.initEvents=function(){var t=0;web3.eth.getBlockNumber(function(e,n){e||(t=n)});var n={fromBlock:t,toBlock:"latest"};e.betPlacedEvent=e.contractInstance.BetPlaced(n),e.betPlacedEvent.watch(e.betPlaced),e.roundCloseEvent=e.contractInstance.RoundClose(n),e.roundCloseEvent.watch(e.roundClose),e.roundOpenEvent=e.contractInstance.RoundOpen(n),e.roundOpenEvent.watch(e.roundOpen),e.roundWinnerEvent=e.contractInstance.RoundWinner(n),e.roundWinnerEvent.watch(e.roundWinner)},this.roundClose=function(e,t){Materialize.toast("Game #"+t.args.gameId+"  Round #"+t.args.roundId+" closed!",5e3,"rounded")},this.roundOpen=function(t,n){Materialize.toast("Game #"+n.args.gameId+"  Round #"+n.args.roundId+" opened!",5e3,"rounded"),e.games[n.args.gameId].init()},this.betPlaced=function(t,n){t||(n.args.origin==e.account&&($("#bet-modal").modal("close"),$("#bet-btn").removeClass("disabled"),$("#confirmations").css("opacity",0)),Materialize.toast("New bet placed",5e3,"rounded"),e.games[n.args.gameId].rounds[n.args.roundId].init({select:!0}))},this.roundWinner=function(e,t){Materialize.toast("Round winner "+t.args.winnerAddress,5e3,"rounded")},this.renderRound=function(t,n){var a=e.games[t],i=e.games[t].rounds[n];$("#rounds_"+t+" #round_"+n+"_holder").html("");var o=$("#round_template").html();if(o=o.replace(/{round_id}/g,n),i.open){o=o.replace(">lock<",">lock_open<"),o=o.replace("{color}","blue");var u=$("#bet_button_template").html().replace("{game_id}",t);o=o.replace("{betButton}",u)}else o=o.replace("{color}","grey lighten-1");o=o.replace(/{prize}/g,a.prize),o=o.replace("{minAmount}",a.minAmount),o=o.replace("{minAmount}",a.minAmount),o=o.replace("{numberOfBets}",a.numberOfBets),o=o.replace("{remaining}",i.remaining),o=o.replace(/{progress}/g,i.progress);for(var r="",s=!1,c=i.bets.length-1;c>=0;c--){var d=$("#bet_template").html();i.open||i.bets[c].bet!=i.number?d=d.replace(" {win}",""):(d=d.replace(" {win}"," green lighten-3"),s=!0),d=d.replace(/{bet_id}/g,i.bets[c].id),d=d.replace(/{origin}/g,i.bets[c].origin),d=d.replace(/{amount}/g,i.bets[c].amount),r+=d}if(o=o.replace("{bets}",r),!i.open){var l=$("#bet_number_template").html().replace(/{number}/g,i.number);s?(l=l.replace("{color}","green"),o=o.replace("{betButton}",l)):(l=l.replace("{color}","red"),o=o.replace("{betButton}",l))}3!=t&&($("#rounds_"+t+" #round_"+n+"_holder").html(o),$("#rounds_"+t+" #round_"+n+"_progress").css("width",i.progress+"%")),e.areAllRoundsInitialed()&&(this.renderTabs(),e.stopLoading())},this.addGamePlaceHolder=function(e){var t=$("#game_placeholder_template").html();t=t.replace(/{game_id}/g,e),$("#games-container").append(t)},this.addRoundPlaceHolder=function(e,t){var n=$("#round_placeholder_template").html();n=n.replace(/{round_id}/g,t),$("#rounds_"+e).prepend(n)},this.stopLoading=function(){e.renderAllIdenticons(),$("#loading").hide(),$(".page-footer").css("display","block"),$(".main-container").css("display","block"),$(".navbar-fixed").css("display","block"),$(".nav-wrapper").css("background","#2196F3")},this.startLoading=function(){$("#loading").show(),$(".page-footer").css("display","none"),$(".main-container").css("display","none"),$(".navbar-fixed").css("display","none"),$(".nav-wrapper").css("background","white")},this.renderIdenticon=function(e){e.style.backgroundImage="url("+blockies.create({seed:e.innerHTML.toLowerCase(),size:8,scale:16}).toDataURL()+")"},this.renderAllIdenticons=function(){$(".eth-address").each(function(t,n){e.renderIdenticon(n)})},this.initUIElements=function(){$(document).ready(function(){$(".target").pushpin({top:0,bottom:1e3,offset:0}),$("#bet-btn").click(function(){var t=parseInt($("input[name=bet_pick]:checked").val());t<=9&&t>=0&&e.placeBet(e.selectedGame,$("input[name=bet_pick]:checked").val())}),$("#withdraw-btn").click(function(){e.withdraw()}),$("#close-intro-btn").click(function(){$("#intro").css("display","none")}),$("#close-intro-btn").click(function(){$("#intro").css("display","none")}),$("#logo-btn").click(function(){$("ul.tabs").tabs("select_tab","intro1")}),$("#place-your-bet").click(function(){$("ul.tabs").tabs("select_tab","game_4_holder")}),$(window).scroll(function(){var e=1-$(window).scrollTop()/70;e<0&&(e=0),$(".tabs").css("opacity",e)}),$(".modal").modal(),$(".tooltipped").tooltip({delay:60}),$(".main-container").css("display","block")})},this.renderAvatar=function(t){$("#avatar").html(t),$("#avatar").each(function(t,n){e.renderIdenticon(n)})},this.renderTabs=function(){if(++e.tabbed<=1){$("#tabs").html('<li class="tab col s2"><a class="active" href="#intro1">Lotthereum</a></li>');for(var t=this.games.length-1;t>=0;t--)3!=t&&$("#tabs").append('<li class="tab col s2"><a href="#game_'+this.games[t].id+'_holder">'+this.games[t].minAmount+" ETH</a></li>");$("#tabs").append('<li class="tab col s2"><a href="#withdraw"><span class="new badge balance" data-badge-caption="ETH"></span>Withdraw</a></li>'),$("#tabs").tabs({swipeable:!1,onShow:function(t){e.selectedGame=0;var n=parseInt(t.selector.replace("#game_","").replace("_holder",""));n>=0&&(e.selectedGame=n)}})}},this.init(),this.initAccounts(),this.initUIElements()}function Game(e,t){this.id=t,this.lotthereum=e,this.contractInstance=e.contractInstance,this.rounds=[],this.currentRoundId=0,this.minAmount=0,this.maxNumber=0,this.numberOfBets=0,this.prize=0,this.remaining=0,this.progress=0,this.number=-1,this.tabbed=0,this.rounds=[];var n=this;this.init=function(){n.rounds=[],$("#rounds_"+n.id).html(""),async.waterfall([function(e){n.contractInstance.getGameCurrentRoundId(n.id,function(t,a){n.currentRoundId=a.valueOf(),e(t,a.valueOf())})},function(e,t){n.contractInstance.getGamePrize(n.id,function(e,a){n.prize=web3.fromWei(a.valueOf(),"ether"),t(e,a.valueOf())})},function(e,t){n.contractInstance.getGameMinAmountByBet(n.id,function(e,a){n.minAmount=web3.fromWei(a.valueOf(),"ether"),t(e,n.minAmount)})},function(e,t){n.contractInstance.getGameMaxNumberOfBets(n.id,function(e,a){n.maxNumber=a.valueOf(),t(e,a.valueOf())})},function(e,t){for(var a=0;a<=n.currentRoundId;a++)n.rounds.push(new Round(n,a)),n.lotthereum.addRoundPlaceHolder(n.id,a);t(null,n.currentRoundId)}],function(e){})},this.init()}function Round(e,t){this.id=t,this.game=e,this.gameId=e.id,this.lotthereum=e.lotthereum,this.contractInstance=e.lotthereum.contractInstance,this.initialized=!1,this.rendered=0,this.tabbed=0;var n=this;this.init=function(e){n.payload=e,n.open=!1,n.remaining=0,n.progress=0,n.number=-1,n.bets=[],async.waterfall([function(e){n.contractInstance.getGameRoundOpen(n.game.id,n.id,function(t,a){n.open=a.valueOf(),e(t,a.valueOf())})},function(e,t){n.contractInstance.getRoundNumber(n.game.id,n.id,function(e,a){n.number=a.valueOf(),t(e,n.number)})},function(e,t){n.contractInstance.getRoundNumberOfBets(n.game.id,n.id,function(e,a){n.numberOfBets=a.valueOf(),n.remaining=parseInt(n.game.maxNumber)-parseInt(n.numberOfBets),n.progress=parseFloat(100*n.numberOfBets/n.game.maxNumber).toString();for(var i=n.numberOfBets-1;i>=0;i--)n.bets.push(new Bet(n,i));n.numberOfBets<1&&(n.initialized=!0,n.lotthereum.isInitialized(n.gameId,n.id)),t(e,a.valueOf())})}],function(e){})},this.init()}function Bet(e,t){this.id=t,this.roundId=e.id,this.round=e,this.contractInstance=e.contractInstance,this.lotthereum=e.lotthereum,this.origin="",this.amount=0,this.bet="",this.transactionId="",this.confirmations=0,this.initialized=!1;var n=this;this.init=function(){async.waterfall([function(e){n.contractInstance.getRoundBetOrigin(n.round.game.id,n.round.id,n.id,function(t,a){n.origin=a.valueOf(),e(t,n.origin)})},function(e,t){n.contractInstance.getRoundBetAmount(n.round.game.id,n.round.id,n.id,function(e,a){n.amount=web3.fromWei(a.valueOf(),"ether"),t(e,n.amount)})},function(e,t){n.contractInstance.getRoundBetNumber(n.round.game.id,n.round.id,n.id,function(e,a){n.bet=a.valueOf(),t(e,n.bet)})},function(e,t){n.initialized=!0,t(null,"done!")}],function(e){e||n.round.game.lotthereum.isInitialized(n.round.game.id,n.round.id)})},this.init()}!function(){function e(e){for(var t=0;t<u.length;t++)u[t]=0;for(var t=0;t<e.length;t++)u[t%4]=(u[t%4]<<5)-u[t%4]+e.charCodeAt(t)}function t(){var e=u[0]^u[0]<<11;return u[0]=u[1],u[1]=u[2],u[2]=u[3],u[3]=u[3]^u[3]>>19^e^e>>8,(u[3]>>>0)/(1<<31>>>0)}function n(){return"hsl("+Math.floor(360*t())+","+(60*t()+40)+"%,"+25*(t()+t()+t()+t())+"%)"}function a(e){for(var n=e,a=e,i=Math.ceil(n/2),o=n-i,u=[],r=0;r<a;r++){for(var s=[],c=0;c<i;c++)s[c]=Math.floor(2.3*t());var d=s.slice(0,o);d.reverse(),s=s.concat(d);for(var l=0;l<s.length;l++)u.push(s[l])}return u}function i(e,t,n,a,i){var o=document.createElement("canvas"),u=Math.sqrt(e.length);o.width=o.height=u*n;var r=o.getContext("2d");r.fillStyle=a,r.fillRect(0,0,o.width,o.height),r.fillStyle=t;for(var s=0;s<e.length;s++){var c=Math.floor(s/u),d=s%u;r.fillStyle=1==e[s]?t:i,e[s]&&r.fillRect(d*n,c*n,n,n)}return o}function o(t){t=t||{};var o=t.size||8,u=t.scale||4;e(t.seed||Math.floor(Math.random()*Math.pow(10,16)).toString(16));var r=t.color||n(),s=t.bgcolor||n(),c=t.spotcolor||n();return i(a(o),r,u,s,c)}var u=new Array(4);window.blockies={create:o}}();