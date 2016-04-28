var count = 0;
    function createNote()
        {
            var notes = document.getElementById('notes');
            
            var list = document.createElement('li');
            list.setAttribute('id','new-note');
            
            var div = document.createElement('div');
            
            var subject =document.createElement('textarea');

            var content =document.createElement('textarea');
            
            var saveButton = document.createElement('input');
            saveButton.type = 'submit';
            saveButton.onclick = function() { displayNote(subject,content); };
            
            var lineBreak = document.createElement('br');
            
            div.appendChild(subject);
            div.appendChild(lineBreak);
            div.appendChild(content);
            list.appendChild(div);
            list.appendChild(saveButton);
            
            notes.appendChild(list);            
        }
        
    function displayNote(subject,content) 
        {
            var noteEditpad = document.getElementById('new-note');
            var noteList = document.getElementById('notes-container');
            
            var list = document.createElement('li');
            var noteId = 'note-'+(++count);
            list.id = noteId;
            
            var lineBreak = document.createElement('br');
            
            var div = document.createElement('div');

            
            div.setAttribute('class','note-container');
            div.onclick = function(){updateNode(noteId)};
            div.innerHTML = div.innerHTML + ' ' + subject.value;
            div.appendChild(lineBreak);
            div.innerHTML =div.innerHTML+' ' + content.value;
            
            var deleteNoteButton = document.createElement('input');
            deleteNoteButton.type = 'button';
            deleteNoteButton.value = 'delete note';
            deleteNoteButton.onclick = function () {deleteNote(list.id)};
            
            var editNoteButton = document.createElement('input');
            editNoteButton.type = 'button';
            editNoteButton.value = 'edit note';
            editNoteButton.onclick = function () {editNote(list.id)};
            
            list.appendChild(div);
            list.appendChild(deleteNoteButton);
            list.appendChild(editNoteButton);

            noteList.appendChild(list);
            noteEditpad.parentElement.removeChild(noteEditpad);
        }
    
    function deleteNote(aa)
        {
            var a = document.getElementById(aa);
            a.parentElement.removeChild(a);
        }
        
    function editNote(noteId)
        {
            var notes = document.getElementById('notes');
            
            var list = document.createElement('li');
            list.setAttribute('id','new-note');
            
            var div = document.createElement('div');
            
            var subject =document.createElement('textarea');

            var content =document.createElement('textarea');
            
            var saveButton = document.createElement('input');
            saveButton.type = 'button';
            saveButton.value = 'save';
            saveButton.onclick = function() { updateNote(noteId,subject,content); };
            
            var lineBreak = document.createElement('br');
            
            div.appendChild(subject);
            div.appendChild(lineBreak);
            div.appendChild(content);
            list.appendChild(div);
            list.appendChild(saveButton);
            
            notes.appendChild(list);
        }

   function updateNote(noteId,subject,content)
    {
       
            var oldNote = document.getElementById(noteId);

            var noteEditpad = document.getElementById('new-note');
        
            var noteList = document.getElementById('notes-container');
            
            var list = document.createElement('li');
            var noteId = 'note-'+(++count);
            list.id = noteId;
         
            var lineBreak = document.createElement('br');

            var div = document.createElement('div');

            
            div.setAttribute('class','note-container');
            div.onclick = function(){eidtNote(noteId)};
            div.innerHTML = div.innerHTML + ' ' + subject.value;
            div.appendChild(lineBreak);
            div.innerHTML =div.innerHTML+' ' + content.value;

            var deleteNoteButton = document.createElement('input');
            deleteNoteButton.type = 'button';
            deleteNoteButton.value = 'delete note';
            deleteNoteButton.onclick = function () {deleteNote(list.id)};

            var editNoteButton = document.createElement('input');
            editNoteButton.type = 'button';
            editNoteButton.value = 'edit note';
            editNoteButton.onclick = function () {editNote(list.id)};

            list.appendChild(div);
            list.appendChild(deleteNoteButton);
            list.appendChild(editNoteButton);
        
            noteList.replaceChild(list,oldNote);
            noteEditpad.parentElement.removeChild(noteEditpad);
}

