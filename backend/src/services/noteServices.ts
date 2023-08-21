import { ApiError } from '../apiError';
import { Note } from '../models';
import { INote } from '../types';

export class NoteServices {
  public static async createNote(note: INote, userId: string) {
    try {
      const accessKey = NoteServices.encryptAccessKey(userId, note.accessKey);
      return await Note.create({ ...note, accessKey, userId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public static async getByAccessKey(userId: string, accessKey: string) {
    const encryptedKey = NoteServices.encryptAccessKey(userId, accessKey);
    const note = await Note.findOne({ accessKey: encryptedKey });
    if (!note) {
      throw new ApiError('Note does not exist', 404);
    }
    return note;
  }

  public static encryptAccessKey(userId: string, accessKey: string): string {
    try {
      return userId + '_' + Buffer.from(accessKey).toString('base64');
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
