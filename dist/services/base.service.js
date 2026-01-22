"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        return this.repository.create(data);
    }
    async getById(id) {
        return this.repository.findById(id);
    }
    async update(id, data) {
        return this.repository.update(id, data);
    }
    async delete(id) {
        return this.repository.delete(id);
    }
    async getAll(params, defaultSort = "id", defaultOrder = "ASC") {
        return this.repository.findAllWithPagination(params, defaultSort, defaultOrder);
    }
}
exports.BaseService = BaseService;
