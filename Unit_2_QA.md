# DBMS: Unit II — SQL and PL/SQL (Exam-Ready Q&A)

---

## Q1. Explain DDL, DML, DCL, and TCL Commands with Examples

**SQL commands** are divided into **four groups** based on their job.
Each group handles a different part of database work — structure, data, access, or transactions.

```
        +------------------+
        |   SQL Commands   |
        +------------------+
        /     |      |      \
      DDL    DML    DCL    TCL
       |      |      |      |
   Structure Data  Access  Undo/Save
```

**DDL (Data Definition Language):**
- **DDL** commands change the **structure** of tables, not the data inside
- Main commands are **CREATE, ALTER, DROP, TRUNCATE**
- **CREATE** makes a new table, view, or index in the database
- **ALTER** adds, removes, or changes columns in an existing table
- **DROP** removes a table fully — structure and all data gone
- **TRUNCATE** deletes all rows but keeps the table structure
- All DDL commands are **auto-committed** — cannot be rolled back
- Used mainly by **Database Administrators (DBAs)** to set up tables

**DML (Data Manipulation Language):**
- **DML** commands work with the **data** (rows) inside tables
- Main commands are **INSERT, UPDATE, DELETE, SELECT**
- **INSERT** adds a new row of data into a table
- **UPDATE** changes values in existing rows using SET and WHERE
- **DELETE** removes specific rows based on a WHERE condition
- **SELECT** reads and displays data from one or more tables
- DML is **not auto-committed** — needs manual COMMIT to save
- Can be **rolled back** before COMMIT if something goes wrong

**DCL (Data Control Language):**
- **DCL** commands control **who can access** the database and tables
- Main commands are **GRANT** and **REVOKE**
- **GRANT** gives permissions like SELECT, INSERT to a user or role
- **REVOKE** takes back permissions that were given earlier
- DCL is **auto-committed** — changes are saved right away
- Used by **Security Admin** to control user access to data

**TCL (Transaction Control Language):**
- **TCL** commands manage **saving or undoing** DML changes
- Main commands are **COMMIT, ROLLBACK, SAVEPOINT**
- **COMMIT** saves all changes to the database permanently
- **ROLLBACK** undoes all changes made since last COMMIT
- **SAVEPOINT** marks a point to which you can rollback later
- Works **only on DML** commands — DDL and DCL auto-commit already

| Sr. No. | Feature | DDL | DML | DCL | TCL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Full Form** | Data Definition | Data Manipulation | Data Control | Transaction Control |
| 2 | **Purpose** | Define structure | Modify data | Control access | Manage transactions |
| 3 | **Commands** | CREATE, ALTER, DROP | INSERT, UPDATE, DELETE | GRANT, REVOKE | COMMIT, ROLLBACK |
| 4 | **Works On** | Table structure | Table records | User access | Transactions |
| 5 | **Auto-Commit?** | Yes | No | Yes | Controls Commit |
| 6 | **Can Rollback?** | No | Yes | No | Yes |
| 7 | **WHERE Clause?** | No | Yes | No | No |
| 8 | **Used By** | Database Admin | Users / Developers | Security Admin | Developers |

```sql
-- DDL: Create the Books table
CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(100),
    Price NUMBER
);

-- DDL: Add a new column
ALTER TABLE Books ADD Author VARCHAR(50);

-- DML: Insert a new record
INSERT INTO Books VALUES (1, 'DBMS Guide', 250, 'Korth');

-- DML: Update the price
UPDATE Books SET Price = 300 WHERE BookID = 1;

-- DCL: Give SELECT permission
GRANT SELECT ON Books TO student_user;

-- TCL: Save all changes
COMMIT;

-- TCL: Create savepoint and rollback
SAVEPOINT sp1;
DELETE FROM Books WHERE BookID = 1;
ROLLBACK TO sp1;  -- Undo the delete
```

---

## Q2. Explain SQL Constraints with Examples (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT)

**SQL Constraints** are rules on table columns that keep only **correct and valid data** in the database.
They are defined during **CREATE TABLE** or added later using **ALTER TABLE**.

```
       +-------------------+
       |  SQL Constraints  |
       +-------------------+
       /   |    |    |   |   \
     PK   FK  UNQ  NN  CHK  DEF
      |    |    |    |    |    |
   Unique Link  No  Must  Rule Auto
   +NN   tables dup empty pass fill
```

**PRIMARY KEY:**
- **PRIMARY KEY** is a mix of **NOT NULL + UNIQUE** on one column
- Each table can have **only one** primary key
- It gives every row a **unique identity** (like RollNo, EmpID)
- A **clustered index** is created on this column automatically
- No two rows can have the **same primary key value**
- Can be set at **column level** or **table level** in CREATE TABLE

**FOREIGN KEY:**
- **FOREIGN KEY** links a **child table** to a **parent table**
- It points to the **PRIMARY KEY** of the parent table
- Prevents **orphan rows** — child cannot have invalid parent value
- Supports **ON DELETE CASCADE** — deletes child when parent is deleted
- A table can have **many foreign keys** pointing to different parents
- Can be set at **column level** or **table level** in CREATE TABLE

**UNIQUE:**
- **UNIQUE** prevents **duplicate values** in a column
- Unlike PRIMARY KEY, it **allows NULL values**
- A table can have **multiple UNIQUE** columns (like Email, Phone)
- Creates a **non-clustered index** automatically on that column
- Often used for fields that must be different but are not the main key
- Can be set at **column level** or **table level** in CREATE TABLE

**NOT NULL:**
- **NOT NULL** means the column **cannot be left empty**
- Every INSERT must give a value for this column
- Applied at **column level only** — cannot be set at table level
- Used for important fields like **Name, DOB, Address**
- Does not stop duplicate values — only stops empty values
- Commonly combined with other constraints like UNIQUE or CHECK

**CHECK:**
- **CHECK** tests a **condition** before allowing data into a column
- If the condition fails, the row is **rejected** by the database
- Example: **Age >= 18** only allows adults into the table
- Can use operators like **>=, <=, BETWEEN, IN, AND, OR**
- Can be set at **column level** or **table level** in CREATE TABLE
- Useful for enforcing **business rules** directly in the database

**DEFAULT:**
- **DEFAULT** auto-fills a value when the user **does not give one**
- Example: **Status = 'Active'** is filled if user skips that column
- Applied at **column level only** — cannot be set at table level
- Does not stop the user from entering a different value
- Useful for fields like **JoinDate = SYSDATE** or **Country = 'India'**
- If user gives a value, the default value is **ignored completely**

```sql
-- Parent Table
CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(50) NOT NULL UNIQUE
);

-- Child Table with all constraints
CREATE TABLE Student (
    RollNo INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Age INT CHECK (Age >= 17 AND Age <= 60),
    DeptID INT,
    Status VARCHAR(20) DEFAULT 'Active',
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- Insert data
INSERT INTO Department VALUES (10, 'Computer Science');
INSERT INTO Student (RollNo, Name, Email, Age, DeptID)
VALUES (101, 'Amit Kumar', 'amit@sppu.edu', 20, 10);
-- Status will be 'Active' automatically (DEFAULT)
```

---

## Q3. Explain Views in SQL — Definition, Syntax, Updatable vs Non-Updatable Views, and WITH CHECK OPTION

A **View** is a **virtual table** made from a SELECT query — it stores no data itself.
Views can be **updatable** (allow changes) or **non-updatable** (read-only).

```
  +--------------------+       CREATE VIEW CS_View AS
  |  Base Table:       |       SELECT SID, Name FROM
  |  Student           | ----> Student WHERE Dept='CS'
  +--------------------+            |
  | SID|Name |Dept|Marks|           v
  | 101|Amit | CS | 85  |    +-------------+
  | 102|Priya| IT | 72  |    | CS_View     |
  | 103|Rohan| CS | 90  |    | SID | Name  |
  +--------------------+     | 101 | Amit  |
    (Real data stored)       | 103 | Rohan |
                              +-------------+
                              (No data stored)
```

- A **view** is created using **CREATE VIEW view_name AS SELECT ...** syntax
- View is **created once** and can be used many times like a normal table
- View **always shows latest data** because it runs the query each time
- A view is **removed** using **DROP VIEW view_name** command
- **Updatable view** allows **INSERT, UPDATE, DELETE** — changes go to base table
- Updatable view must be based on a **single table only**
- Updatable view must **not use** GROUP BY, HAVING, DISTINCT, or functions like SUM/AVG
- Updatable view must **include all NOT NULL columns** of the base table
- **Non-updatable view** is **read-only** — only SELECT is allowed on it
- Non-updatable view uses **joins, GROUP BY, DISTINCT, or aggregate functions**
- **WITH CHECK OPTION** blocks updates that would **violate the WHERE condition**
- It makes sure modified rows **stay visible** in the view after the change
- Example: CS_View with CHECK OPTION will **reject** changing Dept from 'CS' to 'IT'

```sql
-- Create an updatable view with WITH CHECK OPTION
CREATE VIEW CS_Students AS
SELECT SID, Name, Dept, Marks
FROM Student
WHERE Dept = 'CS'
WITH CHECK OPTION;

-- Valid update (Marks change, Dept stays 'CS')
UPDATE CS_Students SET Marks = 92 WHERE SID = 101;
-- SUCCESS

-- Invalid update (trying to change Dept to 'IT')
UPDATE CS_Students SET Dept = 'IT' WHERE SID = 101;
-- ERROR: WITH CHECK OPTION violation

-- Non-Updatable View (uses GROUP BY and AVG)
CREATE VIEW Dept_Avg AS
SELECT Dept, AVG(Marks) AS AvgMarks
FROM Student GROUP BY Dept;
-- This view is READ-ONLY
```

| Sr. No. | Feature | Updatable View | Non-Updatable View |
| :--- | :--- | :--- | :--- |
| 1 | **Base Tables** | Single Table | Multiple Tables |
| 2 | **Aggregate Functions** | Not Allowed | Allowed |
| 3 | **GROUP BY / HAVING** | Not Allowed | Allowed |
| 4 | **DISTINCT Keyword** | Not Allowed | Allowed |
| 5 | **DML Operations** | Allowed | Read-Only |
| 6 | **Calculated Columns** | Not Allowed | Allowed |
| 7 | **NOT NULL Columns** | Required | Optional |
| 8 | **Set Operations** | Not Allowed | Allowed |

---

## Q4. Explain Join Operations in SQL (Inner, Left, Right, Full, Cross, Natural, Self Joins)

A **JOIN** combines rows from two or more tables based on a **common column**.
SQL has **seven types** of joins — each controls which rows appear when there is no match.

```
  INNER JOIN    LEFT JOIN     RIGHT JOIN    FULL OUTER
   +--+--+      +--+--+       +--+--+      +--+--+
   |A |AB| B|   |A |AB|  B    A  |AB| B|   |A |AB| B|
   +--+--+      +--+--+       +--+--+      +--+--+
   Only A∩B     All A+match   All B+match  All A+B
```

**INNER JOIN:**
- Returns **only matching rows** from both tables
- Rows with no match in either table are **excluded**
- Most commonly used join type in SQL queries
- Requires **ON condition** to specify which columns to match
- Result is always **smaller or equal** to both input tables
- Also called a **simple join** or **equi-join**
```sql
SELECT * FROM A INNER JOIN B ON A.id = B.id;
```

**LEFT JOIN (LEFT OUTER JOIN):**
- Returns **all rows from the left table** even without a match
- Unmatched rows from right table show as **NULL values**
- Left table data is **never lost** — all rows are kept
- Requires **ON condition** to specify the matching column
- Useful to find **records with no match** (WHERE B.id IS NULL)
- Also called **LEFT OUTER JOIN** — both names mean the same
```sql
SELECT * FROM A LEFT JOIN B ON A.id = B.id;
```

**RIGHT JOIN (RIGHT OUTER JOIN):**
- Returns **all rows from the right table** even without a match
- Unmatched rows from left table show as **NULL values**
- Right table data is **never lost** — all rows are kept
- Requires **ON condition** to specify the matching column
- Opposite of LEFT JOIN — just swap the table positions
- Also called **RIGHT OUTER JOIN** — both names mean the same
```sql
SELECT * FROM A RIGHT JOIN B ON A.id = B.id;
```

**FULL OUTER JOIN:**
- Returns **all rows from both tables** whether matched or not
- Unmatched rows from either side show as **NULL values**
- Combines the result of **LEFT JOIN and RIGHT JOIN** together
- Requires **ON condition** to specify the matching column
- Result set is usually the **largest** among all join types
- Useful when you want a **complete picture** of both tables
```sql
SELECT * FROM A FULL OUTER JOIN B ON A.id = B.id;
```

**CROSS JOIN:**
- Returns **every possible combination** of rows from both tables
- If A has M rows and B has N rows, result has **M × N rows**
- **No ON condition** is needed — all rows are paired
- Also called a **Cartesian Product** of two tables
- Result can be **very large** — use carefully on big tables
- Useful for generating **all pairs** like sizes × colors
```sql
SELECT * FROM A CROSS JOIN B;
```

**NATURAL JOIN:**
- **Automatically joins** on columns with the **same name** in both tables
- **No ON condition** is needed — database picks matching columns
- Matching columns appear **only once** in the result
- If no column names match, it acts like a **CROSS JOIN**
- Can give **wrong results** if unrelated columns share the same name
- Best used when tables have **clearly named common columns**
```sql
SELECT * FROM A NATURAL JOIN B;
```

**SELF JOIN:**
- Joins a table **with itself** using two different **aliases**
- Used to find **relationships within the same table** (like employee-manager)
- Requires **ON condition** using the two aliases
- Each alias acts as if it is a **separate copy** of the table
- Can use INNER JOIN or LEFT JOIN depending on the need
- Common example: finding **employees and their managers** from one Emp table
```sql
SELECT E1.Name, E2.Name AS Manager
FROM Emp E1 JOIN Emp E2 ON E1.MgrID = E2.EmpID;
```

| Sr. No. | Feature | INNER JOIN | LEFT JOIN | RIGHT JOIN | FULL JOIN | CROSS JOIN | NATURAL JOIN | SELF JOIN |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Returns** | Matching rows | Left + matching right | Right + matching left | All rows (both sides) | Cartesian product | Auto-matched rows | Joined to itself |
| 2 | **Unmatched Left** | Excluded | Kept (with NULLs) | Excluded | Kept (with NULLs) | Combined | Excluded | Varies |
| 3 | **Unmatched Right** | Excluded | Excluded | Kept (with NULLs) | Kept (with NULLs) | Combined | Excluded | Varies |
| 4 | **ON Clause** | Required | Required | Required | Required | Not allowed | Not allowed | Required |
| 5 | **NULL Rows** | None | NULLs on Right | NULLs on Left | NULLs on both sides | None | None | Varies |
| 6 | **Result Size** | Small | >= Left table | >= Right table | Large | M × N rows | Small | Varies |
| 7 | **Use Case** | Exact matches | All left records | All right records | Disjoint lists | Combinations | Simple matches | Hierarchies |
| 8 | **Speed** | Fast | Fast | Fast | Slow | Very slow | Fast | Medium |

---

## Q5. Explain PL/SQL Triggers — Syntax, Types, :OLD/:NEW, and Example

A **PL/SQL Trigger** is a stored program that **runs automatically** on INSERT, UPDATE, or DELETE.
Triggers fire **before or after** the event, on **each row** or **once per statement**.

```
  User: INSERT / UPDATE / DELETE
              |
              v
    +-------------------+
    | Trigger on table? |
    +---Yes-------------+
         |           |
     BEFORE        AFTER
     trigger       trigger
         |           |
    Validate     Log changes
    Modify :NEW  using :OLD/:NEW
         |           |
         v           v
    Base Table Modified
```

- **Trigger** runs automatically — no need to call it manually
- Created using **CREATE OR REPLACE TRIGGER** trigger_name syntax
- You choose **BEFORE or AFTER** to decide when it fires
- You choose **INSERT, UPDATE, DELETE** or a mix using **OR** keyword
- **BEFORE trigger** fires before the event — used to **validate or change data**
- **AFTER trigger** fires after the event — used to **log or audit changes**
- **FOR EACH ROW** makes it a **row-level trigger** — fires once per affected row
- Without FOR EACH ROW, it is a **statement-level trigger** — fires once per SQL
- **:OLD** holds the **previous value** of a row before the change
- **:NEW** holds the **new value** of a row after the change
- :OLD and :NEW work **only in row-level triggers** (FOR EACH ROW)
- In BEFORE triggers, you can **modify :NEW values** before saving
- In AFTER triggers, :NEW is **already saved** and cannot be changed
- **WHEN clause** adds extra condition to control when trigger fires

**Trigger Syntax:**
```sql
CREATE [OR REPLACE] TRIGGER trigger_name
{BEFORE | AFTER}
{INSERT | UPDATE | DELETE} [OR ...]
ON table_name
[FOR EACH ROW]
[WHEN (condition)]
DECLARE
    -- variable declarations
BEGIN
    -- trigger body (PL/SQL code)
END;
/
```

**:OLD and :NEW Availability:**

| Operation | :OLD | :NEW |
| :--- | :--- | :--- |
| **INSERT** | NULL (no old data) | Contains new values |
| **UPDATE** | Contains old values | Contains new values |
| **DELETE** | Contains old values | NULL (no new data) |

**Complete Trigger Example — Fee Auditing:**

```sql
-- Create the Student Fees table
CREATE TABLE Student_Fees (
    SID INT PRIMARY KEY,
    Name VARCHAR(50),
    FeePaid NUMBER
);

-- Create the Audit Log table
CREATE TABLE Fee_Audit (
    AuditID INT PRIMARY KEY,
    SID INT,
    OldFee NUMBER,
    NewFee NUMBER,
    Action VARCHAR(10),
    ChangeDate DATE
);

-- Create a sequence for Audit IDs
CREATE SEQUENCE audit_seq START WITH 1 INCREMENT BY 1;

-- Create the AFTER trigger for auditing
CREATE OR REPLACE TRIGGER trg_fee_audit
AFTER INSERT OR UPDATE OR DELETE ON Student_Fees
FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO Fee_Audit VALUES
        (audit_seq.NEXTVAL, :NEW.SID, NULL, :NEW.FeePaid,
         'INSERT', SYSDATE);

    ELSIF UPDATING THEN
        INSERT INTO Fee_Audit VALUES
        (audit_seq.NEXTVAL, :NEW.SID, :OLD.FeePaid, :NEW.FeePaid,
         'UPDATE', SYSDATE);

    ELSIF DELETING THEN
        INSERT INTO Fee_Audit VALUES
        (audit_seq.NEXTVAL, :OLD.SID, :OLD.FeePaid, NULL,
         'DELETE', SYSDATE);
    END IF;
END;
/

-- Test the trigger
INSERT INTO Student_Fees VALUES (1, 'Amit', 5000);
UPDATE Student_Fees SET FeePaid = 7500 WHERE SID = 1;
DELETE FROM Student_Fees WHERE SID = 1;

-- Check the audit log
SELECT * FROM Fee_Audit;
```

**Output of Fee_Audit Table:**

| AuditID | SID | OldFee | NewFee | Action | ChangeDate |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | NULL | 5000 | INSERT | 12-JUN-26 |
| 2 | 1 | 5000 | 7500 | UPDATE | 12-JUN-26 |
| 3 | 1 | 7500 | NULL | DELETE | 12-JUN-26 |

| Sr. No. | Feature | Row-Level Trigger | Statement-Level Trigger |
| :--- | :--- | :--- | :--- |
| 1 | **Firing Frequency** | Once per affected row | Once per statement |
| 2 | **FOR EACH ROW Clause** | Required | Omitted |
| 3 | **Transition Variables** | `:OLD` and `:NEW` allowed | Not allowed |
| 4 | **Core Purpose** | Row validation | Logging / Security |
| 5 | **Bulk Performance** | Slower | Faster |
| 6 | **Can Modify :NEW?** | Yes | No |
| 7 | **Use Case** | Row-level audit | Table-level logging |
| 8 | **Context** | Single row values | Overall table |
 
 ---
 
## Q6. Explain Nested Queries in SQL with Examples [8 Marks]

### Introduction

- A **Nested Query** (or Subquery) is a query written inside another outer SQL query.
- The inner query executes first and passes its result to the outer query.

### Diagram

```
+------------------------------------+
| Outer Query                        |
| SELECT ... FROM ... WHERE val IN   |
|   +-----------------------------+  |
|   | Inner Query (Subquery)      |  |
|   | SELECT ... FROM ...         |  |
|   +-----------------------------+  |
+------------------------------------+
```

### Key Points

- **Scalar Subquery:** returns exactly one value (one row and one column).
- **Multi-Row Subquery:** returns multiple values (one column, many rows) using `IN`, `ANY`, or `ALL`.
- **Correlated Subquery:** inner query refers to outer query columns; runs repeatedly for each row.
- **IN Operator:** checks if a value exists in the subquery result.
- **ANY Operator:** returns true if value matches any item in subquery result.
- **ALL Operator:** returns true only if value matches all items in subquery result.
- **EXISTS Operator:** returns true if subquery returns at least one row.

### Simple Example

```sql
-- Find students with marks greater than average marks
SELECT Name, Marks FROM Student
WHERE Marks > (SELECT AVG(Marks) FROM Student);

-- Find students who enrolled in any course using IN
SELECT Name FROM Student
WHERE SID IN (SELECT DISTINCT SID FROM Enrollment);
```

### Advantages

- Breaks down complex queries into smaller, readable steps.
- Avoids the need to create temporary tables or views.
- Easy to understand and debug.

### Conclusion

- Nested queries are powerful for making dynamic comparisons and filtering records based on aggregate values of other tables.

---

## Q7. Compare Stored Procedures and Functions in PL/SQL [8 Marks]

### Introduction

- A **Stored Procedure** and a **Function** are named PL/SQL blocks stored in the database.
- Procedures execute actions, while Functions perform calculations and return values.

### Comparison Table

| Sr. No. | Feature | Stored Procedure | Function |
| :--- | :--- | :--- | :--- |
| 1 | **Return Value** | Optional (returns 0 or multiple values via OUT) | Mandatory (must return exactly one value via RETURN) |
| 2 | **Call Method** | Executed standalone using CALL or EXECUTE | Called directly inside SQL queries or PL/SQL expressions |
| 3 | **Return Type** | No return type defined in header | Return type must be defined in header |
| 4 | **SQL Queries** | Cannot be used inside SELECT or WHERE statements | Can be used inside SELECT or WHERE statements |
| 5 | **DML Operations** | Can perform DML and save/undo transactions | Restricted DML operations when called in SQL |
| 6 | **Parameters** | Supports IN, OUT, and IN OUT parameters | Supports IN parameters only (best practice) |
| 7 | **Primary Purpose** | Used to execute business logic and database tasks | Used to calculate and return computed results |
| 8 | **Header Syntax** | `CREATE PROCEDURE my_proc(...)` | `CREATE FUNCTION my_func(...) RETURN type` |

---

## Q8. Explain Cursors in PL/SQL with Example [8 Marks]

### Introduction

- A **Cursor** is a pointer to a private memory area (Context Area) used by Oracle to run SQL queries.
- It is used to retrieve, hold, and process multiple rows returned by a query one-by-one.

### Diagram

```
[SQL Query] ---> [Context Area (Memory)] ---> [Cursor Pointer] ---> [Fetch Rows 1-by-1]
```

### Key Points

- **Implicit Cursor:** created automatically by Oracle for all DML operations (INSERT, UPDATE, DELETE).
- **Explicit Cursor:** created manually by user to handle SELECT queries returning multiple rows.
- **Life Cycle - Declare:** names the cursor and defines the SELECT query.
- **Life Cycle - Open:** executes the query and allocates context memory.
- **Life Cycle - Fetch:** retrieves rows one-by-one into PL/SQL variables.
- **Life Cycle - Close:** releases context memory when processing is done.
- **%FOUND:** returns True if the last fetch was successful.
- **%NOTFOUND:** returns True if no rows are left (used to exit loops).
- **%ROWCOUNT:** returns the number of rows fetched so far.
- **%ISOPEN:** returns True if the cursor is open.

### Simple Example

```sql
DECLARE
  CURSOR c_student IS SELECT Name FROM Student;
  v_name Student.Name%TYPE;
BEGIN
  OPEN c_student;
  LOOP
    FETCH c_student INTO v_name;
    EXIT WHEN c_student%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(v_name);
  END LOOP;
  CLOSE c_student;
END;
```

### Advantages

- Allows processing of query results row-by-row in a controlled loop.
- Avoids out-of-memory errors by not fetching all rows at once.
- Gives precise control over data retrieval using attributes.

### Conclusion

- Cursors are essential for handling multi-row outputs and performing row-level logic inside database blocks.


---
