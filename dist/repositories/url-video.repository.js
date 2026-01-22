"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlVideoRepository = void 0;
const url_video_model_1 = require("../models/url-video.model");
const base_repository_1 = require("./base.repository");
class UrlVideoRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(url_video_model_1.UrlVideo);
    }
}
exports.UrlVideoRepository = UrlVideoRepository;
