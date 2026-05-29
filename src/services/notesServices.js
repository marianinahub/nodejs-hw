import { Note } from '../models/note.js';

export const getAllNotes = async ({
  page = 1,
  perPage = 10,
  tag,
  search = '',
}) => {
  const skip = (page - 1) * perPage;

  const filter = {};

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const totalNotes = await Note.countDocuments(filter);

  const notes = await Note.find(filter)
    .skip(skip)
    .limit(perPage);

  const totalPages = Math.ceil(totalNotes / perPage);

  return {
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  };
};

export const getNoteById = async (noteId) => {
  const note = await Note.findById(noteId);

  return note;
};

export const createNote = async (payload) => {
  const note = await Note.create(payload);

  return note;
};

export const deleteNote = async (noteId) => {
  const note = await Note.findByIdAndDelete(noteId);

  return note;
};

export const updateNote = async (noteId, payload) => {
  const note = await Note.findByIdAndUpdate(noteId, payload, {
    new: true,
  });

  return note;
};