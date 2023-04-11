import { FromEntriesWithReadOnly } from "./types";

export const defaultContact:singleContact = {
    id: "1234567",
    createAt: 1234567890,
    first: "Your",
    last:"Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
};

declare global {
    interface ObjectConstructor {
        fromEntries<T>(obj: T):FromEntriesWithReadOnly<T>
    }

    interface urlParams {
        contactId:string,
    }

    interface newContactProps {
        isNew: boolean,
    }

    interface singleContact {
        id: string,
        createAt: number,
        first?: string,
        last?: string,
        avatar?: string,
        twitter?: string,
        notes?: string,
        favorite?: boolean,
    }
    
    interface UpdateFormData {
        first: string,
        last: string,
        twitter: string,
        avatar: string,
        notes: string,
    }
}