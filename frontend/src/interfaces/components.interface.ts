import {Dispatch, ReactNode, SetStateAction} from "react";

export interface IAuthProps {
    username: string;
    password: string;
}

export interface IAlertState {
    isShow: boolean;
    type: "success" | "error";
    message: string;
}

export interface IAuthFormProps {
    login?: boolean;
}

export interface IGetNote {
    title: string;
    body: string;
}

export interface IGetNoteFormProps {
    setNote: Dispatch<SetStateAction<IGetNote>>;
}

export interface IInstructionStep {
    stepNumber: number;
    description: string;
}

export interface IModalProps {
    closeModal: () => void;
    open: boolean;
    children: ReactNode | ReactNode[];
    closeBtnText: string;
}

export interface ISingleNote {
    title: string;
    noteBody: string;
}
