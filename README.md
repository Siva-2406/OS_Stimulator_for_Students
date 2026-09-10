# OSLabX — Virtual Operating System Laboratory & Resource Management Simulator

> A web-based virtual Operating System laboratory that helps students **learn, simulate, visualize, experiment with, and understand Operating System concepts** through interactive simulations.

## 📌 Project Overview

**OSLabX** is an educational web application designed to make Operating System concepts easier to understand through practical, visual, and interactive experiments.

Traditional OS learning often depends on textbooks, static diagrams, classroom explanations, and manually calculated examples. These approaches can make topics such as CPU scheduling, synchronization, deadlocks, paging, memory allocation, file systems, and disk scheduling difficult to visualize.

OSLabX addresses this gap by providing a virtual laboratory where students can enter experiment parameters, select an algorithm, run simulations, observe visualizations, inspect calculated results, and save their experiments for later review.

The project combines an interactive React frontend with **Zoho Catalyst** backend services for authentication, APIs, persistence, user progress, experiment history, and result management.

## 🎯 Objectives

- Make Operating System concepts practical and easier to understand.
- Provide interactive simulations instead of only theoretical explanations.
- Visualize algorithms using timelines, charts, tables, and step-by-step execution.
- Allow students to experiment with different inputs and compare algorithms.
- Provide a safe virtual Linux command laboratory without exposing the real system shell.
- Save experiments and results for future reference.
- Track student learning progress across OS laboratory modules.
- Build a deployable, portfolio-ready academic project using modern web technologies.

## ✨ Key Features

### 1. OS Fundamentals
- Introduction to Operating Systems
- OS services and system components
- System calls and OS structures
- Kernel and user-space concepts
- Basic OS learning resources

### 2. Process Management
- Process creation concepts
- Process states
- Process Control Block (PCB) visualization
- Process state transitions
- Context switching concepts
- Process lifecycle simulation

### 3. CPU Scheduling Simulator
Interactive simulation of major scheduling algorithms:

- First Come First Serve (FCFS)
- Shortest Job First (SJF)
- Shortest Remaining Time First (SRTF)
- Priority Scheduling
- Round Robin
- Preemptive and non-preemptive scheduling

Expected outputs include:

- Gantt Chart
- Completion Time
- Turnaround Time
- Waiting Time
- Response Time
- Average Waiting Time
- Average Turnaround Time
- Algorithm comparison

### 4. Threads
- Thread concepts
- User-level and kernel-level thread concepts
- Thread lifecycle
- Multithreading visualization

### 5. Process Synchronization
- Critical section problem
- Race condition demonstration
- Mutex concepts
- Semaphores
- Producer–Consumer problem
- Reader–Writer problem
- Synchronization visualization

### 6. Deadlock Laboratory
- Deadlock conditions
- Resource Allocation Graph
- Deadlock detection
- Deadlock avoidance concepts
- Banker's Algorithm
- Safe and unsafe state visualization

### 7. Memory Management
- Contiguous memory allocation
- First Fit
- Best Fit
- Worst Fit
- Memory partition visualization
- Fragmentation analysis

### 8. Paging
- Page and frame concepts
- Page table visualization
- Logical-to-physical address translation
- Page allocation simulation

### 9. Page Replacement
Simulation and comparison of:

- FIFO
- LRU
- Optimal

Results can include:

- Page hits
- Page faults
- Hit ratio
- Fault ratio
- Replacement sequence

### 10. File Systems
- File concepts
- File attributes
- File operations
- Directory structures
- File allocation methods
- Free-space management

### 11. Directory Structure
Visual exploration of:

- Single-level directories
- Two-level directories
- Tree-structured directories
- Acyclic graph concepts

### 12. File Allocation
Simulation of:

- Contiguous allocation
- Linked allocation
- Indexed allocation

### 13. Free Space Management
- Bitmaps
- Linked lists
- Free-block tracking
- Space utilization visualization

### 14. Mass Storage & Disk Scheduling
Interactive disk scheduling simulations:

- FCFS
- SSTF
- SCAN
- C-SCAN
- LOOK
- C-LOOK

Outputs include:

- Disk head movement visualization
- Total head movement
- Seek sequence
- Algorithm comparison

### 15. Linux / Unix Command Laboratory
A **safe virtual command laboratory** for practicing common Linux/Unix concepts.

Examples include:

- `pwd`
- `ls`
- `cd`
- `mkdir`
- `touch`
- `cat`
- `cp`
- `mv`
- `rm`
- `echo`
- `whoami`
- `clear`

Commands are simulated inside the application rather than executed as unrestricted commands on the host operating system.

### 16. Mobile Operating Systems
- Mobile OS architecture
- Android concepts
- iOS concepts
- Mobile resource management
- Power and battery management
- Mobile security concepts

### 17. Experiment History & Progress
Students can:

- Save experiments
- View previous experiments
- Review simulation results
- Track completed modules
- Monitor learning progress
- Revisit previous inputs and results

## 🔄 Standard Experiment Workflow

Every major simulator follows a consistent learning workflow:

```text
Select Module
     ↓
Read Concept / Instructions
     ↓
Enter Experiment Input
     ↓
Select Algorithm
     ↓
Run Simulation
     ↓
Visualize Execution
     ↓
View Results & Metrics
     ↓
Compare / Analyze
     ↓
Save Experiment
```

This common workflow keeps the application easy to learn and consistent across all OS laboratory modules.

## 🏗️ System Architecture

OSLabX follows a **hybrid client-server architecture**.

```text
                         ┌─────────────────────────┐
                         │        Student           │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │   React + Vite Frontend  │
                         │   UI / Simulations /     │
                         │   Visualizations         │
                         └────────────┬────────────┘
                                      │ REST APIs
                                      ▼
                         ┌─────────────────────────┐
                         │      Zoho Catalyst       │
                         │ Serverless Functions     │
                         │ Authentication / APIs    │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │   Catalyst Data Store    │
                         │ Users / Experiments /    │
                         │ Progress / Results      │
                         └─────────────────────────┘
```

### Why a Hybrid Architecture?

OS algorithm simulations are primarily executed on the client side so that students receive fast, interactive visual feedback without unnecessary server requests.

Zoho Catalyst is used for backend responsibilities such as:

- Authentication
- User profiles
- Experiment persistence
- Saved results
- Progress tracking
- Experiment history
- REST APIs
- Server-side validation where required

## 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Language | JavaScript |
| Styling | CSS |
| Charts & Visualization | Recharts |
| Backend | Zoho Catalyst |
| Backend Runtime | Node.js |
| Backend Logic | Catalyst Serverless Functions |
| API | REST APIs |
| Database | Zoho Catalyst Data Store |
| Authentication | Zoho Catalyst Authentication |
| Version Control | Git |
| Repository | GitHub |
| Development Environment | VS Code |
| Deployment | Zoho Catalyst |

## 📁 Planned Project Structure

```text
OS_Stimulator_for_Students/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── modules/
│       ├── algorithms/
│       ├── services/
│       ├── hooks/
│       ├── utils/
│       ├── context/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── functions/
│   │   ├── auth/
│   │   ├── experiments/
│   │   ├── progress/
│   │   └── users/
│   └── api/
│
├── docs/
├── tests/
├── README.md
├── .gitignore
├── LICENSE
└── package.json
```

> This is the planned architecture. Files and folders will be added incrementally during development and tested before moving to the next phase.

## 🧩 Core Architecture Principles

### Separation of UI and Algorithms

Algorithm implementations are kept separate from React components. For example:

```text
src/algorithms/scheduling/fcfs.js
src/algorithms/scheduling/sjf.js
src/algorithms/scheduling/roundRobin.js
```

This makes algorithms easier to test, maintain, reuse, and compare.

### Consistent Module Design

Each simulator is designed around:

```text
Input → Algorithm → Simulation → Visualization → Results → Save
```

### Safe Linux Laboratory

The Linux module is designed as a controlled educational simulator. It does not provide an unrestricted terminal capable of executing arbitrary host commands.

### Progressive Development

Each feature will be developed, tested, committed, and verified before moving to the next major feature.

## 🗄️ Planned Data Model

The application will use Zoho Catalyst Data Store for persistent application data.

### Users / Profiles

Stores application-specific user information and learning profile data.

### Experiments

Stores saved experiment configurations such as:

- User
- Module
- Algorithm
- Input data
- Experiment name
- Created date

### Results

Stores calculated experiment results and relevant metrics.

### Progress

Stores module completion and learning progress information.

## 🔌 Planned API Areas

The backend API will be organized around major application responsibilities.

```text
/api/users
/api/experiments
/api/experiments/:id
/api/progress
/api/results
```

Typical operations will include creating, retrieving, updating, and deleting saved experiments where appropriate, along with retrieving and updating user progress.

Exact Catalyst function implementation and API contracts will be finalized during the backend development phase.

## 🧪 Testing Strategy

OSLabX follows a three-level testing approach.

### Level 1 — Algorithm Testing

Verify calculations independently using known test cases.

Example:

- FCFS waiting time
- Round Robin time quantum handling
- Page replacement fault count
- Disk head movement
- Memory allocation results

### Level 2 — UI Testing

Verify that:

- Inputs work correctly.
- Buttons perform expected actions.
- Charts render correctly.
- Results are displayed accurately.
- Invalid inputs are handled properly.

### Level 3 — Integration Testing

Verify the complete workflow:

```text
Login
  ↓
Open Module
  ↓
Run Experiment
  ↓
View Result
  ↓
Save Experiment
  ↓
Reload
  ↓
Verify Saved Data
```

A major feature should only be considered complete after its relevant tests pass.

## 🚀 Development Roadmap

- [x] Phase 1 — Planning & Architecture
- [x] Phase 2 — GitHub Repository & Project Documentation Foundation
- [ ] Phase 3 — React + Vite Frontend Setup
- [ ] Phase 4 — UI / Dashboard
- [ ] Phase 5 — Zoho Catalyst Setup
- [ ] Phase 6 — Database Design
- [ ] Phase 7 — Authentication
- [ ] Phase 8 — Backend APIs
- [ ] Phase 9 — Process Management
- [ ] Phase 10 — CPU Scheduling
- [ ] Phase 11 — Synchronization & Deadlock
- [ ] Phase 12 — Memory Management
- [ ] Phase 13 — Paging & Page Replacement
- [ ] Phase 14 — File System
- [ ] Phase 15 — Disk Scheduling
- [ ] Phase 16 — Linux Command Laboratory
- [ ] Phase 17 — Mobile OS
- [ ] Phase 18 — Results & Progress Tracking
- [ ] Phase 19 — Testing & Quality Assurance
- [ ] Phase 20 — Zoho Catalyst Deployment
- [ ] Phase 21 — Documentation & Final GitHub Release

## 🌐 Deployment Plan

The planned production deployment uses **Zoho Catalyst**.

```text
Local Development
       ↓
Git + GitHub
       ↓
Catalyst Development Environment
       ↓
Testing & Validation
       ↓
Catalyst Production Environment
       ↓
Deployed OSLabX Application
```

## 📚 Educational Value

OSLabX is intended to support practical learning of Operating Systems by connecting theory with experimentation.

Students can change inputs, observe how algorithms behave, compare results, identify performance differences, and understand why an algorithm produces a particular result.

The goal is not only to calculate an answer, but to **see the operating-system concept in action**.

## 🎓 Academic Use

OSLabX is being developed as an academic capstone / laboratory-oriented project focused on Operating Systems and practical software development.

It is suitable for demonstrating:

- Operating System concepts
- Data structures and algorithms
- Frontend development
- Backend development
- Database design
- Authentication
- API development
- Data visualization
- Software testing
- Cloud deployment
- Git and GitHub workflow

## 🔐 Security & Safety Considerations

- Authentication will be handled through the selected Catalyst authentication mechanism.
- User-owned experiments should be isolated by authenticated user context.
- Backend APIs will validate incoming requests where appropriate.
- The Linux laboratory will use simulated commands instead of unrestricted host-shell execution.
- Sensitive credentials and environment configuration will not be committed to GitHub.

## 📌 Current Status

**Project:** OSLabX — Virtual Operating System Laboratory & Resource Management Simulator  
**Repository:** `Siva-2406/OS_Stimulator_for_Students`  
**Current Stage:** Planning completed; project implementation will proceed incrementally.  
**License:** Apache License 2.0

## 🤝 Contribution & Development Workflow

The project will use Git and GitHub for version control.

Recommended commit style:

```text
feat: add CPU scheduling simulator
fix: correct round robin waiting time calculation
test: add scheduling algorithm test cases
docs: update architecture documentation
chore: configure frontend development environment
```

Major work can be organized using feature branches and merged after testing.

## 📄 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for the complete license text.

## 👨‍💻 Project

**OSLabX**  
Virtual Operating System Laboratory & Resource Management Simulator

Built as an academic project with a focus on practical Operating Systems education, interactive simulation, visualization, and cloud-based persistence.
