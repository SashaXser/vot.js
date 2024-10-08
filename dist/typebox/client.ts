import {
  RequestLang,
  ResponseLang,
  SessionModule,
  VideoService,
} from "./yandex";

import { Type, Static, TSchema } from '@sinclair/typebox'


export type FetchFunction = Static<typeof FetchFunction>
export const FetchFunction = Type.Function([Type.Union([
Type.String(),
Type.Never(),
Type.Never()
]), Type.Optional(Type.Any())], Type.Promise(Type.Never()))

export type URLSchema = Static<typeof URLSchema>
export const URLSchema = Type.Union([
Type.Literal("http"),
Type.Literal("https")
])

export type VideoData = Static<typeof VideoData>
export const VideoData = Type.Object({
url: Type.String(),
videoId: Type.String(),
host: VideoService,
duration: Type.Union([
Type.Number(),
Type.Null(),
Type.Undefined()
]),
isStream: Type.Optional(Type.Boolean()),
title: Type.Optional(Type.String()),
description: Type.Optional(Type.String())
})

export type GetVideoDataFunction = Static<typeof GetVideoDataFunction>
export const GetVideoDataFunction = Type.Function([Type.String()], Type.Promise(VideoData))

export type VOTOpts = Static<typeof VOTOpts>
export const VOTOpts = Type.Object({
host: Type.Optional(Type.String()),
hostVOT: Type.Optional(Type.String()),
fetchFn: Type.Optional(FetchFunction),
fetchOpts: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
getVideoDataFn: Type.Optional(GetVideoDataFunction),
requestLang: Type.Optional(RequestLang),
responseLang: Type.Optional(ResponseLang),
headers: Type.Optional(Type.Record(Type.String(), Type.String()))
})

export type ClientSession = Static<typeof ClientSession>
export const ClientSession = Type.Object({
expires: Type.Number(),
timestamp: Type.Number(),
uuid: Type.String(),
secretKey: Type.String()
})

export type ClientSuccessResponse<T extends TSchema> = Static<ReturnType<typeof ClientSuccessResponse<T>>>
export const ClientSuccessResponse = <T extends TSchema>(T: T) => Type.Object({
success: Type.Boolean(),
data: T
})

export type ClientFailedResponse = Static<typeof ClientFailedResponse>
export const ClientFailedResponse = Type.Object({
success: Type.Literal(false),
data: Type.Union([
Type.String(),
Type.Null()
])
})

export type ClientResponse<T extends TSchema> = Static<ReturnType<typeof ClientResponse<T>>>
export const ClientResponse = <T extends TSchema>(T: T) => Type.Union([
ClientFailedResponse,
ClientSuccessResponse(T)
])

export type VOTSessions = Static<typeof VOTSessions>
export const VOTSessions = Type.Mapped(SessionModule, K => Type.Optional(ClientSession))