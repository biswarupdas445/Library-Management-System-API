-- Table: public.books

-- DROP TABLE public.books;

CREATE TABLE public.books
(
    id serial NOT NULL,
    "ISBN" character varying(255) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    subject character varying(255) COLLATE pg_catalog."default",
    auther character varying(255) COLLATE pg_catalog."default",
    "copyNo" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT books_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.books
    OWNER to postgres;