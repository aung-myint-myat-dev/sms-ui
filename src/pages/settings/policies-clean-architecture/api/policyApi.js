import { api } from "../../../../lib/api";

export const policyApi = {
  async getAll() {
    const response = await api.get("policies");
    return response.data.data ?? [];
  },

  async getById(id) {
    const response = await api.get(`policies/${id}`);
    return response.data.data;
  },

  async create(policy) {
    return api.post("policies", policy);
  },

  async update(id, policy) {
    return api.put(`policies/${id}`, policy);
  },

  async delete(id) {
    return api.delete(`policies/${id}`);
  },
};
