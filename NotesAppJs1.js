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
         this.datetime = currentdate.getDay() + "-" + currentdate.getMonth() + "-" + currentdate.getFullYear() + " @ " + currentdate.getHours() +                 ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
     }

     // create a new note
     obj.createNote = function() {
         var n = new Note();
         
         var notes = document.getElementById('new-note');
         var note = document.createElement('li');

         var idGenerator = new Note();
         var id = idGenerator.datetime;
         note.innerHTML += "<div class='create-note' id = '" + id + "'><img id='blah' src='#' alt='your image' height = '150' width = '300'><textarea     class='note-title' placeholder='Untitled' maxlength='10'></textarea><textarea class='note-content' placeholder='Your content here'></textarea><img class='delete-note' src='images.jpg' height='20' width='20'><br/><input type = 'submit' value = 'save'><input type  = 'file' class = 'upload-file'></div>";

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

         var chooseFileButton = note.getElementsByClassName('upload-file')[0];
         chooseFileButton.setAttribute('onchange', 'obj.readURL(this)');
     }

     //display all notes created and saved
     obj.displayNotes = function() {
         var notes = document.getElementById('notes');
         var notesArray = getNotes();

         for (var j = 0; j < notesArray.length; j++) {
             var id = notesArray[j].id;
             var note = document.createElement('li');
             note.innerHTML += "<div class='create-note' id = '" + notesArray[j].id + "'><img src =" + notesArray[j].imgDataUrl + " height = '150' width = '300'><textarea class='note-title' placeholder='Untitled' maxlength='10'>" + notesArray[j].title + "</textarea><textarea class='note-content' placeholder='Your content here'>" + notesArray[j].body + "</textarea><img class='delete-note' src='images.jpg' height='20' width='20' onclick = 'obj.deleteNote(this)'><br /><I>" + notesArray[j].datetime + "</I><br/><input type = 'submit' value = 'save' onclick = 'obj.saveNote(this)'><br/><input type  = 'file' class = 'upload-file' onchange = 'obj.readURL(this)'></div>";
             notes.appendChild(note);
         }
     }

     obj.displayTrash = function() {
         var trashNotes = document.getElementById('trash');
         var trashNotesArray = getTrashNotes();
         for (var j = 0; j < trashNotesArray.length; j++) {
             var id = trashNotesArray[j].id;
             var note = document.createElement('li');

             note.innerHTML += "<div class='trash-note' id = '" + trashNotesArray[j].id + "'><img src ='" + trashNotesArray[j].imgDataUrl + "' alt='your image' height = '150' width = '300'><textarea class='note-title' placeholder='Untitled' maxlength='10' >" + trashNotesArray[j].title + "</textarea><textarea class='note-content' placeholder='Your content here'>" + trashNotesArray[j].body + "</textarea><img class='delete-note' src='images.jpg' height='20' width='20' onclick = 'obj.deleteTrashNote(this)'><br/><input type = 'submit' value = 'restore' onclick = 'obj.restoreNote(this)'><br /><I>" + trashNotesArray[j].datetime + "</I><input type  = 'file' class = 'upload-file' onchange = 'obj.readURL(this)'></div>";
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
        // note.innerHTML = "<div class='create-note' id = '" + id + "'><img src = '" + imageDataUrl + "' alt='your image' height = '150' width = '300'><textarea class='note-title' placeholder='Untitled' maxlength='10'>" + title + "</textarea><textarea class='note-content' placeholder='Your content here'></textarea>" + body + "<img class='delete-note' src='images.jpg' height='20' width='20' onclick = 'obj.deleteNote(this)'><br /><I>" + noteObject.datetime + "</I><input type = 'submit' value = 'save' onclick = 'obj.saveNote(this)'><input type  = 'file' class = 'upload-file' onchange = 'obj.readURL(this)'></div>";

         note.innerHTML += "<div class='create-note' id = '" + id + "'><img src =" + imageDataUrl + " height = '150' width = '300'><textarea class='note-title' placeholder='Untitled' maxlength='10'>" + title + "</textarea><textarea class='note-content' placeholder='Your content here'>" + body + "</textarea><img class='delete-note' src='images.jpg' height='20' width='20' onclick = 'obj.deleteNote(this)'><br /><I>" + noteObject.datetime + "</I><input type = 'submit' value = 'save' onclick = 'obj.saveNote(this)'><input type  = 'file' class = 'upload-file' onchange = 'obj.readURL(this)'></div>";
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
                 image.setAttribute('width', '50');
                 image.setAttribute('heigth', '300');
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
     var dateTimeToday = new Date();
          var allNotesArray = getNotes();
         for (var i = 0; i < allNotesArray.length; i++) {
             var dateCreated = allNotesArray[i].datetime.split(/[-@]/);
             var d1 = parseInt(allNotesArray[2]*365 + allNotesArray[1]*30 + allNotesArray[0]);
             var d2 = parseInt(dateTimeToday.getFullYear()*365 + dateTimeToday.getMonth()*30 + dateTimeToday.getDay());
             console.log(d1-d2);

         }
         
     }

 })();
 obj.displayNotes();
obj.expiryCheck();