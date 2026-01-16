import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as playlistService from "../services/playlist.service";

export const createPlaylist = async (req: AuthRequest, res: Response) => {
    const { name, description, isPublic } = req.body;
    const playlist = await playlistService.createPlaylist(
        req.user!.id,
        name,
        description,
        isPublic
    );
    res.json(playlist);
};

export const addVideo = async (req: AuthRequest, res: Response) => {
    const { playlistId, videoId, order } = req.body;
    const result = await playlistService.addVideoToPlaylist(
        playlistId,
        videoId,
        order
    );
    res.json(result);
};

export const removeVideo = async (req: AuthRequest, res: Response) => {
    const { playlistId, videoId } = req.body;
    const result = await playlistService.removeVideoFromPlaylist(
        playlistId,
        videoId
    );
    res.json(result);
};

export const getPlaylists = async (req: AuthRequest, res: Response) => {
    const playlists = await playlistService.getPlaylists(req.user!.id);
    res.json(playlists);
};

export const deletePlaylist = async (req: AuthRequest, res: Response) => {
    const id = Number(req.params.id);
    const result = await playlistService.deletePlaylist(id, req.user!.id);
    res.json({ message: "Playlist deleted", playlist: result });
};
