import axios from "axios"

const API_URL = "/api/tickets/"

// get notes for 1 ticket from a user by ticketId
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + ticketId + "/notes", config)
  return response.data
}

// create a note for 1 ticket
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL + ticketId + "/notes", { text: noteText } , config)
  return response.data
}


const noteService = {
  getNotes,
  createNote,
}

export default noteService