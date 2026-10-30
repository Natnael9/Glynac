'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  SystemUser,
  ComplianceRulePolicy,
  FeatureFlag,
  SystemHealthMetric,
} from './types';
import {
  initialSystemUsers,
  initialCompliancePolicies,
  initialFeatureFlags,
  systemHealthMetrics,
} from './mockData/admin';

interface AdminContextType {
  users: SystemUser[];
  policies: ComplianceRulePolicy[];
  featureFlags: FeatureFlag[];
  healthMetrics: SystemHealthMetric[];
  updateUserRole: (userId: string, role: SystemUser['role'], status: SystemUser['status'], permissions: SystemUser['permissions']) => void;
  deleteUser: (userId: string) => void;
  addUser: (user: Omit<SystemUser, 'id' | 'lastActive'>) => void;
  togglePolicyStatus: (policyId: string) => void;
  updatePolicySeverity: (policyId: string, severity: ComplianceRulePolicy['severity']) => void;
  addPolicy: (policy: Omit<ComplianceRulePolicy, 'id' | 'violationCount' | 'lastUpdated'>) => void;
  toggleFeatureFlag: (flagId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<SystemUser[]>(initialSystemUsers);
  const [policies, setPolicies] = useState<ComplianceRulePolicy[]>(initialCompliancePolicies);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(initialFeatureFlags);
  const [healthMetrics] = useState<SystemHealthMetric[]>(systemHealthMetrics);

  const updateUserRole = (
    userId: string,
    role: SystemUser['role'],
    status: SystemUser['status'],
    permissions: SystemUser['permissions']
  ) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role, status, permissions } : u))
    );
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const addUser = (userData: Omit<SystemUser, 'id' | 'lastActive'>) => {
    const newUser: SystemUser = {
      ...userData,
      id: `user-${Date.now()}`,
      lastActive: 'Just registered',
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const togglePolicyStatus = (policyId: string) => {
    setPolicies((prev) =>
      prev.map((p) =>
        p.id === policyId ? { ...p, isActive: !p.isActive, lastUpdated: new Date().toISOString() } : p
      )
    );
  };

  const updatePolicySeverity = (policyId: string, severity: ComplianceRulePolicy['severity']) => {
    setPolicies((prev) =>
      prev.map((p) =>
        p.id === policyId ? { ...p, severity, lastUpdated: new Date().toISOString() } : p
      )
    );
  };

  const addPolicy = (policyData: Omit<ComplianceRulePolicy, 'id' | 'violationCount' | 'lastUpdated'>) => {
    const newPolicy: ComplianceRulePolicy = {
      ...policyData,
      id: `policy-${Date.now()}`,
      violationCount: 0,
      lastUpdated: new Date().toISOString(),
    };
    setPolicies((prev) => [newPolicy, ...prev]);
  };

  const toggleFeatureFlag = (flagId: string) => {
    setFeatureFlags((prev) =>
      prev.map((f) => (f.id === flagId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        policies,
        featureFlags,
        healthMetrics,
        updateUserRole,
        deleteUser,
        addUser,
        togglePolicyStatus,
        updatePolicySeverity,
        addPolicy,
        toggleFeatureFlag,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

