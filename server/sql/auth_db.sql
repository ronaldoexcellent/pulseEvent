--
-- PostgreSQL database dump
--

\restrict Hec8UwCGhlGBH4rS7hROTyWNAKClPaADKw2L6iVWJBqcdTDYArNfV5PFWP0j2IP

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-07-09 18:23:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4935 (class 1262 OID 24576)
-- Name: auth_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE auth_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE auth_db OWNER TO postgres;

\unrestrict Hec8UwCGhlGBH4rS7hROTyWNAKClPaADKw2L6iVWJBqcdTDYArNfV5PFWP0j2IP
\connect auth_db
\restrict Hec8UwCGhlGBH4rS7hROTyWNAKClPaADKw2L6iVWJBqcdTDYArNfV5PFWP0j2IP

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 49176)
-- Name: otps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otps (
    id integer NOT NULL,
    email character varying NOT NULL,
    otp_hash character varying NOT NULL,
    expires_at timestamp with time zone NOT NULL
);


ALTER TABLE public.otps OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 49175)
-- Name: otps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.otps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.otps_id_seq OWNER TO postgres;

--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 221
-- Name: otps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.otps_id_seq OWNED BY public.otps.id;


--
-- TOC entry 223 (class 1259 OID 49190)
-- Name: pending_registrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pending_registrations (
    email character varying(255) NOT NULL,
    firstname character varying(100),
    lastname character varying(100),
    username character varying(100),
    hashed_password text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.pending_registrations OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24581)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying,
    google_id character varying,
    auth_providers character varying[],
    is_verified boolean,
    id_verified boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24580)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4765 (class 2604 OID 49179)
-- Name: otps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otps ALTER COLUMN id SET DEFAULT nextval('public.otps_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 24584)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4774 (class 2606 OID 49187)
-- Name: otps otps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otps
    ADD CONSTRAINT otps_pkey PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 49211)
-- Name: pending_registrations pending_registrations_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pending_registrations
    ADD CONSTRAINT pending_registrations_email_key UNIQUE (email);


--
-- TOC entry 4780 (class 2606 OID 49198)
-- Name: pending_registrations pending_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pending_registrations
    ADD CONSTRAINT pending_registrations_pkey PRIMARY KEY (email);


--
-- TOC entry 4768 (class 2606 OID 49189)
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 4776 (class 2606 OID 57345)
-- Name: otps unique_email_otp; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otps
    ADD CONSTRAINT unique_email_otp UNIQUE (email);


--
-- TOC entry 4770 (class 2606 OID 32769)
-- Name: users unique_google_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_google_id UNIQUE (google_id);


--
-- TOC entry 4782 (class 2606 OID 49209)
-- Name: pending_registrations unique_pending_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pending_registrations
    ADD CONSTRAINT unique_pending_email UNIQUE (email);


--
-- TOC entry 4772 (class 2606 OID 24595)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2026-07-09 18:23:17

--
-- PostgreSQL database dump complete
--

\unrestrict Hec8UwCGhlGBH4rS7hROTyWNAKClPaADKw2L6iVWJBqcdTDYArNfV5PFWP0j2IP

