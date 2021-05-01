CREATE TABLE IF NOT EXISTS Artistas(
    id text PRIMARY KEY,
    name text,
    age integer,
    albums text,
    tracks text,
    self text
);

CREATE TABLE IF NOT EXISTS Albunes(
    id text PRIMARY KEY,
    artist_id TEXT REFERENCES Artistas(id) ON DELETE CASCADE,
    name text,
    genre text, 
    artist text,
    tracks text,
    self text
);

CREATE TABLE IF NOT EXISTS Canciones(
    id text PRIMARY KEY,
    album_id TEXT REFERENCES Albunes(id) ON DELETE CASCADE,
    name text, 
    duration float,
    times_played integer,
    artist text,
    album text,
    self text
);