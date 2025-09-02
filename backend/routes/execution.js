const express = require('express');
const axios = require('axios');
const router = express.Router();

// Execute a single module
router.post('/module', async (req, res) => {
  try {
    const { module, inputData = {} } = req.body;

    if (!module) {
      return res.status(400).json({
        success: false,
        error: 'Module data is required'
      });
    }

    console.log(`🚀 Executing module: ${module.label} (${module.module})`);

    // Basic HTTP module execution
    if (module.module.toLowerCase().includes('http')) {
      const result = await executeHttpModule(module, inputData);
      return res.json(result);
    }

    // JSON module execution
    if (module.module.toLowerCase().includes('json')) {
      const result = await executeJsonModule(module, inputData);
      return res.json(result);
    }

    // Webhook module (just return config for now)
    if (module.module.toLowerCase().includes('webhook')) {
      const result = await executeWebhookModule(module, inputData);
      return res.json(result);
    }

    // Default: return module info (not executable)
    res.json({
      success: true,
      message: `Module type '${module.module}' is not yet supported for execution`,
      moduleInfo: {
        id: module.id,
        label: module.label,
        type: module.module,
        parameters: module.parameters
      }
    });

  } catch (error) {
    console.error('Module execution error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      moduleId: req.body.module?.id
    });
  }
});

// Execute entire workflow
router.post('/workflow', async (req, res) => {
  try {
    const { blueprint, inputData = {} } = req.body;

    if (!blueprint || !blueprint.flow) {
      return res.status(400).json({
        success: false,
        error: 'Blueprint with flow is required'
      });
    }

    console.log(`🔄 Executing workflow: ${blueprint.name}`);

    const results = [];
    let currentData = inputData;

    // Execute modules in sequence
    for (const module of blueprint.flow) {
      try {
        console.log(`  → Executing: ${module.label}`);
        
        // Execute module (simplified)
        const moduleResult = await executeModule(module, currentData);
        results.push({
          moduleId: module.id,
          moduleName: module.label,
          success: moduleResult.success,
          data: moduleResult.data,
          error: moduleResult.error
        });

        // Pass result to next module
        if (moduleResult.success) {
          currentData = moduleResult.data;
        }

      } catch (moduleError) {
        results.push({
          moduleId: module.id,
          moduleName: module.label,
          success: false,
          error: moduleError.message
        });
        break; // Stop execution on error
      }
    }

    res.json({
      success: true,
      workflowName: blueprint.name,
      results,
      executionTime: Date.now()
    });

  } catch (error) {
    console.error('Workflow execution error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Helper functions
async function executeHttpModule(module, inputData) {
  try {
    const { url, method = 'GET', headers = {}, data } = module.parameters;

    if (!url) {
      throw new Error('HTTP module requires a URL parameter');
    }

    const response = await axios({
      method,
      url,
      headers,
      data: data || inputData,
      timeout: 30000
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
      headers: response.headers
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status
    };
  }
}

async function executeJsonModule(module, inputData) {
  try {
    // Simple JSON transformation based on mapper
    const mapper = module.mapper || {};
    const result = {};

    // Apply mappings
    for (const [key, mapping] of Object.entries(mapper)) {
      if (typeof mapping === 'string' && mapping.startsWith('{{') && mapping.endsWith('}}')) {
        // Simple variable substitution
        const varName = mapping.slice(2, -2).trim();
        result[key] = inputData[varName] || mapping;
      } else {
        result[key] = mapping;
      }
    }

    return {
      success: true,
      data: result
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function executeWebhookModule(module, inputData) {
  // For now, just return webhook configuration
  return {
    success: true,
    message: 'Webhook module configured (execution would require external trigger)',
    data: {
      webhookUrl: `${process.env.BASE_URL || 'http://localhost:3001'}/webhook/${module.id}`,
      method: 'POST',
      parameters: module.parameters
    }
  };
}

async function executeModule(module, inputData) {
  if (module.module.toLowerCase().includes('http')) {
    return await executeHttpModule(module, inputData);
  }
  if (module.module.toLowerCase().includes('json')) {
    return await executeJsonModule(module, inputData);
  }
  if (module.module.toLowerCase().includes('webhook')) {
    return await executeWebhookModule(module, inputData);
  }

  return {
    success: true,
    message: `Module ${module.module} executed (placeholder)`,
    data: inputData
  };
}

module.exports = router;
