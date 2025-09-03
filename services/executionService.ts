import type { Module, Blueprint } from '../types';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export interface ExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export interface WorkflowExecutionResult {
  success: boolean;
  workflowName: string;
  results: Array<{
    moduleId: number;
    moduleName: string;
    success: boolean;
    data?: any;
    error?: string;
  }>;
  executionTime: number;
}

export const executeModule = async (module: Module, inputData: any = {}): Promise<ExecutionResult> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/execute/module`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module, inputData })
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const executeWorkflow = async (blueprint: Blueprint, inputData: any = {}): Promise<WorkflowExecutionResult> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/execute/workflow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blueprint, inputData })
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      workflowName: blueprint.name,
      results: [],
      executionTime: Date.now(),
      error: error.message
    } as any;
  }
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};
