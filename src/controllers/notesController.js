import createHttpError from 'http-errors';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../services/notesServices.js';

export const getNotesController = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    tag,
    search = '',
  } = req.query;

  const notesData = await getAllNotes({
    page,
    perPage,
    tag,
    search,
  });

  res.status(200).json(notesData);
};

export const getNoteByIdController = async (req, res) => {
  const { noteId } = req.params;

  const note = await getNoteById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNoteController = async (req, res) => {
  const note = await createNote(req.body);

  res.status(201).json(note);
};

export const deleteNoteController = async (req, res) => {
  const { noteId } = req.params;

  const note = await deleteNote(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(204).send();
};

export const updateNoteController = async (req, res) => {
  const { noteId } = req.params;

  const note = await updateNote(noteId, req.body);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};