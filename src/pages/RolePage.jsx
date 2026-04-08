import { useEffect, useState } from 'react';
import { getRoles, createRole, updateRole, deleteRole } from '../services/roleService';

export default function RolesPage() {
  const [roles, setRoles]         = useState([]);
  const [form, setForm]           = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchRoles = async () => {
    const res = await getRoles();
    setRoles(res.data);
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateRole(editingId, form);
    } else {
      await createRole(form);
    }
    setForm({ name: '' });
    setEditingId(null);
    fetchRoles();
  };

  const handleEdit = (role) => {
    setEditingId(role.id);
    setForm({ name: role.name });
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus role ini?')) {
      await deleteRole(id);
      fetchRoles();
    }
  };

  return (
    <div>
      <h2>Roles Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
          placeholder="Role name"
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ name: '' }); }}>
            Cancel
          </button>
        )}
      </form>

      {/* Table */}
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Action</th></tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <button onClick={() => handleEdit(role)}>Edit</button>
                <button onClick={() => handleDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}