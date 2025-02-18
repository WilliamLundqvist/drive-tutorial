import { db } from "~/server/db";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { files, folders } from "~/server/db/schema";

const SandboxPage = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      Seed function {""}
      <form
        action={async () => {
          "use server";

          const folderinsert = await db
            .insert(folders)
            .values(
              mockFolders.map((folder, index) => ({
                id: index + 1,
                name: folder.name,
                parent: index !== 0 ? 1 : 1,
              })),
            )
            .execute();
          const fileinsert = await db
            .insert(files)
            .values(
              mockFiles.map((file, index) => ({
                id: index + 1,
                name: file.name,
                size: 5000,
                url: file.url,
                parent: (index % 3) + 1,
              })),
            )
            .execute();
          console.log(folderinsert);
          console.log(fileinsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
};

export default SandboxPage;
