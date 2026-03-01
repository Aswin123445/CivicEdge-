from django.db import models
class SolverTaskStatus(models.TextChoices):
    ASSIGNED = "ASSIGNED", "Assigned"
    VERIFICATION_SUBMITTED = "VERIFICATION_SUBMITTED", "Verification Submitted"
    APPROVED_FOR_EXECUTION = "APPROVED_FOR_EXECUTION", "Approved for Execution"
    IN_EXECUTION = "IN_EXECUTION", "In Execution"
    COMPLETION_SUBMITTED = "COMPLETION_SUBMITTED", "Completion Submitted"
    COMPLETED = "COMPLETED", "Completed"
    
    
ALLOWED_SOLVER_TASK_TRANSITIONS = {
    SolverTaskStatus.ASSIGNED: {
        SolverTaskStatus.VERIFICATION_SUBMITTED,
    },
    SolverTaskStatus.VERIFICATION_SUBMITTED: {
        SolverTaskStatus.APPROVED_FOR_EXECUTION,
        SolverTaskStatus.ASSIGNED,  # verification rejected
    },
    SolverTaskStatus.APPROVED_FOR_EXECUTION: {
        SolverTaskStatus.IN_EXECUTION,
    },
    SolverTaskStatus.IN_EXECUTION: {
        SolverTaskStatus.COMPLETION_SUBMITTED,
    },
    SolverTaskStatus.COMPLETION_SUBMITTED: {
        SolverTaskStatus.COMPLETED,
        SolverTaskStatus.IN_EXECUTION,  # completion rejected
    },
    SolverTaskStatus.COMPLETED: set(),  # terminal
}