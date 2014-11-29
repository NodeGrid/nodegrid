/**
 * Created by Pahan on 11/16/2014.
 */
$(document).ready(function () {
    var type = window.location.hash.substr(1);
    loadDataByType(type);
});

$('a').click(function(){
    var type = ($(this)[0].hash.substr(1));
    loadDataByType(type);
});

function loadDataByType(type){
    if(type === ""){
        type = "profile";
    }
    $("a[href^='#']").removeClass('active');
    $("a[href='#"+type+"']").addClass('active');
    console.log(type);
}