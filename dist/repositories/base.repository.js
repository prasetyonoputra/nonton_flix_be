"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const pagination_helper_1 = require("../helpers/pagination.helper");
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findById(id, options) {
        return this.model.findByPk(id, options);
    }
    async update(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance)
            return null;
        return instance.update(data);
    }
    async delete(id) {
        const where = {
            id,
        };
        const deletedCount = await this.model.destroy({ where });
        return deletedCount > 0;
    }
    async findAllWithPagination(params, defaultSort = "id", defaultOrder = "ASC") {
        const page = params.page && params.page > 0 ? params.page : 1;
        const limit = params.limit && params.limit > 0 ? params.limit : 10;
        const options = (0, pagination_helper_1.getPaginationOptions)(params, defaultSort, defaultOrder);
        const { rows, count } = await this.model.findAndCountAll(options);
        return (0, pagination_helper_1.formatPaginationResult)(rows, count, page, limit);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
}
exports.BaseRepository = BaseRepository;
