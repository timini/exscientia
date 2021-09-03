--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.0

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

--
-- Name: operator; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.operator AS ENUM (
    '=',
    '>',
    '<',
    '<=',
    '>=',
    '~',
    '*'
);


--
-- Name: result; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.result AS ENUM (
    'IC50',
    'Ki',
    'Kd'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: assay_results; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assay_results (
    result_id integer NOT NULL,
    bio_target text,
    result public.result,
    operator public.operator,
    val text,
    unit text,
    compound_id integer
);


--
-- Name: TABLE assay_results; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.assay_results IS 'The assay results for the compound (could be shown as Kd = 19uM) https://en.wikipedia.org/wiki/Assay.';


--
-- Name: COLUMN assay_results.result_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.assay_results.result_id IS 'Unique identifier for an assay_result.';


--
-- Name: COLUMN assay_results.bio_target; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.assay_results.bio_target IS 'The long name of the biological target used in the assay.';


--
-- Name: COLUMN assay_results.result; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.assay_results.result IS 'The result type of the assay.';


--
-- Name: COLUMN assay_results.operator; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.assay_results.operator IS 'The value operator.';


--
-- Name: COLUMN assay_results.val; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.assay_results.val IS 'The result value.';


--
-- Name: COLUMN assay_results.unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.assay_results.unit IS 'The result unit.';


--
-- Name: COLUMN assay_results.compound_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.assay_results.compound_id IS 'The compound this assay was run against.';


--
-- Name: assay_results_result_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.assay_results_result_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assay_results_result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.assay_results_result_id_seq OWNED BY public.assay_results.result_id;


--
-- Name: compounds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.compounds (
    compound_id integer NOT NULL,
    smiles text NOT NULL,
    molecular_weight numeric,
    alogp numeric,
    molecular_formula text,
    num_rings numeric,
    img text
);


--
-- Name: TABLE compounds; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.compounds IS 'A small data set of compounds and assay results extracted from ChEMBL';


--
-- Name: COLUMN compounds.compound_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.compounds.compound_id IS 'Unique identifier for a compound, this is the primary key.';


--
-- Name: COLUMN compounds.smiles; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.compounds.smiles IS 'String representation of the compound https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system.';


--
-- Name: COLUMN compounds.molecular_weight; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.compounds.molecular_weight IS 'The weight of the compound, could be plotted on the X axis.';


--
-- Name: COLUMN compounds.alogp; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.compounds.alogp IS 'Indicates if the compound will dissolve in water or not, could be plotted on the Y axis.';


--
-- Name: COLUMN compounds.molecular_formula; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.compounds.molecular_formula IS 'A short string representation of the compound.';


--
-- Name: COLUMN compounds.num_rings; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.compounds.num_rings IS 'A count of the rings in the compound, could be used to color a plot. https://en.wikipedia.org/wiki/Ring_(chemistry)';


--
-- Name: COLUMN compounds.img; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.compounds.img IS 'Compounds are visualised as 2D graphs, path to a pre-calculated png image of the compound.';


--
-- Name: compounds_compound_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.compounds_compound_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: compounds_compound_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.compounds_compound_id_seq OWNED BY public.compounds.compound_id;


--
-- Name: assay_results result_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assay_results ALTER COLUMN result_id SET DEFAULT nextval('public.assay_results_result_id_seq'::regclass);


--
-- Name: compounds compound_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.compounds ALTER COLUMN compound_id SET DEFAULT nextval('public.compounds_compound_id_seq'::regclass);


--
-- Data for Name: assay_results; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assay_results (result_id, bio_target, result, operator, val, unit, compound_id) FROM stdin;
8046397	Bromodomain-containing protein 4	IC50	=	15.5	nM	1117973
12161673	Bromodomain-containing protein 4	IC50	=	140	nM	1117973
8056056	Bromodomain-containing protein 4	Kd	=	19	nM	1117973
12161626	Bromodomain-containing protein 4	Kd	=	24	nM	1117973
8046406	Bromodomain-containing protein 4	Kd	=	52.5	nM	1117973
8046396	Bromodomain-containing protein 3	IC50	=	28.4	nM	1117973
12161628	Bromodomain-containing protein 3	Kd	=	19	nM	1117973
8046405	Bromodomain-containing protein 3	Kd	=	46	nM	1117973
8046395	Bromodomain-containing protein 2	IC50	=	29.9	nM	1117973
12161630	Bromodomain-containing protein 2	Kd	=	52	nM	1117973
8046404	Bromodomain-containing protein 2	Kd	=	52	nM	1117973
8046403	Bromodomain-containing protein 4	IC50	=	36.1	nM	694811
12161672	Bromodomain-containing protein 4	IC50	=	190	nM	694811
12161625	Bromodomain-containing protein 4	Kd	=	49	nM	694811
8046400	Bromodomain-containing protein 4	Kd	=	55.2	nM	694811
8046402	Bromodomain-containing protein 3	IC50	=	42.4	nM	694811
8046399	Bromodomain-containing protein 3	Kd	=	50.5	nM	694811
12161627	Bromodomain-containing protein 3	Kd	=	89	nM	694811
8046401	Bromodomain-containing protein 2	IC50	=	32.5	nM	694811
8046398	Bromodomain-containing protein 2	Kd	=	61.3	nM	694811
12161629	Bromodomain-containing protein 2	Kd	=	101	nM	694811
8046392	Bromodomain-containing protein 4	IC50	=	33	nM	1282795
8046391	Bromodomain-containing protein 4	IC50	=	77	nM	1282795
8055998	Bromodomain-containing protein 4	Kd	=	49	nM	1282795
8046388	Bromodomain-containing protein 4	Kd	=	49	nM	1282795
8056055	Bromodomain-containing protein 4	Kd	=	60	nM	1282795
8046389	Bromodomain-containing protein 4	Kd	=	90.1	nM	1282795
8046386	Bromodomain-containing protein 3	Kd	=	59.5	nM	1282795
8046387	Bromodomain-containing protein 3	Kd	=	82	nM	1282795
8046385	Bromodomain-containing protein 2	Kd	=	128.4	nM	1282795
12062961	Bromodomain-containing protein 4	Kd	=	19	nM	1424122
12062960	Bromodomain-containing protein 3	Kd	=	19	nM	1424122
12062959	Bromodomain-containing protein 2	Kd	=	19	nM	1424122
12062962	Bromodomain-containing protein 2	Kd	=	46	nM	1424122
12062966	Bromodomain-containing protein 2	Kd	=	52	nM	1424122
12062963	Bromodomain-containing protein 2	Kd	=	52.5	nM	1424122
12062974	Bromodomain-containing protein 2	Kd	=	54	nM	1424122
12062973	Bromodomain-containing protein 2	Kd	=	220	nM	1424122
8034566	Bromodomain-containing protein 4	IC50	=	2000	nM	1279938
8034563	Bromodomain-containing protein 4	IC50	=	10000	nM	1279938
8034565	Bromodomain-containing protein 3	IC50	=	2500	nM	1279938
8034562	Bromodomain-containing protein 3	IC50	=	6300	nM	1279938
8034564	Bromodomain-containing protein 2	IC50	=	2000	nM	1279938
8034561	Bromodomain-containing protein 2	IC50	=	12600	nM	1279938
18201146	Bromodomain-containing protein 4	Kd	=	3300	nM	2072554
18201147	Bromodomain-containing protein 4	Kd	>	300000	nM	2072554
18201148	Bromodomain-containing protein 3	Kd	=	3700	nM	2072554
18201149	Bromodomain-containing protein 3	Kd	>	300000	nM	2072554
18201150	Bromodomain-containing protein 2	Kd	=	8600	nM	2072554
18201140	Bromodomain-containing protein 3	Kd	=	195	nM	1566719
18201138	Bromodomain-containing protein 3	Kd	=	4065	nM	1566719
18201141	Bromodomain-containing protein 2	Kd	=	251	nM	1566719
18201139	Bromodomain-containing protein 2	Kd	=	5780	nM	1566719
6364731	Bromodomain-containing protein 4	IC50	=	4800	nM	1175669
6365475	Bromodomain-containing protein 4	IC50	=	7000	nM	1175669
6365474	Bromodomain-containing protein 2	IC50	=	3000	nM	1175669
12161631	Bromodomain-containing protein 4	IC50	=	2600	nM	1442546
12161570	Bromodomain-containing protein 4	Kd	=	2750	nM	1442546
12161571	Bromodomain-containing protein 2	Kd	=	3140	nM	1442546
6364732	Bromodomain-containing protein 4	IC50	=	84200	nM	1175670
12733077	Bromodomain-containing protein 4	Kd	=	50	nM	1175670
6364741	Bromodomain-containing protein 2	IC50	=	34300	nM	1175670
8034577	Bromodomain-containing protein 4	IC50	=	30000	nM	1279939
8034576	Bromodomain-containing protein 3	IC50	=	30000	nM	1279939
8034575	Bromodomain-containing protein 2	IC50	=	30000	nM	1279939
12185151	Bromodomain-containing protein 4	IC50	>	10000	nM	1445393
12185152	Bromodomain-containing protein 3	IC50	>	10000	nM	1445393
8046394	Bromodomain-containing protein 2	Kd	=	28000	nM	1117824
12139756	Bromodomain-containing protein 2	Kd	=	28000	nM	1117824
6364738	Bromodomain-containing protein 4	IC50	=	7500	nM	1175676
6364747	Bromodomain-containing protein 2	IC50	=	2300	nM	1175676
6364733	Bromodomain-containing protein 4	IC50	=	24600	nM	1175671
6364742	Bromodomain-containing protein 2	IC50	=	6000	nM	1175671
6364734	Bromodomain-containing protein 4	IC50	=	23200	nM	1175672
6364743	Bromodomain-containing protein 2	IC50	=	7400	nM	1175672
6364739	Bromodomain-containing protein 4	IC50	=	4800	nM	1175677
6364748	Bromodomain-containing protein 2	IC50	=	1600	nM	1175677
6364737	Bromodomain-containing protein 4	IC50	=	51200	nM	1175675
6364746	Bromodomain-containing protein 2	IC50	=	28200	nM	1175675
6364736	Bromodomain-containing protein 4	IC50	=	7700	nM	1175674
6364745	Bromodomain-containing protein 2	IC50	=	3300	nM	1175674
6364735	Bromodomain-containing protein 4	IC50	=	9700	nM	1175673
6364744	Bromodomain-containing protein 2	IC50	=	4200	nM	1175673
17790209	Bromodomain-containing protein 4	Ki	=	226	nM	2195979
17790208	Bromodomain-containing protein 4	Ki	=	89.5	nM	2126244
17790205	Bromodomain-containing protein 4	Ki	=	224	nM	2132891
17790204	Bromodomain-containing protein 4	Ki	=	911	nM	2145299
17790199	Bromodomain-containing protein 4	Ki	=	1690	nM	2150146
17790196	Bromodomain-containing protein 4	Ki	=	156	nM	2132279
17790195	Bromodomain-containing protein 4	Ki	=	71.8	nM	2168706
17790194	Bromodomain-containing protein 4	Ki	=	248	nM	2137686
17790192	Bromodomain-containing protein 4	Ki	=	188	nM	2191296
17790191	Bromodomain-containing protein 4	Ki	=	131	nM	2114212
17790189	Bromodomain-containing protein 4	Ki	=	242	nM	2136098
17790183	Bromodomain-containing protein 4	Ki	=	1280	nM	2100565
17790182	Bromodomain-containing protein 4	Ki	=	716	nM	2128650
17790181	Bromodomain-containing protein 4	Ki	=	575	nM	2106048
17790179	Bromodomain-containing protein 4	Ki	=	725	nM	2114296
17790176	Bromodomain-containing protein 4	Ki	=	248	nM	2173800
17790175	Bromodomain-containing protein 4	Ki	=	375	nM	2135811
17790172	Bromodomain-containing protein 4	Ki	=	608	nM	2106568
17790166	Bromodomain-containing protein 4	Ki	=	244	nM	2161598
18201037	Bromodomain-containing protein 4	Kd	=	0.43	nM	2216949
18201038	Bromodomain-containing protein 4	Kd	=	1.3	nM	2238695
17790178	Bromodomain-containing protein 4	Ki	=	504	nM	2185083
17790169	Bromodomain-containing protein 4	Ki	=	288	nM	2102749
17790215	Bromodomain-containing protein 4	Ki	=	324	nM	2122827
17790203	Bromodomain-containing protein 4	Ki	=	68.5	nM	2171840
17790190	Bromodomain-containing protein 4	Ki	>	2380	nM	2188194
17790177	Bromodomain-containing protein 4	Ki	=	255	nM	2174515
17790165	Bromodomain-containing protein 4	Ki	=	339	nM	2124927
17790224	Bromodomain-containing protein 4	Ki	>	2380	nM	2191624
17790201	Bromodomain-containing protein 4	Ki	=	329	nM	2101238
17790168	Bromodomain-containing protein 4	Ki	=	280	nM	2130758
17790223	Bromodomain-containing protein 4	Ki	=	2190	nM	2168158
17790222	Bromodomain-containing protein 4	Ki	>	2380	nM	2099118
17790219	Bromodomain-containing protein 4	Ki	=	150	nM	2141906
17790218	Bromodomain-containing protein 4	Ki	=	247	nM	2113909
17790214	Bromodomain-containing protein 4	Ki	>	2380	nM	2192646
17790213	Bromodomain-containing protein 4	Ki	>	2380	nM	2117369
17790212	Bromodomain-containing protein 4	Ki	=	991	nM	2184661
17790210	Bromodomain-containing protein 4	Ki	=	111	nM	2179538
12161665	Bromodomain-containing protein 4	IC50	=	3000	nM	1442554
12161664	Bromodomain-containing protein 4	IC50	=	7600	nM	1442555
12161663	Bromodomain-containing protein 4	IC50	=	3300	nM	1442556
12161661	Bromodomain-containing protein 4	IC50	=	2800	nM	1442558
12161660	Bromodomain-containing protein 4	IC50	=	8200	nM	1442559
12161656	Bromodomain-containing protein 4	IC50	=	16000	nM	1442563
12161654	Bromodomain-containing protein 4	IC50	=	20000	nM	1442565
12161653	Bromodomain-containing protein 4	IC50	=	4400	nM	1442566
12161649	Bromodomain-containing protein 4	IC50	=	2000	nM	1442570
12161647	Bromodomain-containing protein 4	IC50	=	2400	nM	1442530
12161646	Bromodomain-containing protein 4	IC50	=	1000	nM	1442531
12161644	Bromodomain-containing protein 4	IC50	=	1800	nM	1442533
12161640	Bromodomain-containing protein 4	IC50	=	4200	nM	1442537
12161639	Bromodomain-containing protein 4	IC50	=	11000	nM	1442538
12161636	Bromodomain-containing protein 4	IC50	=	10000	nM	1442541
12161637	Bromodomain-containing protein 4	IC50	=	22000	nM	1442540
8056000	Bromodomain-containing protein 4	Kd	=	640	nM	1283877
8055999	Bromodomain-containing protein 4	Kd	=	2460	nM	27648
12072794	Bromodomain-containing protein 4	Kd	=	50000	nM	1424737
8056057	Bromodomain-containing protein 4	Kd	=	50	nM	1283887
17790163	Bromodomain-containing protein 4	Ki	=	331	nM	2193125
17790225	Bromodomain-containing protein 4	Ki	=	352	nM	2159469
17790221	Bromodomain-containing protein 4	Ki	=	767	nM	2182646
17790217	Bromodomain-containing protein 4	Ki	>	2380	nM	2131816
17790211	Bromodomain-containing protein 4	Ki	=	116	nM	2251994
17790206	Bromodomain-containing protein 4	Ki	=	304	nM	2169478
17790202	Bromodomain-containing protein 4	Ki	=	284	nM	2099305
17790198	Bromodomain-containing protein 4	Ki	=	137	nM	2125660
17790193	Bromodomain-containing protein 4	Ki	=	140	nM	2176417
17790184	Bromodomain-containing protein 4	Ki	=	1030	nM	2098840
17790180	Bromodomain-containing protein 4	Ki	>	2380	nM	2137553
17790174	Bromodomain-containing protein 4	Ki	=	320	nM	2107746
17790170	Bromodomain-containing protein 4	Ki	>	2380	nM	2167381
17790164	Bromodomain-containing protein 4	Ki	=	271	nM	2152891
13477950	Bromodomain-containing protein 4	Kd	=	136	nM	1440191
13477951	Bromodomain-containing protein 4	Kd	=	100	nM	1585157
12679312	Bromodomain-containing protein 4	Kd	=	360	nM	1524804
12679259	Bromodomain-containing protein 4	Kd	=	390	nM	1524811
12161642	Bromodomain-containing protein 4	IC50	=	12000	nM	1442535
12161657	Bromodomain-containing protein 4	IC50	=	5600	nM	1442562
12161670	Bromodomain-containing protein 4	IC50	=	500	nM	1442549
\.


--
-- Data for Name: compounds; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.compounds (compound_id, smiles, molecular_weight, alogp, molecular_formula, num_rings, img) FROM stdin;
1117973	Cc1nnc2[C@H](NC(=O)OCc3ccccc3)N=C(c4ccccc4)c5ccccc5n12	423.46654	4.686	C25H21N5O2	5	images/1117973.png
694811	CCNC(=O)C[C@@H]1N=C(c2ccc(Cl)cc2)c3cc(OC)ccc3n4c(C)nnc14	423.89538	3.288	C22H22ClN5O2	4	images/694811.png
1282795	Cc1sc2c(C(=N[C@@H](CC(=O)OC(C)(C)C)c3nnc(C)n23)c4ccc(Cl)cc4)c1C	456.9882	4.953	C23H25ClN4O2S	4	images/1282795.png
1424122	Cc1nnc2C(NC(=O)OCc3ccccc3)N=C(c4ccccc4)c5ccccc5n12	423.46654	4.686	C25H21N5O2	5	images/1424122.png
1279938	CC(=O)c1cc(c2ccccn2)c3ccccn13	236.26858	2.49	C15H12N2O	3	images/1279938.png
2072554	CC(=O)NCCCCn1c2CCNC(=O)c2c3ccccc13	299.36754	1.451	C17H21N3O2	3	images/2072554.png
1566719	COc1cc(OC)c2C(=O)NC(=Nc2c1)c3cc(C)c(OCCO)c(C)c3	370.39908	2.877	C20H22N2O5	3	images/1566719.png
1175669	CN1Cc2cc(ccc2NC1=O)c3c(C)onc3C	257.2878	1.306	C14H15N3O2	3	images/1175669.png
1442546	Cc1onc(C)c1c2ccc(OCCCN3CCOCC3)c(c2)S(=O)(=O)NC4CCCC4	463.59022	2.416	C23H33N3O5S	4	images/1442546.png
1175670	Cc1onc(C)c1c2ccccc2	173.21114	2.23	C11H11NO	2	images/1175670.png
1279939	CN1Cc2cc(ccc2N(C)C1=O)S(=O)(=O)N3CCOCC3	325.38336	-0.084	C14H19N3O4S	3	images/1279939.png
1445393	CC(C)(C)NS(=O)(=O)c1cncc(c1)c2ccn3nc(N)nc3c2	346.40742	0.61	C15H18N6O2S	3	images/1445393.png
1117824	CN1C(=S)N(CCSc2nc3ccccc3[nH]2)c4ccccc14	340.46574	5.491	C17H16N4S2	4	images/1117824.png
1175676	CCOc1cc(cc(c1)c2c(C)onc2C)C(=O)C	259.30038	2.302	C15H17NO3	2	images/1175676.png
1175671	CC(=O)c1cccc(c1)c2c(C)onc2C	215.24782	1.97	C13H13NO2	2	images/1175671.png
1175672	CCOc1cccc(c1)c2c(C)onc2C	217.2637	2.563	C13H15NO2	2	images/1175672.png
1175677	CCOc1cc(cc(c1)c2c(C)onc2C)C(C)O	261.31626	2.335	C15H19NO3	2	images/1175677.png
1175675	CCOc1cc(cc(c1)c2c(C)onc2C)C(=O)O	261.2732	2.192	C14H15NO4	2	images/1175675.png
1175674	CCOC(=O)c1cc(OCC)cc(c1)c2c(C)onc2C	289.32636	2.767	C16H19NO4	2	images/1175674.png
1175673	CC(O)c1cccc(c1)c2c(C)onc2C	217.2637	2.003	C13H15NO2	2	images/1175673.png
2195979	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CNC(=O)c3ccccc3)ccc2Oc4ccc(F)cc4F	533.52271	3.213	C29H25F2N3O5	4	images/2195979.png
2126244	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3ccccc3OC)ccc2Oc4ccc(F)cc4F	520.52395	4.171	C29H26F2N2O5	4	images/2126244.png
2132891	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CCC(=O)c3ccccc3)ccc2Oc4ccc(F)cc4F	532.53465	4.108	C30H26F2N2O5	4	images/2132891.png
2145299	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3ccc(cc3)c4ccccc4)ccc2Oc5ccc(F)cc5F	566.59393	5.706	C34H28F2N2O4	5	images/2145299.png
2150146	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3ccc(Oc4ccccc4)cc3)ccc2Oc5ccc(F)cc5F	582.59333	5.748	C34H28F2N2O5	5	images/2150146.png
2132279	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CCc3ccc(OC)c(OC)c3OC)ccc2Oc4ccc(F)cc4F	594.60249	4.595	C32H32F2N2O7	4	images/2132279.png
2168706	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)COc3ccc(C)cc3)ccc2Oc4ccc(F)cc4F	520.52395	4.474	C29H26F2N2O5	4	images/2168706.png
2137686	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CNS(=O)(=O)c3ccc(C)cc3)ccc2Oc4ccc(F)cc4F	583.60299	3.402	C29H27F2N3O6S	4	images/2137686.png
2191296	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CCOc3ccccc3)ccc2Oc4ccc(F)cc4F	520.52395	4.236	C29H26F2N2O5	4	images/2191296.png
2114212	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3ccc(cc3)S(=O)(=O)C)ccc2Oc4ccc(F)cc4F	568.58835	3.714	C29H26F2N2O6S	4	images/2114212.png
2136098	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CCS(=O)(=O)c3ccccc3)ccc2Oc4ccc(F)cc4F	568.58835	3.779	C29H26F2N2O6S	4	images/2136098.png
2100565	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Nc3cccc(Cl)c3)ccc2Oc4ccc(F)cc4F	525.93109	4.725	C27H22ClF2N3O4	4	images/2100565.png
2128650	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Nc3ccc(F)cc3)ccc2Oc4ccc(F)cc4F	509.47649	4.266	C27H22F3N3O4	4	images/2128650.png
2106048	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Nc3cc(C)ccc3C)ccc2Oc4ccc(F)cc4F	519.53919	5.033	C29H27F2N3O4	4	images/2106048.png
2114296	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Nc3cc(C)cc(C)c3)ccc2Oc4ccc(F)cc4F	519.53919	5.033	C29H27F2N3O4	4	images/2114296.png
2173800	CCOC1=CC(=O)N(C)C=C1c2cc(NCCCC(=O)OC)ccc2Oc3ccc(F)cc3F	472.48115	3.453	C25H26F2N2O5	3	images/2173800.png
2135811	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3ccnn3C)ccc2Oc4ccc(F)cc4F	466.47987	3.488	C25H24F2N4O3	4	images/2135811.png
2106568	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3cn4CCCc4n3)ccc2Oc5ccc(F)cc5F	492.51715	3.585	C27H26F2N4O3	5	images/2106568.png
2161598	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3cnn(C)c3)ccc2Oc4ccc(F)cc4F	494.48997	2.838	C26H24F2N4O4	4	images/2161598.png
2216949	Cc1sc2c(C(=N[C@@H](CC(=O)OCCCCCCO)c3nnc(C)n23)c4ccc(Cl)cc4)c1C	501.04076	5.037	C25H29ClN4O3S	4	images/2216949.png
2238695	Cc1sc2c(C(=N[C@H](CC(=O)OC3CCC(O)CC3)c4nnc(C)n24)c5ccc(Cl)cc5)c1C	499.02488	4.643	C25H27ClN4O3S	5	images/2238695.png
2185083	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Nc3ccc(C)cc3C)ccc2Oc4ccc(F)cc4F	519.53919	5.033	C29H27F2N3O4	4	images/2185083.png
2102749	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3cnc(C)s3)ccc2Oc4ccc(F)cc4F	511.54033	3.195	C26H23F2N3O4S	4	images/2102749.png
2122827	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3c(F)cccc3F)ccc2Oc4ccc(F)cc4F	498.46879	5.171	C27H22F4N2O3	4	images/2122827.png
2171840	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CCc3ccccc3)ccc2Oc4ccc(F)cc4F	504.52455	4.644	C29H26F2N2O4	4	images/2171840.png
2188194	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3cccc(Oc4ccccc4)c3)ccc2Oc5ccc(F)cc5F	582.59333	5.748	C34H28F2N2O5	5	images/2188194.png
2174515	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Nc3cccc(Oc4ccccc4)c3)ccc2Oc5ccc(F)cc5F	583.58139	5.621	C33H27F2N3O5	5	images/2174515.png
2124927	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3ccc(Cl)cc3F)ccc2Oc4ccc(F)cc4F	542.93349	5.058	C28H22ClF3N2O4	4	images/2124927.png
2191624	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3ccc(Oc4ccccc4)cc3)ccc2Oc5ccc(F)cc5F	554.58323	6.32	C33H28F2N2O4	5	images/2191624.png
2101238	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3ccc4ccccc4c3)ccc2Oc5ccc(F)cc5F	540.55665	5.096	C32H26F2N2O4	5	images/2101238.png
2130758	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3cc(C)n(C)n3)ccc2Oc4ccc(F)cc4F	508.51655	3.412	C27H26F2N4O4	4	images/2130758.png
2168158	CCCCOc1ccc(CNc2ccc(Oc3ccc(F)cc3F)c(c2)C4=CN(C)C(=O)C=C4OCC)cc1	534.59359	6.073	C31H32F2N2O4	4	images/2168158.png
2099118	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3oc(cc3)c4ccccc4C(F)(F)F)ccc2Oc5ccc(F)cc5F	596.54392	6.694	C32H25F5N2O4	5	images/2099118.png
2141906	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3ccccc3C#N)ccc2Oc4ccc(F)cc4F	487.49733	4.639	C28H23F2N3O3	4	images/2141906.png
2113909	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3ccc(cc3)C#N)ccc2Oc4ccc(F)cc4F	487.49733	4.639	C28H23F2N3O3	4	images/2113909.png
2192646	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3ccc(cc3)C(C)(C)C)ccc2Oc4ccc(F)cc4F	518.59419	6.161	C31H32F2N2O3	4	images/2192646.png
2117369	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3ccc(OCc4ccccc4)cc3)ccc2Oc5ccc(F)cc5F	568.60981	6.327	C34H30F2N2O4	5	images/2117369.png
2184661	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3cccc(OC)c3OCc4ccccc4)ccc2Oc5ccc(F)cc5F	598.63579	6.311	C35H32F2N2O5	5	images/2184661.png
2179538	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CC3CCCCC3)ccc2Oc4ccc(F)cc4F	496.54561	4.86	C28H30F2N2O4	4	images/2179538.png
1442554	Cc1onc(C)c1c2ccc(C)c(c2)S(=O)(=O)Nc3ccccc3Cl	376.85718	3.868	C18H17ClN2O3S	3	images/1442554.png
1442555	COc1ccc(cc1S(=O)(=O)Nc2ccccc2Cl)c3c(C)onc3C	392.85658	3.366	C18H17ClN2O4S	3	images/1442555.png
1442556	Cc1onc(C)c1c2ccc(C)c(c2)S(=O)(=O)Nc3cccc(Cl)c3	376.85718	3.868	C18H17ClN2O3S	3	images/1442556.png
1442558	COc1ccccc1NS(=O)(=O)c2cc(ccc2C)c3c(C)onc3C	372.4381	3.188	C19H20N2O4S	3	images/1442558.png
1442559	COc1ccccc1NS(=O)(=O)c2cc(ccc2OC)c3c(C)onc3C	388.4375	2.685	C19H20N2O5S	3	images/1442559.png
1442563	COc1ccc(NS(=O)(=O)c2cc(ccc2OC)c3c(C)onc3C)cc1	388.4375	2.685	C19H20N2O5S	3	images/1442563.png
1442565	COc1ccc(cc1S(=O)(=O)NCc2ccccc2)c3c(C)onc3C	372.4381	2.708	C19H20N2O4S	3	images/1442565.png
1442566	Cc1onc(C)c1c2ccc(C)c(c2)S(=O)(=O)NCCc3ccccc3	370.46528	3.532	C20H22N2O3S	3	images/1442566.png
1442570	Cc1onc(C)c1c2ccc(C)c(c2)S(=O)(=O)NC(C)(C)C	322.42248	2.559	C16H22N2O3S	2	images/1442570.png
1442530	CCNS(=O)(=O)c1cc(ccc1C)c2c(C)onc2C	294.36932	1.976	C14H18N2O3S	2	images/1442530.png
1442531	COc1ccc(cc1S(=O)(=O)N(C)C2CCCC2)c3c(C)onc3C	364.45916	2.733	C18H24N2O4S	3	images/1442531.png
1442533	Cc1onc(C)c1c2ccc(C)c(c2)S(=O)(=O)N3CCCC3	320.4066	2.294	C16H20N2O3S	3	images/1442533.png
1442537	Cc1onc(C)c1c2ccc(C)c(c2)S(=O)(=O)N3CCOCC3	336.406	1.521	C16H20N2O4S	3	images/1442537.png
1442538	COc1ccc(cc1S(=O)(=O)N2CCOCC2)c3c(C)onc3C	352.4054	1.018	C16H20N2O5S	3	images/1442538.png
1442541	Cc1onc(C)c1c2ccc(C)c(c2)S(=O)(=O)NC3CCCNC3	349.44782	1.72	C17H23N3O3S	3	images/1442541.png
1442540	COc1ccc(cc1S(=O)(=O)NC2CCNCC2)c3c(C)onc3C	365.44722	0.7	C17H23N3O4S	3	images/1442540.png
1283877	CN1N=C(c2ccccc2)c3cc(Cl)ccc3n4c(C)nnc14	323.77956	4.082	C17H14ClN5	4	images/1283877.png
27648	Cc1nnc2CN=C(c3ccccc3)c4cc(Cl)ccc4n12	308.76492	3.513	C17H13ClN4	4	images/27648.png
1424737	COCCN(CC(=O)N(CCCCN)CC(=O)N(CCCCN)CC(=O)N)C(=O)CN(CCCCN)C(=O)CN(CCc1ccc(O)cc1)C(=O)CNCC(C)C	807.0353	-2.87	C39H70N10O8	1	images/1424737.png
1283887	CCNC(=O)C[C@@H]1N=C(c2ccc(Cl)cc2)c3ccc(OC)cc3n4c(C)nnc14	423.89538	3.288	C22H22ClN5O2	4	images/1283887.png
2193125	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3cc(F)ccc3Cl)ccc2Oc4ccc(F)cc4F	542.93349	5.058	C28H22ClF3N2O4	4	images/2193125.png
2159469	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3cccc(c3)C#N)ccc2Oc4ccc(F)cc4F	487.49733	4.639	C28H23F2N3O3	4	images/2159469.png
2182646	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3c(C)nn(c3Cl)c4ccccc4)ccc2Oc5ccc(F)cc5F	577.02089	5.728	C31H27ClF2N4O3	5	images/2182646.png
2131816	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3oc(cc3)c4ccccc4Cl)ccc2Oc5ccc(F)cc5F	562.99101	6.416	C31H25ClF2N2O4	5	images/2131816.png
2251994	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CC3C[C@@H]4CC[C@H]3C4)ccc2Oc5ccc(F)cc5F	508.55631	4.536	C29H30F2N2O4	5	images/2251994.png
2169478	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CCCOc3ccccc3)ccc2Oc4ccc(F)cc4F	534.55053	4.558	C30H28F2N2O5	4	images/2169478.png
2099305	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)CCCC(=O)Nc3ccccc3)ccc2Oc4ccc(F)cc4F	561.57587	3.945	C31H29F2N3O5	4	images/2099305.png
2125660	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3noc4ccccc34)ccc2Oc5ccc(F)cc5F	531.50683	4.27	C29H23F2N3O5	5	images/2125660.png
2176417	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3cccc4ccccc34)ccc2Oc5ccc(F)cc5F	540.55665	5.096	C32H26F2N2O4	5	images/2176417.png
2098840	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Nc3cccc(OC)c3)ccc2Oc4ccc(F)cc4F	521.51201	4.045	C28H25F2N3O5	4	images/2098840.png
2137553	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Nc3ccc(OC(F)(F)F)cc3)ccc2Oc4ccc(F)cc4F	575.4834	6.181	C28H22F5N3O5	4	images/2137553.png
2107746	CCOC1=CC(=O)N(C)C=C1c2cc(NCc3ncccc3C)ccc2Oc4ccc(F)cc4F	477.50251	4.311	C27H25F2N3O3	4	images/2107746.png
2167381	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cn3ccc(n3)c4ccccc4F)ccc2Oc5ccc(F)cc5F	574.54981	4.807	C31H25F3N4O4	5	images/2167381.png
2152891	CCOC1=CC(=O)N(C)C=C1c2cc(NC(=O)Cc3ccc4OCCCc4c3)ccc2Oc5ccc(F)cc5F	546.56123	4.702	C31H28F2N2O5	5	images/2152891.png
1440191	COc1ccccc1S(=O)(=O)Nc2ccc3NC(=O)N(C)Cc3c2	347.38888	1.376	C16H17N3O4S	3	images/1440191.png
1585157	COc1cc2c3NC(=O)N([C@H](C)c4ccccn4)c3cnc2cc1c5c(C)onc5C	415.44454	2.601	C23H21N5O3	5	images/1585157.png
1524804	Cc1onc(C)c1c2cc(O)cc(c2)[C@H](O)c3ccccc3	295.33248	2.996	C18H17NO3	3	images/1524804.png
1524811	Cc1onc(C)c1c2cc(O)cc(c2)[C@@H](O)c3ccccc3	295.33248	2.996	C18H17NO3	3	images/1524811.png
1442535	Cc1onc(C)c1c2ccc(C)c(c2)S(=O)(=O)N3CCNCC3	335.42124	1.255	C16H21N3O3S	3	images/1442535.png
1442562	COc1ccc(NS(=O)(=O)c2cc(ccc2C)c3c(C)onc3C)cc1	372.4381	3.188	C19H20N2O4S	3	images/1442562.png
1442549	Cc1onc(C)c1c2ccc(C)c(c2)S(=O)(=O)NC3CCCC3	334.43318	3.029	C17H22N2O3S	3	images/1442549.png
\.


--
-- Name: assay_results_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assay_results_result_id_seq', 1, false);


--
-- Name: compounds_compound_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.compounds_compound_id_seq', 1, false);


--
-- Name: assay_results assay_results_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assay_results
    ADD CONSTRAINT assay_results_pkey PRIMARY KEY (result_id);


--
-- Name: compounds compounds_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.compounds
    ADD CONSTRAINT compounds_pkey PRIMARY KEY (compound_id);


--
-- Name: assay_results assay_results_compound_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assay_results
    ADD CONSTRAINT assay_results_compound_id_fkey FOREIGN KEY (compound_id) REFERENCES public.compounds(compound_id);


--
-- PostgreSQL database dump complete
--

