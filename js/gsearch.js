

$("#setting").click(function(){
    $(".setmen").toggle();
    $(".googleapps").hide();
});

$("#goapp").click(function()
{

$(".googleapps").toggle();
$(".setmen").hide();

});





//// Init variables 
var _prevIndex = 0;
var _nextIndex = 0;
var _resultsPerPage = 10;
var _pageNumber = 1;

// Google Api Key

// other key AIzaSyCYe7X65TDZ4TH3vRZF4x3jbH6YU4nfD0c
// other Key  AIzaSyDUa3UQ8bNjFTO9x7_LSZbLD7Aqx620uMI

var mGoogleApiKey = "AIzaSyCYe7X65TDZ4TH3vRZF4x3jbH6YU4nfD0c";

// Google Custom Search Key
var mGoogleCustomSearchKey = "011057042427716054794:eujvtjgsejw";



// button submission
$(function ()
{
    $('#btnSearch').hide().click(function () { Search($("#txtSearchTerm").val(),0);});
    $('#lnkPrev').click(function () { Search($("#txtSearchTerm").val(),-1); });
    $('#lnkNext').click(function () { Search($("#txtSearchTerm").val(),1);  });
});

//click enter
$('#txtSearchTerm').keypress(function(e){
        if(e.which == 13){
            $('#btnSearch').click();         //Trigger search button click event
        }
    });

//next&previous  handler
function Search(term, direction)
{
    var startIndex = 1;

    if (direction === -1)
    {
        startIndex = _prevIndex; 
        _pageNumber--;
    }
    if (direction === 1)
    {
        startIndex = _nextIndex; 
        _pageNumber++;
    }
    if (direction === 0)
    {
        startIndex = 1; 
        _pageNumber = 1;
    }

    
   

    var url = "https://www.googleapis.com/customsearch/v1?key="
    + mGoogleApiKey + "&num=10&cx=" + mGoogleCustomSearchKey + "&start=" + startIndex + "&q=" + escape(term) + "&searchType=image" + "&callback=?";

    
    $.getJSON(url, '', SearchCompleted);
}

//search result request

function SearchCompleted(response)
{
    var html = "";
    var html2="";
    $("#searchResult").html("");

    if (response.items == null)
    {
        $("#searchResult").html("No matching pages found");
        return;
    }

    if (response.items.length === 0)
    {
        $("#searchResult").html("No matching pages found");
        return;
    }

   

    if (response.queries.nextPage != null)
    {
        _nextIndex = response.queries.nextPage[0].startIndex;
        $("#lnkNext").show();
    }
    else
    {
        $("#lnkNext").hide();
    }

    if (response.queries.previousPage != null)
    {
        _prevIndex = response.queries.previousPage[0].startIndex;
        $("#lnkPrev").show();
    }
    else
    {
        $("#lnkPrev").hide();
    }

    if (response.queries.request[0].totalResults > _resultsPerPage)
    {
        $("#lblPageNumber").show().html(_pageNumber);
    }
    else
    {
        $("#lblPageNumber").hide();
    }

    for (var i = 0; i < response.items.length; i++)
    {
        var item = response.items[i];
    
        
        
        

        html+='<li class="gallery-item"><div class="gallery-contents"><div class="thumbnail gallery-trigger"><img src="'+item.link+'" alt="'+item.title+'" /> <div class="htext">'+item.image.height+'&nbspx&nbsp'+item.image.width+'&nbsp-&nbsp'+item.displayLink+'</div></div>';
        html+='</div><div class="gallery-expander"><div class="gallery-expander-contents"><div class="gallery-trigger-close close"><img src="img/x.gif" alt="close"></div><div class="col" style=" width: 47.5%;">';  
         html+='<div class="image"><img src="'+item.link+'" alt="'+item.title+'" /></div></div><div class="col" style="padding-right: 0px;"><div class="title">'+item.title+'<span style="display: block;font-family: arial,sans-serif;font-size: 13px;color: #888888;margin-top: 8px;">The Independent-2048×1536-Search by image</span></div>';
          html+='<div class="contents"><a class="vis" id="visitlink" href="'+item.image.contextLink+'" target="_blank">';
          html+='<svg id="earthimg" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg>Visit</a>';
          html+='<a class="vis" id="viewimg" style="display: inline-block;width: 77px;height: 37px;padding-top: 1px;" href="'+item.link+'" target="_blank">View<br/> <span style="display: inline-block; position: absolute; margin-top: -13px; margin-left: -14px;">image</span></a><a class="vis" id="save"><svg id="earthimg" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path class="_czr" d="M18,19.1122997 L12,16.5687897 L6,19.1122997 L6,3.94457951 L18,3.94457951 L18,19.1122997 Z M17.7133331,2 L6.28555552,2 C5.02849998,2 4.01142778,3 4.01142778,4.22222222 L4,22 L11.9994443,18.6666667 L19.9988887,22 L19.9988887,4.22222222 C19.9988887,3 18.9703887,2 17.7133331,2 Z"></path> </svg>Save</a>';
          html+='<a class="vis" id="sometxt" style="display: inline-block;width: 77px;height: 37px;padding-top: 1px;"  target="_blank">View<br/> <span style="display: inline-block; position: absolute; margin-top: -13px; margin-left: -14px;">saved</span></a>';
          html+='<a class="vis" id="share"><svg id="earthimg" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path class="_czr" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path> </svg>Share</a></div><div id="borderdiv" style="border-bottom: 1px solid #121212;box-shadow: 0 1px #2A2A2A;margin-left:-40px;"></div> <span id="reimg" style="color: #9f9f9f; font-size: 13px;text-decoration: none;font-family: arial,sans-serif;margin-top: 21px; display: block;margin-left: -21px;">Related images:</span><ul class="relatedimg"><li><img src="'+item.link+'" alt="'+item.title+'" /></li><li><img src="'+item.link+'" alt="'+item.title+'" /></li><li><img src="'+item.link+'" alt="'+item.title+'" /></li><li><img src="'+item.link+'" alt="'+item.title+'" /></li><li><img src="'+item.link+'" alt="'+item.title+'" /></li><li><img src="'+item.link+'" alt="'+item.title+'" /></li><li><img src="'+item.link+'" alt="'+item.title+'" /></li><li><img  src="'+item.link+'" alt="'+item.title+'" style="opacity:0.5;" /><span style="position: absolute;margin-right: 216px;margin-left: -61px;margin-top: 21px;font-family: arial,sans-serif;color: #ddd;font-size: medium;text-align: center;text-shadow: 0 0 0.5em #000;overflow-wrap: break-word;">View more</span></li></ul>';
          html+='<span id="lastsp">Images may be subject to copyright.</span><span id="lasthe">&nbsp-&nbspGet help</span><span id="lastf">&nbsp-&nbspSend feedback</span></div></div></div></li>';
          }

    $(".gallery-items").html(html);
     $('.colorhead').css('display','block');
     $('.next-no-style').css('display','block');
     $('#images').css({'border-bottom':'3px solid #4285f4','color':'#4285f4','font-weight':'bold'});
    

    (function(global, $){
    $('.gallery-items').imagelistexpander({
        prefix: "gallery-"
    });
})(this, jQuery)
    
}





