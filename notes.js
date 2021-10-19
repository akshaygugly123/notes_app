const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const  notes = loadNotes()
    const  duplicatNote = notes.find((note) => title === note.title)

    debugger

    if(!duplicatNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse.bold('New notes is added'))
    }else{
        console.log(chalk.red.inverse.bold('Note title is already taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => title !== note.title)
    if(notes.length === newNotes.length){
        console.log(chalk.red.inverse.bold('No notes are removed'))
    }else{
        saveNotes(newNotes)
        console.log(chalk.green.inverse.bold('Note is removed'))
    }
    
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach((note) => {
        console.log('#Title#: ' + chalk.white.inverse.bold(note.title) + '     #Body#: ' + chalk.green.inverse.bold(note.body))
    })
    if(notes.length === 0) console.log(chalk.red.inverse.bold("No notes to list"))
}

const readNote = (title) => {
    const notes = loadNotes();
    const  duplicatNote = notes.find((note) => title === note.title)

    if(duplicatNote){
        console.log('Title: ' + chalk.green.inverse.bold(duplicatNote.title))
        console.log('Body: '+ chalk.inverse(duplicatNote.body))
    }else{
        console.log(chalk.red.inverse.bold('No note found with that title'))
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const  saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}