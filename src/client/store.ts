import {create} from 'zustand';
import { QueryResult } from './types';


interface Store {
    offset:number,
    bookResults:QueryResult[],
    savedResults:QueryResult[],
    message:[string, string],
    setOffset: (offset:number) => void,
    setBookResults: (bookResults:QueryResult[]) => void,
    setSavedResults: (savedResults:QueryResult[]) => void,
    setMessage:(message:[string, string]) => void
}
const useStore = create<Store>((set) =>({
    offset: 0,
    bookResults:[],
    savedResults:[],
    message:['default', 'Add books below to get started.'],
    setOffset: (offset) => set({offset}),
    setBookResults: (bookResults) => set({bookResults}),
    setSavedResults: (savedResults) => set({savedResults}),
    setMessage: (message) => set({message})
}));

export default useStore;