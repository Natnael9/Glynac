'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { SystemUser, UserRole } from '@/lib/types';
import {
  Users,
  Search,
  Shield,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Ban,
  UserPlus,
  X,
  Lock,
} from 'lucide-react';

export function RbacUserTable() {
  const { users, updateUserRole, deleteUser, addUser } = useAdmin();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('Compliance Officer');
  const [newUserDepartment, setNewUserDepartment] = useState('Regulatory Compliance & Legal');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (status: SystemUser['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Suspended':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    addUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      status: 'Active',
      department: newUserDepartment,
      permissions: {
        vdr: newUserRole === 'Admin' ? 'Admin' : 'Write',
        chat: newUserRole === 'Advisor' ? 'Write' : 'Admin',
        tree: newUserRole === 'Auditor' ? 'Read' : 'Write',
        admin: newUserRole === 'Admin' ? 'Full' : 'None',
      },
    });

    setNewUserName('');
    setNewUserEmail('');
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="space-y-3">
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666666]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search personnel by name, email, or department..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#333333]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Role Filter Chips */}
          <div className="flex items-center gap-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-0.5 text-xs">
            {['All', 'Admin', 'Compliance Officer', 'Auditor', 'Advisor'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  roleFilter === r ? 'bg-[#181818] border border-[#2b2b2b] text-white' : 'text-[#888888] hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-[#e0e0e0] text-xs font-semibold shadow-sm"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="border border-[#1a1a1a] rounded-2xl overflow-x-auto bg-[#0a0a0a] shadow-xl">
        <table className="w-full text-left text-xs min-w-[480px]">
          <thead className="bg-[#050505] text-[#888888] font-semibold border-b border-[#1a1a1a]">
            <tr>
              <th className="py-3 px-4">User & Contact</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 hidden md:table-cell">Department</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 hidden lg:table-cell">Module Permissions</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#0a0a0a] transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#181818] border border-[#333333] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#ededed] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#888888] truncate">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-[#ffffff]">{user.role}</span>
                </td>
                <td className="py-3 px-4 hidden md:table-cell text-[#888888]">
                  {user.department}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 hidden lg:table-cell">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-[#050505] text-[#d1d1d1] border border-[#1a1a1a]">
                      VDR: {user.permissions.vdr}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#050505] text-[#d1d1d1] border border-[#1a1a1a]">
                      Chat: {user.permissions.chat}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#050505] text-[#d1d1d1] border border-[#1a1a1a]">
                      Tree: {user.permissions.tree}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setEditingUser(user)}
                      title="Edit RBAC Permissions"
                      className="p-1.5 rounded-lg text-[#888888] hover:text-[#ffffff] hover:bg-[#141414]"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    {user.id !== 'user-1' && (
                      <button
                        onClick={() => deleteUser(user.id)}
                        title="Delete User"
                        className="p-1.5 rounded-lg text-[#888888] hover:text-rose-400 hover:bg-[#141414]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Role Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#181818] border border-[#2b2b2b] text-[#ffffff]">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Edit RBAC Profile</h4>
                  <p className="text-[10px] text-[#888888]">{editingUser.name}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">Assigned Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value as UserRole })
                  }
                  className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white"
                >
                  <option value="Admin">Admin (Full Control)</option>
                  <option value="Compliance Officer">Compliance Officer</option>
                  <option value="Auditor">Auditor (Inspection Only)</option>
                  <option value="Advisor">Advisor</option>
                </select>
              </div>

              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">Account Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      status: e.target.value as SystemUser['status'],
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending Verification</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">
                  Module Permissions Matrix
                </label>
                <div className="space-y-1.5 p-2.5 rounded-xl bg-[#050505] border border-[#1a1a1a]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#888888]">Virtual Data Room:</span>
                    <select
                      value={editingUser.permissions.vdr}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          permissions: { ...editingUser.permissions, vdr: e.target.value as any },
                        })
                      }
                      className="px-2 py-0.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded text-xs text-white"
                    >
                      <option value="Read">Read</option>
                      <option value="Write">Write</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#888888]">Compliance AI Chat:</span>
                    <select
                      value={editingUser.permissions.chat}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          permissions: { ...editingUser.permissions, chat: e.target.value as any },
                        })
                      }
                      className="px-2 py-0.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded text-xs text-white"
                    >
                      <option value="Read">Read</option>
                      <option value="Write">Write</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#888888]">Visual Tree DAG:</span>
                    <select
                      value={editingUser.permissions.tree}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          permissions: { ...editingUser.permissions, tree: e.target.value as any },
                        })
                      }
                      className="px-2 py-0.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded text-xs text-white"
                    >
                      <option value="Read">Read</option>
                      <option value="Write">Write</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingUser(null)}
                className="px-3 py-1.5 rounded-lg text-xs text-[#888888] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateUserRole(
                    editingUser.id,
                    editingUser.role,
                    editingUser.status,
                    editingUser.permissions
                  );
                  setEditingUser(null);
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-[#e0e0e0] shadow-sm"
              >
                Save Role Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] p-5 shadow-2xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-[#ffffff]" />
              Register New Personnel
            </h4>
            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Rachel Cooper, CFA"
                  className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white focus:outline-none focus:border-[#333333]"
                />
              </div>

              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="r.cooper@glynaccapital.com"
                  className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white focus:outline-none focus:border-[#333333]"
                />
              </div>

              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">Assigned Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white"
                >
                  <option value="Compliance Officer">Compliance Officer</option>
                  <option value="Admin">System Administrator</option>
                  <option value="Auditor">External Auditor</option>
                  <option value="Advisor">Portfolio Advisor</option>
                </select>
              </div>

              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">Department</label>
                <input
                  type="text"
                  value={newUserDepartment}
                  onChange={(e) => setNewUserDepartment(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#888888] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-[#e0e0e0] shadow-sm"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

