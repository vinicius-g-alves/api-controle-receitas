/*
  Warnings:

  - Added the required column `userId` to the `revenue` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_revenue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preparationTime" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "revenue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_revenue" ("description", "id", "name", "preparationTime") SELECT "description", "id", "name", "preparationTime" FROM "revenue";
DROP TABLE "revenue";
ALTER TABLE "new_revenue" RENAME TO "revenue";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
