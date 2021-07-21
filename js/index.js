$(document).ready(function() {
    jfile = JSON.parse(getUrlVars().replaceAll("%22", '"'));
    SetPot(jfile["potCont"])
    $('#submit').on('click', function(e) {
        e.preventDefault();
        var f = validatePot();
        $.ajax({ // //enviar la potencia al python
            type: "POST",
            url: "php/sendlistb.php",
            data: { "list": jfile["potCont"].toLocaleString() },
            async: false,
        }).done(function(response) {
            truth(response.split('\r')[0]);
        }).fail(function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
        });
        $.ajax({
            type: "GET",
            url: null,
            data: null,
        }).done(function() {}).fail(function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
        });
        if (f) {
            param = '?param=' + JSON.stringify(jfile)
            window.location.href = "../form_opt/index.html" + param
        }
    })
})


var jfile

function SetPot(list) {
    for (let i = 1; i < list.length + 1; i++) {
        document.getElementById(`Value_${i}A`).value = list[i - 1]
    }
}

function getUrlVars() {
    var vars = window.location.href.split('param=').pop();
    return vars;
}

function SavePot() {
    var val_potency = []
    for (let i = 1; i < document.getElementById("potency_input").elements.length + 1; i++) {
        val_potency.push(parseInt($(`#Value_${i}`).val()));
    }
    jfile["potCont"] = val_potency;
    return true;
}

function validatePot() {
    for (let i = 1; i < document.getElementById("potency_input").elements.length + 1; i++) {
        let val = document.forms["formulario"][`Value_${i}`].value; //grab value enterd by client
        if (val == "") {
            alert("Todos los valores de potencia deben de ser rellenados correctamente");
            return false;
        }
    }
    SavePot();
    return true
}