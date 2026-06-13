# DBMS: Unit I — Introduction to Database Management System (Q&A)

---

## Q1. Compare DBMS and File Processing System

### Introduction

- A **File Processing System (FPS)** stores data in separate files for each program; a **DBMS** stores all data centrally and shares it across programs.
- DBMS was created to solve **duplicate data, no security, and no backup** problems of file systems.

### Comparison Table

| Sr. No. | Feature | File Processing System (FPS) | Database Management System (DBMS) |
|:---:|:---|:---|:---|
| 1 | **Data Redundancy** | High redundancy (same data duplicated in multiple files) | Low redundancy (data stored centrally in one place) |
| 2 | **Data Consistency** | Low consistency (updating one file does not update others) | High consistency (updates propagate automatically) |
| 3 | **Data Independence** | No data independence (change in file format breaks programs) | Logical and physical data independence is provided |
| 4 | **Security & Access** | Poor security (limited to basic file-level passwords) | Robust security (supports user access roles and permissions) |
| 5 | **Concurrency Control** | No concurrency control (multiple users cannot write safely) | Built-in concurrency control (using locking protocols) |
| 6 | **Backup & Recovery** | Manual backup (high risk of data loss on crash) | Automatic crash recovery (uses transaction logs) |
| 7 | **Integrity Constraints** | No central rules (validation must be coded in programs) | Centralized rules (keys and constraints defined in schema) |
| 8 | **Data Querying** | No query language (must write custom code to search files) | Declarative querying (uses simple SQL queries) |

---

## Q2. Explain Three-Schema Architecture and Data Independence

### Introduction

- **Three-Schema Architecture** (ANSI/SPARC) divides a database into **three levels**: External, Conceptual, and Internal.
- **Data Independence** means we can change one level without affecting the other levels.

### Diagram

```
  +----------+  +----------+  +----------+
  | View 1   |  | View 2   |  | View 3   |
  | (Student)|  | (Teacher)|  | (Admin)  |
  +----+-----+  +----+-----+  +----+-----+
       |              |              |
  ---- Logical Data Independence --------
       |              |              |
  +----+--------------+--------------+----+
  |    CONCEPTUAL LEVEL (Logical)         |
  |    Tables, Keys, Relationships        |
  +-------------------+------------------+
                      |
  ---- Physical Data Independence --------
                      |
  +-------------------v------------------+
  |    INTERNAL LEVEL (Physical)          |
  |    Files, Indexes, Disk Blocks        |
  +--------------------------------------+
```

**External Level (View Level)**

- **Each user sees only the data they need**, rest is hidden
- **Student** sees Name and GPA; **Admin** sees all columns
- **Multiple views** can be created from the same database
- **Provides security** by hiding sensitive columns from users
- **Views are defined** using SQL CREATE VIEW statement
- **Changes in views** do not affect the actual stored tables

**Conceptual Level (Logical Level)**

- **Shows full structure** of the database with all tables and columns
- **Defines primary keys, foreign keys**, and relationships between tables
- **Managed by the DBA** (Database Administrator)
- **Contains constraints** like NOT NULL, UNIQUE, and CHECK rules
- **Independent of storage** — does not care how data is saved on disk
- **One conceptual schema** exists for the entire database

**Internal Level (Physical Level)**

- **Describes how data is stored** on hard disk or SSD
- **Uses indexes** like B-Tree or Hash for fast searching
- **Manages file paths**, block sizes, and storage allocation
- **Handles compression** and encryption of stored data
- **Buffer management** decides which data blocks stay in RAM
- **Only DBMS software** works at this level, not the user

**Logical Data Independence**

- **Change conceptual level** without changing external views
- **Add a new column** to a table — old views still work fine
- **Rename a table** or column — views can be updated separately
- **Merge two tables** into one — user queries stay the same
- **Harder to achieve** compared to physical data independence
- **Mapping between external and conceptual** levels handles this

**Physical Data Independence**

- **Change internal level** without changing conceptual schema
- **Move data from HDD to SSD** — tables and queries stay same
- **Add a new index** — table structure does not change
- **Change file storage format** — SQL queries still work
- **Easier to achieve** than logical data independence
- **Mapping between conceptual and internal** levels handles this

---

## Q3. Explain DBMS Architecture with Diagram

### Introduction

- **DBMS Architecture** describes the internal parts of a DBMS and how a user's SQL query travels through them.
- Three main parts: **Query Processor**, **Storage Manager**, and **Disk Storage**.

### Diagram

```
  [Users / Applications / DBA]
              |
  +-----------v-----------+
  |    QUERY PROCESSOR     |
  |  DDL Interpreter       |
  |  DML Compiler          |
  |  Query Evaluation      |
  +-----------+------------+
              |
  +-----------v-----------+
  |    STORAGE MANAGER     |
  |  Authorization Mgr     |
  |  Transaction Mgr       |
  |  Buffer Mgr, File Mgr  |
  +-----------+------------+
              |
  +-----------v-----------+
  |    DISK STORAGE        |
  |  Data Files, Indexes   |
  |  Data Dictionary, Logs |
  +------------------------+
```

**Query Processor**

- **DDL Interpreter** handles CREATE, ALTER, DROP table commands
- **DML Compiler** handles SELECT, INSERT, UPDATE, DELETE queries
- **Checks SQL syntax** and converts query into an execution plan
- **Query Evaluation Engine** runs the plan and fetches results
- **Picks the best plan** by comparing different ways to run a query
- **Sends requests** to Storage Manager for reading or writing data

**Storage Manager**

- **Authorization Manager** checks if user has permission to access data
- **Integrity Manager** checks data rules like NOT NULL and PRIMARY KEY
- **Transaction Manager** ensures ACID rules; rolls back on failure
- **Buffer Manager** caches hot data in RAM for faster access
- **File Manager** reads and writes actual data blocks on disk
- **Acts as middleman** between Query Processor and Disk Storage

**Disk Storage**

- **Data Files** store the actual table rows on hard disk
- **Data Dictionary** stores metadata like table names and column types
- **Indexes** (B-Tree, Hash) speed up searching on key columns
- **Transaction Logs** record every change for crash recovery
- **All data is permanent** — survives even after system restarts
- **File Manager** is the only part that directly touches disk storage

---

## Q4. Design ER Diagram for Hospital Management System

### Introduction

- An **ER Diagram** visually shows database structure using **Rectangles (Entity)**, **Ellipses (Attribute)**, **Diamonds (Relationship)**.
- After drawing, we **convert it into relational tables** with proper PK and FK constraints.

### ER Diagram

```
  (Doc_ID)  (Doc_Name)  (Specialization)
      \         |           /
  +----------+---------+-----------+
  |            DOCTOR               |
  +-----------------+---------------+
                    | 1
               < Treats >
                    | M
  +-----------------+---------------+
  |            PATIENT              |
  +---+--------+---------+---------+
      /         |          \
  (Pat_ID)  (Pat_Name)   (Gender)
                    | M
             < Admitted_In >
                    | 1
  +-----------------+---------------+
  |           ADMISSION             |
  +---+--------+---------+---------+
      /         |          \
  (Admit_ID) (Admit_Date) (Discharge_Date)
                    | M
             < Assigned_To >
                    | 1
  +-----------------+---------------+
  |              ROOM               |
  +---+--------+---------+---------+
      /         |          \
  (Room_No)  (Room_Type) (Room_Charge)
```

### Key Points

- **Doctor** entity has attributes: Doc_ID (PK), Doc_Name, Specialization
- **Patient** entity has attributes: Pat_ID (PK), Pat_Name, Gender
- **Admission** entity has attributes: Admit_ID (PK), Admit_Date, Discharge_Date
- **Room** entity has attributes: Room_No (PK), Room_Type, Room_Charge
- **Doctor treats Patient** — one doctor treats many patients (1:M)
- **Patient admitted in Admission** — one patient has many admissions (1:M)
- **Admission assigned to Room** — many admissions share one room (M:1)
- **PK of "1" side** goes as **FK in "M" side** during table conversion

### SQL DDL (CREATE TABLE Statements)

```sql
-- Create Doctor Table
CREATE TABLE Doctor (
    Doc_ID      VARCHAR(10) PRIMARY KEY,
    Doc_Name    VARCHAR(50) NOT NULL,
    Specialization VARCHAR(50) NOT NULL
);

-- Create Room Table
CREATE TABLE Room (
    Room_No     VARCHAR(10) PRIMARY KEY,
    Room_Type   VARCHAR(20) NOT NULL,
    Room_Charge DECIMAL(10,2) NOT NULL
);

-- Create Patient Table (FK references Doctor)
CREATE TABLE Patient (
    Pat_ID      VARCHAR(10) PRIMARY KEY,
    Pat_Name    VARCHAR(50) NOT NULL,
    Gender      CHAR(1) CHECK (Gender IN ('M', 'F')),
    Doc_ID      VARCHAR(10),
    FOREIGN KEY (Doc_ID) REFERENCES Doctor(Doc_ID)
);

-- Create Admission Table (FK references Patient and Room)
CREATE TABLE Admission (
    Admit_ID    VARCHAR(10) PRIMARY KEY,
    Admit_Date  DATE NOT NULL,
    Pat_ID      VARCHAR(10),
    Room_No     VARCHAR(10),
    FOREIGN KEY (Pat_ID) REFERENCES Patient(Pat_ID),
    FOREIGN KEY (Room_No) REFERENCES Room(Room_No)
);

-- Sample Data
INSERT INTO Doctor VALUES ('D01', 'Dr. Mehta', 'Cardiology');
INSERT INTO Room VALUES ('R202', 'ICU', 5000.00);
INSERT INTO Patient VALUES ('P01', 'Rahul', 'M', 'D01');
INSERT INTO Admission VALUES ('A01', '2026-06-10', 'P01', 'R202');
```

---

## Q5. Explain Extended ER (EER) Features: Generalization, Specialization, and Aggregation

### Introduction

- **Extended ER (EER) Model** adds extra features to handle **complex real-world situations** that basic ER cannot.
- Three main features: **Generalization** (bottom-up combining), **Specialization** (top-down splitting), **Aggregation** (relationship as entity).

### Diagram

```
        +------------------+
        |     PERSON       |  <-- Superclass
        | (Name, Phone)    |
        +--------+---------+
                 |
              / ISA \  (d = Disjoint)
             /       \
    +--------+--+  +--+----------+
    |  STUDENT  |  |  EMPLOYEE   |  <-- Subclasses
    | (Roll,GPA)|  | (EmpID,Sal) |
    +-----------+  +------+------+
                          |
                       / ISA \
                      /       \
              +------+---+ +--+--------+
              | TEACHER  | | MANAGER   |
              | (Subject)| | (Dept)    |
              +----------+ +-----------+

  AGGREGATION:
  +------------------------------------------+
  |  +--------+              +----------+    |
  |  |SPONSOR |--<Finances>--|  PROJECT  |   |
  |  +--------+              +----------+    |
  +--------------------+---------------------+
                       |
                  <Monitors>
                       |
                 +-----+-----+
                 |  AUDITOR   |
                 +-----------+
```

**Generalization (Bottom-Up)**

- **Combine two or more similar entities** into one parent entity
- **Common attributes move up** to the parent (superclass)
- Example: Student + Employee both have Name → create **Person**
- **Reduces duplicate attributes** across related entities
- **Works from bottom to top** — children come first, parent created later
- **ISA triangle** connects subclasses to the superclass in diagram

**Specialization (Top-Down)**

- **Split one general entity** into two or more specific sub-entities
- **Unique attributes move down** to the children (subclasses)
- Example: Person split into Student (has GPA) and Employee (has Salary)
- **Disjoint (d)** means entity belongs to only one subclass
- **Overlapping (o)** means entity can belong to multiple subclasses
- **Total** — every parent must be in some subclass; **Partial** — not required

**Aggregation**

- **Treat a relationship between entities as a single entity**
- **Normal ER cannot** connect a relationship to another relationship
- **Box is drawn** around the relationship to show it is one unit
- Example: Sponsor–Finances–Project grouped as one aggregated entity
- **Auditor monitors** the whole Sponsor-Finances-Project relationship
- **Solves the limitation** of basic ER model for nested relationships
