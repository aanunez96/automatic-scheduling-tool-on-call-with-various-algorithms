# automatic-scheduling-tool-on-call-with-various-algorithms
_Efficient planning of work schedules is essential to improve productivity in service companies and minimize personnel costs. This problem is traditionally known as **labor scheduling problem** and classified as **NP-hard** type, so its resolution is traditionally carried out using heuristic methods to find solutions in reasonable computational times, due to the infinity of methods and criteria that exist at the time of To give a solution to this problem, I decided to create a tool so that all these converge in the same ecosystem with an infrastructure that would support such a load and solve all the problems that were not associated with the implementation of the algorithms as such_

_The system contains three web clients that consume services from the same API:_
  - Django-Admin 
  - GraphiQl 
  - UI
  
## static view of the API
![static-view-of-the-API](https://drive.google.com/uc?export=view&id=1VuI91H1KZZ19PdV1doVZjYOvAqRcNCmC)

  - The functionalities are accessed through a user interface
  - Guard generation does not block the rest of the system's functionalities (with a django command and cronjobs).
  - The solution is API based in a way that supports / allows multiple clients.
  - The system is open to extensions based on new assignment strategies (algorithms).
  - The system is open to extensions based on new assignment rules
