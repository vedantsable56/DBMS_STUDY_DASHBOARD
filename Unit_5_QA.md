# DBMS: Unit V — NoSQL Databases (Exam-Ready Q&A)

---

## Q1. Compare SQL and NoSQL Databases [8 Marks]

**SQL databases** store data in **tables** with a **fixed schema** and use **SQL language** for queries. **NoSQL databases** store data in **flexible formats** like documents, key-value pairs, or graphs and use **their own query methods**.

| Sr. | Feature | SQL Database | NoSQL Database |
| :--- | :--- | :--- | :--- |
| 1 | **Schema Architecture** | Strict, predefined schema (defined via DDL before insert) | Dynamic schema (schema-less / schema-on-read) |
| 2 | **Scalability Model** | Vertical scalability (scale-up: add CPU/RAM to one server) | Horizontal scalability (scale-out: partition across cluster) |
| 3 | **Query Interface** | Standardized Declarative SQL (Structured Query Language) | No standard query language (uses custom APIs or JSON queries) |
| 4 | **Data Model** | Relational tables (consisting of structured rows and columns) | Semi-structured (JSON documents, key-value, graph, column-family) |
| 5 | **Transaction Integrity** | Strict ACID properties (Atomicity, Consistency, Isolation, Durability) | BASE properties (Basically Available, Soft-state, Eventual consistency) |
| 6 | **Relational Joins** | Native SQL JOINs supported by foreign keys | Denormalized storage (embedded documents; no native JOINs) |
| 7 | **Best Used For** | Complex transactions and relational safety (e.g., Banking) | High throughput and varying data models (e.g., Social Media) |
| 8 | **Examples** | MySQL, PostgreSQL, Oracle, MS SQL Server | MongoDB, Redis, Apache Cassandra, Neo4j |

---

## Q2. Explain Different NoSQL Data Models with Examples [8 Marks]

NoSQL databases store data in **four main models**: **Key-Value**, **Document**, **Column-Family**, and **Graph**.
Each model is designed for a **specific type of problem**; choosing depends on data and use case.

**Key-Value Model:**

```
+----------+--------------------+
| Key      | Value              |
+----------+--------------------+
| user:101 | {"name": "Amit"}   |
| user:102 | {"name": "Priya"}  |
+----------+--------------------+
```

- Stores **simple key-value pairs** like a dictionary or hashmap.
- Every key is **unique**; value can be string, number, or JSON.
- It is the **fastest model** for simple read and write tasks.
- No support for **complex queries** or searching inside values.
- **Use case:** caching, session storage, shopping cart data.
- **Examples:** **Redis**, **DynamoDB**, **Riak**.

**Document Model:**

```
+------------------------------+
| { "_id": 101,                |
|   "name": "Amit",            |
|   "skills": ["Java","DBMS"] }|
+------------------------------+
```

- Stores data as **JSON/BSON documents** with nested fields and arrays.
- Each document can have **different fields** — no fixed schema needed.
- Can **query on any field** inside the document easily.
- Related data is stored **together** inside one document — no JOINs.
- **Use case:** content management, user profiles, product catalogs.
- **Examples:** **MongoDB**, **CouchDB**.

**Column-Family Model:**

```
RowKey: student:101
+-----------------+----------------+
| Name: "Amit"    | Branch: "Comp" |
+-----------------+----------------+
  Each row can have DIFFERENT columns
```

- Stores data in **column families**; each row can have **different columns**.
- Data stored **column-wise on disk** — very fast for reading large data.
- Empty columns **don't waste space**; only filled columns are stored.
- Good for **write-heavy** workloads with billions of rows.
- **Use case:** log storage, analytics, time-series data.
- **Examples:** **Cassandra**, **HBase**.

**Graph Model:**

```
(Amit) --FRIENDS_WITH--> (Priya)
  |                        |
LIKES                   STUDIES
  v                        v
(MongoDB)              (DBMS)
```

- Stores data as **nodes** (entities) and **edges** (relationships).
- Each node and edge can have **properties** (like name, weight).
- Relationships are stored **directly** — no need to compute JOINs.
- Very fast for finding **paths, connections, and patterns** in data.
- **Use case:** social networks, fraud detection, recommendation engines.
- **Examples:** **Neo4j**, **Amazon Neptune**.

---

## Q3. Explain CAP Theorem and BASE Properties [8 Marks]

**CAP Theorem** (Eric Brewer, 2000) says a distributed database can guarantee **only 2 out of 3**: Consistency, Availability, Partition Tolerance.
**BASE Properties** are rules followed by NoSQL databases — the **opposite of ACID**.

```
        Consistency (C)
             /\
            /  \
           / CP \
          /      \
         / CAP    \
        / Theorem  \
       /  CA    AP  \
      /_____________\
Availability (A)   Partition Tolerance (P)
```

**Consistency (C):**

- Every read gets the **latest written data** from the database.
- All nodes show the **same data at the same time** after a write.
- If data is being updated, system **waits** until update is complete.
- No **stale or old data** is returned to any user.
- Important for **banking and payment** systems where data must be correct.
- Makes system **slower** because all nodes must agree before responding.

**Availability (A):**

- Every request gets a **response** — system never refuses any query.
- System stays **running 24/7** even if some servers are slow or busy.
- Response may contain **slightly old data** but always gives a reply.
- No user ever gets an **error or timeout** message.
- Important for **social media and e-commerce** where uptime matters most.
- Makes system **faster** but may show different data on different nodes.

**Partition Tolerance (P):**

- System keeps working even if **network between servers breaks**.
- Messages between nodes may be **lost or delayed** during partition.
- In real systems, **network failures always happen** — P is always needed.
- System must **handle split-brain** situations when servers can't talk.
- The real choice is always between **CP or AP** (since P is required).
- Without P, system works only on a **single server** (not distributed).

**CP/AP/CA Examples:**
- **CP** (Consistency + Partition Tolerance): MongoDB, Redis, HBase
- **AP** (Availability + Partition Tolerance): Cassandra, CouchDB, DynamoDB
- **CA** (Consistency + Availability): MySQL, PostgreSQL (single server only)

**BASE Properties:**

- **BA (Basically Available):** system is **always available** for requests.
- **S (Soft State):** data may **change over time** without user doing anything.
- **E (Eventually Consistent):** all copies of data will **match after some time**.
- BASE focuses on **availability and speed** instead of strict correctness.
- NoSQL databases like **Cassandra and DynamoDB** follow BASE model.
- BASE allows the system to handle **millions of users** without slowing down.

**ACID vs BASE Comparison:**

| Sr. | Feature | ACID Model (SQL) | BASE Model (NoSQL) |
| :--- | :--- | :--- | :--- |
| 1 | **Definition** | Atomicity, Consistency, Isolation, Durability | Basically Available, Soft-state, Eventually Consistent |
| 2 | **Consistency** | Strong Consistency (all nodes see identical state immediately) | Eventual Consistency (replicas sync asynchronously over time) |
| 3 | **Availability** | Prioritizes consistency over availability (stalls on failure) | Prioritizes availability over consistency (operational on failure) |
| 4 | **Data State** | Consistent (transitions synchronously between defined states) | Soft-state (data state changes dynamically in background) |
| 5 | **Design Focus** | High database safety and strict correctness | High availability and horizontal scaling |
| 6 | **Transaction Scope** | Multi-row distributed transactions supported | Single-key or single-document transactions only |
| 7 | **Scalability** | Vertical scaling (scale-up: adding hardware resources) | Horizontal scaling (scale-out: data sharding and replica sets) |
| 8 | **Best Used For** | Financial transactions, checkout payments, medical records | Social feeds, shopping carts, activity logs, web page views |

---

## Q4. Explain MongoDB CRUD Operations with Examples [8 Marks]

**CRUD** stands for **Create, Read, Update, Delete** — the four basic database operations in MongoDB.
MongoDB performs CRUD on **collections** using documents in **JSON/BSON format**.

**insertOne / insertMany (CREATE):**

- **insertOne()** adds **one document** to the collection at a time.
- **insertMany()** adds **multiple documents** at once using an array.
- MongoDB **auto-generates** a unique `_id` field for each document.
- Returns **acknowledged: true** and the inserted document's `_id`.
- Documents don't need to have the **same fields** — schema is flexible.
- If `_id` is **duplicate**, MongoDB throws an error and stops insertion.

```javascript
// Insert one document
db.students.insertOne({
  name: "Amit Kumar", branch: "Comp", marks: 85
})

// Insert multiple documents
db.students.insertMany([
  { name: "Priya Patil", branch: "IT", marks: 92 },
  { name: "Rahul Shah", branch: "Comp", marks: 78 }
])
```

**find (READ):**

- **find()** returns **all documents** that match the given condition.
- **findOne()** returns only the **first matching** document.
- Use **find({})** with empty braces to get **all documents** in collection.
- Supports **operators** like `gt`, `lt`, `$in` for advanced filtering.
- Use **.pretty()** to format the output in a readable way.
- Returns a **cursor** that points to the result documents one by one.

```javascript
// Find all Comp branch students
db.students.find({ branch: "Comp" })

// Find students with marks greater than 80
db.students.find({ marks: { $gt: 80 } })

// Find only first match
db.students.findOne({ name: "Amit Kumar" })
```

**updateOne / updateMany (UPDATE):**

- **updateOne()** updates the **first document** that matches the filter.
- **updateMany()** updates **all documents** that match the filter.
- **$set** operator **changes** a field's value to a new value.
- **$inc** operator **adds** a number to the existing field value.
- Returns **matchedCount** and **modifiedCount** to show how many changed.
- If the field doesn't exist, **$set creates** it automatically.

```javascript
// Update one student's marks
db.students.updateOne(
  { name: "Amit Kumar" },
  { $set: { marks: 90 } }
)

// Add 5 marks to all Comp students
db.students.updateMany(
  { branch: "Comp" },
  { $inc: { marks: 5 } }
)
```

**deleteOne / deleteMany (DELETE):**

- **deleteOne()** removes the **first document** matching the filter.
- **deleteMany()** removes **all documents** matching the filter.
- Use **deleteMany({})** with empty braces to **delete all** documents.
- Returns **deletedCount** showing how many documents were removed.
- Deleted documents **cannot be recovered** — no undo option.
- Always use a **filter** carefully to avoid deleting wrong documents.

```javascript
// Delete one student
db.students.deleteOne({ name: "Rahul Shah" })

// Delete all Comp branch students
db.students.deleteMany({ branch: "Comp" })

// Delete ALL documents in collection
db.students.deleteMany({})
```

---

## Q5. Explain MongoDB Indexing [8 Marks]

## Easy Understanding

Imagine a college has 10,000 student records.

If you want to find **Amit**, the database can:

### Without Index

Search every record one by one.

```text
Student 1
Student 2
Student 3
...
Student 10000
```

❌ Slow

---

### With Index

Like a book's index.

```text
A → Page 5
B → Page 12
C → Page 20
```

Database directly jumps to the required record.

✅ Fast

---

## What is Indexing?

**Indexing is a technique used to improve the speed of data retrieval operations.**

An index stores the values of selected fields in a special data structure so MongoDB can quickly locate documents.

---

## Example

Student Collection:

```json
{
 "roll":101,
 "name":"Amit",
 "branch":"Comp"
}
```

Create index on name field:

```javascript
db.students.createIndex({name:1})
```

Here:
- 1 → Ascending order
- -1 → Descending order

---

## Advantages of Indexing

### 1. Faster Searching
Records can be found quickly.

### 2. Faster Sorting
Sorting operations become efficient.

### 3. Better Query Performance
Less time required to execute queries.

### 4. Reduced Disk Access
Database reads fewer records.

### 5. Useful for Large Databases
Very effective when millions of documents exist.

---

## Types of Indexes

### Single Field Index

```javascript
db.students.createIndex({name:1})
```

Index on one field.

---

### Compound Index

```javascript
db.students.createIndex({
 branch:1,
 marks:-1
})
```

Index on multiple fields.

---

### Text Index

```javascript
db.students.createIndex({name:"text"})
```

Used for text searching.

---

### Unique Index

```javascript
db.students.createIndex(
 {roll:1},
 {unique:true}
)
```

Prevents duplicate values.

---

## Exam Answer

### MongoDB Indexing

MongoDB Indexing is a technique used to improve the speed of data retrieval. An index stores selected field values in a separate structure, allowing MongoDB to locate documents quickly without scanning the entire collection.

### Advantages
1. Faster searching.
2. Faster sorting.
3. Improved query performance.
4. Reduced disk access.
5. Efficient for large datasets.

### Types of Indexes
1. Single Field Index
2. Compound Index
3. Text Index
4. Unique Index

### Example

```javascript
db.students.createIndex({name:1})
```

Thus, indexing significantly improves the performance of MongoDB queries.

---

## Q6. Explain MongoDB Aggregation with Example [8 Marks]

## Easy Understanding

Suppose a teacher asks:

> "Find the average marks of all students."

You don't want all student records.

You want a **summary**.

This process is called **Aggregation**.

---

## What is Aggregation?

Aggregation is the process of performing calculations on multiple documents and returning summarized results.

Examples:
- Total marks
- Average marks
- Maximum marks
- Number of students

---

## Example Collection

```json
[
 {"name":"Amit","branch":"Comp","marks":80},
 {"name":"Priya","branch":"Comp","marks":90},
 {"name":"Rahul","branch":"IT","marks":70}
]
```

---

## Aggregation Pipeline

MongoDB processes data in stages.

```text
Documents
    ↓
  Match
    ↓
  Group
    ↓
   Sort
    ↓
 Result
```

---

## Important Stages

### 1. $match

Filters documents.

```javascript
{
 $match:{branch:"Comp"}
}
```

Only Comp students selected.

---

### 2. $group

Groups documents and performs calculations.

```javascript
{
 $group:{
   _id:"$branch",
   avgMarks:{avg:"marks"}
 }
}
```

Calculates average marks.

---

### 3. $sort

Sorts output.

```javascript
{
 $sort:{avgMarks:-1}
}
```

Descending order.

---

### 4. $project

Selects required fields.

```javascript
{
 $project:{
   branch:1,
   avgMarks:1
 }
}
```

---

## Complete Example

Find average marks branch-wise.

```javascript
db.students.aggregate([
 {
   $group:{
     _id:"$branch",
     averageMarks:{
       avg:"marks"
     }
   }
 }
])
```

Output:

```text
Comp → 85
IT   → 70
```

---

## Advantages of Aggregation

1. Data summarization.
2. Faster reporting.
3. Reduces application workload.
4. Supports complex analysis.
5. Useful for business intelligence.

---

## Exam Answer

### MongoDB Aggregation

Aggregation is a process used to perform calculations on multiple documents and return summarized results. MongoDB uses an Aggregation Pipeline where data passes through multiple stages.

### Common Stages
1. `$match` – Filters documents.
2. `$group` – Groups documents and performs calculations.
3. `$sort` – Sorts results.
4. `$project` – Selects required fields.

### Example

```javascript
db.students.aggregate([
{
 $group:{
   _id:"$branch",
   avgMarks:{avg:"marks"}
 }
}
])
```

### Advantages
- Data summarization.
- Better reporting.
- Fast analysis.
- Reduced processing load.

Thus, aggregation helps in generating meaningful insights from large datasets.

---
