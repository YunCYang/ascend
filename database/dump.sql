--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.route DROP CONSTRAINT route_fk0;
ALTER TABLE ONLY public."user" DROP CONSTRAINT "user_userName_key";
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pk;
ALTER TABLE ONLY public.route DROP CONSTRAINT route_pk;
ALTER TABLE public."user" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.route ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.route ALTER COLUMN "routeId" DROP DEFAULT;
DROP SEQUENCE public."user_userId_seq";
DROP TABLE public."user";
DROP SEQUENCE public."route_userId_seq";
DROP SEQUENCE public."route_routeId_seq";
DROP TABLE public.route;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: route; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.route (
    "routeId" integer NOT NULL,
    name character varying(255) DEFAULT 'Unnamed'::character varying,
    grade character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    location character varying(255) NOT NULL,
    "locationType" boolean NOT NULL,
    attempts integer NOT NULL,
    angle integer,
    completed date NOT NULL,
    note text,
    image bytea,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: route_routeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."route_routeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: route_routeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."route_routeId_seq" OWNED BY public.route."routeId";


--
-- Name: route_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."route_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: route_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."route_userId_seq" OWNED BY public.route."userId";


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    "userId" integer NOT NULL,
    "userName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: user_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."user_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."user_userId_seq" OWNED BY public."user"."userId";


--
-- Name: route routeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route ALTER COLUMN "routeId" SET DEFAULT nextval('public."route_routeId_seq"'::regclass);


--
-- Name: route userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route ALTER COLUMN "userId" SET DEFAULT nextval('public."route_userId_seq"'::regclass);


--
-- Name: user userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN "userId" SET DEFAULT nextval('public."user_userId_seq"'::regclass);


--
-- Data for Name: route; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.route ("routeId", name, grade, "userId", location, "locationType", attempts, angle, completed, note, image, "createdAt") FROM stdin;
2	route2	5	1	location2	f	2	40	2020-02-15	\N	\N	2020-02-17 15:52:15.179228-08
3	route3	13	1	location3	f	3	\N	2020-02-13	\N	\N	2020-02-17 15:52:15.179228-08
5	route5	0	1	location3	t	2	30	2020-02-14	\N	\N	2020-02-17 15:52:15.179228-08
6	route6	3	1	location1	f	2	20	2020-02-13	\N	\N	2020-02-17 15:52:15.179228-08
7	route7	11	1	location3	t	3	50	2020-02-15	\N	\N	2020-02-17 15:52:15.179228-08
9	route9	0	1	location2	f	1	\N	2020-02-14	\N	\N	2020-02-17 15:52:15.179228-08
12	route12	5	1	location4	f	4	\N	2020-02-12	\N	\N	2020-02-17 15:52:15.179228-08
13	route13	12	1	location3	f	3	\N	2020-02-15	\N	\N	2020-02-17 15:52:15.179228-08
14	route14	11	1	location5	t	2	30	2020-02-13	\N	\N	2020-02-17 15:52:15.179228-08
15	route15	1	1	location1	t	1	\N	2020-02-15	\N	\N	2020-02-17 15:52:15.179228-08
16	route16	15	1	location3	t	2	\N	2020-02-14	\N	\N	2020-02-17 15:52:15.179228-08
17	route17	6	1	location2	f	1	30	2020-02-14	\N	\N	2020-02-17 15:52:15.179228-08
19	route19	10	1	location3	f	5	50	2020-02-14	\N	\N	2020-02-17 15:52:15.179228-08
22	route22	3	1	location3	t	2	\N	2020-02-15	\N	\N	2020-02-17 15:52:15.179228-08
21	route21	8	1	location1	f	1	30	2020-02-16	test	\N	2020-02-17 15:52:15.179228-08
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" ("userId", "userName", email, password, "createdAt") FROM stdin;
1	alex	alex@gmail.com	$2b$11$D0kb1HPIL7SHuSQIlbbvj..nSDVc0KgSyYynW8YeiXxFeu768etBG	2020-02-17 12:18:35.272195-08
2	testUser	test2@ascend.com	$2b$11$ekYkF2..SdCNZdwAVBOwqethCPdoOkjaFkPhx0vWMpXc/4RPbJ94u	2020-02-17 12:18:54.361902-08
3	alex2	alex@gmail.com	$2b$11$wteafKOtJeV4bIA5uB1xEeuRR0ZnobE8SU.6XnfNYY1y91Pvirgye	2020-02-19 19:13:45.603274-08
4	alex3	alex@gmail.com	$2b$11$462pvaB8UD6fNGIyhYFUNepS2jHvH1xC/oPFG72JPDVfA6xUngWEG	2020-02-19 19:14:33.133975-08
5	alex4	alex@gmail.com	$2b$11$fgwf5sKUuq0vucouop/jOuoVlqdidgObVhXwb9uf/g8gk7ygLUSji	2020-02-19 19:15:21.093164-08
6	alex5	alex@gmail.com	$2b$11$fB4AOF06A3QNwdCKpkEBNeA29Q1Y11R8CXkcnakbY2XBokwWCwMti	2020-02-19 19:18:05.118108-08
7	yun	yuncyang20@gmail.com	$2b$11$VE75rlVapwez4TH1fVubr.iWX8EIq51BKwQQsvoSRW6HUqE4mO9OC	2020-02-19 20:41:10.195708-08
\.


--
-- Name: route_routeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."route_routeId_seq"', 40, true);


--
-- Name: route_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."route_userId_seq"', 1, false);


--
-- Name: user_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."user_userId_seq"', 7, true);


--
-- Name: route route_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT route_pk PRIMARY KEY ("routeId");


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY ("userId");


--
-- Name: user user_userName_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "user_userName_key" UNIQUE ("userName");


--
-- Name: route route_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT route_fk0 FOREIGN KEY ("userId") REFERENCES public."user"("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

