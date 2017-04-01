
function procdata(retdata, status) {
    $("#tblmember .clickable-row").remove();
    if(retdata.cardmembers.length < 5){
        $("#pager-data").hide();
    }
    else{
        $("#pager-data").show();        
    }
    for (var i = 0; i < retdata.cardmembers.length; i++) {
        var member = retdata.cardmembers[i];
        $("#tblmember").append("<tr class='clickable-row'><td>" + member.num_id +
        "</td><td>" + member.nama + "</td><td>" + member.email + "</td></tr>");
    }
}

function errorprocdata(xhr,errmsg,err){
    $("#tblmember .clickable-row").remove();
    $("#tblmember").append("<tr class='clickable-row'><td>----</td><td>----</td><td>---</td></tr>");    
}

function onselectedcat(el){
    var $prnt=$(el).parent().parent().parent();
    var $btn = $prnt.find('button');
    $btn.html($(el).text() + ' <span class="caret"></span>');    
}

$(document).ready(function(){
    var searchcat="";
    $.ajax({
        type: "GET",
        url: "/xkapi/getdata",
        data: "typeobj=0&page=0",
        dataType: 'json',
        success: procdata,
        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            console.log("AJAX ERROR "+xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }            
    });

    // Dynamically added element, click() function must use event delegation like so:        
    $(document).on('click', '.clickable-row', function() {
        var myval = $(this).find("td").eq(0).html();
        $(".modal-body").load("/cardmember/detail/"+ myval +" .panel");
        $('#myModal').modal({keyboard:true});
            
    });
    $("#dropdown-id").click(function(e){
        onselectedcat(this);        
        searchcat="id";        
        e.preventDefault();
        return true;
    });

    $("#dropdown-name").click(function(e){
        onselectedcat(this);
        searchcat="name";
        e.preventDefault();
        return true;
    });

    $("#dropdown-all").click(function(e){
        onselectedcat(this);
        searchcat="";
        e.preventDefault();
        return true;
    });    

    $( "#form-search" ).submit(function ( e ) {
        e.preventDefault();
        vardata = $("input:first").val();
        filter="";
        if(searchcat==""){
            filter="page=0";
        }
        else{
            filter=searchcat+"="+vardata;
        }
        console.log(filter);
        $.ajax({
            type: "GET",
            url: "/xkapi/getdata",
            data: "typeobj=0&"+filter,
            dataType: 'json',
            success: procdata,
            error : errorprocdata,
                    
    })

    });
    
});