var sqlite3 = require('sqlite3').verbose();

var file = "db_bot.sql3";
var db = new sqlite3.Database(file);

//var db = new sqlite3.Database('db_bot.sql3');

db.serialize(function() {
    db.run('CREATE TABLE "members" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, "name" TEXT NOT NULL UNIQUE, "nickname" TEXT DEFAULT NULL, "salon" TEXT DEFAULT NULL, "game" TEXT DEFAULT NULL, "type" TEXT DEFAULT NULL, "time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "date" DATE DEFAULT CURRENT_DATE, "alert" INTEGER DEFAULT 0, "jeton" INTEGER DEFAULT 5);');
    db.run('CREATE TABLE "salons" ("id" INTEGER PRIMARY KEY NOT NULL UNIQUE, "type" TEXT, "name" TEXT);');
});


db.close();

