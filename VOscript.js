setTimeout(() => {
    //AddHead();
    AddSaveButton();
    GetSimpleText();
}, 1000);

function SaveNote(event) {
    const $target = $(event.target);
    const $tr = $target.closest("tr");
    const id = $tr.data("id");
    const obj = FindAnnotation(id);
    console.log("id:" + id);
    console.log(obj);
}

function AddHead() {
    $("table thead tr").append("<th>Save file</th>");
}

function AddSaveButton() {
    AddButtonToTable(4, '<input type="button" value="Save" id="Save" class="btn btn-primary"/>');
    $("table tbody tr input").bind("click", SaveNote);
}

function FindAnnotation(id) {
    const text = $('#noteandaccres').text().replace(/\r?\n/g, "");
    const obj = JSON.parse(text);

    // const noteId = obj.find(element => element.AccountId === id);
    // document.location.href = "/_entity/annotation/" + noteId;

    for (let i = 0; i < obj.length; i++) {
        console.log(obj[i].AccountId + " " + id);
        if (obj[i].AccountId === id) {
            document.location.href = "/_entity/annotation/" + obj[i].Note;
        }
    }

    return obj;
}

function GetSimpleText() {
    $.ajax("https://udstrialsdemo40.powerappsportals.com/vocreate/", {
        method: "GET",
        fail: function () {
            console.log("all bed");
        },
        success: function (data) {
            data = JSON.parse(data);
            AddButtonToTable(5, '<input type="button" value=' + data[0].SimpleText + ' id=' + data[0].SimpleText + ' class="btn btn-primary"/>');
            $("table tbody tr #"+ data[0].SimpleText +"").bind("click", CreateContact);

            console.log(data[0].SimpleText);
        }
    });
}


function AddButtonToTable(index, btn) {
    const rows = $('table tbody tr');
    for (let i = 0; i < rows.length; i++) {
        let x = rows[i].cells[index];
        $(x).append(btn);
    }
}

function CreateContact(event) {
    const $target = $(event.target);
    const $tr = $target.closest("tr");
    const id = $tr.data("id");
    console.log(id+": qqqqq");
}