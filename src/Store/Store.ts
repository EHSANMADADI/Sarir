import { create } from "zustand";
type StoreState = {
    audioURLs:string[],
    setAudioURLs:(value:string)=>void,
    fileNames:string[],
    setFileNames:(value:string)=>void
}

export const useStore = create<StoreState>((set) => ({
    audioURLs:[],
    setAudioURLs:(value)=>set((state)=>({audioURLs:[...state.audioURLs,value]})),
    fileNames:[],
    setFileNames:(value)=>set((state)=>({fileNames:[...state.fileNames,value]})),
}))