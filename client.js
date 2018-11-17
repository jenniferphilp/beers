$(document).ready(function(){
    getBeers();

//modal lifecycler handler (stores modal)
    $("#storesModal").on('shown.bs.modal', function () {
        handleMap();
    });
});


//gets all products when page loads
function getBeers(){

query1 = 'beer+beaus';
query2 = 'is_seasonal';
query3 =  'is_discontinued';
query4 = 'is_dead';

url = 'https://lcboapi.com/products?per_page=100&q=' + query1 
+ '&where=' + query2 
+ '&where_not=' + query3
+ '&where_not=' + query4;
access_key = 'MDozY2YyMTQwNC1jNGExLTExZTctODNhMi0xZjVkYjdiNThhNmI6NjB4dnpWNE5qSHNBd0tmQVM4V202ZUJ3QmhleW9aTkExWFBN';

    $.ajax({
        type: 'get',
        url: url,
        headers: {
            'Authorization': 'Token ' + access_key},
        success: function (response){
            displayBeers(response.result);
            enableClick();
        },
        error: function (response, error){
            //deal with error
            alert('no results found');
        }
    })      
}

function displayBeers(result){
       //need to display photo, then when photo is clicked, the description, stores where it appears
     for (let i = 0; i < result.length; i++){
         allResults = []; 
         if (result[i].image_thumb_url || result[i].image_url){
            d =`<div class="col-md-4 beer-bottle" id=${result[i].id}>
                    <div class="clickable-area">
                        <img class="img-responsive center-block" src="${result[i].image_thumb_url}" alt="${result[i].name}">
                     </div>
                    <div class="beer-text">
                        <h4>${result[i].name}</h4>
                        <p>${result[i].style}</p>
                        <p>${result[i].tertiary_category}</p>
                        <p>${result[i].tasting_note}</p>
                        <p>Alcohol Content: ${result[i].alcohol_content/100}%</p>
                        <button type="button" id=${result[i].id} class="btn storeList">Click for locations</button> 
                    </div>
                </div>`
         } else {
        d = `<div class="col-md-4 beer-bottle">
                <div class="clickable-area">
                    <img class="generic-image img-responsive center-block" src="beaus-black-logo.svg" alt="${result[i].name}">
                </div>
                <div class="beer-text generic">
                    <h4>${result[i].name}</h4>
                    <p>${result[i].style}</p>
                    <p>${result[i].tertiary_category}</p>
                    <p>${result[i].tasting_note}</p>
                    <p>Alcohol Content: ${result[i].alcohol_content/100}%</p>
                    <button type="button" id=${result[i].id} class="btn storeList">Click for locations</button> 
                </div>    
                <p class="text-center generic-image-text">Image Not Available</p>
             </div>`
         }
      
         allResults.push(d);
         $('.result-container').append(d);

        }
         $('button.storeList').on('click', function(){
           productId = $(event.target).attr('id');
           $('.modal-body').empty();
           getStores(productId);
        })
}

function enableClick(){
    $('div.clickable-area').on('click', function(){
        let $beerText = $( this).closest('.beer-bottle').find('.beer-text')
        let $image = $( this ).closest('.beer-bottle').find('img')

        //loop through each item in descriptions; remove null results
        let descriptions = $beerText.children('p');
        descriptions.each(function(child){
            if ($(this).text() === "null"){
                $(this).remove();
            }
        })
        $beerText.toggleClass('fadeIn');
        $image.toggleClass('fadeOut');
    })
}
    
function getStores(id){
   
    url = 'https://lcboapi.com/stores?per_page=100&where_not=is_dead&product_id=' + id;
    access_key = 'MDozY2YyMTQwNC1jNGExLTExZTctODNhMi0xZjVkYjdiNThhNmI6NjB4dnpWNE5qSHNBd0tmQVM4V202ZUJ3QmhleW9aTkExWFBN';
    

    $.ajax({
        type: 'get',
        url: url,
        headers: {
            'Authorization': 'Token ' + access_key},
        success: function (response){
    //must deal with the pagination issue; only 100 records allowed per page
            if (response.pager.total_pages > 1){
                displayMultiplePagesInResults(response.pager.total_pages, id);
            }
            else{
                displayStores(response.result, id);
            }
        },
        error: function (response, error){
            //deal with error
        }
    })   
}    

function displayMultiplePagesInResults(numberOfPages, id){
    for (let pageId = 1; pageId < numberOfPages+1; pageId++){
        requestMoreData(pageId, id);
    } 
}    
    
function requestMoreData(pageId, id)  {
    access_key = 'MDozY2YyMTQwNC1jNGExLTExZTctODNhMi0xZjVkYjdiNThhNmI6NjB4dnpWNE5qSHNBd0tmQVM4V202ZUJ3QmhleW9aTkExWFBN';
    url = 'https://lcboapi.com/stores?per_page=100&page=' + pageId + '&product_id=' + id;

        $.ajax({
            type: 'get',
            url: url,
            headers: {
                'Authorization': 'Token ' + access_key},
            success: function (response){
                displayStores(response.result);
            },
            error: function (response, error){
                //deal with error
            }
        }) 
}

//adds store names for the selected product to the modal, then launches it
function displayStores(stores){
    let $modal = $('.modal-body');

    stores.forEach(function(store){ 
        $modal.append('<a ' + 'data-latitude=' 
        + `${store.latitude}` 
        + ' data-longitude=' 
        + `${store.longitude}` 
        + ' class="launch-map"><p data-id=' 
        + `${store.id}` + '>' + `${store.name}` + '</p></a>');
    }) 
    $("#storesModal").modal('show');
}

function handleMap(){
    $('a.launch-map').on('click', function(){
        $('#map').remove();

            let latitude = $(event.target).closest('a').attr('data-latitude');
            let longitude = $(event.target).closest('a').attr('data-longitude')
            let storeId = $(event.target).attr('data-id');

            initMap(latitude, longitude, storeId);
    }) 
}


function initMap(latitude, longitude, storeId){

    let latInt = parseFloat(latitude);
    let longInt = parseFloat(longitude);
   
    let $target = $('.modal-body').find("[data-id=" + storeId +"]") 
    let $map = $("<div>", {id: "map"});

    let uluru = {lat: latInt, lng: longInt}; 
    $target.prepend($map);

    let map = new google.maps.Map(document.getElementById('map'), { 
      zoom: 13,
      center: uluru
    });

    let marker = new google.maps.Marker({
      position: uluru,
      map: map
    });

}


