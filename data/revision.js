const revision_data = [
  {
    "id": "dbms_q1_u1",
    "unit": 1,
    "question": "Compare DBMS and File Processing System",
    "points": [
      "**Redundancy & Consistency:** DBMS stores data centrally to reduce redundancy; File Systems duplicate data leading to inconsistencies.",
      "**Access & Security:** DBMS uses declarative SQL and role-based permissions; File Systems require custom code and basic file passwords.",
      "**Recovery & Concurrency:** DBMS supports automatic log-based recovery and concurrent lock protocols; File Systems do not."
    ]
  },
  {
    "id": "dbms_q2_u1",
    "unit": 1,
    "question": "Explain Three-Schema Architecture and Data Independence",
    "points": [
      "**Three Abstraction Levels:** External (user views), Conceptual (logical tables/relationships), and Internal (physical file storage).",
      "**Physical Data Independence:** Ability to change physical storage structures (e.g., HDD to SSD) without modifying the conceptual schema.",
      "**Logical Data Independence:** Ability to change conceptual schema (e.g., add columns) without modifying external views or application programs."
    ]
  },
  {
    "id": "dbms_q3_u1",
    "unit": 1,
    "question": "Explain DBMS Architecture with Diagram",
    "points": [
      "**Query Processor:** Parses queries, compiles DML, and creates optimal execution plans via the query evaluation engine.",
      "**Storage Manager:** Handles buffer allocation, file storage, and data dictionary catalog updates.",
      "**Disk Storage:** Stores data files, index structures, system logs, and metadata dictionaries."
    ]
  },
  {
    "id": "dbms_q4_u1",
    "unit": 1,
    "question": "Design ER Diagram for Hospital Management System",
    "points": [
      "**Entities & Attributes:** Represents real-world objects (e.g., Doctor, Patient) with attributes (Primary Keys underlined).",
      "**Relationships & Cardinality:** Defines links (e.g., Doctor treats Patient) with cardinality mappings (1:1, 1:M, M:N).",
      "**Weak Entities:** Relies on a strong owner entity and is identified using a double-bordered rectangle."
    ]
  },
  {
    "id": "dbms_q5_u1",
    "unit": 1,
    "question": "Explain Extended ER (EER) Features: Generalization, Specialization, and Aggregation",
    "points": [
      "**Specialization:** Top-down approach where a general entity is split into sub-entities (e.g., Employee to Doctor/Nurse).",
      "**Generalization:** Bottom-up approach where common entities combine into a superclass (e.g., Student/Teacher to Person).",
      "**Aggregation:** Treats a relationship set as a single abstract entity, allowing it to relate to other entities."
    ]
  },
  {
    "id": "dbms_q1_u2",
    "unit": 2,
    "question": "Explain DDL, DML, DCL, and TCL Commands with Examples",
    "points": [
      "**DDL & DML:** DDL (CREATE, ALTER) defines table structure; DML (INSERT, UPDATE) modifies records.",
      "**DCL & TCL:** DCL (GRANT, REVOKE) controls permissions; TCL (COMMIT, ROLLBACK) manages transactions.",
      "**Auto-commit:** DDL and DCL commands auto-commit instantly; DML commands require manual commit."
    ]
  },
  {
    "id": "dbms_q2_u2",
    "unit": 2,
    "question": "Explain SQL Constraints with Examples (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT)",
    "points": [
      "**Primary & Foreign Key:** Primary Key ensures uniqueness (no NULLs); Foreign Key maintains referential integrity between tables.",
      "**Nullability & Uniqueness:** UNIQUE prevents duplicate entries; NOT NULL prevents blank values in columns.",
      "**Check & Default:** CHECK validates data values (e.g., Age >= 18); DEFAULT inserts standard values when empty."
    ]
  },
  {
    "id": "dbms_q3_u2",
    "unit": 2,
    "question": "Explain Views in SQL — Definition, Syntax, Updatable vs Non-Updatable Views, and WITH CHECK OPTION",
    "points": [
      "**Virtual Tables:** Stores SQL query definitions instead of actual data; protects base tables.",
      "**Updatable Views:** Created from a single base table; allows INSERT, UPDATE, and DELETE operations.",
      "**WITH CHECK OPTION:** Restricts modifications that do not satisfy the view's WHERE clause conditions."
    ]
  },
  {
    "id": "dbms_q4_u2",
    "unit": 2,
    "question": "Explain Join Operations in SQL (Inner, Left, Right, Full, Cross, Natural, Self Joins)",
    "points": [
      "**Inner & Outer Joins:** Inner Join returns matching rows; Outer Joins (Left, Right, Full) keep unmatched rows padded with NULLs.",
      "**Cross & Natural Joins:** Cross Join outputs Cartesian product (M × N rows); Natural Join matches automatically on identical column names.",
      "**Self Join:** Joins a table with itself (requires table aliases; useful for hierarchies)."
    ]
  },
  {
    "id": "dbms_q5_u2",
    "unit": 2,
    "question": "Explain PL/SQL Triggers — Syntax, Types, :OLD/:NEW, and Example",
    "points": [
      "**Automatic Execution:** Precompiled PL/SQL blocks that fire automatically on DML operations (INSERT, UPDATE, DELETE).",
      "**Trigger Types:** Before/After (timing) and Row-level (fires per row) / Statement-level (fires once per query).",
      "**Transition Variables:** `:OLD` holds pre-modification data; `:NEW` holds post-modification data."
    ]
  },
  {
    "id": "dbms_q6_u2",
    "unit": 2,
    "question": "Explain Nested Queries in SQL with Examples (8 Marks)",
    "points": [
      "**Subquery Concept:** Inner query runs first and feeds its result set to the outer query.",
      "**Scalar & Multi-row:** Scalar returns a single value; Multi-row returns lists checked with `IN`, `ANY`, or `ALL`.",
      "**Correlated Subquery:** Inner query references outer query columns; runs repeatedly for every row."
    ]
  },
  {
    "id": "dbms_q7_u2",
    "unit": 2,
    "question": "Compare Stored Procedures and Functions in PL/SQL (8 Marks)",
    "points": [
      "**Return Values:** Functions must return exactly one value; Procedures return zero or more values via OUT parameters.",
      "**Execution Context:** Functions can run inside SQL statements (SELECT/WHERE); Procedures run standalone via CALL.",
      "**DML Operations:** Procedures can commit/rollback transactions; Functions used in SQL cannot perform transaction controls."
    ]
  },
  {
    "id": "dbms_q8_u2",
    "unit": 2,
    "question": "Explain Cursors in PL/SQL with Example (8 Marks)",
    "points": [
      "**Context Memory Pointer:** Points to the private SQL area; processes query result sets row-by-row.",
      "**Implicit & Explicit:** Implicit managed by Oracle; Explicit created by developer (DECLARE, OPEN, FETCH, CLOSE).",
      "**Attributes:** `%FOUND` (fetch succeeded), `%NOTFOUND` (no rows left), `%ROWCOUNT` (fetched count), `%ISOPEN` (is open)."
    ]
  },
  {
    "id": "dbms_q1_u3",
    "unit": 3,
    "question": "Explain Anomalies in Database Design with Student_Dept Table Example. How Does Normalization Fix Them? (8 Marks)",
    "points": [
      "**Design Anomalies:** Insertion (cannot insert without dummy data), Deletion (losing parent info), and Update (inconsistent modifications).",
      "**Cause:** Mixing multiple independent entities inside a single large unnormalized table.",
      "**Fix:** Decomposing the table into smaller tables linked by Foreign Keys (Normalization)."
    ]
  },
  {
    "id": "dbms_q2_u3",
    "unit": 3,
    "question": "Explain Functional Dependency and Find Candidate Keys Using Closure Method (Step-by-Step Numerical) (8 Marks)",
    "points": [
      "**FD Definition:** X → Y means attribute X uniquely determines attribute Y.",
      "**Closure Method:** Calculating X+ (all attributes reachable from X) to find Candidate Keys.",
      "**Candidate Key:** Minimal set of attributes that can uniquely identify every tuple in a relation."
    ]
  },
  {
    "id": "dbms_q3_u3",
    "unit": 3,
    "question": "Explain Normalization — 1NF, 2NF, 3NF, and BCNF with Decomposition Steps and Examples (8 Marks)",
    "points": [
      "**1NF & 2NF:** 1NF requires atomic values; 2NF eliminates partial dependencies (non-key depends on full PK).",
      "**3NF & BCNF:** 3NF eliminates transitive dependencies; BCNF requires left-hand side of all FDs to be a super key.",
      "**Decomposition:** Splitting tables to achieve lossless joins and dependency preservation."
    ]
  },
  {
    "id": "dbms_q4_u3",
    "unit": 3,
    "question": "Explain Codd's 12 Rules for Relational Database Management System (8 Marks)",
    "points": [
      "**Foundation:** 12 rules (Rule 0 to 12) defining what makes a database system truly relational (RDBMS).",
      "**Data Representation:** Rule 1 (Information Rule) states all data must be stored in tables; Rule 2 (Guaranteed Access) using keys.",
      "**Independence:** Rules 8 and 9 guarantee physical and logical data independence."
    ]
  },
  {
    "id": "dbms_q5_u3",
    "unit": 3,
    "question": "Explain Integrity Constraints in Relational Model (8 Marks)",
    "points": [
      "**Domain & Key:** Domain constraint checks valid values; Key constraint enforces unique primary identifiers.",
      "**Entity Integrity:** Primary key columns can never contain NULL values.",
      "**Referential Integrity:** Foreign keys must match parent primary keys or be NULL to maintain links."
    ]
  },
  {
    "id": "dbms_q6_u3",
    "unit": 3,
    "question": "Compare 3NF and BCNF (8 Marks)",
    "points": [
      "**Rule Strictness:** BCNF is stricter; for X → Y, X must be a super key (no exceptions for prime attributes).",
      "**Dependency Preservation:** 3NF always preserves dependencies; BCNF may lose some dependencies during decomposition.",
      "**Redundancy:** BCNF minimizes data redundancy more than 3NF."
    ]
  },
  {
    "id": "dbms_q1_u4",
    "unit": 4,
    "question": "Explain Transaction Concept, ACID Properties, and Transaction States (8 Marks)",
    "points": [
      "**ACID Properties:** Atomicity (all or nothing), Consistency (valid states), Isolation (independent runs), Durability (permanent saves).",
      "**Transaction States:** Active, Partially Committed, Committed, Failed, and Aborted (rolled back).",
      "**Execution Lifecycle:** Moves from active to partially committed on final statement, and commits permanently to save changes."
    ]
  },
  {
    "id": "dbms_q2_u4",
    "unit": 4,
    "question": "Explain Conflict Serializability with Precedence Graph (8 Marks)",
    "points": [
      "**Conflicting Operations:** Two operations in different transactions conflict if they access same item and one is a Write.",
      "**Precedence Graph:** Nodes represent transactions; directed edges are drawn for conflicting operations.",
      "**Serializability Test:** If the precedence graph is acyclic (contains no loops), the schedule is conflict serializable."
    ]
  },
  {
    "id": "dbms_q3_u4",
    "unit": 4,
    "question": "Explain Two-Phase Locking (2PL) Protocol — Basic, Strict, and Rigorous (8 Marks)",
    "points": [
      "**Lock Types:** Shared (S) lock for reads; Exclusive (X) lock for writes.",
      "**Two Phases:** Growing phase (acquires locks; no releases) and Shrinking phase (releases locks; no acquisitions).",
      "**2PL Variants:** Strict 2PL holds X-locks till commit; Rigorous 2PL holds all locks (S and X) till commit."
    ]
  },
  {
    "id": "dbms_q4_u4",
    "unit": 4,
    "question": "Explain Deadlock Handling — Prevention, Detection, and Recovery (8 Marks)",
    "points": [
      "**Prevention Schemes:** Wait-Die (non-preemptive; older waits, younger dies) and Wound-Wait (preemptive; older aborts younger, younger waits).",
      "**Detection:** Wait-For Graph (WFG) checks for directed cycles periodically.",
      "**Recovery:** Aborting a victim transaction based on least cost and performing rollback."
    ]
  },
  {
    "id": "dbms_q5_u4",
    "unit": 4,
    "question": "Explain Database Schedules and Their Types (8 Marks)",
    "points": [
      "**Serial & Non-Serial:** Serial runs transactions sequentially; Non-serial interleaves operations for speed.",
      "**Serializability:** Ensures a non-serial schedule produces same final state as a serial execution.",
      "**Conflict Equivalence:** Order of all conflicting operations matches between non-serial and serial schedules."
    ]
  },
  {
    "id": "dbms_q6_u4",
    "unit": 4,
    "question": "Explain View Serializability with Example (8 Marks)",
    "points": [
      "**View Equivalence Rules:** Checks initial read, write-read data flow, and final writer of every data item.",
      "**Blind Writes:** Writing data without reading it first; allows schedules to be view serializable but not conflict serializable.",
      "**Complexity:** Checking view serializability is NP-complete."
    ]
  },
  {
    "id": "dbms_q7_u4",
    "unit": 4,
    "question": "Explain Recoverable and Cascadeless Schedules with Examples (8 Marks)",
    "points": [
      "**Recoverability:** T2 reads from T1; T2 commits only after T1 commits (prevents lost rollbacks).",
      "**Cascading Rollback:** Aborting T1 forces uncommitted T2 to abort, wasting processing time.",
      "**Cascadeless Schedule:** Transactions only read committed data (eliminates dirty reads and cascading rollbacks)."
    ]
  },
  {
    "id": "dbms_q1_u5",
    "unit": 5,
    "question": "Compare SQL and NoSQL Databases (8 Marks)",
    "points": [
      "**Schema & Storage:** SQL uses relational tables with fixed schemas; NoSQL uses flexible documents, key-values, or graphs.",
      "**Scalability:** SQL scales vertically (adding CPU/RAM); NoSQL scales horizontally (partitioning across clusters).",
      "**Transactions:** SQL guarantees strict ACID transactions; NoSQL uses BASE properties for speed."
    ]
  },
  {
    "id": "dbms_q2_u5",
    "unit": 5,
    "question": "Explain Different NoSQL Data Models with Examples (8 Marks)",
    "points": [
      "**Key-Value & Document:** Key-Value stores pairs (Redis); Document stores JSON/BSON records (MongoDB).",
      "**Column-Family & Graph:** Column-Family stores column-wise on disk (Cassandra); Graph stores nodes and relationships (Neo4j).",
      "**Schema Flexibility:** Supports unstructured or semi-structured data without predefined table schemas."
    ]
  },
  {
    "id": "dbms_q3_u5",
    "unit": 5,
    "question": "Explain CAP Theorem and BASE Properties (8 Marks)",
    "points": [
      "**CAP Theorem:** Distributed systems can guarantee only 2 of 3: Consistency, Availability, or Partition Tolerance.",
      "**BASE Properties:** Basically Available, Soft-state, and Eventual consistency (optimizes availability over consistency).",
      "**AP vs CP:** CP databases block on network partitions; AP databases continue running but return stale data."
    ]
  },
  {
    "id": "dbms_q4_u5",
    "unit": 5,
    "question": "Explain MongoDB CRUD Operations with Examples (8 Marks)",
    "points": [
      "**Create & Read:** insertOne() / insertMany() inserts documents; find() retrieves documents matching JSON criteria.",
      "**Update & Delete:** updateOne() / updateMany() modifies fields via `$set` or `$inc`; deleteOne() / deleteMany() removes documents.",
      "**BSON Format:** Uses Binary JSON documents that support nested arrays and flexible fields."
    ]
  },
  {
    "id": "dbms_q5_u5",
    "unit": 5,
    "question": "Explain MongoDB Indexing",
    "points": [
      "**Query Speed:** Indexes avoid slow Collection Scans (COLLSCAN) and execute fast Index Scans (IXSCAN).",
      "**Data Structure:** B-Tree format stores sorted fields; default index is created on the `_id` field.",
      "**Types & Cost:** Single field and Compound indexes; speeds up reads but slows down write/insert operations."
    ]
  },
  {
    "id": "dbms_q6_u5",
    "unit": 5,
    "question": "Explain MongoDB Aggregation with Example",
    "points": [
      "**Aggregation Pipeline:** Passes documents through a sequence of stages (e.g., match, group, sort) to compute results.",
      "**Pipeline Stages:** `$match` filters records; `$group` groups documents; `$sort` orders the results.",
      "**Accumulators:** Computes values like sum, average, min, or max inside the `$group` stage."
    ]
  }
];
