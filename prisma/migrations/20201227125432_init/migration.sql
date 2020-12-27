-- CreateTable
CREATE TABLE "Tracker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "projectKey" INTEGER,
    "day" TEXT NOT NULL,
    "inProgress" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    FOREIGN KEY ("projectKey") REFERENCES "Project"("key") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Time" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trackerId" INTEGER NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME,
    "minute" INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY ("trackerId") REFERENCES "Tracker"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "key" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project.key_unique" ON "Project"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Project.name_unique" ON "Project"("name");
