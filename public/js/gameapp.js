console.log($);
$(() => {
  //onload
 const $gamebutton = $("<button>"+"Click Me To Score"+"</button>")
 const $game = $("#game")
 $game.append($gamebutton);
 $gamebutton.on("click",() => {
   $gamebutton.hide();
 });





  //end onload
})
