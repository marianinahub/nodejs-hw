import { Router } from 'express';

import {
  createNoteController,
  deleteNoteController,
  getNoteByIdController,
  getNotesController,
  updateNoteController,
} from '../controllers/notesController.js';

const router = Router();

router.get('/', getNotesController);
router.get('/:noteId', getNoteByIdController);
router.post('/', createNoteController);
router.delete('/:noteId', deleteNoteController);
router.patch('/:noteId', updateNoteController);

export default router;