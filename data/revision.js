const revision_data = [
  {
    "id": "dbms_q1_u1",
    "unit": 1,
    "question": "Compare DBMS and File Processing System",
    "content": `| Sr. No. | Feature | File Processing System (FPS) | Database Management System (DBMS) |
|:---:|:---|:---|:---|
| 1 | **Data Redundancy** | High | Low |
| 2 | **Data Consistency** | Low | High |
| 3 | **Data Independence** | None | Full |
| 4 | **Security & Access** | Low | High |
| 5 | **Concurrency Control** | None | Supported |
| 6 | **Backup & Recovery** | Manual | Automatic |
| 7 | **Integrity Constraints** | Hard | Easy |
| 8 | **Data Querying** | Hard | Easy |`
  },
  {
    "id": "dbms_q2_u1",
    "unit": 1,
    "question": "Explain Three-Schema Architecture and Data Independence",
    "content": `- **Goal:** Hide physical database details from users and achieve data independence.
- **External Level:** Highest level; shows customized user views (e.g., Student/Teacher views).
- **Conceptual Level:** Middle level; defines logical tables, attributes, keys, and relationships.
- **Internal Level:** Lowest level; defines physical file organization, block sizes, and indexes on disk.
- **Mappings:** External-to-Conceptual and Conceptual-to-Internal mappings translate requests between levels.
- **Physical Data Independence:** Change physical storage structures (e.g., HDD to SSD) without modifying conceptual schemas.
- **Logical Data Independence:** Change conceptual schema (e.g., add columns/tables) without breaking external views.
- **Benefits:** Minimizes application code changes and ensures high system uptime during updates.
- **Real-world example:** Upgrading the storage hardware does not require modifying SQL query code.`
  },
  {
    "id": "dbms_q3_u1",
    "unit": 1,
    "question": "Explain DBMS Architecture with Diagram",
    "content": `- **Query Processor:** Parses queries, compiles commands, and creates optimal execution plans.
- **DDL Interpreter:** Parses DDL statements and updates metadata in the data dictionary.
- **DML Compiler:** Translates SELECT/UPDATE statements into low-level evaluation instructions.
- **Query Evaluation Engine:** Executes low-level database operations to fetch requested data.
- **Storage Manager:** Handles memory buffers, physical files, and catalog dictionary structures.
- **Buffer Manager:** Cache manager; fetches data pages from disk to main memory.
- **File Manager:** Allocates space and manages files on the physical disk.
- **Transaction Manager:** Guarantees ACID properties and handles concurrent user operations.
- **Disk Storage:** Holds data files, index blocks, transaction logs, and system metadata catalog.`
  },
  {
    "id": "dbms_q4_u1",
    "unit": 1,
    "question": "Design ER Diagram for Hospital Management System",
    "content": `- **Entities:** Doctor (Doc_ID, Specialization), Patient (Pat_ID, Age), Room (Room_No, Type), Lab (Lab_ID).
- **Relationships:** Treats (Doctor to Patient, 1:M), Admits (Patient to Room, M:1), Conducts (Patient to Lab, M:N).
- **Cardinality:** 1 Doctor can treat Many Patients; Many Patients can admit to 1 Room.
- **Weak Entity:** Admission is a weak entity depending on Patient (owner entity).
- **Relational Tables:** Convert entities and relationships into tables using foreign keys.
- **Primary Keys:** Doc_ID for Doctor, Pat_ID for Patient, Room_No for Room.
- **Foreign Keys:** Pat_ID and Room_No inside Admission table.
- **Key Constraint:** Enforces primary key uniqueness and links tables using referential keys.`
  },
  {
    "id": "dbms_q5_u1",
    "unit": 1,
    "question": "Explain Extended ER (EER) Features: Generalization, Specialization, and Aggregation",
    "content": `- **Specialization:** Top-down approach; splits a general entity into subclasses (e.g., Employee to Doctor/Nurse).
- **Generalization:** Bottom-up approach; combines multiple common entities into a superclass (e.g., Student/Teacher to Person).
- **Aggregation:** Treats a relationship set as an abstract entity to relate it to other entities.
- **Constraint - Disjoint:** Subclasses cannot overlap (e.g., a car cannot be a truck).
- **Constraint - Overlapping:** Subclasses can overlap (e.g., a person can be student and employee).
- **Total Participation:** Every superclass entity must belong to a subclass.
- **Partial Participation:** Superclass entities do not have to belong to any subclass.
- **Usage:** Reuses attributes, models complex real-world entities, and maintains database consistency.`
  },
  {
    "id": "dbms_q1_u2",
    "unit": 2,
    "question": "Explain DDL, DML, DCL, and TCL Commands with Examples",
    "content": `| Sr. No. | Feature | DDL | DML | DCL | TCL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Full Form** | Data Definition | Data Manipulation | Data Control | Transaction Control |
| 2 | **Purpose** | Define structure | Modify data | Control access | Manage transactions |
| 3 | **Commands** | CREATE, ALTER, DROP | INSERT, UPDATE, DELETE | GRANT, REVOKE | COMMIT, ROLLBACK |
| 4 | **Works On** | Table structure | Table records | User access | Transactions |
| 5 | **Auto-Commit?** | Yes | No | Yes | Controls Commit |
| 6 | **Can Rollback?** | No | Yes | No | Yes |
| 7 | **WHERE Clause?** | No | Yes | No | No |
| 8 | **Used By** | Database Admin | Users / Developers | Security Admin | Developers |`
  },
  {
    "id": "dbms_q2_u2",
    "unit": 2,
    "question": "Explain SQL Constraints with Examples (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT)",
    "content": `- **Primary Key:** Uniquely identifies rows; rejects duplicate entries and NULL values.
- **Foreign Key:** Enforces referential integrity by matching primary key of a parent table.
- **Unique:** Ensures all column values are distinct; allows multiple NULL values.
- **Not Null:** Rejects blank or missing values in a column.
- **Check:** Validates values using logical expressions (e.g., \`CHECK (Age >= 18)\`).
- **Default:** Sets standard value if column is left empty during record creation.
- **Syntax Example (Table Creation):**
  \`\`\`sql
  CREATE TABLE Emp (
    EID INT PRIMARY KEY,
    Sal INT CHECK (Sal > 0),
    Dept_ID INT REFERENCES Dept(Dept_ID)
  );
  \`\`\``
  },
  {
    "id": "dbms_q3_u2",
    "unit": 2,
    "question": "Explain Views in SQL — Definition, Syntax, Updatable vs Non-Updatable Views, and WITH CHECK OPTION",
    "content": `| Sr. No. | Feature | Updatable View | Non-Updatable View |
| :--- | :--- | :--- | :--- |
| 1 | **Base Tables** | Single Table | Multiple Tables |
| 2 | **Aggregate Functions** | Not Allowed | Allowed |
| 3 | **GROUP BY / HAVING** | Not Allowed | Allowed |
| 4 | **DISTINCT Keyword** | Not Allowed | Allowed |
| 5 | **DML Operations** | Allowed | Read-Only |
| 6 | **Calculated Columns** | Not Allowed | Allowed |
| 7 | **NOT NULL Columns** | Required | Optional |
| 8 | **Set Operations** | Not Allowed | Allowed |`
  },
  {
    "id": "dbms_q4_u2",
    "unit": 2,
    "question": "Explain Join Operations in SQL (Inner, Left, Right, Full, Cross, Natural, Self Joins)",
    "content": `| Sr. No. | Feature | INNER JOIN | LEFT JOIN | RIGHT JOIN | FULL JOIN | CROSS JOIN | NATURAL JOIN | SELF JOIN |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Returns** | Matching rows | Left + matching right | Right + matching left | All rows (both sides) | Cartesian product | Auto-matched rows | Joined to itself |
| 2 | **Unmatched Left** | Excluded | Kept (with NULLs) | Excluded | Kept (with NULLs) | Combined | Excluded | Varies |
| 3 | **Unmatched Right** | Excluded | Excluded | Kept (with NULLs) | Kept (with NULLs) | Combined | Excluded | Varies |
| 4 | **ON Clause** | Required | Required | Required | Required | Not allowed | Not allowed | Required |
| 5 | **NULL Rows** | None | NULLs on Right | NULLs on Left | NULLs on both sides | None | None | Varies |
| 6 | **Result Size** | Small | >= Left table | >= Right table | Large | M × N rows | Small | Varies |
| 7 | **Use Case** | Exact matches | All left records | All right records | Disjoint lists | Combinations | Simple matches | Hierarchies |
| 8 | **Speed** | Fast | Fast | Fast | Slow | Very slow | Fast | Medium |`
  },
  {
    "id": "dbms_q5_u2",
    "unit": 2,
    "question": "Explain PL/SQL Triggers — Syntax, Types, :OLD/:NEW, and Example",
    "content": `| Sr. No. | Feature | Row-Level Trigger | Statement-Level Trigger |
| :--- | :--- | :--- | :--- |
| 1 | **Firing Frequency** | Once per affected row | Once per statement |
| 2 | **FOR EACH ROW Clause** | Required | Omitted |
| 3 | **Transition Variables** | \`:OLD\` and \`:NEW\` allowed | Not allowed |
| 4 | **Core Purpose** | Row validation | Logging / Security |
| 5 | **Bulk Performance** | Slower | Faster |
| 6 | **Can Modify :NEW?** | Yes | No |
| 7 | **Use Case** | Row-level audit | Table-level logging |
| 8 | **Context** | Single row values | Overall table |`
  },
  {
    "id": "dbms_q6_u2",
    "unit": 2,
    "question": "Explain Nested Queries in SQL with Examples (8 Marks)",
    "content": `- **Subquery Concept:** Inner query runs first and feeds its result set to the outer query.
- **Nested Query:** A query written inside the WHERE clause of another outer SQL query.
- **Scalar Subquery:** Returns exactly one value; uses operators like \`=\`, \`>\`, \`<\`.
- **Multi-Row Subquery:** Returns multiple values (one column, many rows) using \`IN\`, \`ANY\`, or \`ALL\`.
- **Correlated Subquery:** Inner query references outer query columns; runs repeatedly for each row.
- **IN Operator:** Checks if a value exists in the list returned by subquery.
- **ANY Operator:** Returns true if value matches any item in subquery result.
- **ALL Operator:** Returns true only if value matches all items in subquery result.
- **EXISTS Operator:** Returns true if subquery returns at least one row (returns true/false).
- **Example:**
  \`\`\`sql
  SELECT Name, Marks FROM Student
  WHERE Marks > (SELECT AVG(Marks) FROM Student);
  \`\`\``
  },
  {
    "id": "dbms_q7_u2",
    "unit": 2,
    "question": "Compare Stored Procedures and Functions in PL/SQL (8 Marks)",
    "content": `| Sr. No. | Feature | Stored Procedure | Function |
| :--- | :--- | :--- | :--- |
| 1 | **Return Value** | Optional (returns 0 or multiple values via OUT) | Mandatory (must return exactly one value via RETURN) |
| 2 | **Call Method** | Executed standalone using CALL or EXECUTE | Called directly inside SQL queries or PL/SQL expressions |
| 3 | **Return Type** | No return type defined in header | Return type must be defined in header |
| 4 | **SQL Queries** | Cannot be used inside SELECT or WHERE statements | Can be used inside SELECT or WHERE statements |
| 5 | **DML Operations** | Can perform DML and save/undo transactions | Restricted DML operations when called in SQL |
| 6 | **Parameters** | Supports IN, OUT, and IN OUT parameters | Supports IN parameters only (best practice) |
| 7 | **Primary Purpose** | Used to execute business logic and database tasks | Used to calculate and return computed results |
| 8 | **Header Syntax** | \`CREATE PROCEDURE my_proc(...)\` | \`CREATE FUNCTION my_func(...) RETURN type\` |`
  },
  {
    "id": "dbms_q8_u2",
    "unit": 2,
    "question": "Explain Cursors in PL/SQL with Example (8 Marks)",
    "content": `- **Context Memory Pointer:** Points to the private SQL area; processes query result sets row-by-row.
- **Implicit Cursor:** Created automatically by Oracle for all DML operations (INSERT, UPDATE, DELETE).
- **Explicit Cursor:** Created manually by user to handle SELECT queries returning multiple rows.
- **Lifecycle - Declare:** Names the cursor and defines the SELECT query.
- **Lifecycle - Open:** Executes the query and allocates context memory.
- **Lifecycle - Fetch:** Retrieves rows one-by-one into PL/SQL variables.
- **Lifecycle - Close:** Releases context memory when processing is done.
- **%FOUND:** Returns True if the last fetch was successful.
- **%NOTFOUND:** Returns True if no rows are left (used to exit loops).
- **%ROWCOUNT:** Returns the number of rows fetched so far.
- **%ISOPEN:** Returns True if the cursor is currently open.`
  },
  {
    "id": "dbms_q1_u3",
    "unit": 3,
    "question": "Explain Anomalies in Database Design with Student_Dept Table Example. How Does Normalization Fix Them? (8 Marks)",
    "content": `| Sr. No. | Feature | Before Normalization | After Normalization |
|:---|:---|:---|:---|
| 1 | **Insertion Anomaly** | Present | Resolved |
| 2 | **Deletion Anomaly** | Present | Resolved |
| 3 | **Update Anomaly** | Present | Resolved |
| 4 | **Data Redundancy** | High | Low |
| 5 | **Data Integrity** | Low | High |
| 6 | **Storage Space** | Wasted | Optimized |
| 7 | **Primary Key** | Composite Key | Distinct Keys |
| 8 | **Table Structure** | One Large Table | Decomposed Tables |`
  },
  {
    "id": "dbms_q2_u3",
    "unit": 3,
    "question": "Explain Functional Dependency and Find Candidate Keys Using Closure Method (Step-by-Step Numerical) (8 Marks)",
    "content": `- **Functional Dependency (FD):** X → Y means attribute X uniquely determines Y.
- **Trivial FD:** Y is a subset of X (e.g., AB → A).
- **Non-Trivial FD:** Y is not a subset of X (e.g., A → B).
- **Attribute Closure (X+):** Set of all attributes determined by X using given FDs.
- **Closure Method:** Calculating X+ to find Candidate Keys.
- **Candidate Key:** Minimal set of attributes that can uniquely identify every tuple in a relation.
- **Minimality:** No subset of the candidate key can be a key.
- **Step 1:** Compute closure of single attributes.
- **Step 2:** If closure contains all attributes, it is a super key.
- **Step 3:** Check for minimality to confirm Candidate Key.
- **Example:** If (AD)+ = ABCD, then AD is a candidate key.`
  },
  {
    "id": "dbms_q3_u3",
    "unit": 3,
    "question": "Explain Normalization — 1NF, 2NF, 3NF, and BCNF with Decomposition Steps and Examples (8 Marks)",
    "content": `| Sr. No. | Feature | 1NF | 2NF | 3NF | BCNF |
|:---|:---|:---|:---|:---|:---|
| 1 | **Primary Goal** | Atomic values | No partial dependency | No transitive dependency | LH side is super key |
| 2 | **Precondition** | None | Must be in 1NF | Must be in 2NF | Must be in 3NF |
| 3 | **Partial Dependency** | Allowed | Eliminated | Eliminated | Eliminated |
| 4 | **Transitive Dependency** | Allowed | Allowed | Eliminated | Eliminated |
| 5 | **Left Side = Super Key?** | No | No | No | Strictly required |
| 6 | **Redundancy Level** | High | Medium | Low | Minimal |
| 7 | **Dependency Preservation** | Guaranteed | Guaranteed | Guaranteed | Not guaranteed |`
  },
  {
    "id": "dbms_q4_u3",
    "unit": 3,
    "question": "Explain Codd's 12 Rules for Relational Database Management System (8 Marks)",
    "content": `- **Goal:** Define what makes a database system truly relational (RDBMS).
- **Rule 0 (Foundation):** Relational systems must manage databases using relational capabilities.
- **Rule 1 (Information Rule):** All data must be represented in table rows and columns.
- **Rule 2 (Guaranteed Access):** Every value accessed using Table Name + Primary Key + Column Name.
- **Rule 3 (Null values):** Handles missing or inapplicable data systematically.
- **Rule 4 (Dynamic Online Catalog):** Database catalog stored in tables; queried via SQL.
- **Rule 5 (Comprehensive Data Sublanguage):** SQL must handle DDL, DML, DCL, and TCL.
- **Rule 8 & 9:** Guarantees Physical and Logical Data Independence.
- **Rule 10 (Distribution Independence):** Queries must work same if database is distributed.
- **Rule 12 (Nonsubversion):** Low-level interface cannot bypass database safety rules.`
  },
  {
    "id": "dbms_q5_u3",
    "unit": 3,
    "question": "Explain Integrity Constraints in Relational Model (8 Marks)",
    "content": `- **Domain Constraint:** Specifies valid data types and values for columns.
- **Key Constraint:** Table must have a primary/unique key; no duplicate rows.
- **Entity Integrity Constraint:** Primary key column values can never be NULL.
- **Referential Integrity Constraint:** Foreign key value must match an existing primary key or be NULL.
- **Referential Actions:** rules like ON DELETE CASCADE to maintain links when parent records are deleted.
- **Insert Violation:** Rejects child row with invalid parent ID.
- **Delete Violation:** Rejects parent row delete if child rows still link to it.
- **Benefits:** Guarantees that data stored in the database is correct and reliable.
- **Implementation:** Declared in SQL schema during CREATE TABLE.
- **First-line Guard:** Protects database accuracy and consistency during inserts/updates.`
  },
  {
    "id": "dbms_q6_u3",
    "unit": 3,
    "question": "Compare 3NF and BCNF (8 Marks)",
    "content": `| Sr. No. | Feature | Third Normal Form (3NF) | Boyce-Codd Normal Form (BCNF) |
| :--- | :--- | :--- | :--- |
| 1 | **Strictness** | Less strict (allows exceptions) | More strict (no exceptions allowed) |
| 2 | **Core Rule (X → Y)** | X is super key OR Y is prime attribute | X must strictly be a super key |
| 3 | **Pre-requisite** | Must satisfy 2NF | Must satisfy 3NF |
| 4 | **Lossless Join** | Always guaranteed | Always guaranteed |
| 5 | **Dependency Preservation** | Always guaranteed | Not always guaranteed (sometimes lost) |
| 6 | **Redundancy Level** | Low | Minimal |
| 7 | **Overlapping Keys** | Can have redundancies | Resolves overlapping candidate keys |
| 8 | **Real-world Target** | Standard industry target | Used for strict safety systems |`
  },
  {
    "id": "dbms_q1_u4",
    "unit": 4,
    "question": "Explain Transaction Concept, ACID Properties, and Transaction States (8 Marks)",
    "content": `- **Atomicity:** All operations succeed, or entire transaction aborts (all-or-nothing).
- **Consistency:** Moves database from one valid state to another valid state.
- **Isolation:** Concurrent transactions execute without interfering with each other.
- **Durability:** Committed changes are permanent, even during system crashes.
- **Active State:** Initial state; transaction is executing its statements.
- **Partially Committed State:** After final statement runs, before saving to disk.
- **Committed State:** Transaction saves changes permanently; enters success state.
- **Failed State:** Transaction encounters error and stops execution.
- **Aborted State:** Database rolled back to state before transaction started.
- **Transaction Recovery:** Restores database using UNDO and REDO logs.`
  },
  {
    "id": "dbms_q2_u4",
    "unit": 4,
    "question": "Explain Conflict Serializability with Precedence Graph (8 Marks)",
    "content": `- **Conflicting Operations:** Same data item, different transactions, at least one Write.
- **Conflict Equivalence:** Two schedules have same conflicting operations in same order.
- **Conflict Serializability:** Schedule is conflict equivalent to a serial schedule.
- **Precedence Graph Nodes:** Represent active transactions in the schedule.
- **Precedence Graph Edges:** Directed edge Ti → Tj if Ti performs conflicting operation before Tj.
- **Serializability Test:** If precedence graph has no cycles, schedule is serializable.
- **Precedence Edge Cases:** Checks Read-Write, Write-Read, and Write-Write conflicts.
- **Scheduler Goal:** Enforces acyclic transaction execution orders.
- **Loop Detection:** Cycles indicate deadlock risk and non-serializable runs.`
  },
  {
    "id": "dbms_q3_u4",
    "unit": 4,
    "question": "Explain Two-Phase Locking (2PL) Protocol — Basic, Strict, and Rigorous (8 Marks)",
    "content": `| Sr. No. | Feature | Basic 2PL | Strict 2PL | Rigorous 2PL |
|:--------|:--------|:----------|:-----------|:-------------|
| 1 | **Lock Taking** | Growing phase | Growing phase | Growing phase |
| 2 | **X-Lock Release** | Shrinking phase | Released at commit | Released at commit |
| 3 | **S-Lock Release** | Shrinking phase | Shrinking phase | Released at commit |
| 4 | **Cascading Rollback** | Possible | Prevented | Prevented |
| 5 | **Deadlock** | Possible | Possible | Possible |
| 6 | **Speed / Concurrency** | High | Medium | Low |
| 7 | **Lock Point** | First lock released | At commit | At commit |
| 8 | **Use Case** | Rarely used | Standard DB engines | High safety systems |`
  },
  {
    "id": "dbms_q4_u4",
    "unit": 4,
    "question": "Explain Deadlock Handling — Prevention, Detection, and Recovery (8 Marks)",
    "content": `| Sr. No. | Feature | Wait-Die | Wound-Wait |
|:--------|:--------|:---------|:-----------|
| 1 | **Type** | Non-preemptive | Preemptive |
| 2 | **Older Requests Younger** | Waits | Wounds (aborts younger) |
| 3 | **Younger Requests Older** | Dies (aborts itself) | Waits |
| 4 | **Who Aborts?** | Younger requesting | Younger holding |
| 5 | **Number of Aborts** | Higher | Lower |
| 6 | **Wasted Work** | More | Less |
| 7 | **Starvation** | Avoided (keeps timestamp) | Avoided (keeps timestamp) |
| 8 | **Best Used When** | Short transactions | Long transactions |`
  },
  {
    "id": "dbms_q5_u4",
    "unit": 4,
    "question": "Explain Database Schedules and Their Types (8 Marks)",
    "content": `- **Schedule:** Chronological execution order of operations from concurrent transactions.
- **Serial Schedule:** Transactions execute sequentially without interleaving; always consistent.
- **Non-Serial Schedule:** Operations interleave; faster but can cause conflicts.
- **Serializable Schedule:** Non-serial schedule equivalent to some serial schedule.
- **Conflict Equivalence:** Order of all conflicting operations matches a serial schedule.
- **Conflict Serializability:** Tested using acyclic precedence graphs.
- **Concurrency control:** Maximizes CPU usage by running multiple database actions concurrently.
- **Dirty Reads:** Uncommitted data exposure risk in non-serial schedules.
- **Scheduler:** DB component ensuring serializable execution paths.`
  },
  {
    "id": "dbms_q6_u4",
    "unit": 4,
    "question": "Explain View Serializability with Example (8 Marks)",
    "content": `- **View Serializability:** Schedule is view equivalent to a serial schedule.
- **Initial Read Rule:** Transaction reading initial value must match in both schedules.
- **Write-Read Dependency Rule:** Intermediate data flow must match in both schedules.
- **Final Write Rule:** Transaction performing final write must match in both schedules.
- **Blind Write:** Writing to data without reading it first.
- **Schedules comparison:** View serializable allows schedules that conflict serializable rejects.
- **Complexity:** Checking view serializability is NP-complete.
- **Example:** Blind writes on A by T1, T2, T3 is view serializable.
- **Purpose:** Relaxes conflict restrictions while guaranteeing database consistency.`
  },
  {
    "id": "dbms_q7_u4",
    "unit": 4,
    "question": "Explain Recoverable and Cascadeless Schedules with Examples (8 Marks)",
    "content": `- **Unrecoverable Schedule:** T2 reads uncommitted T1 data, commits, then T1 aborts.
- **Recoverable Schedule Rule:** T2 can commit only after T1 (from which it read) commits.
- **Dirty Read:** Reading data modified by an uncommitted transaction.
- **Cascading Rollback:** Aborting one transaction forces multiple uncommitted transactions to abort.
- **Cascadeless Schedule Rule:** Transactions can only read committed data (no dirty reads).
- **Relationship:** Every cascadeless schedule is automatically a recoverable schedule.
- **Industry Standard:** Database engines enforce cascadeless schedules to avoid cascading aborts.
- **Performance:** Cascadeless schedules save CPU cycles by avoiding chain rollbacks.
- **Recovery Manager:** Component responsible for managing transaction rollback safety.`
  },
  {
    "id": "dbms_q1_u5",
    "unit": 5,
    "question": "Compare SQL and NoSQL Databases (8 Marks)",
    "content": `| Feature | SQL | NoSQL |
| :--- | :--- | :--- |
| **Data Storage** | Tables | Documents, Key-Value, Graph |
| **Schema** | Fixed Schema | Flexible Schema |
| **Query Language** | SQL | Different query methods |
| **Scalability** | Vertical Scaling | Horizontal Scaling |
| **Transactions** | ACID | BASE |
| **Joins** | Supported | Generally not used |
| **Best For** | Banking, ERP | Social Media, Big Data |
| **Examples** | MySQL, Oracle, PostgreSQL | MongoDB, Cassandra, Redis |`
  },
  {
    "id": "dbms_q2_u5",
    "unit": 5,
    "question": "Explain Different NoSQL Data Models with Examples (8 Marks)",
    "content": `- **Key-Value Model:** Stores unique key-value pairs (e.g., Redis). Fast caching.
- **Document Model:** Stores nested BSON/JSON documents (e.g., MongoDB). Flexible schema.
- **Column-Family Model:** Stores data column-wise on disk (e.g., Cassandra). Fast writes.
- **Graph Model:** Stores data in nodes (entities) and edges (relationships) (e.g., Neo4j).
- **Schema-less:** Tables do not require predefined column schemas.
- **Scale-out:** Designed to split data across clusters of cheap servers.
- **Use Case:** High throughput log storage, user profiles, or social feeds.
- **Speed:** Fastest lookup times due to nested objects (avoids relational joins).`
  },
  {
    "id": "dbms_q3_u5",
    "unit": 5,
    "question": "Explain CAP Theorem and BASE Properties (8 Marks)",
    "content": `- **CAP Theorem:** Distributed databases can guarantee only 2 of 3 features.
- **Consistency (C):** All nodes show identical data at the same time.
- **Availability (A):** Every request receives a non-error response.
- **Partition Tolerance (P):** System operates during network failures between nodes.
- **BASE Properties:** Basically Available, Soft-state, and Eventual consistency.
- **AP Databases:** Prioritize availability; return stale data during partitions (e.g., Cassandra).
- **CP Databases:** Prioritize consistency; block updates during partitions (e.g., MongoDB).
- **Trade-off:** In real systems, network partitions always happen; choice is between AP or CP.`
  },
  {
    "id": "dbms_q4_u5",
    "unit": 5,
    "question": "Explain MongoDB CRUD Operations with Examples (8 Marks)",
    "content": `- **Create:** \`insertOne()\` adds one document; \`insertMany()\` adds multiple.
- **Read:** \`find({ field: value })\` filters and returns matching BSON documents.
- **Update:** \`updateOne()\` / \`updateMany()\` modifies fields using \`$set\` or \`$inc\` operators.
- **Delete:** \`deleteOne()\` / \`deleteMany()\` removes documents based on filter query.
- **Syntax Example (Insert):** \`db.users.insertOne({ name: \"Amit\", age: 20 });\`
- **Syntax Example (Update):** \`db.users.updateOne({ name: \"Amit\" }, { $set: { age: 21 } });\`
- **Syntax Example (Delete):** \`db.users.deleteOne({ name: \"Amit\" });\`
- **BSON:** Binary JSON format; handles nested arrays and flexible document schemas.`
  },
  {
    "id": "dbms_q5_u5",
    "unit": 5,
    "question": "Explain MongoDB Indexing",
    "content": `- **Definition:** B-Tree data structure created to speed up collection queries.
- **COLLSCAN:** Collection Scan reads every document to find matches (slow).
- **IXSCAN:** Index Scan jumps directly to matched index location (fast).
- **Default Index:** MongoDB automatically creates unique index on \`_id\` field.
- **Single Field:** Index created on a single attribute (\`db.col.createIndex({ age: 1 })\`).
- **Compound Index:** Index created on multiple attributes (\`{ branch: 1, marks: -1 }\`).
- **Cost:** Speeds up read operations but slows down write/insert operations.
- **Verification:** Explain query execution stats using \`explain('executionStats')\`.`
  },
  {
    "id": "dbms_q6_u5",
    "unit": 5,
    "question": "Explain MongoDB Aggregation with Example",
    "content": `- **Definition:** Processes multiple documents to return aggregated results.
- **Pipeline:** Sequence of stages where output of one stage feeds next stage.
- **Stage - $match:** Filters documents based on conditions.
- **Stage - $group:** Groups documents by key and computes aggregates.
- **Stage - $sort:** Sorts final results by specified columns.
- **Accumulators:** Operators like \`$sum\`, \`$avg\`, \`$min\`, \`$max\`.
- **Example Query:**
  \`\`\`javascript
  db.sales.aggregate([
    { $match: { status: "A" } },
    { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
  ]);
  \`\`\``
  }
];
