# DBMS Unit IV — Database Transactions (Exam-Ready SPPU Answers)

---

## Q1. Explain Transaction Concept, ACID Properties, and Transaction States (8 Marks)

A **transaction** is a set of Read/Write operations treated as **one unit of work** — either all happen or none.
Every transaction must follow **ACID properties** and passes through states like Active, Committed, or Aborted.

```
  +--------+        +---------------------+        +-----------+
  | ACTIVE | -----> | PARTIALLY COMMITTED | -----> | COMMITTED |
  +--------+        +---------------------+        +-----------+
      |                      |
      v                      v
  +--------+            +---------+
  | FAILED | ---------> | ABORTED |
  +--------+            +---------+
```

**Atomicity** — All or nothing rule for transactions:
- Transaction must **complete fully** or **not execute at all**
- If any step **fails**, all previous steps are **rolled back**
- **Transaction Manager** is responsible for handling atomicity
- Uses **undo log** to reverse incomplete operations after crash
- Partial updates are **never visible** to other transactions
- Ensures database is **never left** in a half-done state

**Consistency** — Database stays correct before and after:
- Database moves from one **valid state** to another valid state
- All **constraints, rules, and triggers** must be satisfied after commit
- If a transaction **breaks any rule**, it is rolled back
- Example: **total balance** must remain same after money transfer
- **Integrity constraints** like primary key, foreign key are checked
- Application-level rules are also part of **consistency checking**

**Isolation** — Concurrent transactions don't disturb each other:
- Each transaction runs as if it is the **only one** in the system
- **Uncommitted data** is hidden from other running transactions
- **Concurrency Control Manager** handles isolation using locks
- Prevents problems like **dirty read, lost update, phantom read**
- Multiple **isolation levels** exist: Read Committed, Serializable, etc.
- Without isolation, **wrong results** can occur in multi-user systems

**Durability** — Committed changes are permanent:
- Once a transaction is **committed**, changes survive any crash
- **Recovery Manager** ensures durability using logs and backups
- Data is written to **non-volatile storage** (hard disk) on commit
- Even **power failure** or system crash cannot undo committed data
- Uses **write-ahead logging (WAL)** to record changes before applying
- Database can **recover** to last committed state after any failure

**Transaction States:**

| State | Meaning |
|:------|:--------|
| **Active** | Transaction is currently running its operations |
| **Partially Committed** | Last operation done, but not yet saved to disk |
| **Failed** | Error occurred, transaction cannot continue |
| **Aborted** | Rolled back completely, database restored |
| **Committed** | All changes saved permanently to disk |

**Example:** Transfer ₹500 from A (₹1000) to B (₹200). After commit: A = ₹500, B = ₹700, total unchanged (₹1200).
If crash after writing A, atomicity rolls back A to ₹1000. Isolation hides intermediate values from others.

---

## Q2. Explain Conflict Serializability with Precedence Graph (8 Marks)

A schedule is **conflict serializable** if it produces the **same result** as some serial schedule.
We test this using a **precedence graph** — if the graph has **no cycle**, the schedule is conflict serializable.

- Two operations **conflict** when they are from **different transactions** on the **same data item**
- At least **one of the two operations** must be a **Write** operation
- **Read-Read** on the same item is **never a conflict**
- **Read-Write (R-W)** conflict: one reads, other writes the **same item**
- **Write-Read (W-R)** conflict: one writes, other reads the **same item**
- **Write-Write (W-W)** conflict: both write to the **same item**
- **Precedence graph** has one **node per transaction** (T1, T2, T3...)
- For each conflict, draw **edge from earlier** transaction to later one
- If graph has **no cycle**, schedule is **conflict serializable**
- If graph has a **cycle**, schedule is **not conflict serializable**
- Use **topological sort** on cycle-free graph to find serial order

**Full Worked Example:**

**Given Schedule S:**

| Time | T1       | T2       |
|:-----|:---------|:---------|
| t1   | Read(A)  |          |
| t2   |          | Read(A)  |
| t3   | Write(A) |          |
| t4   |          | Write(A) |
| t5   | Read(B)  |          |
| t6   |          | Write(B) |

**Step 1**: Draw nodes → T1 and T2.

**Step 2**: Find all conflicts on each data item:

*Conflicts on item A:*
- T1:Read(A) at t1 vs T2:Write(A) at t4 → **R-W conflict** → T1 comes first → Edge: **T1 → T2**
- T2:Read(A) at t2 vs T1:Write(A) at t3 → **R-W conflict** → T2 comes first → Edge: **T2 → T1**
- T1:Write(A) at t3 vs T2:Write(A) at t4 → **W-W conflict** → T1 comes first → Edge: **T1 → T2** (already exists)

*Conflicts on item B:*
- T1:Read(B) at t5 vs T2:Write(B) at t6 → **R-W conflict** → T1 comes first → Edge: **T1 → T2** (already exists)

**Step 3**: Draw the precedence graph:

```
   +------+                        +------+
   |  T1  | -----(T1 → T2)------> |  T2  |
   |      | <----(T2 → T1)------- |      |
   +------+                        +------+
```

**Step 4**: Check for cycle → T1 → T2 → T1 → ... **CYCLE EXISTS!**

**Result**: Schedule S is **NOT conflict serializable** ✗

> **Note**: If there was no edge from T2 → T1, the graph would have no cycle, and the serial order would be T1 followed by T2.

---

## Q3. Explain Two-Phase Locking (2PL) Protocol — Basic, Strict, and Rigorous (8 Marks)

**Two-Phase Locking (2PL)** controls concurrent data access to ensure conflict serializability.
Every transaction has a **Growing Phase** (acquire locks) and a **Shrinking Phase** (release locks) — once a lock is released, **no new locks** can be taken.

```
  Locks
    ^        * (Lock Point)
    |       / \
    |      /   \
    |     /     \
    +----+-------+----> Time
     GROWING  SHRINKING
    (acquire) (release)
```

**Shared Lock (S-lock)** — Read-only lock:
- Allows the transaction to **read** a data item but **not write**
- **Multiple transactions** can hold S-lock on the same item together
- Also called **Read Lock** because only reading is allowed
- S-lock **does not block** other S-lock requests on same item
- S-lock **blocks** any X-lock request until it is released
- Transaction must **upgrade S to X** if it wants to write later

**Exclusive Lock (X-lock)** — Read and write lock:
- Allows the transaction to both **read and write** a data item
- **Only one transaction** can hold X-lock on an item at a time
- Also called **Write Lock** because writing is the main purpose
- X-lock **blocks both** S-lock and X-lock requests from others
- All other transactions must **wait** until X-lock is released
- Needed for any **UPDATE, DELETE, or INSERT** operation on data

**Growing Phase** — Only acquire locks:
- Transaction can **request new locks** (both S-lock and X-lock)
- Transaction **cannot release** any lock during this phase
- Number of locks **keeps increasing** throughout this phase
- Transaction can **upgrade** S-lock to X-lock in this phase
- Phase ends when **first lock is released** (lock point reached)
- All data items needed must be **locked before** shrinking starts

**Shrinking Phase** — Only release locks:
- Transaction can **only release** locks, cannot request new ones
- Number of locks **keeps decreasing** throughout this phase
- Transaction **cannot upgrade** any lock in this phase
- Once this phase starts, **no new data item** can be accessed
- Phase ends when **all locks are released** or transaction commits
- **Lock point** is the boundary between growing and shrinking

**Lock Compatibility Table:**

| | Shared (S) | Exclusive (X) |
|:---|:---:|:---:|
| **Shared (S)** | ✓ Yes | ✗ No |
| **Exclusive (X)** | ✗ No | ✗ No |

| Sr. No. | Feature | Basic 2PL | Strict 2PL | Rigorous 2PL |
|:--------|:--------|:----------|:-----------|:-------------|
| 1 | **Lock Taking** | Growing phase | Growing phase | Growing phase |
| 2 | **X-Lock Release** | Shrinking phase | Released at commit | Released at commit |
| 3 | **S-Lock Release** | Shrinking phase | Shrinking phase | Released at commit |
| 4 | **Cascading Rollback** | Possible | Prevented | Prevented |
| 5 | **Deadlock** | Possible | Possible | Possible |
| 6 | **Speed / Concurrency** | High | Medium | Low |
| 7 | **Lock Point** | First lock released | At commit | At commit |
| 8 | **Use Case** | Rarely used | Standard DB engines | High safety systems |

---

## Q4. Explain Deadlock Handling — Prevention, Detection, and Recovery (8 Marks)

A **deadlock** occurs when two or more transactions are **waiting for each other's locks** in a circular chain.
Databases handle deadlocks via **Prevention** (timestamp-based), **Detection** (Wait-For Graph), and **Recovery** (victim rollback).

```
  +----+   waits for   +----+
  | T1 | ------------> | T2 |
  |    | <------------ |    |
  +----+   waits for   +----+
  Cycle: T1 -> T2 -> T1 = DEADLOCK!
```

**Deadlock Prevention (Wait-Die)** — Non-preemptive scheme:
- Each transaction gets a **timestamp** when it starts (older = higher priority)
- If **older** transaction requests lock held by younger, older **waits**
- If **younger** transaction requests lock held by older, younger **dies** (aborts)
- Only the **older transaction** is allowed to wait for a lock
- Younger transaction is **restarted** with its **original timestamp**
- Prevents deadlock because **circular wait** can never form

**Deadlock Prevention (Wound-Wait)** — Preemptive scheme:
- Also uses **timestamps** to decide who waits and who aborts
- If **older** transaction requests lock held by younger, older **wounds** younger (forces abort)
- If **younger** transaction requests lock held by older, younger **waits**
- Only the **younger transaction** is allowed to wait for a lock
- Wounded transaction is **restarted** with its **original timestamp**
- Results in **fewer aborts** than Wait-Die because waiting is preferred

**Deadlock Detection (Wait-For Graph)** — Find and fix deadlocks:
- System builds a **Wait-For Graph (WFG)** at regular time gaps
- Each **node** in the graph is a transaction (T1, T2, T3...)
- **Edge from Ti to Tj** means Ti is waiting for Tj's lock
- If a **cycle is found** in the graph, deadlock exists
- If **no cycle** is found, the system is running safely
- WFG is checked **every few seconds** or after set number of waits

**Deadlock Recovery** — Fix the deadlock after detection:
- System must pick a **victim** transaction to abort and rollback
- Victim is chosen based on **least work done** or fewest locks held
- **Total rollback** aborts victim fully and restarts from beginning
- **Partial rollback** rolls back victim to a **savepoint** only
- Aborted transaction is **restarted** after other transactions finish
- System tracks **abort count** per transaction to prevent starvation

**Comparison — Wait-Die vs Wound-Wait:**

| Sr. No. | Feature | Wait-Die | Wound-Wait |
|:--------|:--------|:---------|:-----------|
| 1 | **Type** | Non-preemptive | Preemptive |
| 2 | **Older Requests Younger** | Waits | Wounds (aborts younger) |
| 3 | **Younger Requests Older** | Dies (aborts itself) | Waits |
| 4 | **Who Aborts?** | Younger requesting | Younger holding |
| 5 | **Number of Aborts** | Higher | Lower |
| 6 | **Wasted Work** | More | Less |
| 7 | **Starvation** | Avoided (keeps timestamp) | Avoided (keeps timestamp) |
| 8 | **Best Used When** | Short transactions | Long transactions |

---

## Q5. Explain Database Schedules and Their Types [8 Marks]

### Introduction

- A **Schedule** is the chronological execution order of operations from multiple concurrent transactions.
- Schedules ensure that transactions run concurrently without violating database consistency.

### Diagram

```
                     SCHEDULES
                    /         \
               Serial       Non-Serial
                                 \
                            Serializable
```

### Key Points

- **Serial Schedule:** transactions run one after another; no interleaving of operations. Always consistent but slow.
- **Non-Serial Schedule:** operations of different transactions interleave. Faster but can cause inconsistencies.
- **Serializable Schedule:** a non-serial schedule equivalent to some serial execution.
- **Conflict Equivalence:** two schedules are equivalent if they have same transactions and same order of conflicting operations.
- **Conflict Serializability:** a schedule is conflict serializable if it is conflict equivalent to some serial schedule.
- **Conflicting Operations:** two operations conflict if they belong to different transactions, access same item, and at least one is a Write.

### Simple Example

```
Serial Schedule S1:          Non-Serial Schedule S2:
  T1          T2               T1          T2
Read(A)                      Read(A)
Write(A)                                  Read(A)
            Read(A)          Write(A)
            Write(A)                      Write(A)
```

### Advantages

- Maximizes CPU utilization and database throughput.
- Minimizes wait times for users running queries.
- Guarantees correct final database state.

### Conclusion

- Schedules help manage transaction orders, and serializability guarantees correct execution without concurrency issues.

---

## Q6. Explain View Serializability with Example [8 Marks]

### Introduction

- **View Serializability** is a way to check if a non-serial schedule is consistent.
- A schedule is view serializable if it is **view equivalent** to some serial schedule.

### Diagram

```
[Non-Serial Schedule S] --(View Equivalent?)--> [Serial Schedule S']
```

### Key Points

- **Initial Read:** if T1 reads initial value of A in S, it must read initial value of A in S'.
- **Write-Read Dependency:** if T1 writes A and T2 reads that value in S, T1 must write and T2 must read in S'.
- **Final Write:** if T1 performs final write on A in S, T1 must perform final write in S'.
- **Blind Writes:** writing to a data item without reading it first.
- **Relation to Conflict Serializability:** every conflict serializable schedule is view serializable, but not vice versa.
- **Complexity:** checking view serializability is NP-complete (requires testing all serial permutations).

### Simple Example

Consider a schedule S with blind writes (no reads):
```
  T1          T2          T3
Write(A)
            Write(A)
                        Write(A)
```
- Initial reads: None.
- Write-read dependencies: None.
- Final writer of A: T3.
- In serial schedule T1 -> T2 -> T3, the final writer is also T3.
- Thus, S is view equivalent to T1 -> T2 -> T3, making it view serializable.

### Advantages

- More flexible than conflict serializability by allowing more concurrent schedules.
- Correctly handles transactions containing blind writes.
- Guarantees database state remains consistent.

### Conclusion

- View serializability provides a broader definition of consistency by focusing on data flow correctness rather than conflict ordering.

---

## Q7. Explain Recoverable and Cascadeless Schedules with Examples [8 Marks]

### Introduction

- A **Recoverable Schedule** ensures that if a transaction fails, it can rollback without leaving committed transactions invalid.
- A **Cascadeless Schedule** prevents the abort of one transaction from causing a chain-reaction abort of others.

### Diagram

```
[T1 Write(A)] ---> [T2 Read(A)] ---> [T1 Rollback] ---> [T2 must Rollback (Cascading)]
```

### Key Points

- **Dirty Read:** reading data written by an uncommitted transaction.
- **Unrecoverable Schedule:** T2 reads uncommitted data from T1, commits, and then T1 aborts. T2 cannot be rolled back now.
- **Recoverable Schedule Rule:** T2 can commit only after the transaction T1 from which it read has committed.
- **Cascading Rollback:** aborting one transaction forces multiple uncommitted transactions to abort, wasting CPU work.
- **Cascadeless Schedule Rule:** transactions can only read data written by already committed transactions (no dirty reads).
- **Relationship:** every cascadeless schedule is automatically a recoverable schedule.

### Simple Example

```
Non-Cascadeless (Cascading):
  T1          T2
Write(A)
            Read(A)  <-- Dirty Read
            Commit
Commit (or Rollback T1 -> forces T2 rollback)

Cascadeless Schedule:
  T1          T2
Write(A)
Commit
            Read(A)  <-- Safe Read (Committed Data)
            Commit
```

### Advantages

- Prevents dirty reads and data loss.
- Avoids cascading rollbacks, saving system performance.
- Simplifies transaction recovery manager tasks.

### Conclusion

- Cascadeless schedules are the standard in modern database engines to ensure transaction recovery is simple and fast.

---
