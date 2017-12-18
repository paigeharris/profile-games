console.log($);
$(() => {
  //onload
 const $gamebutton = $("<button>"+"Click Me To Score"+"</button>")
 const $body = $("body")
 $body.append($gamebutton);
 $gamebutton.on("click",() => {
   $gamebutton.hide();
 });




  //end onload
})
