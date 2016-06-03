 "use strict";
 var obj = {};
 var count = 0;
 (function() {
     
     //To create object to store notes
     function Note(id, title, body, imgDataUrl) {
         
         this.id = id;
         this.title = title;
         this.body = body;
         this.imgDataUrl = imgDataUrl;
         var currentdate = new Date();
         this.currentdate = new Date();
         this.dateTime = (currentdate.getMonth()+1) + "/" + currentdate.getDate() +  "/" + currentdate.getFullYear() + " " + currentdate.getHours() +                 ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

     }
     
     //hiding choose file button and performing its operation
     obj.addFile = function(element)
     {
         element.parentElement.getElementsByTagName('input')[2].click();
     }

     // create a new note
     obj.createNote = function() {
         var n = new Note();
         
         var notes = document.getElementById('new-note');
         var note = document.createElement('li');

         var idGenerator = new Note();
         var id = idGenerator.dateTime;
         note.innerHTML += "<div class='create-note' id = '" + id + "'><img id='blah'><img class='delete-note' src='delete.png' height='20' width='20' ><textarea     class='note-title' placeholder='Untitled' maxlength='10'></textarea><textarea class='note-content' placeholder='Your content here'></textarea><br><br><br><br><input type = 'submit' class = 'save-btn' value = 'save'><input type  = 'button' class = 'upload-file' onclick = 'obj.addFile(this)' value = 'add file'><input type  = 'file' class = 'upload-file' onchange = 'obj.readURL(this)' style = 'height:0px;overflow:hidden'></div>";

         notes.appendChild(note);

         var saveButton = note.getElementsByTagName('input')[0];
         saveButton.onclick = function() {
             obj.saveNote(saveButton);
             notes.removeChild(note);
         };

         var removeNote = note.getElementsByClassName('delete-note')[0];
         removeNote.onclick = function() {
             notes.removeChild(note);
         };
         
         

     }

     //display all notes created and saved
     obj.displayNotes = function() {
         var notes = document.getElementById('notes');
         var notesArray = getNotes();

         for (var j = 0; j < notesArray.length; j++) {
             var note = document.createElement('li');
             var id = notesArray[j].id;
             if(notesArray[j].imgDataUrl == null || notesArray[j].imgDataUrl == "null")
                 {
                     note.innerHTML += "<div class='create-note' id = '" + notesArray[j].id + "'><img class='insert-image' src =" + notesArray[j].imgDataUrl + " style='display:none'><textarea class='note-title' placeholder='Untitled' maxlength='10'>" + notesArray[j].title + "</textarea><textarea class='note-content' placeholder='Your content here'>" + notesArray[j].body + "</textarea><img class='delete-note' src='delete.png' height='20' width='20' onclick = 'obj.deleteNote(this)'><br /><br/><br/><input type = 'submit' class='save-btn' value ='save' onclick = 'obj.saveNote(this)'><input type ='button' value='add file' class='upload-file' onclick='obj.addFile(this)'><input type='file' class='upload-file' onchange='obj.readURL(this)' style='height:0px;overflow:hidden'><I>" + notesArray[j].dateTime + "</I></div>";
                 }
             else
                 {
             note.innerHTML += "<div class='create-note' id = '" + notesArray[j].id + "'><img class = 'insert-image' src =" + notesArray[j].imgDataUrl + " height = '150' width = '300'><textarea class='note-title' placeholder='Untitled' maxlength='10'>" + notesArray[j].title + "</textarea><textarea class='note-content' placeholder='Your content here'>" + notesArray[j].body + "</textarea><img class='delete-note' src='delete.png' height='20' width='20' onclick = 'obj.deleteNote(this)'><br /><input type = 'submit' class='save-btn' value = 'save' onclick = 'obj.saveNote(this)'><input type  = 'button' class = 'upload-file' value = 'add file' onclick = 'obj.addFile(this)'><input type  = 'file' class = 'upload-file' onchange = 'obj.readURL(this)' style = 'height:0px;overflow:hidden'><br><br><I>" + notesArray[j].dateTime + "</I></div>";
                 }
                          notes.appendChild(note);
         }
     }

     obj.displayTrash = function() {
         var trashNotes = document.getElementById('trash');
         var trashNotesArray = getTrashNotes();
         for (var j = 0; j < trashNotesArray.length; j++) {             
             var id = trashNotesArray[j].id;
             var note = document.createElement('li');
             if(trashNotesArray[j].imgDataUrl == "null" || trashNotesArray[j].imgDataUrl == null)
                 {
                    
                     note.innerHTML += "<div class='create-note' id = '" + trashNotesArray[j].id + "'><img class='insert-image' src='" + trashNotesArray[j].imgDataUrl + "' style='display:none'><textarea class='note-title' placeholder='Untitled' maxlength='10'>" + trashNotesArray[j].title + "</textarea><textarea class='note-content' placeholder='Your content here'>" + trashNotesArray[j].body + "</textarea><img class='delete-note' src='delete.png' height='20' width='20' onclick = 'obj.deleteNote(this)'><br /><I>" + trashNotesArray[j].dateTime + "</I><br/><input type = 'submit' class = 'save-btn' value = 'restore' onclick = 'obj.restoreNote(this)'></div>";
                 }
             else
                 {
                     
             note.innerHTML += "<div class='create-note' id = '" + trashNotesArray[j].id + "'><img class = 'insert-image' src =" + trashNotesArray[j].imgDataUrl + " height = '150' width = '300'><textarea class='note-title' placeholder='Untitled' maxlength='10'>" + trashNotesArray[j].title + "</textarea><textarea class='note-content' placeholder='Your content here'>" + trashNotesArray[j].body + "</textarea><img class='delete-note' src='delete.png' height='20' width='20' onclick = 'obj.deleteNote(this)'><br /><I>" + trashNotesArray[j].dateTime + "</I><br/><input type = 'submit' class = 'save-btn' value = 'restore' onclick = 'obj.restoreNote(this)'></div>";
                 }
             trashNotes.appendChild(note);
         }

     }

     //Saves /updates a note created/modified   
     obj.saveNote = function (element) {
         
         var id = element.parentElement.getAttribute('id');       
         var notes = document.getElementById('notes');
       
         var oldNote = document.getElementById(id);
         var title = oldNote.getElementsByClassName('note-title')[0].value.toString();
         var body = oldNote.getElementsByClassName('note-content')[0].value.toString();
         var imageDataUrl = oldNote.getElementsByTagName('img')[0].getAttribute('src');
         var noteObject = new Note(id, title, body, imageDataUrl);
         var note = document.createElement('li');
         var notesArray = getNotes();
         
         if (dublicay(id) == true) {           
             oldNote.parentElement.replaceChild(note, oldNote);
             notesArray = getNotes();
         } 
         else {          
             notes.appendChild(note);
             notesArray.push(noteObject);
         }
         
         localStorage.setItem('note', JSON.stringify(notesArray));
         location.reload();
        obj.displayNotes();
     }

     //restore note from trash
     obj.restoreNote = function (element) {
         
         var id = element.parentElement.getAttribute('id');     
         var trash = document.getElementById('trash');
         
         var noteToRestore = document.getElementById(id);
         
         obj.saveNote(element);
         obj.deleteTrashNote(element);
         noteToRestore.parentElement.removeChild(noteToRestore);
         location.reload();
         obj.displayTrash();
     }


     //Delete a note and send it to trash
      obj.deleteNote = function(element) {
      
         var id =element.parentElement.getAttribute('id');
         var noteToDelete = document.getElementById(id);
         
          var noteObject = new Note(id, noteToDelete.getElementsByClassName('note-title')[0].value.toString(), noteToDelete.getElementsByClassName('note-content')[0].value.toString(), noteToDelete.getElementsByTagName('img')[0].getAttribute('src'));

         var trashArray = getTrashNotes();
         var notesArray = getNotes();

         for (var l = 0; l < notesArray.length; ++l) {
             if (notesArray[l].id === id) {
                 
                 notesArray.splice(l, 1);
             }
         }

         trashArray.push(noteObject);
         localStorage.setItem('trash', JSON.stringify(trashArray));
         localStorage.setItem('note', JSON.stringify(notesArray));
         noteToDelete.parentElement.removeChild(noteToDelete);
     }


     //Permeanently deletes a note from trash as well as local storage
      obj.deleteTrashNote = function(element) {
          var id =element.parentElement.getAttribute('id');
         var noteToDelete = document.getElementById(id);
         var trashArray = getTrashNotes();

         for (var k = 0; k < trashArray.length; k++) {
             if (trashArray[k].id === id) {
                 trashArray.splice(k, 1);
             }
         }
         localStorage.setItem('trash', JSON.stringify(trashArray));
         noteToDelete.parentElement.removeChild(noteToDelete);
     }

     //Retuen an array containing Notes object
     function getNotes() {
         
         var notes = new Array;
         var notesInLocalStorage = localStorage.getItem('note');
         if (notesInLocalStorage !== null) {
             notes = JSON.parse(notesInLocalStorage);
         }
         return notes;
     }

     //Retuen an array containing Trash Notes object
     function getTrashNotes() {
         
         var trashNotes = new Array;
         var trashInLocalStorage = localStorage.getItem('trash');
         if (trashInLocalStorage !== null) {
             trashNotes = JSON.parse(trashInLocalStorage);
         }
         return trashNotes;
     }

     // to input the image
     obj.readURL = function(input) {
         if (input.files && input.files[0]) {
             var reader = new FileReader();
             reader.onload = function(e) {
                 var image = input.parentElement.getElementsByTagName('img')[0];
                 image.setAttribute('src', e.target.result);
                 image.setAttribute('width', '280');
                 image.setAttribute('height', '150');
             };
             reader.readAsDataURL(input.files[0]);
         }
     }

     //check for dublicacy of id in Notes Saved
     function dublicay(id) {

         var flag = 0;
         var allNotesArray = getNotes();

         var note = document.getElementById(id);
         var title = note.getElementsByClassName('note-title')[0].value.toString();
         var body = note.getElementsByClassName('note-content')[0].value.toString();
         var imageDataUrl = note.getElementsByTagName('img')[0].getAttribute('src');
         for (var i = 0; i < allNotesArray.length; i++) {
             if (allNotesArray[i].id === id) {
                 flag = 1;
                 allNotesArray[i].title = title;
                 allNotesArray[i].body = body;
                 allNotesArray[i].imgDataUrl = imageDataUrl;
             }
         }

         if (flag == 1) {
             localStorage.setItem('note', JSON.stringify(allNotesArray));
             return true;
         } else {
             allNotesArray.push(new Note(id, title, body));
             localStorage.setItem('note', JSON.stringify(allNotesArray));
             return false;
         }
     }

 obj.expiryCheck = function()
     {
          var trashNotesArray = getTrashNotes();
         for (var i = 0; i < trashNotesArray.length; i++) {
             var createdDate = new Date(trashNotesArray[i].dateTime);
             var currentDate = new Date();
             if((currentDate.getTime()-createdDate.getTime())/60000 > 3)
                 {
                     trashNotesArray.splice(i, 1);
                 }
         }
     localStorage.setItem('trash', JSON.stringify(trashNotesArray));
         
     }

 })();
 obj.displayNotes();
obj.expiryCheck();