/*
  Warnings:

  - You are about to drop the column `latitude` on the `WeatherRequest` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `WeatherRequest` table. All the data in the column will be lost.
  - Added the required column `query` to the `WeatherRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeatherRequest" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lon" DOUBLE PRECISION,
ADD COLUMN     "query" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "WeatherCache" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "response" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeatherCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherCache_key_key" ON "WeatherCache"("key");
