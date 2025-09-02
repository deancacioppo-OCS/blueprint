
export interface Blueprint {
  name: string;
  flow: Module[];
  metadata: {
    version: number;
    scenario: {
      id: number;
      name: string;
    };
  };
}

export interface Module {
  id: number;
  label: string;
  module: string;
  version: number;
  parameters: Record<string, any>;
  mapper: Record<string, any> | null;
  metadata: {
    designer: {
      x: number;
      y: number;
    };
    restore: Record<string, any>;
    expect: Record<string, any>;
  };
}
