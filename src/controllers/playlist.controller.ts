import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as playlistService from "../services/playlist.service";
import {
    responseError,
    responseSuccess,
} from "../middlewares/response.middleware";

export const createPlaylist = async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, isPublic } = req.body;
        const playlist = await playlistService.createPlaylist(
            req.user!.id,
            name,
            description,
            isPublic,
        );

        return responseSuccess(res, playlist);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const addVideo = async (req: AuthRequest, res: Response) => {
    try {
        const { playlistId, videoId, order } = req.body;
        const result = await playlistService.addVideoToPlaylist(
            playlistId,
            videoId,
            order,
        );

        return responseSuccess(res, result);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const removeVideo = async (req: AuthRequest, res: Response) => {
    try {
        const { playlistId, videoId } = req.body;
        const result = await playlistService.removeVideoFromPlaylist(
            playlistId,
            videoId,
        );

        return responseSuccess(res, result);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const getPlaylists = async (req: AuthRequest, res: Response) => {
    try {
        const playlists = await playlistService.getPlaylists(req.user!.id);
        return responseSuccess(res, playlists);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const deletePlaylist = async (req: AuthRequest, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await playlistService.deletePlaylist(id, req.user!.id);

        return responseSuccess(res, result);
    } catch (err: any) {
        return responseError(res, err);
    }
};
