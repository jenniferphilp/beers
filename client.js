$(document).ready(function(){

query1 = 'beer+beaus';
query2 = 'is_seasonal';
query3 =  'is_discontinued';
url = 'https://lcboapi.com/products?per_page=100&q=' + query1 + '&where=' + query2 + '&where_not=' + query3;
access_key = 'MDozY2YyMTQwNC1jNGExLTExZTctODNhMi0xZjVkYjdiNThhNmI6NjB4dnpWNE5qSHNBd0tmQVM4V202ZUJ3QmhleW9aTkExWFBN';


let results = $.ajax({
        type: 'get',
        url: url,
        headers: {
            'Authorization': 'Token ' + access_key},
     
    });

        
 results.done(function(data){
    doSomething(data.result);
 });

    function doSomething(result){
       //need to display photo, then when photo is clicked, the description, stores where it appears
console.log(result);
     for (let i = 0; i < result.length; i++){
         allResults = []; 
         if (result[i].image_thumb_url && result[i].image_url){
            d = `<div class="col-md-4 col-xs-3 beer-bottle">
            <img class="img-responsive center-block" src="${result[i].image_url}" alt="${result[i].name}"></img>
            </div`

         }
         else {
             d = `<div class="col-md-4 col-xs-3 beer-bottle text-center">
                <img class="generic-image img-responsive center-block " src="beaus_logo.png" alt="${result[i].name}"></img>
                <p class="text-center">Image Not Available</p>
             </div`
         }
      
         allResults.push(d);
         $('.result-container').append(d);
     }   
    
    }
})


