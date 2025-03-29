DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cireconomy') THEN
        CREATE DATABASE cireconomy;
    END IF;
END $$;
