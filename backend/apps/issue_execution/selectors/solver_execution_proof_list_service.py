class SolverExecutionProofListselector:
    @staticmethod
    def get_execution_proof_list(solver):
        from apps.issue_execution.models.execution_proof import ExecutionProof
        return ExecutionProof.objects.filter(submitted_by=solver).order_by("-submitted_at")