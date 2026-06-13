# DBMS: Unit III — Relational Database Design (Exam-Ready SPPU Answers)

---

## Q1. Explain Anomalies in Database Design with Student_Dept Table Example. How Does Normalization Fix Them? (8 Marks)

### Introduction

**Anomalies** are problems during insert, delete, or update caused by **data redundancy** in a badly designed table.
The fix is **normalization** — splitting the big table into smaller, cleaner tables.

### Diagram

```
  BEFORE (Student_Dept — one big table)
  +---------+-------+---------+-----------+------------+
  | Roll_No | Sname | Dept_ID | Dept_Name |  Dept_HOD  |
  +---------+-------+---------+-----------+------------+
  |   101   | Amit  |   D1    |    CS     | Dr. Patil  |
  |   102   | Sneha |   D1    |    CS     | Dr. Patil  |  ← repeated
  +---------+-------+---------+-----------+------------+
                          | Normalization
                          v
    STUDENT(Roll_No, Sname, Dept_ID)
    DEPARTMENT(Dept_ID, Dept_Name, Dept_HOD)
```

### Key Points

**Insertion Anomaly** — cannot add new data without unrelated data being present:

- **Cannot add** a new department if no student is enrolled in it yet
- **Primary key** (Roll_No) cannot be NULL, so empty student row is not possible
- **Example:** want to add "Civil Dept" but no Civil student exists → insertion fails
- **Root cause** is mixing student info and department info in **one table**
- **Dept info depends** on student info being present first
- **After normalization:** just add one row in Department table — no student needed

**Deletion Anomaly** — deleting one data accidentally removes other useful data:

- **Deleting last student** of a department removes that department's info completely
- **Example:** if Rahul is the only IT student, deleting him removes IT dept and HOD info
- **Data loss** happens because dept info was stored **only with student rows**
- **No backup** of department info exists anywhere else in the table
- **Cannot recover** lost department info once the student row is deleted
- **After normalization:** deleting a student does **not touch** the Department table

**Update Anomaly** — changing one fact requires changes in many rows:

- **Same dept info** is stored in every row of that dept's students
- **Example:** if CS has 100 students, changing HOD needs **100 row updates**
- **Missing even one row** creates **wrong data** — two different HODs shown for CS
- **Database becomes wrong** because some rows have old value, some have new
- **More students** means **more rows to update** — problem grows with data size
- **After normalization:** HOD is stored **once** in Department table — update one row only

**Normalization Fix** — how splitting tables solves all anomalies:

- **Separate tables** for Student and Department linked by **foreign key** (Dept_ID)
- **Each fact stored once** — dept info appears only in Department table
- **Insert freely** — add new dept without needing any student
- **Delete safely** — removing student does not affect department data
- **Update easily** — change HOD in one row of Department table only
- **Foreign key** keeps the link between Student and Department tables correct

### Comparison Table: Before vs After Normalization

| Sr. No. | Feature | Before Normalization | After Normalization |
|:---|:---|:---|:---|
| 1 | **Insertion Anomaly** | Present (cannot insert independent entities without dummy values; e.g., cannot add a department without enrolling a student) | Resolved (independent entities can be inserted into their respective relation directly) |
| 2 | **Deletion Anomaly** | Present (loss of parent entity data when child entity is deleted; e.g., deleting a student accidentally deletes department details) | Resolved (deleting a child entity preserves the parent relation data) |
| 3 | **Update Anomaly** | Present (updating a single attribute requires modifying multiple redundant tuples, leading to inconsistency risk) | Resolved (updating an attribute requires modifying a single tuple in a single relation) |
| 4 | **Data Redundancy** | High data redundancy (duplicate attributes stored across multiple tuples) | Controlled/Minimal data redundancy (each non-key attribute is stored exactly once) |
| 5 | **Data Integrity** | Low (high risk of inconsistent states and data anomalies) | High (ensured by primary/foreign key constraints and elimination of duplication) |
| 6 | **Storage Efficiency** | Wasted storage (high storage overhead due to redundant attribute columns) | Optimized storage (efficiency achieved via relation decomposition) |
| 7 | **Primary Key Design** | Single composite key or lack of clean candidate keys for the mixed entity | Distinct, well-defined primary keys for each decomposed relation |
| 8 | **Relational Schema** | Single unnormalized relation (flat file design mixing multiple entity types) | Decomposed normalized relations linked via Referential Integrity Constraints (Foreign Keys) |

---

## Q2. Explain Functional Dependency and Find Candidate Keys Using Closure Method (Step-by-Step Numerical) (8 Marks)

### Introduction

A **Functional Dependency (FD)** means if you know column X, you can find column Y — written as **X → Y**.
FDs are used to find **candidate keys** and do **normalization**.

### Diagram

```
  Functional Dependency: X --> Y

  +------------------+          +------------------+
  | Determinant (X)  | -------> |  Dependent (Y)   |
  | (e.g., Roll_No)  |          | (e.g., Sname)    |
  +------------------+          +------------------+
  "If we know Roll_No, we can find Sname"
```

### Key Points

- **Trivial FD** — right side is **part of left side**, always true, e.g., AB → A
- **Non-Trivial FD** — right side is **NOT part** of left side, e.g., A → B
- **Partial FD** — depends on **part of composite key**, e.g., (A,B) is key but B → C
- **Full FD** — depends on **entire composite key**, e.g., (A,B) → C needs both A and B
- **Transitive FD** — A → B and B → C, so **A → C indirectly**, e.g., Roll → Dept → HOD
- **Attribute Closure (X⁺)** — set of **all attributes** that X can decide using given FDs
- **Super Key** — any set of columns whose closure gives **all attributes** of the table
- **Candidate Key** — the **smallest super key** — remove anything and it stops being a key

### Armstrong's Axioms (Rules to Find New FDs)

- **Reflexivity** — if Y is part of X, then **X → Y** is always true
- **Augmentation** — if X → Y, then **XZ → YZ** (adding same thing to both sides)
- **Transitivity** — if X → Y and Y → Z, then **X → Z** (chain rule)

### Step-by-Step Numerical Example

**Given:** Relation **R(A, B, C, D, E)** with FDs:
1. A → B
2. B → C
3. CD → E
4. E → A

**Find all Candidate Keys:**

**Step 1: Find "must-have" attributes**
- Check which attributes are **never on the right side** of any FD
- Right sides: B, C, E, A → **D is never on right side**
- So **D must be in every candidate key**

**Step 2: Try closure of D alone**
- D⁺ = {D} → Does NOT contain all attributes → D alone is NOT a key

**Step 3: Try D with each other attribute:**

**Try AD:**
```
(AD)⁺ = {A, D}           ← Start
Apply A → B:  {A, D, B}
Apply B → C:  {A, D, B, C}
Apply CD → E: {A, D, B, C, E}
(AD)⁺ = {A, B, C, D, E} = ALL attributes ✓
```
**AD is a Candidate Key** ✓ (removing A or D breaks it)

**Try BD:**
```
(BD)⁺ = {B, D}            ← Start
Apply B → C:  {B, D, C}
Apply CD → E: {B, D, C, E}
Apply E → A:  {B, D, C, E, A}
(BD)⁺ = {A, B, C, D, E} = ALL attributes ✓
```
**BD is a Candidate Key** ✓

**Try CD:**
```
(CD)⁺ = {C, D}            ← Start
Apply CD → E: {C, D, E}
Apply E → A:  {C, D, E, A}
Apply A → B:  {C, D, E, A, B}
(CD)⁺ = {A, B, C, D, E} = ALL attributes ✓
```
**CD is a Candidate Key** ✓

**Try ED:**
```
(ED)⁺ = {E, D}            ← Start
Apply E → A:  {E, D, A}
Apply A → B:  {E, D, A, B}
Apply B → C:  {E, D, A, B, C}
(ED)⁺ = {A, B, C, D, E} = ALL attributes ✓
```
**ED is a Candidate Key** ✓

**Final Answer: Candidate Keys = {AD, BD, CD, ED}**

### Comparison Table: Super Key vs Candidate Key

| Sr. No. | Feature | Super Key | Candidate Key |
|:---|:---|:---|:---|
| 1 | **Definition** | A set of one or more attributes whose values uniquely identify a tuple in a relation | A minimal super key (no proper subset can uniquely identify the tuple) |
| 2 | **Set Minimality** | Not necessarily minimal (can contain redundant/extra attributes) | Strictly minimal (irreducible set of attributes) |
| 3 | **Cardinality (Count)** | High cardinality (many combinations can serve as super keys) | Lower cardinality (only minimal attribute subsets qualify) |
| 4 | **Nullable Attributes** | May contain nullable attributes in the non-identifying portion | Strictly non-nullable attributes (due to unique identification requirements) |
| 5 | **Attribute Redundancy** | High redundancy (contains attributes not required for unique identification) | Zero redundancy (all attributes are essential for unique identification) |
| 6 | **Primary Key Eligibility** | Cannot be selected as a Primary Key without first being minimized | Directly eligible to be selected as the Primary Key (others become Alternate Keys) |
| 7 | **Example (R = {A, B}, A → B)** | {A} and {A, B} are both super keys | Only {A} is a candidate key |
| 8 | **Application** | Forms the baseline definition for tuple identification in relational theory | Crucial for identifying functional dependencies and selecting the Primary Key |

---

## Q3. Explain Normalization — 1NF, 2NF, 3NF, and BCNF with Decomposition Steps and Examples (8 Marks)

### Introduction

**Normalization** removes redundancy by breaking large tables into **smaller, cleaner tables** using FDs.
Levels: **1NF, 2NF, 3NF, BCNF** — each fixes a specific type of problem.

### Diagram

```
  UNF (Unnormalized)
    |  Remove multi-valued cells
    v
  1NF --> Remove partial dependency --> 2NF
           |
           v
         3NF --> Remove transitive dependency
           |
           v
         BCNF --> Left side of every FD must be super key
```

### Key Points

**1NF (First Normal Form)** — every cell must have only one value:

- **No multi-valued** or list-type data allowed in any cell
- **Each row** must be unique — no two rows should be exactly same
- **Example:** Phone = "98765, 12345" violates 1NF — must split into two rows
- **Fix:** break multi-values into **separate rows** or **separate table**
- **Primary key** must be defined for the table
- **Column order** does not matter — only values inside cells matter

**2NF (Second Normal Form)** — must be in 1NF + no partial dependency:

- **Partial dependency** means a non-key column depends on **part of composite key**
- **Only applies** when primary key has **two or more columns** (composite key)
- **Example:** PK = (Roll_No, Course_ID), but Sname depends only on Roll_No → partial
- **Fix:** move partially dependent columns to a **new table** with that part of key
- **Tables with single-column PK** are automatically in 2NF if they are in 1NF
- **After fix:** every non-key column depends on the **full primary key**

**3NF (Third Normal Form)** — must be in 2NF + no transitive dependency:

- **Transitive dependency** means A → B → C, so A decides C **indirectly** through B
- **Non-key column** should not depend on **another non-key column**
- **Example:** Roll_No → Dept_ID → Dept_Name — Dept_Name depends on Roll_No through Dept_ID
- **Fix:** move the transitive part (Dept_ID → Dept_Name) to a **separate table**
- **After fix:** every non-key column depends **only on the primary key** directly
- **Most real databases** use 3NF as the standard level of normalization

**BCNF (Boyce-Codd Normal Form)** — stricter version of 3NF:

- **For every FD X → Y**, X must be a **super key** (can identify all rows)
- **Difference from 3NF:** 3NF allows non-key → part of key, but BCNF does not
- **Example:** Guide → Project, but Guide is not a super key → violates BCNF
- **Fix:** move the violating FD into a **new table** where left side becomes PK
- **May lose** some functional dependencies during decomposition
- **Stronger than 3NF** — every BCNF table is in 3NF, but not every 3NF table is in BCNF

### Step-by-Step Decomposition Example

**Step 1: UNF → 1NF (Remove Multi-Valued Attributes)**

**UNF Table:** Student_Phones

| Roll_No | Name | Phone_Numbers |
|:---|:---|:---|
| 101 | Amit | 98765, 12345 |

**Problem:** Phone_Numbers has **two values** in one cell → violates 1NF

**1NF Table:** (Split into separate rows)

| Roll_No | Name | Phone |
|:---|:---|:---|
| 101 | Amit | 98765 |
| 101 | Amit | 12345 |

**New PK = (Roll_No, Phone)**

**Step 2: 1NF → 2NF (Remove Partial Dependencies)**

**1NF Table:** Enroll(Roll_No, Course_ID, Sname, Course_Name, Marks)
- **PK = (Roll_No, Course_ID)**

**FDs found:**
- Roll_No → Sname ← **Partial** (depends on part of key)
- Course_ID → Course_Name ← **Partial** (depends on part of key)
- (Roll_No, Course_ID) → Marks ← **Full** (depends on whole key)

**2NF Decomposition:**
```
Student(Roll_No, Sname)             ← PK: Roll_No
Course(Course_ID, Course_Name)      ← PK: Course_ID
Enrollment(Roll_No, Course_ID, Marks) ← PK: (Roll_No, Course_ID)
```

**Step 3: 2NF → 3NF (Remove Transitive Dependencies)**

**2NF Table:** Student_Dept(Roll_No, Sname, Dept_ID, Dept_Name)
- **PK = Roll_No**

**FDs:** Roll_No → Dept_ID and Dept_ID → Dept_Name
- This creates: Roll_No → Dept_ID → Dept_Name ← **Transitive!**

**3NF Decomposition:**
```
Student(Roll_No, Sname, Dept_ID)    ← PK: Roll_No
Department(Dept_ID, Dept_Name)      ← PK: Dept_ID
```

**Step 4: 3NF → BCNF (Left Side Must Be Super Key)**

**3NF Table:** Project_Guide(Student_ID, Project, Guide)
- **Candidate Keys:** (Student_ID, Project) and (Student_ID, Guide)
- **FD:** Guide → Project ← **Guide is NOT a super key** → Violates BCNF!

**BCNF Decomposition:**
```
Guide_Project(Guide, Project)       ← PK: Guide
Student_Guide(Student_ID, Guide)    ← PK: (Student_ID, Guide)
```

### Comparison Table: Normal Forms

| Sr. No. | Feature | 1NF (First Normal Form) | 2NF (Second Normal Form) | 3NF (Third Normal Form) | BCNF (Boyce-Codd Normal Form) |
|:---|:---|:---|:---|:---|:---|
| 1 | **Primary Objective** | Enforce attribute atomicity | Eliminate partial dependencies | Eliminate transitive dependencies | Resolve anomalies from overlapping candidate keys |
| 2 | **Precondition** | Relational model baseline | Must satisfy 1NF | Must satisfy 2NF | Must satisfy 3NF |
| 3 | **Partial Dependency** | Allowed | Eliminated (no non-prime attribute depends on subset of candidate key) | Eliminated | Eliminated |
| 4 | **Transitive Dependency** | Allowed | Allowed | Eliminated (no non-prime attribute depends transitively on candidate key) | Eliminated |
| 5 | **Left Side = Super Key?** | Not required | Not required | Not required (optional if right side is prime attribute) | Strictly required (for every non-trivial FD X \to Y, X must be a super key) |
| 6 | **Decomposition Fix** | Flat-file normalization (split multi-valued entries into rows) | Decompose relation to isolate partially dependent attributes | Decompose relation to isolate transitively dependent attributes | Decompose relation to isolate overlapping key dependencies |
| 7 | **Data Redundancy** | High | Moderate | Low | Minimal |
| 8 | **Dependency Preservation** | Always preserved | Always preserved | Always preserved | May not be preserved (sometimes lost during BCNF decomposition) |

---

## Q4. Explain Codd's 12 Rules for Relational Database Management System (8 Marks)

### Introduction

**Dr. E.F. Codd** proposed **13 rules (0–12)** to define what makes a system a **true RDBMS**.
They cover how data should be **stored, accessed, and protected**.

### Key Points

- **Rule 0 (Foundation)** tells that system must use **relational methods** to manage data
- **Rules 1–4** deal with how data is **stored and described** inside the database
- **Rules 5–7** deal with how data is **accessed and changed** using a language like SQL
- **Rules 8–9** deal with **independence** — changes to storage or design should not break apps
- **Rules 10–12** deal with **integrity, distribution, and security** of the database

### All 13 Rules (Rule 0 to Rule 12)

| Rule No. | Rule Name | Simple Explanation |
|:---|:---|:---|
| **Rule 0** | **Foundation Rule** | System must use **relational methods** to manage the database |
| **Rule 1** | **Information Rule** | All data must be stored in **tables** (rows and columns only) |
| **Rule 2** | **Guaranteed Access** | Every value is reachable by **table name + row key + column name** |
| **Rule 3** | **Systematic NULL Handling** | **NULL** means "data not available" — system must handle it properly |
| **Rule 4** | **Active Online Catalog** | Database structure (metadata) must be stored in **system tables** users can query |
| **Rule 5** | **Complete Data Language** | Must support one language (like **SQL**) for defining, querying, and controlling data |
| **Rule 6** | **View Updating Rule** | All **views** that can be updated **must** be updatable by the system |
| **Rule 7** | **Set-Level Operations** | Insert, update, delete must work on **multiple rows at once**, not just one row |
| **Rule 8** | **Physical Data Independence** | Changing **storage** (like moving files to SSD) must NOT affect queries or apps |
| **Rule 9** | **Logical Data Independence** | Changing **table structure** (like adding a column) must NOT break existing programs |
| **Rule 10** | **Integrity Independence** | All **rules/constraints** (like PK, FK) must be stored in database, NOT in app code |
| **Rule 11** | **Distribution Independence** | If data is spread across **multiple servers**, queries should still work the same way |
| **Rule 12** | **Non-Subversion Rule** | No **back-door access** — low-level commands cannot skip security or constraint rules |

### Simple Example

Consider a Bookstore with tables: **Books(Book_ID, Title, Price)** and **Orders(Order_ID, Book_ID, Qty)**

- **Rule 1:** All book data is stored in tables — no hidden files
- **Rule 2:** To get price of book 5 → table = Books, key = 5, column = Price
- **Rule 8:** Moving database from HDD to SSD → all old queries still work fine

### Comparison Table: Physical vs Logical Independence

| Sr. No. | Feature | Physical Data Independence (Rule 8) | Logical Data Independence (Rule 9) |
|:---|:---|:---|:---|
| 1 | **Definition** | Ability to modify physical schemas without altering conceptual schemas or application programs | Ability to modify conceptual schemas without altering external views or application programs |
| 2 | **Scope of Change** | Physical storage formats, file organizations, compression, or index structures | Relational structures (adding/deleting attributes, renaming relations, decomposition) |
| 3 | **Unaffected Layer** | Conceptual schema (logical tables) and query applications | External schema (views) and existing query applications |
| 4 | **Architectural Level** | Concerned with the mapping between Internal (Physical) and Conceptual levels | Concerned with the mapping between Conceptual and External (View) levels |
| 5 | **Frequency of Change** | High (frequent storage optimization or hardware updates) | Low (infrequent structural redesign or schema evolution) |
| 6 | **Responsible Actor** | Database Administrator (DBA) | Database Designer and Application Developer |
| 7 | **DBMS Mapping Mechanism** | Internal schema update (automatically matches conceptual references to physical blocks) | External view virtualization (logical views map to new base tables) |
| 8 | **Real-world Example** | Migrating table spaces from HDD to SSD, or creating a B+ Tree index | Adding an optional "MobileNumber" attribute, or partitioning a table |
