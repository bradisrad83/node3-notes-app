const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  console.log("Your Notes");
};
const addNote = (title, body) => {
  let notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title already taken"));
  }
};

const removeNote = title => {
  let notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  if (notes.length === notesToKeep.length) {
    console.log(chalk.inverse.red("No Note Found With That Title"));
  } else {
    console.log(chalk.inverse.green("Note Removed"));
  }
  saveNotes(notesToKeep);
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    return JSON.parse(dataBuffer);
  } catch (error) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse(getNotes()));
  notes.forEach(note => console.log(note.title));
};

const readNote = title => {
  const notes = loadNotes();
  let selectedNote = notes.find(note => title === note.title);
  if (selectedNote) {
    console.log(chalk.magenta.bold(selectedNote.title));
    console.log(selectedNote.body);
  } else {
    console.log(chalk.red("No note was found with that title"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
