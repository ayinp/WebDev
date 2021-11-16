-- create table students (id TEXT PRIMARY KEY, firstname TEXT NOT NULL, lastname TEXT NOT NULL);
-- create table events (id TEXT PRIMARY KEY, name TEXT NOT NULL, date TEXT, time TEXT, duration INTEGER);
-- create table signups (id TEXT PRIMARY KEY, student_id TEXT NOT NULL, event_id TEXT NOT NULL);

-- insert into students (id, firstname, lastname) VALUES 
-- ("1", "Greg", "Glerb"),
-- ("2", "Fink", "Winkerbean"),
-- ("3", "David", "Tardiest"),
-- ("4", "Sammy", "Codestylin"),
-- ("5", "Cam", "Purpleperson"),
-- ("6", "Rex", "Improvperson"),
-- ("7", "Ayin", "IntenseFocustersteen");

-- insert into events (id, name) VALUES
-- ("1", "Mike's Market"),
-- ("2", "That Bridge Downtown"),
-- ("3", "The Woods"),
-- ("4", "The Dugouts"),
-- ("5", "Bunkers");

-- insert into signups (id, student_id, event_id) VALUES
-- ("1", "1", "4"),
-- ("2", "1", "3"),
-- ("3", "6", "5"),
-- ("4", "5", "5"),
-- ("5", "2", "2");

select s.firstname, s.lastname, events.name eventname, signups.id signup_id from students s 
join signups on s.id = student_id
join events on event_id = events.id where s.id = 1

