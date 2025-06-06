"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface EditTimeModalProps {
    isOpen: boolean;
    onClose: () => void;
    time: {
        id: number;
        nome_time: string;
    } | null;
    onSave: (id: number, novoNome: string) => void;
}

export default function EditTimeModal({ isOpen, onClose, time, onSave }: EditTimeModalProps) {
    const [novoNome, setNovoNome] = useState("");

    useEffect(() => {
        if (time) {
            setNovoNome(time.nome_time);
        }
    }, [time]);

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

                <Dialog.Panel className="bg-[#ECE8E1] rounded-lg p-6 w-full max-w-md shadow-xl z-10">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-xl font-bold text-black">
                            Editar Nome do Time
                        </Dialog.Title>
                        <button onClick={onClose}>
                            <X className="text-black hover:text-red-500" />
                        </button>
                    </div>

                    <input
                        type="text"
                        className="text-black w-full border border-black rounded p-2 mb-4 bg-white"
                        maxLength={100}
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-[#E8E5DF] hover:bg-[#d6d3cd] text-[#0F1923]"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                if (time) {
                                    onSave(time.id, novoNome);
                                    onClose();
                                }
                            }}
                            className="px-4 py-2 bg-[#F23D58] hover:bg-[#d62e47] text-white"
                        >
                            Salvar
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
