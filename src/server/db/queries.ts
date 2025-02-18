import "server-only";

import { db } from "~/server/db";
import {
  file_table as filesSchema,
  folder_table as foldersSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";
export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentFolderId: number | null = folderId;
    while (currentFolderId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentFolderId));
      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentFolderId = folder[0]?.parent;
    }
    return parents;
  },

  getFolders: function (parentId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, parentId));
  },

  getFiles: function (parsedFolderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, parsedFolderId));
  },
};
