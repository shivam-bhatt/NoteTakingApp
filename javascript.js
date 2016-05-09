var count = 0;

//To create object to store notes
function Note(id,title,body)
{
    var currentdate = new Date();
    this.id = id;
      this.title = title;
      this.body = body;
    this.datetime = "Last Sync: " + currentdate.getDay() + "/"+currentdate.getMonth()+ "/" + currentdate.getFullYear() + " @ "+                          currentdate.getHours()+  ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
}

//Delete a note and send it to trash
function deleteNote(id)
        {
            var noteToDelete = document.getElementById(id);
            var noteObject = new Note( id, noteToDelete.getElementsByClassName('note-title')[0].value.toString() , noteToDelete.getElementsByClassName('note-content')[0].value.toString());
            var trashArray = getTrashNotes();
            var notesArray = getNotes();
            
            for(var l = 0;l < notesArray.length; ++l)
                {
                    if(notesArray[l].id === id)
                        {

                            notesArray.splice(l,1);
                        }
                }
            
            trashArray.push(noteObject);
            localStorage.setItem('trash',JSON.stringify(trashArray));
            localStorage.setItem('note',JSON.stringify(notesArray));
            noteToDelete.parentElement.removeChild(noteToDelete);
        }


//Permeanently deletes a note from trash as well as local storage
function deleteTrashNote(id)
        {
            var noteToDelete = document.getElementById(id);
            noteToDelete.parentElement.removeChild(noteToDelete);      
            var trashArray = getTrashNotes();
            
            for(var k = 0;k < trashArray.length; k++)
                {
                    if(trashArray[k].id === id)
                        {
                            trashArray.splice(k,1);
                        }
                }
            localStorage.setItem('trash',JSON.stringify(trashArray));
        }

//Retuen an array containing Notes object
function getNotes() {
    var notes = new Array;
    var notesLocalStorage = localStorage.getItem('note');
    if (notesLocalStorage !== null) {
        notes = JSON.parse(notesLocalStorage); 
    }
    return notes;
}

//Retuen an array containing Trash Notes object
function getTrashNotes() {
    var trashNotes = new Array;
    var trashNotesStr = localStorage.getItem('trash');
    if (trashNotesStr !== null) {
        trashNotes = JSON.parse(trashNotesStr); 
    }
    return trashNotes;
}

 //Saves /updates a note created/modified   
function saveNote(id)
        {
            var currentdate = new Date();
            var notes = document.getElementById('notes');
            var oldNote = document.getElementById(id);
            
            var title = oldNote.getElementsByClassName('note-title')[0].value.toString();
            var body = oldNote.getElementsByClassName('note-content')[0].value.toString();
            
            var noteObject = new Note(id,title,body);
            var div =document.createElement('li');

             div.innerHTML = "<div class='create-note' id = '"+id+"'><textarea class='note-title' placeholder='Untitled' maxlength='10'>"+title+"</textarea><textarea class='note-content' placeholder='Your content here'>"+body+"</textarea><img class='delete-note' src='images.jpg' height='20' width='20'><br><I>"+noteObject.datetime+"</I></br><input type = 'submit' value = 'save'></input></img></div>";
            
            oldNote.parentElement.replaceChild(div,oldNote);
            
            var saveButton = div.getElementsByTagName('input')[0];
            saveButton.onclick = function() {saveNote(id);};
             var removeNote = div.getElementsByClassName('delete-note')[0];           
            removeNote.onclick = function() { deleteNote(id);};
            
            
            var notesArray = getNotes();
            var idDublicacyCheck = dublicay(id);
            if(idDublicacyCheck ==true)
                {
                    notesArray = getNotes();
                }
            else
                {
            notesArray.push(new Note(id,title,body));
                }
          localStorage.setItem('note', JSON.stringify(notesArray));

        }

// create a note
function createNote()
{
           var notes = document.getElementById('notes');
           var div = document.createElement('li');
            var id = 'note-'+(count++);
             div.innerHTML = "<div class='create-note' id = '"+id+"'><textarea class='note-title' placeholder='Untitled' maxlength='10'></textarea><textarea class='note-content' placeholder='Your content here'></textarea><img class='delete-note' src='images.jpg' height='20' width='20'><input type = 'submit' value = 'save'></input></img></div>";
        notes.appendChild(div);
    var saveButton = div.getElementsByTagName('input')[0];
    
            saveButton.onclick = function() { saveNote(id); };   

     var removeNote = div.getElementsByClassName('delete-note')[0];           
            removeNote.onclick = function() { deleteNote(id);};
   
}

//display all notes created and saved
function displayNotes() {
    
    var notes = document.getElementById('notes');
           var div = document.createElement('li');
    var notesArray = getNotes();
    
    for(var j=0; j<notesArray.length; j++) 
    {
        
        var id = notesArray[j].id;
        var title = notesArray[j].title;
        var body = notesArray[j].body;
        
       div.innerHTML += "<div class='create-note' id = '"+notesArray[j].id+"'><textarea class='note-title' placeholder='Untitled' maxlength='10'>"+notesArray[j].title+"</textarea><textarea class='note-content' placeholder='Your content here'>"+notesArray[j].body+"</textarea><img class='delete-note' src='images.jpg' height='20' width='20'><br><I>"+notesArray[j].datetime+"</br></I><input type = 'submit' value = 'save'></input></img></div>";
       
        var saveButton = div.getElementsByTagName('input')[0];
    
            saveButton.onclick = function() { saveNote(id); };   

     var removeNote = div.getElementsByClassName('delete-note')[0];           
            removeNote.onclick = function() { deleteNote(id);};
        
        notes.appendChild(div);
    }
}

//Display all trash notes
function displayTrash()
{
    var notes = document.getElementById('notes');
    var div = document.createElement('li');
    var notesArray = getTrashNotes();
    
    if(notesArray.length!==undefined)
        {
    for(var j=0; j<notesArray.length; j++) 
    {
        
        var id = notesArray[j].id;
        var title = notesArray[j].title;
        var body = notesArray[j].body;

       div.innerHTML += "<div class='trash-note' id = '"+notesArray[j].id+"'><textarea class='note-title' placeholder='Untitled' maxlength='10'>"+notesArray[j].title+"</textarea><textarea class='note-content' placeholder='Your content here'>"+notesArray[j].body+"</textarea><img class='delete-note' src='images.jpg' height='20' width='20'><input type = 'submit' value = 'restore'><br><I>"+notesArray[j].datetime+"</br></I></input></img></div>";
       
        var saveButton = div.getElementsByTagName('input')[0];
    
            saveButton.onclick = function() { saveNote(id); };   

     var removeNote = div.getElementsByClassName('delete-note')[0];           
            removeNote.onclick = function() { deleteTrashNote(id);};
        
        notes.appendChild(div);
    }
        }
}


//check for dublicacy of id in Notes Saved
function dublicay(id)
{

    var flag = 0;
    var allNotesArray = getNotes();
    
    var note = document.getElementById(id);
    var title = note.getElementsByClassName('note-title')[0].value.toString();
    var body = note.getElementsByClassName('note-content')[0].value.toString();
    for(var i = 0; i<allNotesArray.length ; i++)
        {

            if(allNotesArray[i].id === id)
                {
                    
                flag = 1;
                    allNotesArray[i].title = title;
                    allNotesArray[i].body = body;
                }
        }
    
    if(flag==1)
        {
            localStorage.setItem('note',JSON.stringify(allNotesArray));
        return true;
        }
    else 
        {
            allNotesArray.push(new Note(id, title , body));
            localStorage.setItem('note',JSON.stringify(allNotesArray));
        return false;
        }
}
