function Round(n,t,e){this.contractInstance=t,this.game=n,this.id=e,this.initialized=!1,this.rendered=0;var a=this;this.init=function(){a.open=!1,a.minAmount=0,a.maxNumber=0,a.numberOfBets=0,a.prize=0,a.remaining=0,a.progress=0,a.number=-1,a.bets=[],async.waterfall([function(n){a.contractInstance.getRoundOpen(a.id,function(t,e){a.open=e.valueOf(),n(t,e.valueOf())})},function(n,t){a.contractInstance.getRoundNumber(a.id,function(n,e){a.number=e.valueOf(),t(n,a.number)})},function(n,t){a.contractInstance.getRoundPrize(a.id,function(n,e){a.prize=web3.fromWei(e.valueOf(),"ether"),t(n,e.valueOf())})},function(n,t){a.contractInstance.getRoundMinAmountByBet(a.id,function(n,e){a.minAmount=web3.fromWei(e.valueOf(),"ether"),t(n,e.valueOf())})},function(n,t){a.contractInstance.getRoundMaxNumberOfBets(a.id,function(n,e){a.maxNumber=e.valueOf(),t(n,e.valueOf())})},function(n,t){a.contractInstance.getRoundNumberOfBets(a.id,function(n,e){a.numberOfBets=e.valueOf(),t(n,e.valueOf())})},function(n,t){a.remaining=parseInt(a.maxNumber)-parseInt(a.numberOfBets),a.progress=parseFloat(100*a.numberOfBets/a.maxNumber);for(var e=a.numberOfBets-1;e>=0;e--)a.bets.push(new Bet(a,e));a.numberOfBets<1&&(a.initialized=!0,a.game.renderRoundIfInitialized(a.id)),t(null,a.progress)}],function(n){})},this.init()}function Bet(n,t){this.round=n,this.contractInstance=n.contractInstance,this.game=n.game,this.roundId=n.id,this.id=t,this.origin="",this.amount=0,this.bet="",this.transactionId="",this.confirmations=0,this.initialized=!1;var e=this;async.waterfall([function(n){e.contractInstance.getRoundBetOrigin(e.roundId,e.id,function(t,a){e.origin=a.valueOf(),n(t,e.origin)})},function(n,t){e.contractInstance.getRoundBetAmount(e.roundId,e.id,function(n,a){e.amount=web3.fromWei(a.valueOf(),"ether"),t(n,e.amount)})},function(n,t){e.contractInstance.getRoundBetNumber(e.roundId,e.id,function(n,a){e.bet=a.valueOf(),t(n,e.bet)})},function(n,t){e.initialized=!0,t(null,"done!")}],function(n){n||e.game.renderRoundIfInitialized(e.roundId)})}function Game(){this.contract=web3.eth.contract([{constant:!0,inputs:[{name:"id",type:"uint256"}],name:"getRoundMinAmountByBet",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[],name:"getBalance",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"_a",type:"bytes32"}],name:"getNumber",outputs:[{name:"",type:"uint8"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"roundId",type:"uint256"},{name:"betId",type:"uint256"}],name:"getRoundBetNumber",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"id",type:"uint256"}],name:"getRoundPrize",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!1,inputs:[],name:"withdraw",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!1,inputs:[],name:"kill",outputs:[],payable:!1,type:"function"},{constant:!0,inputs:[{name:"id",type:"uint256"}],name:"getRoundMaxNumberOfBets",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[],name:"getCurrentRoundId",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"id",type:"uint256"}],name:"getRoundOpen",outputs:[{name:"",type:"bool"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"id",type:"uint256"}],name:"getRoundNumber",outputs:[{name:"",type:"uint8"}],payable:!1,type:"function"},{constant:!0,inputs:[],name:"getBlockPointer",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"roundId",type:"uint256"},{name:"betId",type:"uint256"}],name:"getRoundBetAmount",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"id",type:"uint256"}],name:"getRoundBlockNumber",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"id",type:"uint256"}],name:"getRoundNumberOfBets",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"roundId",type:"uint256"},{name:"betId",type:"uint256"}],name:"getRoundBetOrigin",outputs:[{name:"",type:"address"}],payable:!1,type:"function"},{constant:!1,inputs:[{name:"bet",type:"uint8"}],name:"bet",outputs:[{name:"",type:"bool"}],payable:!0,type:"function"},{constant:!0,inputs:[{name:"i",type:"uint256"}],name:"getBlockHash",outputs:[{name:"blockHash",type:"bytes32"}],payable:!1,type:"function"},{inputs:[{name:"_blockPointer",type:"uint256"},{name:"_maxNumberOfBets",type:"uint256"},{name:"_minAmountByBet",type:"uint256"},{name:"_prize",type:"uint256"},{name:"_hash",type:"bytes32"}],payable:!1,type:"constructor"},{payable:!0,type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"id",type:"uint256"},{indexed:!1,name:"maxNumberOfBets",type:"uint256"},{indexed:!1,name:"minAmountByBet",type:"uint256"}],name:"RoundOpen",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"id",type:"uint256"},{indexed:!1,name:"number",type:"uint8"},{indexed:!1,name:"blockNumber",type:"uint256"},{indexed:!1,name:"blockHash",type:"bytes32"}],name:"RoundClose",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"maxNumberOfBets",type:"uint256"}],name:"MaxNumberOfBetsChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"minAmountByBet",type:"uint256"}],name:"MinAmountByBetChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"origin",type:"address"},{indexed:!1,name:"roundId",type:"uint256"},{indexed:!1,name:"betId",type:"uint256"}],name:"BetPlaced",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"winnerAddress",type:"address"},{indexed:!1,name:"amount",type:"uint256"}],name:"RoundWinner",type:"event"}]),this.contractInstance=this.contract.at(window.contract_address);var n=this;this.init=function(){this.startLoading(),$("#rounds").html(""),n.currentRoundId=-1,n.rounds=[],async.waterfall([function(t){n.contractInstance.getCurrentRoundId(function(e,a){n.currentRoundId=a.valueOf(),t(null,n.currentRoundId)})},function(t,e){for(var a=0;a<=t;a++)n.addRoundPlaceHolder(a),n.rounds.push(new Round(n,n.contractInstance,a));e(null,a)}],function(n){})},this.initEvents=function(){n.betPlacedEvent=n.contractInstance.BetPlaced(),n.betPlacedEvent.watch(n.betPlaced),n.roundCloseEvent=n.contractInstance.RoundClose(),n.roundCloseEvent.watch(n.roundClose),n.roundOpenEvent=n.contractInstance.RoundOpen(),n.roundOpenEvent.watch(n.roundOpen),n.roundWinnerEvent=n.contractInstance.RoundWinner(),n.roundWinnerEvent.watch(n.roundWinner)},this.roundClose=function(n,t){Materialize.toast("Round #"+t.args.id+" closed!",5e3,"rounded")},this.roundOpen=function(t,e){Materialize.toast("Round #"+e.args.id+" opened!",5e3,"rounded"),n.init()},this.betPlacedDispatched=!1,this.betPlaced=function(t,e){n.betPlacedDispatched&&(e.args.origin==n.account&&($("#bet1").modal("close"),$("#bet-btn").removeClass("disabled"),$("#confirmations").css("opacity",0)),Materialize.toast("New bet placed",5e3,"rounded"),n.rounds[e.args.roundId].init()),n.betPlacedDispatched=!0,$("#bet-btn").removeClass("disabled")},this.roundWinner=function(n,t){Materialize.toast("Round winner "+t.args.winnerAddress,5e3,"rounded")},this.renderRoundIfInitialized=function(t){++n.rounds[t].rendered>=n.rounds[t].numberOfBets&&(n.rounds[t].initialized=!0,n.renderRound(t),n.rounds[t].rendered=0)},this.renderRound=function(t){$("#round_"+t+"_holder").html("");var e=$("#round_template").html();e=e.replace(/{round_id}/g,t),n.rounds[t].open?(e=e.replace(">lock<",">lock_open<"),e=e.replace("{color}","blue"),e=e.replace("{betButton}",$("#bet_button_template").html())):e=e.replace("{color}","grey lighten-1"),e=e.replace(/{prize}/g,n.rounds[t].prize),e=e.replace("{minAmount}",n.rounds[t].minAmount),e=e.replace("{minAmount}",n.rounds[t].minAmount),e=e.replace("{numberOfBets}",n.rounds[t].numberOfBets),e=e.replace("{remaining}",n.rounds[t].remaining),e=e.replace("{progress}",n.rounds[t].progress);for(var a="",i=!1,o=n.rounds[t].bets.length-1;o>=0;o--){var u=$("#bet_template").html();n.rounds[t].open||n.rounds[t].bets[o].bet!=n.rounds[t].number?u=u.replace(" {win}",""):(u=u.replace(" {win}"," green lighten-3"),i=!0),u=u.replace(/{bet_id}/g,n.rounds[t].bets[o].id),u=u.replace(/{origin}/g,n.rounds[t].bets[o].origin),u=u.replace(/{amount}/g,n.rounds[t].bets[o].amount),a+=u}if(e=e.replace("{bets}",a),!n.rounds[t].open){var r=$("#bet_number_template").html().replace(/{number}/g,n.rounds[t].number);i?(r=r.replace("{color}","green"),e=e.replace("{betButton}",r)):(r=r.replace("{color}","red"),e=e.replace("{betButton}",r))}$("#round_"+t+"_holder").html(e),n.areAllRoundsInitialed()&&n.stopLoading()},this.stopLoading=function(){n.renderAllIdenticons(),$(".tooltipped").tooltip({delay:60}),$("#loading").hide(),$(".page-footer").css("display","block"),$(".main-container").css("display","block"),$("#avatar").css("display","block"),$(".navbar-fixed").css("display","block"),$(".nav-wrapper").css("background","#2196F3"),$("ul.tabs").tabs("select_tab","bet001")},this.startLoading=function(){$("#loading").show(),$(".page-footer").css("display","none"),$(".main-container").css("display","none"),$("#avatar").css("display","none"),$(".navbar-fixed").css("display","none"),$(".nav-wrapper").css("background","white"),$("ul.tabs").tabs("select_tab","bet001")},this.areAllRoundsInitialed=function(){for(var t=!0,e=0;e<=n.currentRoundId;e++)0==n.rounds[e].initialized&&(t=!1);return t},this.addRoundPlaceHolder=function(n){var t=$("#round_placeholder_template").html();t=t.replace(/{round_id}/g,n),$("#rounds").prepend(t)},this.renderIdenticon=function(n){n.style.backgroundImage="url("+blockies.create({seed:n.innerHTML,size:8,scale:8}).toDataURL()+")"},this.renderAllIdenticons=function(){$(".eth-address").each(function(t,e){n.renderIdenticon(e)})},this.renderAvatar=function(t){$("#avatar").html(t),$("#avatar").each(function(t,e){n.renderIdenticon(e)})},this.changeAccount=function(t){n.account=t,n.renderAvatar(n.account),n.contractInstance.getBalance({from:n.account},function(n,t){var e=web3.fromWei(t.valueOf(),"ether");$("#current_account_balance").html(e+" ETH")}),$("#current_account_number").html(n.account)},this.initAccounts=function(){n.accounts=[],n.account=null,web3.eth.getAccounts(function(t,e){var a=null;e.forEach(function(n){null==a&&(a=n),$("#dropdown-nav").append('<li class="valign-wrapper"><a href="#!'+n+'" class="accounts_dropdown_item"><div class="eth-address square">'+n+"</div> "+n+"</a></li>")}),null==n.account&&n.changeAccount(a),$("select").material_select(),$(".accounts_dropdown_item").click(function(){var t=$(this).attr("href").replace("#!","");n.changeAccount(t)})})},this.placeBet=function(t){var e=1e18*n.rounds[n.currentRoundId].minAmount;n.contractInstance.bet(t,{from:n.account,value:e,gas:5e5},function(n,t){$("#bet-btn").addClass("disabled"),Materialize.fadeInImage("#confirmations")})},this.withdraw=function(){n.contractInstance.withdraw({from:n.account,gas:5e5},function(n,t){$("#withdraw-btn").addClass("disabled"),$("#withdraw-transaction-id").html(t),Materialize.fadeInImage("#withdraw-confirmations")})},this.initUIElements=function(){$(".modal").modal(),$(".target").pushpin({top:0,bottom:1e3,offset:0}),$("#tabs").tabs({swipeable:!1}),$(".tooltipped").tooltip({delay:60}),$("#bet-btn").click(function(){var t=parseInt($("input[name=bet_pick]:checked").val());t<=9&&t>=0&&n.placeBet($("input[name=bet_pick]:checked").val())}),$("#withdraw-btn").click(function(){n.withdraw()}),$(window).scroll(function(){var n=1-$(window).scrollTop()/70;n<0&&(n=0),$("#avatar, .tabs, #dropdown-nav").css("opacity",n)})},this.init(),this.initEvents(),this.initAccounts(),this.initUIElements()}